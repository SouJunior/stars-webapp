<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <h1 class="text-h4">Vagas de Voluntariado</h1>
        <v-btn v-if="authStore.isHead()" color="primary" :to="{ name: 'job-create' }">
          <v-icon left>mdi-plus</v-icon>
          Criar Nova Vaga
        </v-btn>
      </v-col>
    </v-row>

    <!-- Filters -->
    <v-row class="mb-4">
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="search"
          label="Buscar vagas..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          hide-details
          @update:model-value="fetchJobs"
        ></v-text-field>
      </v-col>
      <v-col v-if="logged" cols="12" sm="6">
        <v-switch
          v-model="activeOnly"
          label="Apenas Vagas Ativas"
          color="primary"
          hide-details
          @update:model-value="fetchJobs"
        ></v-switch>
      </v-col>
    </v-row>

    <v-row v-if="jobs.length > 0">
      <v-col v-for="job in jobs" :key="job.id" cols="12" md="6">
        <v-card class="h-100 d-flex flex-column" variant="elevated">
          <v-card-title class="text-h6 d-flex justify-space-between align-center">
            {{ job.title }}
            <v-chip v-if="!job.is_active" size="x-small" color="error">Inativa</v-chip>
            <v-chip v-else size="x-small" color="success">Ativa</v-chip>
          </v-card-title>
          <v-card-subtitle>
            Criado em: {{ formatDate(job.created_at) }}
          </v-card-subtitle>
          <v-card-text class="flex-grow-1">
            <p class="text-body-2 mb-2 line-clamp-3">{{ job.description }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              variant="text"
              color="primary"
              :to="{ name: 'job-details', params: { id: job.id } }"
            >
              Ver Detalhes
            </v-btn>
            <v-spacer></v-spacer>
            <template v-if="authStore.isHead()">
              <v-btn
                icon="mdi-pencil"
                size="small"
                variant="text"
                :to="{ name: 'job-update', params: { id: job.id } }"
              ></v-btn>
              <v-btn
                icon="mdi-account-group"
                size="small"
                variant="text"
                :to="{
                  name: 'job-details',
                  params: { id: job.id },
                  query: { tab: 'applications' }
                }"
              ></v-btn>
            </template>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else-if="!loading">
      <v-col cols="12">
        <v-alert type="info" variant="tonal"> Nenhuma vaga encontrada. </v-alert>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <v-col cols="12" class="d-flex justify-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getJobs } from '@/services/job'
import { useAuthStore } from '@/stores/auth'
import { formatDate } from '@/utils/date'

const authStore = useAuthStore()
const jobs = ref([])
const loading = ref(false)
const search = ref('')
const activeOnly = ref(true)

const logged = computed(() => {
  return !!authStore.auth.email || !!authStore.auth.sub
})

// If not logged in, always enforce activeOnly true effectively
// But the API might handle it.
// We'll init activeOnly based on auth status maybe?
// Ideally public users only see active.

onMounted(() => {
  // If user is not logged in, we only show active jobs anyway (handled by our logic or API)
  // But let's set the switch default.
  if (!logged.value) {
    activeOnly.value = true
  }
  fetchJobs()
})

const fetchJobs = async () => {
  loading.value = true
  try {
    // Prepare params
    // Note: The API I wrote 'get_job_openings' takes 'active_only'.
    // And I didn't add search filters in the API CRUD... I should check that.
    // Wait, I implemented: get_job_openings(db, skip, limit, active_only)
    // I did NOT implement search by title/description in the backend CRUD.
    // I should probably update backend to allow search or just filter frontend for now (if list is small).
    // Let's filter frontend for MVP or update backend.
    // Given instructions "planeje pequenas tarefas", I'll stick to frontend filtering for now if simple,
    // but backend filtering is better. I'll stick to 'active_only' param.

    const params = {
      active_only: logged.value ? activeOnly.value : true
    }

    const response = await getJobs(params)

    // Frontend search filtering
    let data = response.data
    if (search.value) {
      const lowerSearch = search.value.toLowerCase()
      data = data.filter(
        (j) =>
          j.title.toLowerCase().includes(lowerSearch) ||
          j.description.toLowerCase().includes(lowerSearch)
      )
    }

    jobs.value = data
  } catch (error) {
    console.error('Error fetching jobs', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
