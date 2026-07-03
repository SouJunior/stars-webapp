<template>
  <v-container fluid class="pa-0 d-flex align-center justify-center">
    <v-col class="d-flex flex-grow-0 v-col-gap">
      <v-card class="login-form secondary">
        <p>Nova Senha</p>
        <hr class="mt-1 mb-8" />
        <v-form @submit.prevent="handleSubmit" v-if="!success">
          <v-text-field
            v-model="password"
            :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible ? 'text' : 'password'"
            variant="outlined"
            :rules="passwordRules"
            label="Nova Senha"
            @click:append-inner="visible = !visible"
            class="mb-2"
          />
          <v-text-field
            v-model="confirmPassword"
            type="password"
            variant="outlined"
            :rules="confirmPasswordRules"
            label="Confirmar Nova Senha"
            class="mb-2"
          />
          <v-alert v-if="error" type="error" variant="tonal" class="mb-4">
            {{ error }}
          </v-alert>
          <v-btn color="primary" type="submit" block :loading="loading">Redefinir Senha</v-btn>
        </v-form>
        <div v-else class="text-center">
          <v-alert type="success" variant="tonal" class="mb-4">
            Senha redefinida com sucesso!
          </v-alert>
          <v-btn color="primary" block :to="{ name: 'login' }">Ir para o Login</v-btn>
        </div>
      </v-card>
    </v-col>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import userService from '@/services/user'

const route = useRoute()
const token = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const success = ref(false)
const error = ref('')
const visible = ref(false)

onMounted(() => {
  token.value = route.query.token
  if (!token.value) {
    error.value = 'Token de recuperação ausente.'
  }
})

const passwordRules = [
  (v) => !!v || 'Senha é obrigatória',
  (v) => v.length >= 8 || 'Senha deve ter no mínimo 8 caracteres'
]

const confirmPasswordRules = [
  (v) => !!v || 'Confirmação é obrigatória',
  (v) => v === password.value || 'As senhas não coincidem'
]

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'As senhas não coincidem.'
    return
  }
  
  loading.value = true
  error.value = ''
  try {
    await userService.resetPassword(token.value, password.value)
    success.value = true
  } catch (err) {
    error.value = err.response?.data?.detail || 'Token inválido ou expirado.'
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
</style>
