import { describe, it, expect } from 'vitest'
import { buildPayload } from '../buildPayload.js'
import { createEmptyApplicant } from '../constants.js'

function fullApplicant(overrides = {}) {
  return {
    ...createEmptyApplicant(),
    jobtitle_id: 1,
    vertical_ids: ['Front-end', 'QA'],
    techs_frontend: ['React'],
    name: 'Maria Silva',
    email: 'maria@example.com',
    phone: '(11) 99999-9999',
    linkedin: 'https://www.linkedin.com/in/maria',
    github: 'https://github.com/maria',
    discord: 'maria#1234',
    terms: true,
    ...overrides
  }
}

describe('buildPayload', () => {
  it('maps core fields and vertical names to ids', () => {
    const payload = buildPayload(fullApplicant())

    expect(payload).toMatchObject({
      name: 'Maria Silva',
      email: 'maria@example.com',
      phone: '(11) 99999-9999',
      linkedin: 'https://www.linkedin.com/in/maria',
      github: 'https://github.com/maria',
      discord: 'maria#1234',
      jobtitle_id: 1,
      vertical_ids: [6, 11],
      terms_accepted: true,
      is_active: true
    })
    expect(payload.techs).toEqual([{ area: 'frontend', tech: 'React' }])
  })

  it('maps both Devops and DevOps to id 5', () => {
    const junior = buildPayload(fullApplicant({ vertical_ids: ['Devops'], techs_frontend: [] }))
    const head = buildPayload(fullApplicant({ vertical_ids: ['DevOps'], techs_frontend: [] }))

    expect(junior.vertical_ids).toEqual([5])
    expect(head.vertical_ids).toEqual([5])
  })

  it('converts empty optional fields to null', () => {
    const payload = buildPayload(
      fullApplicant({
        phone: '',
        github: '',
        discord: '',
        techs_frontend: []
      })
    )

    expect(payload.phone).toBeNull()
    expect(payload.github).toBeNull()
    expect(payload.discord).toBeNull()
  })

  it('merges Outros free text into techs', () => {
    const payload = buildPayload(
      fullApplicant({
        vertical_ids: ['Front-end', 'Back-end'],
        techs_frontend: ['React', 'Outros'],
        techs_frontend_outros: '  Svelte  ',
        techs_backend: ['Outros'],
        techs_backend_outros: 'Go'
      })
    )

    expect(payload.techs).toEqual([
      { area: 'frontend', tech: 'React' },
      { area: 'frontend', tech: 'Svelte' },
      { area: 'backend', tech: 'Go' }
    ])
  })

  it('drops Outros when free text is empty', () => {
    const payload = buildPayload(
      fullApplicant({
        techs_frontend: ['Outros'],
        techs_frontend_outros: '   '
      })
    )

    expect(payload.techs).toEqual([])
  })

  it('includes referral fields when was_referred is sim', () => {
    const payload = buildPayload(
      fullApplicant({
        was_referred: 'sim',
        referred_by_name: 'João',
        referred_by_position: 'Head',
        referred_by_linkedin: 'https://www.linkedin.com/in/joao'
      })
    )

    expect(payload.referred_by_name).toBe('João')
    expect(payload.referred_by_position).toBe('Head')
    expect(payload.referred_by_linkedin).toBe('https://www.linkedin.com/in/joao')
  })

  it('nulls referral fields when was_referred is nao', () => {
    const payload = buildPayload(
      fullApplicant({
        was_referred: 'nao',
        referred_by_name: 'João',
        referred_by_position: 'Head',
        referred_by_linkedin: 'https://www.linkedin.com/in/joao'
      })
    )

    expect(payload.referred_by_name).toBeNull()
    expect(payload.referred_by_position).toBeNull()
    expect(payload.referred_by_linkedin).toBeNull()
  })

  it('filters unknown vertical names', () => {
    const payload = buildPayload(
      fullApplicant({ vertical_ids: ['Front-end', 'Area Inexistente'], techs_frontend: [] })
    )

    expect(payload.vertical_ids).toEqual([6])
  })
})
