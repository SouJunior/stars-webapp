import { describe, it, expect } from 'vitest'
import {
  createEmptyApplicant,
  getAreasForJobtitle,
  isHeadType,
  areasHead,
  areasJuniorMentor,
  verticalMapping
} from '../constants.js'

describe('createEmptyApplicant', () => {
  it('returns default empty form state', () => {
    expect(createEmptyApplicant()).toEqual({
      jobtitle_id: null,
      vertical_ids: [],
      techs_frontend: [],
      techs_frontend_outros: '',
      techs_backend: [],
      techs_backend_outros: '',
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      discord: '',
      was_referred: 'nao',
      referred_by_name: '',
      referred_by_position: '',
      referred_by_linkedin: '',
      terms: false
    })
  })
})

describe('isHeadType / getAreasForJobtitle', () => {
  it('identifies Head jobtitle', () => {
    expect(isHeadType(3)).toBe(true)
    expect(isHeadType(1)).toBe(false)
    expect(isHeadType(2)).toBe(false)
    expect(isHeadType(null)).toBe(false)
  })

  it('returns Head areas for Head and Junior/Mentor areas otherwise', () => {
    expect(getAreasForJobtitle(3)).toEqual(areasHead)
    expect(getAreasForJobtitle(1)).toEqual(areasJuniorMentor)
    expect(getAreasForJobtitle(2)).toEqual(areasJuniorMentor)
    expect(getAreasForJobtitle(null)).toEqual(areasJuniorMentor)
  })

  it('includes both Devops spellings in mapping', () => {
    expect(verticalMapping.Devops).toBe(5)
    expect(verticalMapping.DevOps).toBe(5)
  })
})
