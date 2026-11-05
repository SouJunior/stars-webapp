import { describe, it, expect } from 'vitest'
import {
  emailRules,
  linkedinRules,
  phoneRules,
  isAreasInvalid,
  isFrontendTechsInvalid,
  isBackendTechsInvalid,
  validateCustomFields,
  formatPhone,
  toggleAreaSelection
} from '../validation.js'
import { createEmptyApplicant } from '../constants.js'

function baseApplicant(overrides = {}) {
  return { ...createEmptyApplicant(), ...overrides }
}

describe('emailRules', () => {
  it('rejects empty email', () => {
    expect(emailRules[0]('')).toBe('E-mail é obrigatório')
  })

  it('rejects invalid email format', () => {
    expect(emailRules[1]('not-an-email')).toBe('E-mail deve ser válido')
  })

  it('accepts valid email', () => {
    expect(emailRules[0]('user@example.com')).toBe(true)
    expect(emailRules[1]('user@example.com')).toBe(true)
  })
})

describe('linkedinRules', () => {
  it('rejects empty linkedin', () => {
    expect(linkedinRules[0]('')).toBe('LinkedIn é obrigatório')
  })

  it('rejects non-linkedin urls', () => {
    expect(linkedinRules[1]('https://github.com/user')).toBe(
      'Informe uma URL de LinkedIn válida'
    )
  })

  it('accepts valid linkedin profile urls', () => {
    expect(linkedinRules[1]('https://www.linkedin.com/in/fulano')).toBe(true)
    expect(linkedinRules[1]('http://linkedin.com/in/fulano')).toBe(true)
  })
})

describe('phoneRules', () => {
  it('rejects empty phone', () => {
    expect(phoneRules[0]('')).toBe('WhatsApp é obrigatório')
  })

  it('rejects incomplete mask', () => {
    expect(phoneRules[1]('(11) 9999-9999')).toBe(
      'Informe um número de WhatsApp válido'
    )
  })

  it('accepts full mask', () => {
    expect(phoneRules[1]('(11) 99999-9999')).toBe(true)
  })
})

describe('formatPhone', () => {
  it('returns empty string for empty value', () => {
    expect(formatPhone('')).toBe('')
    expect(formatPhone(null)).toBe('')
  })

  it('formats partial digits', () => {
    expect(formatPhone('11')).toBe('(11')
    expect(formatPhone('11999')).toBe('(11) 999')
  })

  it('formats full number', () => {
    expect(formatPhone('11999999999')).toBe('(11) 99999-9999')
  })

  it('strips non-digits and caps at 11 digits', () => {
    expect(formatPhone('(11) 99999-9999')).toBe('(11) 99999-9999')
    expect(formatPhone('119999999991234')).toBe('(11) 99999-9999')
  })
})

describe('area and tech validation', () => {
  it('isAreasInvalid when no areas selected', () => {
    expect(isAreasInvalid(baseApplicant())).toBe(true)
    expect(isAreasInvalid(baseApplicant({ vertical_ids: ['QA'] }))).toBe(false)
  })

  it('requires frontend techs only when Front-end is selected', () => {
    expect(isFrontendTechsInvalid(baseApplicant({ vertical_ids: ['QA'] }))).toBe(false)
    expect(
      isFrontendTechsInvalid(baseApplicant({ vertical_ids: ['Front-end'], techs_frontend: [] }))
    ).toBe(true)
    expect(
      isFrontendTechsInvalid(
        baseApplicant({ vertical_ids: ['Front-end'], techs_frontend: ['React'] })
      )
    ).toBe(false)
  })

  it('requires backend techs only when Back-end is selected', () => {
    expect(isBackendTechsInvalid(baseApplicant({ vertical_ids: ['QA'] }))).toBe(false)
    expect(
      isBackendTechsInvalid(baseApplicant({ vertical_ids: ['Back-end'], techs_backend: [] }))
    ).toBe(true)
    expect(
      isBackendTechsInvalid(
        baseApplicant({ vertical_ids: ['Back-end'], techs_backend: ['Java'] })
      )
    ).toBe(false)
  })

  it('validateCustomFields requires areas and techs when applicable', () => {
    expect(validateCustomFields(baseApplicant())).toBe(false)
    expect(validateCustomFields(baseApplicant({ vertical_ids: ['QA'] }))).toBe(true)
    expect(
      validateCustomFields(baseApplicant({ vertical_ids: ['Front-end'], techs_frontend: [] }))
    ).toBe(false)
    expect(
      validateCustomFields(
        baseApplicant({
          vertical_ids: ['Front-end', 'Back-end'],
          techs_frontend: ['React'],
          techs_backend: ['Java']
        })
      )
    ).toBe(true)
  })
})

describe('toggleAreaSelection', () => {
  it('adds area when under max', () => {
    const applicant = baseApplicant()
    toggleAreaSelection(applicant, 'QA')
    expect(applicant.vertical_ids).toEqual(['QA'])
  })

  it('does not add more than max areas', () => {
    const applicant = baseApplicant({ vertical_ids: ['QA', 'Dados', 'Agilidade'] })
    toggleAreaSelection(applicant, 'Front-end', 3)
    expect(applicant.vertical_ids).toEqual(['QA', 'Dados', 'Agilidade'])
  })

  it('removes area when already selected', () => {
    const applicant = baseApplicant({ vertical_ids: ['QA', 'Dados'] })
    toggleAreaSelection(applicant, 'QA')
    expect(applicant.vertical_ids).toEqual(['Dados'])
  })

  it('clears frontend techs when Front-end is deselected', () => {
    const applicant = baseApplicant({
      vertical_ids: ['Front-end'],
      techs_frontend: ['React'],
      techs_frontend_outros: 'Vue'
    })
    toggleAreaSelection(applicant, 'Front-end')
    expect(applicant.vertical_ids).toEqual([])
    expect(applicant.techs_frontend).toEqual([])
    expect(applicant.techs_frontend_outros).toBe('')
  })

  it('clears backend techs when Back-end is deselected', () => {
    const applicant = baseApplicant({
      vertical_ids: ['Back-end'],
      techs_backend: ['Java'],
      techs_backend_outros: 'Go'
    })
    toggleAreaSelection(applicant, 'Back-end')
    expect(applicant.vertical_ids).toEqual([])
    expect(applicant.techs_backend).toEqual([])
    expect(applicant.techs_backend_outros).toBe('')
  })
})
