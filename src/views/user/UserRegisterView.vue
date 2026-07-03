<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="6" xs="12" align="center">
        <label class="d-flex align-center justify-center">
          <a class="d-flex align-center logo">
            <h1 class="text-h5 font-weight-bold font-semibold ml-3 logo-text">Criar Conta</h1>
          </a>
        </label>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col xl="7" sm="12">
        <v-card class="pa-8" elevation="4">
          <v-form @submit.prevent="submitUser">
            <v-text-field
              v-model="user.email"
              label="E-mail"
              placeholder="exemplo@exemplo.com"
              variant="outlined"
              :rules="emailRules"
            ></v-text-field>

            <v-text-field
              v-model="user.password"
              :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="visible ? 'text' : 'password'"
              label="Senha"
              placeholder="Digite sua senha"
              variant="outlined"
              :rules="passwordRules"
              @click:append-inner="visible = !visible"
            ></v-text-field>

            <v-text-field
              v-model="user.confirmPassword"
              :type="visible ? 'text' : 'password'"
              label="Confirme sua senha"
              placeholder="Digite sua senha novamente"
              variant="outlined"
              :rules="[(v) => v === user.password || 'As senhas não conferem']"
            ></v-text-field>

            <v-text-field
              v-model="user.registration_code"
              label="Código de Registro"
              placeholder="Digite o código de convite"
              variant="outlined"
              :rules="[(v) => !!v || 'Código de registro é obrigatório']"
            ></v-text-field>

            <v-row class="mt-4">
              <v-col align="center">
                <v-btn color="primary" type="submit" :loading="loading" block size="large"
                  >Cadastrar</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col align="center">
                <v-btn variant="text" :to="{ name: 'login' }">Já tem uma conta? Faça Login</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

const user = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  registration_code: ''
})

const visible = ref(false)
const loading = ref(false)

const emailRules = [
  (v) => !!v || 'E-mail é obrigatório',
  (v) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido'
]

const passwordRules = [
  (v) => !!v || 'Senha é obrigatória',
  (v) => v.length >= 8 || 'Senha deve ter no mínimo 8 caracteres'
]

const submitUser = async () => {
  const { confirmPassword, ...userData } = user

  if (!user.email || !user.password || !user.registration_code) {
    return alert('Preencha todos os campos obrigatórios')
  }
  if (user.password !== confirmPassword) {
    return alert('As senhas não conferem')
  }

  loading.value = true
  const success = await userStore.register(userData)
  loading.value = false

  if (success) {
    alert('Usuário cadastrado com sucesso! Faça login para continuar.')
    router.push({ name: 'login' })
  }
}
</script>

<style scoped>
.logo-text {
  font-family: 'Radio Canada', serif !important;
}
</style>
