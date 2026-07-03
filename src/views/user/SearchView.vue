<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col xl="6" sm="12" align="center">
        <v-form @submit.prevent="onClick">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="email.value"
                placeholder="Ex: example@teste.com"
                label="Pesquise seu email"
                :loading="loading"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                hide-details
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="selectedJobTitle"
                :items="jobtitleStore.data"
                item-title="title"
                item-value="id"
                label="Filtrar por Cargo"
                variant="outlined"
                hide-details
                clearable
                prepend-inner-icon="mdi-briefcase"
              ></v-select>
            </v-col>
          </v-row>
          <v-btn
            type="submit"
            color="primary"
            class="mt-4"
            :loading="loading"
            prepend-icon="mdi-magnify"
          >
            Pesquisar
          </v-btn>
        </v-form>
      </v-col>
    </v-row>

    <v-row align="center" justify="center" class="mt-4">
      <v-col xl="6" sm="12" align="center">
        <div
          v-if="volunteerStore.foundVolunteers.length === 0 && !loading && searchPerformed"
          class="text-medium-emphasis"
        >
          Nenhum voluntário encontrado.
        </div>

        <v-card
          v-for="vol in volunteerStore.foundVolunteers"
          :key="vol.id"
          align="left"
          class="pa-4 mb-4"
        >
          <p class="pa-1">
            Nome: <strong>{{ vol.name }}</strong>
          </p>
          <!-- Phone is usually not in public profile, removing or checking if present -->
          <p v-if="vol.phone" class="pa-1">
            Telefone: <strong>{{ vol.phone }}</strong>
          </p>
          <p class="pa-1">
            Linkedin: <strong>{{ vol.linkedin }}</strong>
          </p>
          <p class="pa-1">
            Cargo: <strong>{{ getJobTitle(vol.jobtitle_id) }}</strong>
          </p>
          <p class="pa-1">
            Status: <strong> <v-chip v-if="vol.is_active">Ativo</v-chip></strong>
          </p>

          <v-divider class="my-3"></v-divider>
          <div class="d-flex justify-end flex-wrap gap-2">
            <v-btn color="secondary" variant="outlined" @click="viewPublicProfile(vol.id)">
              Ver Perfil Público
            </v-btn>

            <!-- Only show Edit button if searched by email and email was provided -->
            <v-btn
              v-if="searchedEmail"
              color="primary"
              :loading="sendingLink"
              :disabled="linkSent"
              @click="requestEdit"
            >
              {{ linkSent ? 'Link Enviado' : 'Editar Meus Dados' }}
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" location="top right">
      {{ snackbar.text }}
      <template #actions>
        <v-btn variant="text" @click="snackbar.show = false">Fechar</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useVolunteerStore } from '@/stores/volunteer.js'
import { useJobtitleStore } from '@/stores/jobtitle.js'
import volunteerService from '@/services/volunteer.js'
import { useRoute, useRouter } from 'vue-router'
import { event } from 'vue-gtag'

const volunteerStore = useVolunteerStore()
const jobtitleStore = useJobtitleStore()
jobtitleStore.fetchJobtitles()

const loading = ref(false)
const sendingLink = ref(false)
const searchedEmail = ref('')
const linkSent = ref(false)
const selectedJobTitle = ref(null)
const searchPerformed = ref(false)

const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
})

const getJobTitle = (id) => {
  if (jobtitleStore.data.length === 0) return ''
  const d = jobtitleStore.data.filter((x) => x.id === id)
  return d.length > 0 ? d[0].title : ''
}

const email = reactive({
  value: ''
})

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  if (route.query.email) {
    email.value = route.query.email
    await onClick()
  }
})

const onClick = async () => {
  loading.value = true
  linkSent.value = false // Reset linkSent on new search
  searchPerformed.value = true
  try {
    const params = {}
    if (email.value) params.email = email.value
    if (selectedJobTitle.value) params.jobtitle_id = selectedJobTitle.value

    await volunteerStore.searchPublic(params)

    event('search', {
      search_term: email.value || 'all',
      job_title_filter: selectedJobTitle.value || 'none'
    })

    // Only set searchedEmail if email was actually used in search
    searchedEmail.value = email.value || ''
  } finally {
    loading.value = false
  }
}

const requestEdit = async () => {
  if (!searchedEmail.value) {
    return // Should not happen if button is hidden
  }

  sendingLink.value = true
  try {
    await volunteerService.requestEditLink(searchedEmail.value)
    linkSent.value = true // Disable button after successful send
    snackbar.value = {
      show: true,
      text: 'Link de edição enviado para o seu e-mail! Verifique sua caixa de entrada.',
      color: 'success'
    }
  } catch (error) {
    let msg = 'Erro ao enviar link de edição.'
    if (error.response && error.response.data && error.response.data.detail) {
      msg = error.response.data.detail
    }
    snackbar.value = {
      show: true,
      text: msg,
      color: 'error'
    }
  } finally {
    sendingLink.value = false
  }
}

const viewPublicProfile = (id) => {
  router.push({ name: 'public-profile', params: { id: id } })
}
</script>
