<template>
  <v-container fluid class="pa-0 d-flex align-center justify-center">
    <v-col class="d-flex flex-grow-0 v-col-gap">
      <v-card class="login-form secondary">
        <p>Recuperar Senha</p>
        <hr class="mt-1 mb-8" />
        <v-form @submit.prevent="handleSubmit">
          <p class="text-body-2 mb-4 text-center" style="font-family: 'Radio Canada', serif !important;">
            Informe seu e-mail e enviaremos um link para você redefinir sua senha.
          </p>
          <v-text-field
            v-model="email"
            variant="outlined"
            :rules="emailRules"
            label="Email"
            class="mb-2"
            required
          />
          <v-alert v-if="message" type="success" variant="tonal" class="mb-4">
            {{ message }}
          </v-alert>
          <v-alert v-if="error" type="error" variant="tonal" class="mb-4">
            {{ error }}
          </v-alert>
          <v-btn color="primary" type="submit" block :loading="loading">Enviar Link</v-btn>
          <v-btn block class="mt-2 cancelButton" :to="{ name: 'login' }">Voltar ao Login</v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import userService from '@/services/user'

const email = ref('')
const loading = ref(false)
const message = ref('')
const error = ref('')

const emailRules = [
  (v) => !!v || 'E-mail é obrigatório',
  (v) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido'
]

const handleSubmit = async () => {
  loading.value = true
  message.value = ''
  error.value = ''
  try {
    const response = await userService.requestPasswordReset(email.value)
    message.value = response.data.message
  } catch (err) {
    error.value = err.response?.data?.detail || 'Ocorreu um erro ao processar sua solicitação.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-form {
  width: 450px;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 0px 20px 0px #00000033;
}

.login-form p {
  font-family: 'Radio Canada', serif !important;
  font-size: 28px;
  font-weight: 600;
  text-align: center;
}

.login-form hr {
  border: 1.46px solid #cbcbcb;
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
