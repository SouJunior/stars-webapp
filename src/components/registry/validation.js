export const emailRules = [
  (v) => !!v || 'E-mail é obrigatório',
  (v) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido'
]

export const linkedinRules = [
  (v) => !!v || 'LinkedIn é obrigatório',
  (v) =>
    /^https?:\/\/(www\.)?linkedin\.com\/in\/.+/.test(v) || 'Informe uma URL de LinkedIn válida'
]

export const phoneRules = [
  (v) => !!v || 'WhatsApp é obrigatório',
  (v) => /^\(\d{2}\)\s\d{5}-\d{4}$/.test(v) || 'Informe um número de WhatsApp válido'
]

export function isAreasInvalid(applicant) {
  return applicant.vertical_ids.length === 0
}

export function isFrontendTechsInvalid(applicant) {
  return applicant.vertical_ids.includes('Front-end') && applicant.techs_frontend.length === 0
}

export function isBackendTechsInvalid(applicant) {
  return applicant.vertical_ids.includes('Back-end') && applicant.techs_backend.length === 0
}

export function validateCustomFields(applicant) {
  return (
    !isAreasInvalid(applicant) &&
    !isFrontendTechsInvalid(applicant) &&
    !isBackendTechsInvalid(applicant)
  )
}

export function formatPhone(value) {
  if (!value) return ''

  const digits = value.replace(/\D/g, '').slice(0, 11)

  let formatted = ''
  if (digits.length > 0) formatted = '(' + digits.slice(0, 2)
  if (digits.length > 2) formatted += ') ' + digits.slice(2, 7)
  if (digits.length > 7) formatted += '-' + digits.slice(7, 11)

  return formatted
}

export function toggleAreaSelection(applicant, area, maxAreas = 3) {
  const idx = applicant.vertical_ids.indexOf(area)

  if (idx === -1) {
    if (applicant.vertical_ids.length >= maxAreas) return
    applicant.vertical_ids.push(area)
    return
  }

  applicant.vertical_ids.splice(idx, 1)

  if (area === 'Front-end') {
    applicant.techs_frontend = []
    applicant.techs_frontend_outros = ''
  }

  if (area === 'Back-end') {
    applicant.techs_backend = []
    applicant.techs_backend_outros = ''
  }
}
