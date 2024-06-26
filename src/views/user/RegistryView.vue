<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="6" xs="12" align="center">
        <label class="d-flex align-center justify-center">
          <a class="d-flex align-center logo">
            <h1 class="text-h5 font-weight-bold font-semibold ml-3 logo-text">
              Registro no projeto SouJunior 
            </h1>
          </a>
        </label>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col xl="7" sm="12">
        <v-stepper v-model="step" :items="items" hide-actions mobile>
          <template #item.1>
            <p class="pa-2">
              Olá, você quer participar do SouJunior ?
              Para prosseguir será necessário se
              cadastrar.
            </p>
            <v-row align="center" justify="center">
                <v-col align="center" class="">
                    <v-btn color="primary" @click="nextStep">Continuar</v-btn>
                </v-col>
                <v-col align="center" class="">
                    <v-btn class="cancelButton" :to="{ name: 'home' }" @click="resetForm">Cancelar</v-btn>
                </v-col>
            </v-row>
          </template>
          <template #item.2>
            <v-form>
              <v-text-field
                v-model="applicant.name"
                label="Digite seu nome completo."
                placeholder="Ex: Junior da Silva"
                variant="outlined"
              >
              </v-text-field>

              <v-text-field
                v-model="applicant.linkedin"
                label="Linkedin"
                placeholder="Ex: https://www.linkedin.com/in/wouerner/"
                variant="outlined"
              />

              <v-text-field
                v-model="applicant.email"
                label="Digite seu e-mail."
                placeholder="exemplo@exemplo.com"
                variant="outlined"
                :rules="emailRules"
              >
              </v-text-field>

              <v-select
                  v-model="applicant.jobtitle_id"
                  label="Cargo no projeto"
                  variant="outlined"
                  item-text="title"
                  item-value="id"
                  :items="jobTitleStore.data"
                  ></v-select>

              <v-checkbox
                v-model="applicant.terms"
                label="Eu declaro as informações verdadeiras e autorizo a SouJunior a entrar em contato comigo."
                @click="dialog = true"
              ></v-checkbox>
              <v-row>
                <v-col align="center">
                  <v-btn color="primary" @click="submitApplicant">Cadastrar-se</v-btn>
                </v-col>
                <v-col align="center">
                  <v-btn class="ml-3 cancelButton" @click="cancelForm">Cancelar</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </template>
          <template #item.3>
            <p class="mt-6">
              Meus parabéns, seu registro foi feito com sucesso, você receberá um e-mail de confirmação em breve. 
            </p>
            <p class="mt-6">
               Agora você pode pesquisar seu email e ver o andamento do cadastro <v-btn color="primary" :to="{ name: 'search'}">Pesquisar</v-btn>
            </p>
          </template>
        </v-stepper>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="600">
      <v-card class="pa-3">
        <v-card-title>Termos e Condições</v-card-title>
        <v-card-text>
          <p>
            Todas as participações no SouJunior são VOLUNTÁRIAS, não remuneradas e sem qualquer
            vínculo empregatício. As participações visam, unicamente, servir de experiência ao
            voluntário que também contribuirá com o crescimento do projeto. A SouJunior não
            garante vaga de trabalho à pessoa voluntária, embora exista a possibilidade de que
            receba convites para oportunidades em empresas parceiras, externas e/ou recrutadores.
          </p>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn color="primary" @click="acceptTerms">Aceitar</v-btn>
          <v-btn color="error" @click="rejectTerms">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user.js'
import imgUrl from '@/assets/logo-green-transparent.png'
import { useRouter } from 'vue-router'
import { useVolunteerStore } from '@/stores/volunteer.js'
import { useJobtitleStore } from '@/stores/jobtitle.js'

const $router = useRouter()

const userStore = useUserStore()
const volunteerStore = useVolunteerStore()
const jobTitleStore = useJobtitleStore()

jobTitleStore.fetchJobtitles()

const step = ref(1)
const items = [
  { step: 1, title: '' },
  { step: 2, title: '' },
  { step: 3, title: '' }
]
const applicant = reactive({
  name: '',
  linkedin: '',
  email: '',
  jobtitle: '',
  terms: false,
})

const nextStep = () => {
  step.value++
}

const emailRules = [
  (v) => !!v || 'E-mail é obrigatório',
  (v) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido'
]

const resetForm = () => {
  applicant.register_token = ''
  applicant.name = ''
  applicant.email = ''
  applicant.password = ''
  applicant.confirmPassword = ''
  applicant.terms = false
  step.value = 1
}

const submitApplicant = async () => {
  const newApplicant = { ...applicant }
  if (
    !newApplicant.name ||
    !newApplicant.email
  ) {
    return alert('Preencha todos os campos')
  } else if (newApplicant.password !== newApplicant.confirmPassword) {
    return alert('As senhas não conferem')
  } else if (!newApplicant.terms) {
    return alert('Você precisa concordar com os termos e condições!')
  } else if (userStore.registered === true) {
    return alert('Usuário cadastrado!')
  } else {
    try {
      await volunteerStore.create(newApplicant)
    //  if (userStore.registered === true) {
        nextStep()
     // }
    } catch (error) {
      console.error(error.message)
    }
  }
}

const cancelForm = () => {
  if (confirm('Você deseja mesmo cancelar esta ação?')) {
    resetForm()
    $router.push({ name: 'home' })
  }
}

const dialog = ref(false)

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
.primary-color {
  color: #06d7a0;
}

.logo {
  cursor: pointer;
  transition: ease-in-out 0.2s;

  &:hover {
    filter: brightness(1.25);
    transition: ease-in-out 0.2s;
  }
}

.logo-text {
  font-family: 'Radio Canada', serif !important;
}

p {
  font-size: 18px;
}

.v-text-field {
  padding-bottom: 10px;
}

.v-stepper {
  box-shadow: none;
}

.v-stepper :deep(.v-stepper-header) {
  box-shadow: none;
}
.v-stepper :deep(.v-stepper-item__avatar) {
  margin-inline-end: 0;
}

.cancelButton {
  border: 1px solid #62d4a4;
  color: #325f4b;
}

.cancelButton:hover {
  background-color: #325f4b;
  color: #fff;
}
</style>
