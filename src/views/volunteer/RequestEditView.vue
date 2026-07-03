<template>
  <v-container fluid class="pa-0 d-flex align-center justify-center fill-height">
    <v-col class="d-flex flex-grow-0 justify-center">
      <v-card class="request-form secondary elevation-4">
        <p class="text-center mb-4">Editar Meu Perfil</p>
        <p class="text-body-2 text-center mb-6">
          Informe seu e-mail para receber um link de acesso seguro.
        </p>
        <hr class="mt-1 mb-8" />
        <v-form ref="form" @submit.prevent="submitRequest">
          <v-text-field
            v-model="email"
            variant="outlined"
            :rules="emailRules"
            label="Email"
            class="mb-2"
            prepend-inner-icon="mdi-email"
          />
          <v-btn color="primary" type="submit" block :loading="loading" class="mt-4">
            Enviar Link
          </v-btn>
          <v-btn variant="text" block class="mt-2" @click="$router.push({ name: 'home' })">
            Voltar
          </v-btn>
        </v-form>
      </v-card>
    </v-col>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" location="top right">
      {{ snackbar.text }}
      <template #actions>
        <v-btn variant="text" @click="snackbar.show = false">Fechar</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import volunteerService from '@/services/volunteer.js'

const email = ref('')
const loading = ref(false)
const form = ref(null)
const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
})

const emailRules = [
  (v) => !!v || 'E-mail é obrigatório',
  (v) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido'
]

const submitRequest = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await volunteerService.requestEditLink(email.value)
    snackbar.value = {
      show: true,
      text: 'Link enviado com sucesso! Verifique sua caixa de entrada.',
      color: 'success'
    }
    email.value = '' // Clear input
    form.value.resetValidation() // Reset validation state
  } catch (error) {
    let msg = 'Erro ao enviar link.'
    if (error.response && error.response.status === 404) {
      msg = 'E-mail não encontrado.'
    }
    snackbar.value = {
      show: true,
      text: msg,
      color: 'error'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.request-form {
  width: 450px;
  padding: 40px;
  border-radius: 12px;
}

.request-form p:first-child {
  font-family: 'Radio Canada', serif !important;
  font-size: 28px;
  font-weight: 600;
}

.request-form hr {
  border: 1.46px solid #cbcbcb;
}
</style>
