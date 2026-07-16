<template>
  <v-container fluid class="pa-0 registration-page-background">
    
    <div 
      class="py-6 py-md-12 px-4 text-center w-100 mt-n16 position-relative overflow-hidden banner-principal"
      style="background: linear-gradient(135deg, #3C7EF9 0%, #1F4FDE 100%);"
    >
      <img 
        src="@/assets/banner-quadrado-transparente.png" 
        alt="Pattern Left"
        style="
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          opacity: 0.75;
          pointer-events: none;
        "
      />

      <img 
        src="@/assets/banner-quadrado-transparente.png" 
        alt="Pattern Right"
        style="
          position: absolute;
          bottom: 0;
          right: 0;
          height: 100%;
          opacity: 0.75;
          transform: scaleX(-1) scaleY(-1);
          pointer-events: none;
        "
      />
      
      <div class="position-relative" style="z-index: 2;">
        <h1 class="text-white mb-4 text-center titulo-banner">
          Olá, quer participar da <br v-if="$vuetify.display.mdAndUp"> SouJunior?
        </h1>
        <p class="text-body-1 text-md-h6 text-white mx-auto opacity-90" style="max-width: 800px; line-height: 1.5;">
          Para prosseguir e fazer parte da nossa comunidade, precisamos que você realize um
          breve cadastro. É rápido e fácil!
        </p>
      </div>
    </div>

    <!-- 2. ÁREA DO FORMULÁRIO -->
    <v-row align="center" justify="center" class="ma-0 mt-6">
  <v-col cols="12" md="9" lg="7" xl="6" class="container-principal px-md-8" style="max-width: 900px;">
    
    <v-card variant="flat" class="overflow-hidden bg-transparent">
      <v-card-text class="pa-4 pa-md-8">
        <h2 class="text-h4 registry-form-title text-primary mb-6">
          Cadastro de voluntário
        </h2>
            <v-alert
            variant="flat"
            color="transparent"
            icon="mdi-alert-circle-outline"
            density="compact"
            class="mb-6 text-caption required-fields-alert rounded-lg font-weight-medium"
          >
            Campos de preenchimento obrigatório (<span class="asterisco">*</span>)
          </v-alert>

            <v-form ref="form" @submit.prevent="submitApplicant">

              <!-- 1. Tipo de Voluntário -->
          <div class="mb-6">
            <p class="text-body-2 registry-section-title mb-2">
              1. Tipo de voluntário <span class="asterisco">*</span>
            </p>
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
          </div>

          <!-- Linha divisória sutil idêntica ao protótipo -->
          <v-divider class="site-divider my-6"></v-divider>

              
            <!-- 2. Área de Atuação -->
            <div class="mb-6">
            <div class="d-flex justify-space-between align-baseline mb-3">
              <p class="text-body-2 font-weight-bold mb-0">
                2. Área de Atuação <span class="asterisco">*</span>
              </p>
              <span class="text-body-2 text-grey-darken-1">
                Selecione até 3 áreas
              </span>
            </div>

            <div class="areas-container">
              <v-chip
                v-for="area in filteredAreas"
                :key="area"
                :color="applicant.vertical_ids.includes(area) ? 'primary' : 'grey-lighten-1'"
                :variant="applicant.vertical_ids.includes(area) ? 'flat' : 'outlined'"
                class="custom-chip"
                :class="{ 'text-grey-darken-3': !applicant.vertical_ids.includes(area) }"
                @click="toggleArea(area)"
              >
                {{ area }}
              </v-chip>
            </div>
            
            <p v-if="attemptedSubmit && areasInvalid" class="text-caption text-error mt-2 mb-0">
              Selecione ao menos uma área de atuação
            </p>
          </div>

          <!-- Linha divisória sutil após a Seção 2 -->
          <v-divider class="site-divider my-6"></v-divider>

            <div v-if="applicant.vertical_ids.includes('Front-end')" class="bg-transparent mt-6 pl-2">
              <div class="d-flex justify-space-between align-baseline mb-4">
                <p class="text-h6 font-weight-bold">
                  Tecnologias Front-end
                </p>
                <span class="text-caption">Múltipla escolha</span>
              </div>

            <v-checkbox
              v-for="tech in techsFrontendOptions"
              :key="tech"
              v-model="applicant.techs_frontend"
              :label="tech"
              :value="tech"
              density="comfortable"
              hide-details
              class="mb-1 text-body-1 font-weight-medium"
              color="primary"
            />

            <v-text-field
              v-if="applicant.techs_frontend.includes('Outros')"
              v-model="applicant.techs_frontend_outros"
              placeholder="Especifique outras tecnologias..."
              variant="outlined"
              density="comfortable"
              maxlength="100"
              class="mt-4 mb-6 text-body-1 rounded-lg"
              hide-details="auto"
              :rules="[v => !!v || 'Por favor, especifique as tecnologias front-end']"
            />
            <v-divider class="site-divider my-6"></v-divider>


            <p v-if="attemptedSubmit && frontendTechsInvalid" class="text-caption text-error mt-2">
              Selecione ao menos uma tecnologia de Front-end
            </p>
          </div>

          <div v-if="applicant.vertical_ids.includes('Back-end')" class="bg-transparent mt-6 pl-2">
            <div class="d-flex justify-space-between align-baseline mb-4">
              <p class="text-h6 font-weight-bold">
                Tecnologias Back-end
              </p>
              <span class="text-caption">Múltipla escolha</span>
            </div>

            <v-checkbox
              v-for="tech in techsBackendOptions"
              :key="tech"
              v-model="applicant.techs_backend"
              :label="tech"
              :value="tech"
              density="comfortable"
              hide-details
              class="mb-1 text-body-1 font-weight-medium"
              color="primary"
            />
            
            <v-text-field
              v-if="applicant.techs_backend.includes('Outros')"
              v-model="applicant.techs_backend_outros"
              placeholder="Especifique outras tecnologias..."
              variant="outlined"
              density="comfortable"
              maxlength="100"
              class="mt-4 mb-6 text-body-1 rounded-lg"
              hide-details="auto"
              :rules="[v => !!v || 'Por favor, especifique as tecnologias back-end']"
            />

            <v-divider class="site-divider my-6"></v-divider>

            <p v-if="attemptedSubmit && backendTechsInvalid" class="text-caption text-error mt-2">
              Selecione ao menos uma tecnologia de Back-end
            </p>
          </div>

              <!-- 3. Informações Pessoais -->
              <p class="text-body-2 font-weight-bold mb-4">3. Informações Pessoais <span class='asterisco'>*</span></p>
              
              <v-row class="ma-0">
                <v-col cols="12" class="pa-0 mb-4">
                  <label class="text-caption registry-field-label d-block mb-1">
                    Nome Completo <span class="text-red">*</span>
                  </label>
                  <v-text-field 
                    v-model="applicant.name"
                    placeholder="Preencha seu nome completo"
                    variant="outlined"
                    density="comfortable"
                    :rules="[(v) => !!v || 'Nome é obrigatório']"
                    validate-on="lazy submit"
                    hide-details="auto"
                  />
                </v-col>

                <v-col cols="12" md="6" class="pa-0 pr-md-2 mb-4">
                  <label class="text-caption registry-field-label d-block mb-1">
                    Email <span class="text-red">*</span>
                  </label>
                  <v-text-field 
                    v-model="applicant.email"
                    placeholder="your.email@example.com"
                    variant="outlined"
                    density="comfortable"
                    :rules="emailRules"
                    validate-on="lazy submit"
                    hide-details="auto"
                  />
                </v-col>

                <v-col cols="12" md="6" class="pa-0 pl-md-2 mb-4">
                  <label class="text-caption font-weight-medium text-grey-darken-3 d-block mb-1">
                    WhatsApp <span class="text-red">*</span>
                  </label>
                  <v-text-field 
                    v-model="whatsappFormatted"
                    placeholder="+55 (11) 99999-9999"
                    variant="outlined"
                    density="comfortable"
                    :rules="phoneRules" 
                    maxlength="15"
                    validate-on="lazy submit"
                    hide-details="auto"
                  />
                </v-col>
              </v-row>

             <!-- 4. Perfil Profissional -->
              <p class="text-body-2 font-weight-bold mb-4 mt-2">4. Perfil Profissional</p>
              
              <v-row class="ma-0">
                <!-- LinkedIn (Ocupa a linha toda) -->
                <v-col cols="12" class="pa-0 mb-4">
                  <label class="text-caption font-weight-medium text-grey-darken-3 d-block mb-1">
                    LinkedIn <span class="text-red">*</span>
                  </label>
                  <v-text-field
                    v-model="applicant.linkedin"
                    placeholder="https://linkedin.com/in/seu-perfil"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-linkedin"
                    :rules="linkedinRules"
                    validate-on="lazy submit"
                    hide-details="auto"
                  />
                </v-col>

                <!-- Github (Opcional - Lado esquerdo) -->
                <v-col cols="12" md="6" class="pa-0 pr-md-2 mb-4">
                  <div class="d-flex align-center mb-1">
                    <label class="text-caption font-weight-medium text-grey-darken-3">Github</label>
                    <span class="text-caption text-grey ml-1">(Opcional)</span>
                    <v-icon size="16" class="text-grey ml-1" title="Digite apenas o seu nome de usuário">mdi-information-outline</v-icon>
                  </div>
                  <v-text-field
                    v-model="applicant.github"
                    placeholder="Nome de Usuário"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-github"
                    validate-on="lazy submit"
                    hide-details="auto"
                  />
                </v-col>

                <!-- Discord (Opcional - Lado direito) -->
                <v-col cols="12" md="6" class="pa-0 pl-md-2 mb-4">
                  <div class="d-flex align-center mb-1">
                    <label class="text-caption font-weight-medium text-grey-darken-3">Discord</label>
                    <span class="text-caption text-grey ml-1">(Opcional)</span>
                    <v-icon size="16" class="text-grey ml-1" title="Digite apenas o seu nome de usuário">mdi-information-outline</v-icon>
                  </div>
                  <v-text-field
                    v-model="applicant.discord"
                    placeholder="Nome de Usuário"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-discord"
                    validate-on="lazy submit"
                    hide-details="auto"
                  />
                </v-col>
              </v-row>
              

             <!-- 5. Indicação -->
              <p class="text-body-2 font-weight-bold mb-2 mt-2">5. Indicação</p>
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

              <v-row v-if="applicant.was_referred === 'sim'" class="ma-0 mt-2">
                <!-- Nome da pessoa (Ocupa a linha toda) -->
                <v-col cols="12" class="pa-0 mb-4">
                  <label class="text-caption font-weight-medium text-grey-darken-3 d-block mb-1">
                    Nome da pessoa <span class="text-red">*</span>
                  </label>
                  <v-text-field
                    v-model="applicant.referred_by_name"
                    placeholder="Nome completo da pessoa que te indicou"
                    variant="outlined"
                    density="comfortable"
                    :rules="[(v) => !!v || 'Nome é obrigatório']"
                    validate-on="lazy submit"
                    hide-details="auto"
                  />
                </v-col>

                <!-- Cargo (Lado esquerdo) -->
                <v-col cols="12" md="6" class="pa-0 pr-md-2 mb-4">
                  <label class="text-caption font-weight-medium text-grey-darken-3 d-block mb-1">
                    Cargo <span class="text-red">*</span>
                  </label>
                  <v-text-field
                    v-model="applicant.referred_by_position"
                    placeholder="Ex: Desenvolvedor Front-end"
                    variant="outlined"
                    density="comfortable"
                    :rules="[(v) => !!v || 'Cargo da indicação é obrigatório']"
                    validate-on="lazy submit"
                    hide-details="auto"
                  />
                </v-col>

                <!-- LinkedIn da indicação (Lado direito) -->
                <v-col cols="12" md="6" class="pa-0 pl-md-2 mb-4">
                  <label class="text-caption font-weight-medium text-grey-darken-3 d-block mb-1">
                    LinkedIn da indicação <span class="text-red">*</span>
                  </label>
                  <v-text-field
                    v-model="applicant.referred_by_linkedin"
                    placeholder="https://linkedin.com/in/..."
                    variant="outlined"
                    density="comfortable"
                    :rules="linkedinRules"
                    validate-on="lazy submit"
                    hide-details="auto"
                  />
                </v-col>
              </v-row>

              <div class="registration-footer-container ml-0">
                <div class="terms-box-wrapper mb-4">
                  <v-checkbox
                    v-model="applicant.terms"
                    hide-details
                    class="terms-checkbox px-4 py-2"
                  >
                    <template #label>
                      <span class="text-body-2 text-terms-responsive terms-label">
                        Eu aceito e concordo com os termos de condições 
                        <a
                          href="#"
                          class="text-primary font-weight-bold text-decoration-none ml-1"
                          @click.prevent.stop="dialogTerms = true"
                        >
                          Termos e condições *
                        </a>
                      </span>
                    </template>
                  </v-checkbox>
                </div>

                <div class="action-buttons-row">
                  <v-btn
                    variant="outlined"
                    color="grey-darken-1"
                    size="large"
                    class="action-btn text-none"
                    @click="dialogCancel = true"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                    variant="elevated"
                    color="primary"
                    size="large"
                    class="action-btn text-none cta-btn"
                    :loading="loading"
                    :disabled="!applicant.terms"
                    @click="submitApplicant"
                  >
                    Cadastrar
                  </v-btn>
                </div>
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
        <v-card rounded="lg" class="pa-2">
          <v-card-title class="text-h6 font-weight-bold pa-4 text-wrap text-primary">
            Tem certeza de que deseja <br> desistir do cadastro?
          </v-card-title>
          
          <v-card-text class="text-body-2 px-4 pb-2 text-medium-emphasis text-disabled">
            Todas as informações preenchidas serão perdidas
          </v-card-text>
          
          <v-card-actions class="pa-4 justify-end">
            <v-btn class="text-none font-weight-bold" variant="outlined" color="primary" @click="dialogCancel = false">
              Não continuar
            </v-btn>
            <v-btn class="text-none font-weight-bold" color="primary" variant="elevated" @click="confirmCancel">
              Continuar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

         <!-- ─── Dialog: Sucesso ─── -->
          <v-dialog v-model="dialogSuccess" max-width="400" persistent>
            <v-card rounded="xl" class="text-center pa-6">
              <!-- Ícone preenchido igual ao protótipo -->
              <v-icon size="72" color="success" class="mb-4">
                mdi-check-circle
              </v-icon>
              
              <!-- Título em azul com a fonte do projeto -->
              <v-card-title class="text-h5 text-primary font-weight-bold justify-center text-wrap line-height-sm px-4">
                Cadastro realizado com sucesso!
              </v-card-title>
              
              <!-- Descrição exata do protótipo -->
              <v-card-text class="text-body-2 text-grey-darken-1 px-4 py-2">
                Seu perfil agora faz parte do banco de talentos da SouJunior.
              </v-card-text>
              
              <!-- Botão Fechar retangular plano e estilizado -->
              <v-card-actions class="justify-center pt-2">
                <v-btn 
                  color="primary" 
                  variant="flat" 
                  block
                  class="text-none text-body-1 font-weight-medium py-3 rounded-lg"
                  :to="{ name: 'home' }" 
                  @click="resetForm"
                >
                  Fechar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
  </v-container>
  <footer class="footer-gradiente"></footer>
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
  'Agilidade', 'Back-end', 'Front-end', 'Dados', 'Design Operations', 'Devops',
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

// Controla se deve exibir erro (só aparece depois de tentar enviar)
const attemptedSubmit = ref(false);

// Validações computadas
const frontendTechsInvalid = computed(() => {
  return applicant.vertical_ids.includes('Front-end') && applicant.techs_frontend.length === 0;
});

const backendTechsInvalid = computed(() => {
  return applicant.vertical_ids.includes('Back-end') && applicant.techs_backend.length === 0;
});

const areasInvalid = computed(() => {
  return applicant.vertical_ids.length === 0;
});

const validateCustomFields = () => {
  attemptedSubmit.value = true;
  return !areasInvalid.value && !frontendTechsInvalid.value && !backendTechsInvalid.value;
};


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
  const customValid = validateCustomFields()

  if (!valid || !customValid) return

  if (!applicant.terms) {
    dialogTerms.value = true
    return
  }
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
  font-family: 'Funnel Sans', sans-serif !important;
}

/* Posicionamento do Mascote */
.mascote-container {
  position: absolute;
  left: -130px;   /* mais negativo = mascote mais pra fora/esquerda do card */
  bottom: 0px;   /* mais alto = sobe o mascote; mais baixo = desce */
  z-index: 10;
}

.mascote-img {
  width: 160px;
  height: auto;
  display: block;
}

/* Mobile: tira do posicionamento absoluto e coloca no fluxo normal */
@media (max-width: 768px) {
  .mascote-container {
    position: static;
    left: auto;
    bottom: auto;
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }

  .mascote-img {
    width: 90px; /* menor, pra não dominar a tela */
  }
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

.areas-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
}

:deep(.custom-chip) {
  flex: 0 0 auto !important;

  height: 28px !important;
  min-width: unset !important;

  font-family: "Funnel Sans", sans-serif !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 16px !important;
}

:deep(.custom-chip .v-chip__content) {
  white-space: nowrap;
}

.footer-gradiente {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-top: -20px; /* remove espaço extra antes da faixa */
  padding: 40px 0;
  background: linear-gradient(90deg, #1E3A8A 0%, #3B82F6 50%, #2563EB 100%);
}

.registration-footer-container {
  width: 100%;
  margin-left: 0 !important;
  margin-right: 0 !important;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Fundo do bloco de termos e ações */
.terms-box-wrapper {
  background-color: #E8F2FF;
  border: 1px solid rgba(59, 126, 249, 0.18);
  border-radius: 16px;
  width: 100%;
  padding: 8px 14px;
  display: flex;
  align-items: center;
}

.terms-checkbox {
  width: 100%;
  margin: 0 !important;
  padding: 0 !important;
}

.terms-checkbox :deep(.v-selection-control) {
  width: 100%;
  padding: 0 !important;
  min-height: 0 !important;
  align-items: center !important;
}

.terms-checkbox :deep(.v-selection-control__input) {
  border-color: #3C7EF9 !important;
  background-color: #ffffff !important;
  width: 20px !important;
  height: 20px !important;
}

.terms-checkbox :deep(.v-selection-control__ripple) {
  width: 20px !important;
  height: 20px !important;
}

.terms-checkbox :deep(.v-icon) {
  color: #3C7EF9 !important;
  font-size: 16px !important;
}

.terms-checkbox :deep(.v-selection-control__label) {
  margin: 0 !important;
  line-height: 1.3 !important;
  color: #475569 !important;
}

:deep(.theme--dark) .terms-box-wrapper,
:deep(.v-theme--dark) .terms-box-wrapper {
  background-color: rgba(59, 126, 249, 0.16) !important;
  border-color: rgba(96, 165, 250, 0.28) !important;
}

:deep(.theme--dark) .terms-label,
:deep(.v-theme--dark) .terms-label,
:deep(.theme--dark) .terms-checkbox :deep(.v-selection-control__label),
:deep(.v-theme--dark) .terms-checkbox :deep(.v-selection-control__label) {
  color: #EFF6FF !important;
}

:deep(.theme--dark) .terms-checkbox :deep(.v-selection-control__input),
:deep(.v-theme--dark) .terms-checkbox :deep(.v-selection-control__input) {
  border-color: #93C5FD !important;
  background-color: #0F172A !important;
}

:deep(.theme--dark) .terms-checkbox :deep(.v-icon),
:deep(.v-theme--dark) .terms-checkbox :deep(.v-icon) {
  color: #93C5FD !important;
}

.terms-label {
  font-family: 'Funnel Sans', sans-serif !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  line-height: 20px !important;
  color: #475569 !important;
}

.action-buttons-row {
  display: flex;
  gap: 16px;
  width: 100%;
}

.action-btn {
  flex: 1;
  min-height: 44px !important;
  height: 44px !important;
  padding: 0 22px !important;
  border-radius: 12px !important;
  font-family: 'Funnel Sans', sans-serif !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  line-height: 44px !important;
}

.cta-btn {
  min-height: 44px !important;
  height: 44px !important;
  border-radius: 12px !important;
}

.cta-btn:not(:disabled) {
  background-color: #3C7EF9 !important;
  color: #ffffff !important;
}

.cta-btn:disabled {
  background-color: rgba(59, 126, 249, 0.18) !important;
  color: rgba(15, 23, 42, 0.4) !important;
}

.v-btn--variant-outlined.action-btn {
  background-color: #ffffff !important;
  border-color: rgba(148, 163, 184, 0.3) !important;
}

.required-fields-alert {
  background-color: rgba(253, 218, 187, 0.5);
  border: 1px solid #F6AF71;
  color: #422C18;
}

.registry-form-title {
  font-family: 'Funnel Sans', sans-serif !important;
  font-size: 28px !important;
  font-weight: 600 !important;
  line-height: 32px !important;
}

.registry-section-title {
  font-family: 'Funnel Sans', sans-serif !important;
  font-size: 21px !important;
  font-weight: 600 !important;
  line-height: 24px !important;
}

.registry-field-label,
.registration-footer-container .text-caption,
.terms-label {
  font-family: 'Funnel Sans', sans-serif !important;
}

.registry-field-label {
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 16px !important;
}

/* Ajuste para o texto dos termos quebrar linha no mobile corretamente */
.text-no-wrap-custom {
  white-space: normal !important; /* Permite a quebra de linha natural */
  font-size: 0.875rem;
  color: inherit; /* Herda a cor do tema atual */
  display: inline-block;
  vertical-align: middle;
}

/* Nova classe responsiva para os termos */
.text-terms-responsive {
  width: 100%;
  display: block;
  white-space: normal !important; /* Permite quebra apenas se faltar espaço */
  color: inherit !important;
  line-height: 1.4;
}

.required-fields-alert {
  background-color: rgba(253, 218, 187, 0.5);
  border: 1px solid #F6AF71;
  color: #422C18;
}

/* Botões do Rodapé */
.action-btn {
  flex: 1;
  height: 44px !important;
  border-radius: 12px !important;
  font-weight: 600;
  letter-spacing: 0;
}

.cta-btn {
  min-height: 44px !important;
  border-radius: 12px !important;
}

.v-btn--variant-outlined {
  border-color: rgba(var(--v-theme-on-surface), 0.22) !important;
}


/* ==========================================
   2. CHIPS / ÁREAS DE ATUAÇÃO (CONTRASTE)
   ========================================== */
/* Supondo que sejam v-chip ou elementos customizados, este seletor garante legibilidade no dark */
:deep(.v-chip) {
  border-color: rgba(var(--v-theme-on-surface), 0.3) !important;
}

/* Alvo no texto interno dos chips apagados */
:deep(.v-chip__content) {
  color: rgba(var(--v-theme-on-surface), 0.87) !important; /* Força cor clara no dark e escura no light */
  font-weight: 500;
}


/* ==========================================
   3. ARREDONDAR INPUTS DO FORMULÁRIO
   ========================================== */
/* Aplica o border-radius em todos os inputs (v-text-field, v-select) do formulário */
:deep(.v-field) {
  border-radius: 8px !important; /* Ajuste o valor (ex: 8px ou 12px) conforme o protótipo */
}

/* Garante que o outline/borda acompanhe o arredondamento */
:deep(.v-field__outline) {
  --v-field-border-radius: 8px !important;
}

.asterisco {
  color: rgb(var(--v-theme-error)) !important; /* Usa o vermelho padrão do seu tema do Vuetify */
  font-weight: bold;
}

/* Pinta de vermelho qualquer asterisco colocado dentro do atributo label dos inputs */
:deep(.v-field-label) {
  --v-field-label-asterisk-color: rgb(var(--v-theme-error)) !important;
}

/* Caso a versão do Vuetify use a classe nativa antiga, esta regra garante: */
:deep(.v-label .v-label--asterisk),
:deep(.v-field-label--asterisk) {
  color: rgb(var(--v-theme-error)) !important;
  opacity: 1 !important;
}

/* =============================================================
   AJUSTES VISUAIS E RESPONSIVIDADE PARA O MOBILE (PROTÓTIPO)
   ============================================================= */
@media (max-width: 600px) {
  .banner-principal {
    padding-top: 40px !important;
    padding-bottom: 40px !important;
    margin-top: 0 !important; /* Evita que o banner fique colado debaixo do header fixo */
  }

  .titulo-banner {
    font-family: 'Funnel Display', sans-serif !important;
    font-size: 28px !important;
    line-height: 34px !important;
    letter-spacing: -0.5px !important;
    font-weight: 700 !important;
  }
}

.titulo-banner {
  font-family: 'Funnel Display', sans-serif !important;
  font-size: 51px !important;
  line-height: 56px !important;
  font-weight: 700 !important;
  letter-spacing: -0.5px !important;
}

/* Remove o container de detalhes/mensagens se ele estiver vazio (sem erro) */
:deep(.v-input__details:not(:has(.v-messages__message))) {
  display: none !important;
}

/* Ajusta os espaçamentos internos para o erro alinhar perfeitamente quando aparecer */
:deep(.v-input__details) {
  padding-inline: 0 !important;
  min-height: auto !important;
  padding-top: 4px !important;
}
</style>