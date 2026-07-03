<template>
  <v-container>
    <v-row v-if="loading">
      <v-col cols="12" class="d-flex justify-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>

    <template v-else-if="job">
      <v-row>
        <v-col cols="12">
          <v-btn variant="text" :to="{ name: 'jobs-list' }" class="mb-4">
            <v-icon left>mdi-arrow-left</v-icon> Voltar para Vagas
          </v-btn>

          <div class="d-flex justify-space-between align-start">
            <div>
              <h1 class="text-h3 mb-2">{{ job.title }}</h1>
              <div class="d-flex align-center gap-2">
                <v-chip size="small" :color="job.is_active ? 'success' : 'error'">
                  {{ job.is_active ? 'Ativa' : 'Inativa' }}
                </v-chip>
                <span class="text-caption text-grey ml-2"
                  >Publicado em {{ formatDate(job.created_at) }}</span
                >
              </div>
                         </div>
                         
                         <div v-if="authStore.isHead()">
                            <v-btn color="primary" variant="outlined" :to="{ name: 'job-update', params: { id: job.id } }">
                              Editar
                            </v-btn>
                            <v-btn v-if="authStore.isAdmin()" color="error" variant="text" class="ml-2" @click="confirmDelete">
                              Deletar
                            </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="8">
          <v-card class="mb-4">
            <v-card-title>Descrição</v-card-title>
            <v-card-text style="white-space: pre-wrap">{{ job.description }}</v-card-text>
          </v-card>

          <v-card v-if="job.requirements" class="mb-4">
            <v-card-title>Requisitos</v-card-title>
            <v-card-text style="white-space: pre-wrap">{{ job.requirements }}</v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <!-- Application Form for Public Users -->
          <v-card v-if="job.is_active">
            <v-card-title class="bg-primary text-white">Candidatar-se</v-card-title>
            <v-card-text class="pt-4">
              <p class="mb-4">
                Tem interesse nesta vaga? Insira seu e-mail cadastrado para se aplicar.
              </p>

              <v-form ref="applyForm" v-model="applyValid" @submit.prevent="submitApplication">
                <v-text-field
                  v-model="email"
                  label="Seu E-mail"
                  type="email"
                  :rules="emailRules"
                  required
                  variant="outlined"
                ></v-text-field>

                <v-btn
                  type="submit"
                  block
                  color="primary"
                  :loading="applying"
                  :disabled="!applyValid"
                >
                  Enviar Candidatura
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
          <v-alert v-else type="warning" variant="tonal">
            Esta vaga não está mais aceitando candidaturas.
          </v-alert>
        </v-col>
      </v-row>

            

            <!-- Admin: List of Applications -->

            <v-row v-if="authStore.isMentor()">

               <v-col cols="12">

                  <v-card>

      
            <v-card-title>Candidaturas Recebidas ({{ applications.length }})</v-card-title>
            <v-card-text>
              <v-list v-if="applications.length > 0">
                <v-list-item
                  v-for="app in applications"
                  :key="app.id"
                  :to="{ name: 'volunteer-details', params: { id: app.volunteer_id } }"
                >
                  <template #prepend>
                    <v-avatar color="primary">
                      <span class="text-white">{{ app.volunteer.name.charAt(0) }}</span>
                    </v-avatar>
                  </template>
                  <v-list-item-title>{{ app.volunteer.name }}</v-list-item-title>
                  <v-list-item-subtitle
                    >Aplicado em:
                    {{ formatDateTime(app.created_at) }}</v-list-item-subtitle
                  >
                  <template #append>
                    <v-icon>mdi-chevron-right</v-icon>
                  </template>
                </v-list-item>
              </v-list>
              <v-alert v-else type="info" variant="text">
                Nenhuma candidatura recebida ainda.
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <v-row v-else>
      <v-col>
        <v-alert type="error">Vaga não encontrada.</v-alert>
      </v-col>
    </v-row>

    <!-- Delete Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card class="rounded-lg">
        <v-card-title class="text-h6 px-6 py-4">Deletar Vaga?</v-card-title>
        <v-card-text class="px-6 pb-2">
          Tem certeza que deseja deletar esta vaga? Esta ação não pode ser desfeita.
        </v-card-text>
        <v-card-actions class="px-6 pb-4 justify-end">
          <v-btn color="grey-darken-1" variant="text" @click="deleteDialog = false">Cancelar</v-btn>
          <v-btn color="error" variant="flat" :loading="isDeleting" @click="handleDeleteJob">Deletar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { event } from 'vue-gtag'
import { getJob, applyForJob, getJobApplications, deleteJob } from '@/services/job'
import { useAuthStore } from '@/stores/auth'
import { useSnackbarStore } from '@/stores/snackbar'
import { formatDate, formatDateTime } from '@/utils/date'

const authStore = useAuthStore()
const snackbar = useSnackbarStore()
const route = useRoute()
const router = useRouter()

const job = ref(null)
const loading = ref(true)
const applications = ref([])

// Application Form
const email = ref('')
const applying = ref(false)
const applyValid = ref(false)
const applyForm = ref(null)

// Delete State
const deleteDialog = ref(false)
const isDeleting = ref(false)

const logged = computed(() => {
  return !!authStore.auth.email || !!authStore.auth.sub
})

const emailRules = [
  v => !!v || 'E-mail é obrigatório',
  v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
]

onMounted(async () => {
  await fetchJob()
  if (authStore.isMentor()) {
     await fetchApplications()
  }
})

const fetchJob = async () => {
  try {
    const response = await getJob(route.params.id)
    job.value = response.data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const fetchApplications = async () => {
  try {
    const response = await getJobApplications(route.params.id)
    applications.value = response.data
  } catch (error) {
    console.error(error)
  }
}

const confirmDelete = () => {
  deleteDialog.value = true
}

const handleDeleteJob = async () => {
  isDeleting.value = true
  try {
    await deleteJob(job.value.id)
    snackbar.showSnackbar({ show: true, text: 'Vaga deletada com sucesso!', color: 'success' })
    router.push({ name: 'jobs-list' })
  } catch (error) {
    console.error(error)
    snackbar.showSnackbar({ show: true, text: 'Erro ao deletar vaga.', color: 'error' })
  } finally {
    isDeleting.value = false
    deleteDialog.value = false
  }
}

const submitApplication = async () => {
  if (!applyValid.value) return

  applying.value = true
  try {
    await applyForJob(job.value.id, email.value)
    event('job_application_success', {
      job_id: job.value.id,
      job_title: job.value.title,
      email: email.value
    })
    snackbar.showSnackbar({ show: true, text: 'Candidatura enviada com sucesso!', color: 'success' })
    email.value = ''
    applyForm.value.resetValidation()
  } catch (error) {
    // Backend returns 404 if email not found or job invalid, check message
    const msg = error.response?.data?.detail || 'Erro ao enviar candidatura.'
    snackbar.showSnackbar({ show: true, text: msg, color: 'error' })
  } finally {
    applying.value = false
  }
}
</script>
