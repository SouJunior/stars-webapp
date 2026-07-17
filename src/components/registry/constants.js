export const volunteerTypes = [
  { id: 1, label: 'Júnior' },
  { id: 2, label: 'Mentor' },
  { id: 3, label: 'Head' }
]

export const areasJuniorMentor = [
  'Agilidade',
  'Back-end',
  'Front-end',
  'Dados',
  'Design Operations',
  'Devops',
  'Product Growth',
  'Product Manager',
  'Product Marketing Manager',
  'Product Operations',
  'QA',
  'Social Media',
  'Tech Recruiter',
  'UX Research',
  'UX-UI'
]

export const areasHead = [
  'Agilidade',
  'Back-end',
  'Dados',
  'Design',
  'DevOps',
  'Front-end',
  'Produtos',
  'QA',
  'Social Media',
  'Tech Recruiter'
]

export const techsFrontendOptions = [
  'Styled-components ou Tailwind',
  'Typescript',
  'React',
  'HTML / CSS',
  'Design Pattern',
  'Performance e otimização de bundle',
  'Otimização na renderização de imagens',
  'Outros'
]

export const techsBackendOptions = [
  'Node.JS com Typescript',
  'Java',
  'Python',
  'PHP',
  'Outros'
]

export const verticalMapping = {
  Agilidade: 1,
  'Back-end': 2,
  Dados: 3,
  'Design Operations': 4,
  DevOps: 5,
  Devops: 5,
  'Front-end': 6,
  'Product Growth': 7,
  'Product Manager': 8,
  'Product Marketing Manager': 9,
  'Product Operations': 10,
  QA: 11,
  'Social Media': 12,
  'Tech Recruiter': 13,
  'UX Research': 14,
  'UX-UI': 15,
  Design: 16,
  Produtos: 17
}

export function createEmptyApplicant() {
  return {
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
  }
}

export function isHeadType(jobtitleId) {
  const found = volunteerTypes.find((t) => t.id === jobtitleId)
  return found?.label === 'Head'
}

export function getAreasForJobtitle(jobtitleId) {
  return isHeadType(jobtitleId) ? areasHead : areasJuniorMentor
}
