<template>
  <v-container fluid class="registration-page-background">
    <v-row align="center" justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-card elevation="4" rounded="lg" class="overflow-hidden">
          <div class="bg-primary pa-6 text-center">
            <h1 class="text-h5 text-md-h4 font-weight-bold text-white logo-text">
              Registro de Voluntário SouJunior
            </h1>
            <p class="text-subtitle-1 text-white mt-2 opacity-90">
              Junte-se a nós e faça a diferença!
            </p>
          </div>

          <v-stepper v-model="step" :items="items" hide-actions class="elevation-0">
            <!-- Step 1: Welcome -->
            <template #[`item.1`]>
              <div class="pa-6 pa-md-10 text-center">
                <v-img
                  src="@/assets/logo-min.png"
                  height="120"
                  class="mb-6 mx-auto"
                  contain
                ></v-img>

                <h2 class="text-h5 font-weight-bold mb-4 text-primary-darken-1">
                  Olá! Quer participar do SouJunior?
                </h2>
                <p class="text-body-1 text-medium-emphasis mb-8 mx-auto" style="max-width: 600px">
                  Para prosseguir e fazer parte da nossa comunidade, precisamos que você realize um
                  breve cadastro. É rápido e fácil!
                </p>

                <div class="d-flex justify-center flex-wrap gap-4">
                  <v-btn
                    color="primary"
                    size="large"
                    rounded="pill"
                    elevation="2"
                    class="px-8"
                    @click="nextStep"
                  >
                    Continuar <v-icon end>mdi-arrow-right</v-icon>
                  </v-btn>
                  <v-btn
                    variant="outlined"
                    color="secondary"
                    size="large"
                    rounded="pill"
                    class="px-8 ml-sm-4 mt-4 mt-sm-0"
                    :to="{ name: 'home' }"
                    @click="resetForm"
                  >
                    Cancelar
                  </v-btn>
                </div>
              </div>
            </template>

            <!-- Step 2: Form -->
            <template #[`item.2`]>
              <v-card-text class="pa-4 pa-md-8">
                <v-form ref="form" @submit.prevent="submitApplicant">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="applicant.name"
                        label="Nome Completo*"
                        placeholder="Ex: Junior da Silva"
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="mdi-account"
                        :rules="[(v) => !!v || 'Nome é obrigatório']"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="applicant.email"
                        label="E-mail*"
                        placeholder="exemplo@email.com"
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="mdi-email"
                        :rules="emailRules"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="applicant.phone"
                        label="Telefone / WhatsApp*"
                        placeholder="Ex: (11) 99999-9999"
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="mdi-phone"
                        :rules="phoneRules"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="applicant.linkedin"
                        label="LinkedIn*"
                        placeholder="https://linkedin.com/in/..."
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="mdi-linkedin"
                        :rules="linkedinRules"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="applicant.github"
                        label="GitHub (Opcional)"
                        placeholder="https://github.com/..."
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="mdi-github"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="applicant.discord"
                        label="Discord (Opcional)"
                        placeholder="Ex: wouerner"
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="fa:fab fa-discord"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-select
                        v-model="applicant.volunteer_type_id"
                        label="Tipo de Voluntário*"
                        variant="outlined"
                        density="comfortable"
                        item-title="name"
                        item-value="id"
                        :items="volunteerTypeStore.data"
                        prepend-inner-icon="mdi-account-group"
                        :rules="[(v) => !!v || 'Selecione um tipo']"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-select
                        v-model="applicant.jobtitle_id"
                        label="Cargo Pretendido*"
                        variant="outlined"
                        density="comfortable"
                        item-title="title"
                        item-value="id"
                        :items="jobTitleStore.data"
                        prepend-inner-icon="mdi-briefcase"
                        :rules="[(v) => !!v || 'Selecione um cargo']"
                      ></v-select>
                    </v-col>

                    <v-col cols="12">
                      <v-checkbox
                        v-model="applicant.terms"
                        color="primary"
                        hide-details
                        class="mt-0"
                      >
                        <template #label>
                          <span class="text-body-2">
                            Declaro que as informações são verdadeiras e aceito os
                            <a
                              href="#"
                              class="text-primary font-weight-bold text-decoration-none"
                              @click.prevent.stop="dialog = true"
                            >
                              Termos e Condições </a
                            >.
                          </span>
                        </template>
                      </v-checkbox>
                    </v-col>
                  </v-row>

                  <div class="d-flex justify-center mt-6 gap-4 flex-wrap">
                    <v-btn
                      color="primary"
                      size="large"
                      rounded="pill"
                      class="px-8"
                      :loading="loading"
                      @click="submitApplicant"
                    >
                      Cadastrar-se
                    </v-btn>
                    <v-btn
                      variant="text"
                      color="error"
                      size="large"
                      rounded="pill"
                      class="px-6"
                      @click="cancelForm"
                    >
                      Cancelar
                    </v-btn>
                  </div>
                </v-form>
              </v-card-text>
            </template>

            <!-- Step 3: Success -->
            <template #[`item.3`]>
              <div class="pa-8 text-center">
                <v-scale-transition appear>
                  <v-icon size="100" color="success" class="mb-6">mdi-check-circle-outline</v-icon>
                </v-scale-transition>

                <h2 class="text-h4 font-weight-bold text-success mb-4">Cadastro Realizado!</h2>

                <p class="text-body-1 text-medium-emphasis mb-8 mx-auto" style="max-width: 500px">
                  Seu registro foi efetuado com sucesso. Você receberá um e-mail de confirmação em
                  breve.
                </p>

                <div class="video-container mb-8">
                  <iframe
                    src="https://www.youtube.com/embed/asiPy74n6zY"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>

                <div class="d-flex justify-center flex-column align-center">
                  <v-btn
                    color="primary"
                    size="large"
                    rounded="pill"
                    elevation="2"
                    :to="{ name: 'search' }"
                    prepend-icon="mdi-magnify"
                    class="px-8 mb-4"
                  >
                    Acompanhar Cadastro
                  </v-btn>
                  <a
                    href="https://apoia.se/soujunior"
                    target="_blank"
                    class="text-decoration-none text-primary"
                  >
                    Apoie o SouJunior!
                  </a>
                  <a
                    href="https://linktr.ee/wouerner"
                    target="_blank"
                    class="text-decoration-none text-primary mt-2"
                  >
                    Redes Sociais do Fundador: Wouerner Brandão
                  </a>
                </div>
              </div>
            </template>
          </v-stepper>
        </v-card>
      </v-col>
    </v-row>

    <!-- Terms Dialog -->
    <v-dialog v-model="dialog" max-width="600" scrollable>
      <v-card rounded="lg">
        <v-card-title class="text-h5 bg-primary text-white pa-4"> Termos e Condições </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4 text-body-1" style="max-height: 400px">
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
        <v-divider></v-divider>
        <v-card-actions class="pa-4 justify-end">
          <v-btn variant="text" color="error" @click="rejectTerms">Recusar</v-btn>
          <v-btn color="primary" variant="elevated" elevation="1" @click="acceptTerms"
            >Aceitar e Concordar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue'

import { useRouter } from 'vue-router'
import { event } from 'vue-gtag'
import { useVolunteerStore } from '@/stores/volunteer.js'
import { useJobtitleStore } from '@/stores/jobtitle.js'
import { useVolunteerTypeStore } from '@/stores/volunteerType.js'

const $router = useRouter()

const volunteerStore = useVolunteerStore()
const jobTitleStore = useJobtitleStore()
const volunteerTypeStore = useVolunteerTypeStore()

jobTitleStore.fetchJobtitles()
volunteerTypeStore.fetchVolunteerTypes()

const form = ref(null)
const step = ref(1)
const items = [
  { step: 1, title: 'Bem-vindo' },
  { step: 2, title: 'Dados' },
  { step: 3, title: 'Conclusão' }
]
const applicant = reactive({
  name: '',
  phone: '',
  linkedin: '',
  github: '',
  discord: '',
  email: '',
  jobtitle_id: null,
  volunteer_type_id: 1, // Default to Junior
  vertical_ids: [],
  terms: false
})

const loading = ref(false)
const dialog = ref(false)

const nextStep = () => {
  step.value++
}

const emailRules = [
  (v) => !!v || 'E-mail é obrigatório',
  (v) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido'
]

const phoneRules = [(v) => !!v || 'Telefone é obrigatório']

const linkedinRules = [(v) => !!v || 'LinkedIn é obrigatório']

const resetForm = () => {
  applicant.name = ''
  applicant.phone = ''
  applicant.linkedin = ''
  applicant.github = ''
  applicant.discord = ''
  applicant.email = ''
  applicant.jobtitle_id = null
  applicant.volunteer_type_id = 1
  applicant.vertical_ids = []
  applicant.terms = false
  step.value = 1
}

const submitApplicant = async () => {
  const { valid } = await form.value.validate()

  if (!valid) {
    return
  }

  if (!applicant.terms) {
    return alert('Você precisa concordar com os termos e condições!')
  }

  const { ...newApplicantData } = applicant
  try {
    loading.value = true

    const payload = {
      name: newApplicantData.name,
      linkedin: newApplicantData.linkedin || '', // Ensure string
      github: newApplicantData.github || null,
      phone: newApplicantData.phone || null,
      discord: newApplicantData.discord || null,
      is_active: true,
      email: newApplicantData.email,
      jobtitle_id: newApplicantData.jobtitle_id,
      volunteer_type_id: newApplicantData.volunteer_type_id,
      vertical_ids: newApplicantData.vertical_ids || []
    }

    // Create the volunteer profile directly
    await volunteerStore.create(payload)
    event('sign_up', {
      method: 'email',
      volunteer_type: applicant.volunteer_type_id,
      job_title: applicant.jobtitle_id
    })
    nextStep()
  } catch (error) {
    console.error(error.message)
    alert('Erro ao realizar cadastro: ' + error.message)
  } finally {
    loading.value = false
  }
}

const cancelForm = () => {
  if (confirm('Você deseja mesmo cancelar esta ação?')) {
    resetForm()
    $router.push({ name: 'home' })
  }
}

const acceptTerms = () => {
  applicant.terms = true
  dialog.value = false
}

const rejectTerms = () => {
  applicant.terms = false
  dialog.value = false
}
</script>

<style scoped>
.logo-text {
  font-family: 'Radio Canada', serif !important;
  letter-spacing: 0.5px;
}

.registration-page-background {
  background-color: rgb(var(--v-theme-background));
  min-height: 100vh; /* Ensure it covers full viewport height */
  padding: 24px 16px; /* Add some padding around the card on smaller screens, 16px for left/right */
}

/* Original stepper styles */
.v-stepper {
  box-shadow: none !important;
}

.v-stepper :deep(.v-stepper-header) {
  display: none;
}

.video-container {
  width: 100%;
  max-width: 320px; /* Mimic mobile screen width */
  aspect-ratio: 9 / 16; /* Enforce vertical video ratio */
  margin: 0 auto 24px; /* Center horizontally */
  border-radius: 12px; /* Optional: Rounded corners for better aesthetics */
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Optional: Subtle shadow */
}

.video-container iframe {
  width: 100%;
  height: 100%;
  display: block; /* Remove inline gap */
}
</style>
