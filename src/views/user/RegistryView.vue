<template>
  <v-container fluid class="registration-page-background">
    <v-row align="center" justify="center">
      <v-col cols="12" md="10" lg="8" xl="6" class="container-principal">
        <v-card elevation="4" rounded="lg" class="overflow-hidden">

          <!-- Header -->
          <div class="bg-primary pa-6 text-center">
            <h1 class="text-h5 text-md-h4 font-weight-bold text-white logo-text">
              Olá quer participar da SouJunior?
            </h1>
            <p class="text-subtitle-1 text-white mt-2 opacity-90">
              Para prosseguir e fazer parte da nossa comunidade, precisamos que você realize um
              breve cadastro. É rápido e fácil!
            </p>
          </div>

          <!-- Form Body -->
           <!--ajustado para melhorar a opacidade do warning--> 
          <v-card-text class="pa-4 pa-md-8">
            <h2 class="text-subtitle-1 font-weight-bold text-primary mb-1">Cadastro de voluntário</h2>
            <v-alert
            variant="flat"
            color="orange-lighten-5"
            icon="mdi-alert-circle-outline"
            density="compact"
            class="mb-6 text-caption text-orange-darken-4 border-sm border-orange-lighten-3 rounded-lg font-weight-medium"
          >
            Campos de preenchimento obrigatório (*)
          </v-alert>

            <v-form ref="form" @submit.prevent="submitApplicant">

              <!-- 1. Tipo de Voluntário -->
              <p class="text-body-2 font-weight-medium mb-2">1. Tipo de voluntário *</p>
              <v-select
                v-model="applicant.jobtitle_id"
                :items="volunteerTypes"
                item-title="label"
                item-value="id"
                placeholder="Selecionar"
                variant="outlined"
                density="comfortable"
                append-inner-icon="mdi-chevron-right"
                :rules="[(v) => !!v || 'Selecione um tipo de voluntário']"
                class="mb-4"
              />

              <!-- 2. Área de Atuação -->
              <div class="mb-4">
                <div class="d-flex justify-space-between align-center mb-2">
                  <p class="text-body-2 font-weight-medium">2. Área de Atuação *</p>
                  <span class="text-caption text-medium-emphasis">Selecione até 3 áreas</span>
                </div>

                <div class="d-flex flex-wrap gap-2">
                  <v-chip
                    v-for="area in filteredAreas"
                    :key="area"
                    :color="applicant.vertical_ids.includes(area) ? 'primary' : undefined"
                    :variant="applicant.vertical_ids.includes(area) ? 'flat' : 'outlined'"
                    size="small"
                    class="cursor-pointer"
                    @click="toggleArea(area)"
                  >
                    {{ area }}
                  </v-chip>
                </div>

                <!-- Front-end sub-block -->
                <div v-if="applicant.vertical_ids.includes('Front-end')" class="tech-block mt-4 pa-4 rounded">
                  <p class="text-caption font-weight-bold mb-3">
                    Tecnologias Front-end
                    <span class="text-medium-emphasis font-weight-regular ml-2">Múltipla escolha</span>
                  </p>
                  <v-checkbox
                    v-for="tech in techsFrontendOptions"
                    :key="tech"
                    v-model="applicant.techs_frontend"
                    :label="tech"
                    :value="tech"
                    density="compact"
                    hide-details
                    class="mb-1"
                    color="primary"
                  />
                  <v-text-field
                    v-if="applicant.techs_frontend.includes('Outros')"
                    v-model="applicant.techs_frontend_outros"
                    placeholder="Especifique outras tecnologias..."
                    variant="outlined"
                    density="compact"
                    maxlength="100"
                    class="mt-3"
                    hide-details
                  />
                </div>

                <!-- Back-end sub-block -->
                <div v-if="applicant.vertical_ids.includes('Back-end')" class="tech-block mt-4 pa-4 rounded">
                  <p class="text-caption font-weight-bold mb-3">
                    Tecnologias Back-end
                    <span class="text-medium-emphasis font-weight-regular ml-2">Múltipla escolha</span>
                  </p>
                  <v-checkbox
                    v-for="tech in techsBackendOptions"
                    :key="tech"
                    v-model="applicant.techs_backend"
                    :label="tech"
                    :value="tech"
                    density="compact"
                    hide-details
                    class="mb-1"
                    color="primary"
                  />
                  <v-text-field
                    v-if="applicant.techs_backend.includes('Outros')"
                    v-model="applicant.techs_backend_outros"
                    placeholder="Especifique outras tecnologias..."
                    variant="outlined"
                    density="compact"
                    maxlength="100"
                    class="mt-3"
                    hide-details
                  />
                </div>
              </div>

              <!-- 3. Informações Pessoais -->
              <p class="text-body-2 font-weight-medium mb-3">3. Informações Pessoais</p>
              <v-row>
                <!-- Coluna esquerda: Nome em cima, Email embaixo -->
                <v-col cols="12" md="6">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="applicant.name"
                       label="Nome Completo *"
                        placeholder="Preencha seu nome completo"
                         variant="outlined"
                          density="comfortable"
                        :rules="[(v) => !!v || 'Nome é obrigatório']" />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="applicant.email"
                       label="Email *"
                        placeholder="your.email@example.com"
                        variant="outlined"
                         density="comfortable"
                          :rules="emailRules" />
                    </v-col>
                  </v-row>
                </v-col>

                <!-- Coluna direita: WhatsApp -->
                <v-col cols="12" md="6">
                  <v-text-field v-model="whatsappFormatted"
                   label="WhatsApp *" 
                   variant="outlined"
                    density="comfortable"
                    :rules="phoneRules" 
                    placeholder="Preencha seu WhatsApp"
                     maxlength="15" />
                </v-col>
              </v-row>

              <!-- 4. Perfil Profissional -->
              <p class="text-body-2 font-weight-medium mb-3 mt-2">4. Perfil Profissional</p>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="applicant.linkedin"
                    label="LinkedIn *"
                    placeholder="https://linkedin.com/in/seu-perfil"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-linkedin"
                    :rules="linkedinRules"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="applicant.github"
                    label="Github (Opcional)"
                    placeholder="Nome de Usuário"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-github"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="applicant.discord"
                    label="Discord (Opcional)"
                    placeholder="Nome de Usuário"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-discord"
                  />
                </v-col>
              </v-row>
              

              <!-- 5. Indicação -->
              <p class="text-body-2 font-weight-medium mb-2 mt-2">5. Indicação</p>
              <p class="text-caption text-medium-emphasis mb-3">Você foi indicado(a) por alguém da SouJunior?</p>

              <v-btn-toggle
                v-model="applicant.was_referred"
                mandatory
                density="compact"
                class="mb-4"
              >
                <v-btn value="sim" variant="outlined" size="small">Sim</v-btn>
                <v-btn value="nao" variant="outlined" size="small" color="primary">Não</v-btn>
              </v-btn-toggle>

              <v-row v-if="applicant.was_referred === 'sim'" class="mt-0">
                <v-col cols="12">
                  <v-text-field
                    v-model="applicant.referred_by_name"
                    label="Nome da pessoa *"
                    variant="outlined"
                    density="comfortable"
                    :rules="[(v) => !!v || 'Nome é obrigatório']"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="applicant.referred_by_position"
                    label="Cargo *"
                    variant="outlined"
                    density="comfortable"
                    :rules="[(v) => !!v || 'Cargo da indicação é obrigatório']"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="applicant.referred_by_linkedin"
                    label="LinkedIn da indicação *"
                    placeholder="https://linkedin.com/in/..."
                    variant="outlined"
                    density="comfortable"
                    :rules="linkedinRules"
                  />
                </v-col>
              </v-row>

              <!-- Terms checkbox -->
              <v-checkbox
                v-model="applicant.terms"
                color="primary"
                hide-details
                class="mt-2 mb-6"
              >
                <template #label>
                  <span class="text-body-2">
                    Eu aceito e concordo com os termos de condição
                    <a
                      href="#"
                      class="text-primary font-weight-bold text-decoration-none"
                      @click.prevent.stop="dialogTerms = true"
                    >
                      Termos e condições *
                    </a>
                  </span>
                </template>
              </v-checkbox>

              <!-- Action buttons -->
              <div class="d-flex justify-center gap-4 flex-wrap">
                <v-btn
                  variant="outlined"
                  color="secondary"
                  size="large"
                  rounded="pill"
                  class="px-8"
                  @click="dialogCancel = true"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="primary"
                  size="large"
                  rounded="pill"
                  class="px-8"
                  :loading="loading"
                  @click="submitApplicant"
                >
                  Cadastrar
                </v-btn>
              </div>

            </v-form>
          </v-card-text>
        </v-card>

        <div class="mascote-container">
          <img src="@/assets/mascote.png" alt="Mascote SouJunior" class="mascote-img" />
        </div>
      </v-col>
    </v-row>

    <!-- ─── Dialog: Termos e Condições ─── -->
    <v-dialog v-model="dialogTerms" max-width="600" scrollable>
      <v-card rounded="lg">
        <v-card-title class="text-h6 bg-primary text-white pa-4">Termos e Condições</v-card-title>
        <v-divider />
        <v-card-text class="pa-4 text-body-2" style="max-height: 400px">
          <p>
            Todas as participações no SouJunior são <strong>VOLUNTÁRIAS</strong>, não remuneradas e
            sem qualquer vínculo empregatício. As participações visam, unicamente, servir de
            experiência ao voluntário que também contribuirá com o crescimento do projeto.
          </p>
          <p class="mt-4">
            A SouJunior não garante vaga de trabalho à pessoa voluntária, embora exista a
            possibilidade de que receba convites para oportunidades em empresas parceiras, externas
            e/ou recrutadores.
          </p>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-4 justify-end">
          <v-btn variant="text" color="error" @click="rejectTerms">Recusar</v-btn>
          <v-btn color="primary" variant="elevated" @click="acceptTerms">Aceitar e Concordar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ─── Dialog: Alerta de Desistência ─── -->
    <v-dialog v-model="dialogCancel" max-width="440">
      <v-card rounded="lg">
        <v-card-title class="text-h6 pa-4">Deseja mesmo cancelar?</v-card-title>
        <v-card-text class="text-body-2 px-4 pb-2">
          Seu progresso será perdido e você voltará à página inicial.
        </v-card-text>
        <v-card-actions class="pa-4 justify-end">
          <v-btn variant="text" @click="dialogCancel = false">Voltar</v-btn>
          <v-btn color="error" variant="elevated" @click="confirmCancel">Sim, cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ─── Dialog: Sucesso ─── -->
    <v-dialog v-model="dialogSuccess" max-width="480" persistent>
      <v-card rounded="lg" class="text-center pa-8">
        <v-icon size="80" color="success" class="mb-4">mdi-check-circle-outline</v-icon>
        <v-card-title class="text-h5 font-weight-bold text-success justify-center">
          Cadastro Realizado!
        </v-card-title>
        <v-card-text class="text-body-2 text-medium-emphasis">
          Seu registro foi efetuado com sucesso. Você receberá um e-mail de confirmação em breve.
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="primary" variant="elevated" rounded="pill" :to="{ name: 'home' }" @click="resetForm">
            Voltar ao início
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>

</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { event } from 'vue-gtag'
import { useVolunteerStore } from '@/stores/volunteer.js'
import { useVolunteerTypeStore } from '@/stores/volunteerType.js'
import { useTheme } from 'vuetify'

// ─── Router & Stores ───────────────────────────────────────────────────────────
const $router = useRouter()
const volunteerStore = useVolunteerStore()
const volunteerTypeStore = useVolunteerTypeStore()

volunteerTypeStore.fetchVolunteerTypes()

// ─── Form ref ──────────────────────────────────────────────────────────────────
const form = ref(null)

// ─── UI state ──────────────────────────────────────────────────────────────────
const loading = ref(false)
const dialogTerms = ref(false)
const dialogCancel = ref(false)
const dialogSuccess = ref(false)

// ─── Static data ───────────────────────────────────────────────────────────────
const volunteerTypes = [
  { id: 1, label: 'Júnior' },
  { id: 2, label: 'Mentor' },
  { id: 3, label: 'Head' }
]

const areasJuniorMentor = [
  'Agilidade', 'Back-end', 'Dados', 'Design Operations', 'DevOps', 'Front-end',
  'Product Growth', 'Product Manager', 'Product Marketing Manager',
  'Product Operations', 'QA', 'Social Media', 'Tech Recruiter', 'UX Research', 'UX-UI'
]

const areasHead = [
  'Agilidade', 'Back-end', 'Dados', 'Design', 'DevOps', 'Front-end',
  'Produtos', 'QA', 'Social Media', 'Tech Recruiter'
]

const techsFrontendOptions = [
  'Styled-components ou Tailwind',
  'Typescript',
  'React',
  'HTML / CSS',
  'Design Pattern',
  'Performance e otimização de bundle',
  'Otimização na renderização de imagens',
  'Outros'
]

const techsBackendOptions = [
  'Node.JS com Typescript',
  'Java',
  'Python',
  'PHP',
  'Outros'
]


// ─── Reactive form state ───────────────────────────────────────────────────────
const applicant = reactive({
  // Tipo e áreas
  jobtitle_id: null,
  vertical_ids: [],
  techs_frontend: [],
  techs_frontend_outros: '',
  techs_backend: [],
  techs_backend_outros: '',
  // Pessoais
  name: '',
  email: '',
  phone: '',
  // Profissional
  linkedin: '',
  github: '',
  discord: '',
  // Indicação
  was_referred: 'nao',
  referred_by_name: '',
  referred_by_position: '',
  referred_by_linkedin: '',
  // Termos
  terms: false
})

// ─── Computed ──────────────────────────────────────────────────────────────────
const isHead = computed(() => {
  const found = volunteerTypes.find((t) => t.id === applicant.jobtitle_id)
  return found?.label === 'Head'
})

const filteredAreas = computed(() => (isHead.value ? areasHead : areasJuniorMentor))

// ─── Validation rules ──────────────────────────────────────────────────────────
const emailRules = [
  (v) => !!v || 'E-mail é obrigatório',
  (v) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido'
]

const linkedinRules = [
  (v) => !!v || 'LinkedIn é obrigatório',
  (v) =>
    /^https?:\/\/(www\.)?linkedin\.com\/in\/.+/.test(v) ||
    'Informe uma URL de LinkedIn válida'
]

const phoneRules = [
  (v) => !!v || 'WhatsApp é obrigatório',
  (v) =>
    /^\(\d{2}\)\s\d{5}-\d{4}$/.test(v) ||
    'Informe um número de WhatsApp válido',
];

const whatsappFormatted = computed({
  get() {
    return applicant.whatsapp;
  },
  set(value) {
    if (!value) {
      applicant.whatsapp = '';
      return;
    }

    const digits = value.replace(/\D/g, '').slice(0, 11);

    let formatted = '';
    if (digits.length > 0) formatted = '(' + digits.slice(0, 2);
    if (digits.length > 2) formatted += ') ' + digits.slice(2, 7);
    if (digits.length > 7) formatted += '-' + digits.slice(7, 11);

    applicant.whatsapp = formatted;
  },
});

// ─── Helpers ───────────────────────────────────────────────────────────────────
const toggleArea = (area) => {
  const idx = applicant.vertical_ids.indexOf(area)
  if (idx === -1) {
    if (applicant.vertical_ids.length >= 3) return
    applicant.vertical_ids.push(area)
  } else {
    applicant.vertical_ids.splice(idx, 1)
    // Clean techs if area is deselected
    if (area === 'Front-end') {
      applicant.techs_frontend = []
      applicant.techs_frontend_outros = ''
    }
    if (area === 'Back-end') {
      applicant.techs_backend = []
      applicant.techs_backend_outros = ''
    }
  }
}

const resetForm = () => {
  applicant.jobtitle_id = null
  applicant.vertical_ids = []
  applicant.techs_frontend = []
  applicant.techs_frontend_outros = ''
  applicant.techs_backend = []
  applicant.techs_backend_outros = ''
  applicant.name = ''
  applicant.email = ''
  applicant.phone = ''
  applicant.linkedin = ''
  applicant.github = ''
  applicant.discord = ''
  applicant.was_referred = 'nao'
  applicant.referred_by_name = ''
  applicant.referred_by_position = ''
  applicant.referred_by_linkedin = ''
  applicant.terms = false
  form.value?.reset()
}

// ─── Dialog actions ────────────────────────────────────────────────────────────
const acceptTerms = () => {
  applicant.terms = true
  dialogTerms.value = false
}

const rejectTerms = () => {
  applicant.terms = false
  dialogTerms.value = false
}

const confirmCancel = () => {
  dialogCancel.value = false
  resetForm()
  $router.push({ name: 'home' })
}

// ─── Submit ────────────────────────────────────────────────────────────────────
const submitApplicant = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return

  if (!applicant.terms) {
    dialogTerms.value = true
    return
  }

  // Merge "Outros" free text into the tech arrays
  const frontendTechs = applicant.techs_frontend.includes('Outros')
    ? [
        ...applicant.techs_frontend.filter((t) => t !== 'Outros'),
        applicant.techs_frontend_outros.trim()
      ].filter(Boolean)
    : [...applicant.techs_frontend]

  const backendTechs = applicant.techs_backend.includes('Outros')
    ? [
        ...applicant.techs_backend.filter((t) => t !== 'Outros'),
        applicant.techs_backend_outros.trim()
      ].filter(Boolean)
    : [...applicant.techs_backend]

  const verticalMapping = {
    'Agilidade': 1, 'Back-end': 2, 'Dados': 3, 'Design Operations': 4, 'DevOps': 5,
    'Front-end': 6, 'Product Growth': 7, 'Product Manager': 8, 'Product Marketing Manager': 9,
    'Product Operations': 10, 'QA': 11, 'Social Media': 12, 'Tech Recruiter': 13,
    'UX Research': 14, 'UX-UI': 15, 'Design': 16, 'Produtos': 17
  }

  const prepararTechsDinamicas = () => {
  const listaDeTechs = [];

  // Se houver tecnologias de front-end selecionadas, joga na lista
  if (frontendTechs && frontendTechs.length > 0) {
    frontendTechs.forEach(tech => listaDeTechs.push({ area: 'frontend', tech }));
  }

  // Se houver tecnologias de back-end selecionadas, joga na lista
  if (backendTechs && backendTechs.length > 0) {
    backendTechs.forEach(tech => listaDeTechs.push({ area: 'backend', tech }));
  }

  // OBS: Como DevOps e QA ainda não têm inputs de texto na tela, 
  // eles não entram aqui por enquanto, mas a estrutura já fica pronta!

  return listaDeTechs;
};

  const payload = {
  name: applicant.name,
  email: applicant.email,
  phone: applicant.phone || null,
  linkedin: applicant.linkedin,
  github: applicant.github || null,
  discord: applicant.discord || null,
  jobtitle_id: applicant.jobtitle_id,
  
  // Transforma os nomes das tags clicadas (ex: 'DevOps', 'QA') nos IDs correspondentes
  vertical_ids: applicant.vertical_ids.map(name => verticalMapping[name]).filter(Boolean),
  
  // Mudança aqui: Enviamos o array unificado em vez de 'techs_frontend' e 'techs_backend' separados
  techs: prepararTechsDinamicas(),
  
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

  try {
    loading.value = true
    await volunteerStore.create(payload)
    event('sign_up', {
      method: 'email',
      job_title: applicant.jobtitle_id
    })
    dialogSuccess.value = true
  } catch (error) {
    console.error(error.message)
    alert('Erro ao realizar cadastro: ' + error.message)
  } finally {
    loading.value = false
  }
}

const theme = useTheme()
const isDark = computed(() => theme.global.name.value === 'myDarkTheme')

function toggleDark() {
  const novoTema = isDark.value ? 'myTheme' : 'myDarkTheme'
  theme.global.name.value = novoTema
  localStorage.setItem('theme', isDark.value ? 'light' : 'dark')
}

</script>

<style scoped>
.logo-text {
  font-family: 'Radio Canada', serif !important;
  letter-spacing: 0.5px;
}

.logo-text {
  font-family: 'Radio Canada', serif !important;
}

/* Container principal precisa de position relative para ancorar o mascote */
.container-principal {
  position: relative;
}

/* Posicionamento do Mascote */
.mascote-container {
  position: absolute;
  left: -130px;   /* mais negativo = mascote mais pra fora/esquerda do card */
  bottom: 60px;   /* mais alto = sobe o mascote; mais baixo = desce */
  z-index: 10;
}

.mascote-img {
  width: 160px;
  height: auto;
  display: block;
}

.registration-page-background {
  background-color: rgb(var(--v-theme-background));
  min-height: 100vh;
  padding: 24px 16px;
}

.tech-block {
  background-color: rgba(var(--v-theme-surface-variant), 0.4);
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.cursor-pointer {
  cursor: pointer;
}

</style>