<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="6" align="center">
            <v-form>
              <v-text-field
                label="Pesquise seu email"
                placeholder="Ex: example@teste.com"
                variant="outlined"
              >
              </v-text-field>
          </v-form>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="6" align="center">
          <v-card align="left">
              Nome: <strong>Junior da Silva</strong>
                <br>
                Linkedin: <strong>https://www.linkedin.com/in/wouerner/</strong>
                <br>
                Email: <strong>wou@gmail.com</strong>
                <br>
                Cargo: <strong>Desenvolvedor</strong>
                <br>
                Status: <strong>Ativo</strong>
                
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user.js'
import imgUrl from '@/assets/logo-green-transparent.png'
import { useRouter } from 'vue-router'

const $router = useRouter()

const userStore = useUserStore()

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
   //   await userStore.register(newApplicant)
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
