import { verticalMapping } from './constants.js'

function mergeOutrosTechs(selected, outrosText) {
  if (!selected.includes('Outros')) {
    return [...selected]
  }

  return [
    ...selected.filter((t) => t !== 'Outros'),
    (outrosText || '').trim()
  ].filter(Boolean)
}

function prepareTechs(frontendTechs, backendTechs) {
  const listaDeTechs = []

  if (frontendTechs?.length) {
    frontendTechs.forEach((tech) => listaDeTechs.push({ area: 'frontend', tech }))
  }

  if (backendTechs?.length) {
    backendTechs.forEach((tech) => listaDeTechs.push({ area: 'backend', tech }))
  }

  return listaDeTechs
}

export function buildPayload(applicant) {
  const frontendTechs = mergeOutrosTechs(
    applicant.techs_frontend,
    applicant.techs_frontend_outros
  )
  const backendTechs = mergeOutrosTechs(applicant.techs_backend, applicant.techs_backend_outros)

  return {
    name: applicant.name,
    email: applicant.email,
    phone: applicant.phone || null,
    linkedin: applicant.linkedin,
    github: applicant.github || null,
    discord: applicant.discord || null,
    jobtitle_id: applicant.jobtitle_id,
    vertical_ids: applicant.vertical_ids.map((name) => verticalMapping[name]).filter(Boolean),
    techs: prepareTechs(frontendTechs, backendTechs),
    terms_accepted: applicant.terms,
    is_active: true,
    ...(applicant.was_referred === 'sim'
      ? {
          referred_by_name: applicant.referred_by_name,
          referred_by_position: applicant.referred_by_position,
          referred_by_linkedin: applicant.referred_by_linkedin
        }
      : {
          referred_by_name: null,
          referred_by_position: null,
          referred_by_linkedin: null
        })
  }
}
