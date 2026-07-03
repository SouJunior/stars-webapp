<template>
  <v-container class="fill-height justify-center">
    <v-card v-if="loading" width="400" class="pa-8 text-center" elevation="4">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      <p class="mt-4">Validando link...</p>
    </v-card>

    <v-card v-else-if="error" width="500" class="pa-8 text-center" elevation="4">
      <v-icon icon="mdi-alert-circle" color="error" size="64" class="mb-4"></v-icon>
      <h2 class="text-h5 mb-2">Ops! Algo deu errado.</h2>
      <p class="text-body-1 mb-6">{{ error }}</p>
      <v-btn color="primary" :to="{ name: 'request-edit' }">Solicitar Novo Link</v-btn>
    </v-card>

    <v-card v-else width="600" class="pa-8" elevation="4">
      <h1 class="text-h5 mb-6 text-center">Editar Perfil</h1>
      <v-form ref="form" @submit.prevent="submitUpdate">
        <v-text-field
          v-model="profile.name"
          label="Nome Completo"
          variant="outlined"
          prepend-inner-icon="mdi-account"
          :rules="[(v) => !!v || 'Nome é obrigatório']"
        ></v-text-field>

        <v-text-field
          v-model="profile.linkedin"
          label="LinkedIn"
          variant="outlined"
          prepend-inner-icon="mdi-linkedin"
          :rules="[(v) => !!v || 'LinkedIn é obrigatório']"
        ></v-text-field>

        <v-text-field
          v-model="profile.github"
          label="GitHub"
          variant="outlined"
          prepend-inner-icon="mdi-github"
        ></v-text-field>

        <v-text-field
          v-model="profile.phone"
          label="Telefone / WhatsApp"
          variant="outlined"
          prepend-inner-icon="mdi-phone"
        ></v-text-field>

        <v-text-field
          v-model="profile.discord"
          label="Discord"
          variant="outlined"
          prepend-inner-icon="fa:fab fa-discord"
        ></v-text-field>

        <v-select
          v-model="profile.volunteer_type_id"
          :items="volunteerTypes"
          item-title="name"
          item-value="id"
          label="Tipo de Voluntário"
          variant="outlined"
          prepend-inner-icon="mdi-account-star"
          clearable
        ></v-select>

        <v-select
          v-model="profile.vertical_ids"
          :items="verticals"
          item-title="name"
          item-value="id"
          label="Verticais"
          variant="outlined"
          prepend-inner-icon="mdi-layers"
          multiple
          chips
          clearable
        ></v-select>

        <!-- Read-only fields for context -->
        <v-text-field
          v-model="profile.email"
          label="E-mail"
          variant="outlined"
          prepend-inner-icon="mdi-email"
          disabled
          hint="O e-mail não pode ser alterado."
          persistent-hint
        ></v-text-field>

        <v-btn color="primary" type="submit" block size="large" class="mt-6" :loading="saving">
          Salvar Alterações
        </v-btn>
      </v-form>
    </v-card>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" location="top right">
      {{ snackbar.text }}
      <template #actions>
        <v-btn variant="text" @click="snackbar.show = false">Fechar</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import volunteerService from '@/services/volunteer.js'
import { useVerticalStore } from '@/stores/vertical.js'

const route = useRoute()
const router = useRouter()
const token = route.params.token
const verticalStore = useVerticalStore()

const loading = ref(true)
const saving = ref(false)
const error = ref(null)
const form = ref(null)
const volunteerTypes = ref([])
const verticals = ref([])

const profile = reactive({
  name: '',
  linkedin: '',
  github: '',
  phone: '',
  discord: '',
  email: '', // For display only
  volunteer_type_id: null,
  vertical_ids: []
})

const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
})

onMounted(async () => {
  if (!token) {
    error.value = 'Link inválido.'
    loading.value = false
    return
  }

  try {
    const [data, types, verticalData] = await Promise.all([
      volunteerService.fetchByToken(token),
      volunteerService.getVolunteerTypes(),
      verticalStore.fetchVerticals()
    ])

    volunteerTypes.value = types
    verticals.value = verticalData

    profile.name = data.name
    profile.linkedin = data.linkedin
    profile.github = data.github
    profile.phone = data.phone
    profile.discord = data.discord
    profile.email = data.email
    profile.volunteer_type_id = data.volunteer_type_id
    profile.vertical_ids = data.verticals ? data.verticals.map((v) => v.id) : []
  } catch (err) {
    if (err.response && err.response.data && err.response.data.detail) {
      error.value = err.response.data.detail
    } else {
      error.value = 'Erro ao carregar dados. O link pode ter expirado.'
    }
  } finally {
    loading.value = false
  }
})

const submitUpdate = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return

  saving.value = true
  try {
    await volunteerService.updateProfileByToken(token, {
      name: profile.name,
      linkedin: profile.linkedin,
      github: profile.github,
      phone: profile.phone,
      discord: profile.discord,
      volunteer_type_id: profile.volunteer_type_id,
      vertical_ids: profile.vertical_ids
    })

    snackbar.value = {
      show: true,
      text: 'Perfil atualizado com sucesso!',
      color: 'success'
    }

    // Redirect to search page with updated email
    router.push({ name: 'search', query: { email: profile.email } })
  } catch (err) {
    let msg = 'Erro ao salvar alterações.'
    if (err.response && err.response.data && err.response.data.detail) {
      msg = err.response.data.detail
    }
    snackbar.value = {
      show: true,
      text: msg,
      color: 'error'
    }
  } finally {
    saving.value = false
  }
}
</script>
