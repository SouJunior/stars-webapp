<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Voluntários</h1>

        <!-- Filters -->
        <v-row class="mb-4">
          <v-col cols="12" md="3">
            <v-text-field
              v-model="nameFilter"
              label="Buscar por nome"
              variant="outlined"
              density="compact"
              hide-details
              :disabled="volunteerStore.loading"
              @keydown.enter="applyFilters"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="emailFilter"
              label="Buscar por email"
              variant="outlined"
              density="compact"
              hide-details
              :disabled="volunteerStore.loading"
              @keydown.enter="applyFilters"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="jobtitleFilter"
              :items="jobtitleStore.data"
              item-title="title"
              item-value="id"
              label="Filtrar por cargo"
              variant="outlined"
              density="compact"
              hide-details
              clearable
              :disabled="volunteerStore.loading"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="statusFilter"
              :items="volunteerStore.statuses"
              item-title="name"
              item-value="id"
              label="Filtrar por Status"
              variant="outlined"
              density="compact"
              hide-details
              clearable
              :disabled="volunteerStore.loading"
              @update:model-value="applyFilters"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="squadFilter"
              :items="squadStore.squads"
              item-title="name"
              item-value="id"
              label="Filtrar por Squad"
              variant="outlined"
              density="compact"
              hide-details
              clearable
              :disabled="volunteerStore.loading"
              @update:model-value="applyFilters"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="volunteerTypeFilter"
              :items="volunteerTypeStore.data"
              item-title="name"
              item-value="id"
              label="Filtrar por Tipo"
              variant="outlined"
              density="compact"
              hide-details
              clearable
              :disabled="volunteerStore.loading"
              @update:model-value="applyFilters"
            ></v-select>
          </v-col>
          <v-col cols="12" md="12" class="d-flex align-center ga-2 justify-end">
            <v-btn color="primary" :disabled="volunteerStore.loading" @click="applyFilters"
              >Filtrar</v-btn
            >
            <v-btn variant="outlined" :disabled="volunteerStore.loading" @click="clearFilters"
              >Limpar</v-btn
            >
          </v-col>
        </v-row>

        <v-overlay
          :model-value="volunteerStore.loading"
          class="align-center justify-center"
          persistent
        >
          <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
        </v-overlay>

        <v-list>
          <v-list-item
            v-for="volunteer in volunteerStore.volunteers"
            :key="volunteer.id"
            class="mb-4"
          >
            <v-card class="pa-4 w-100" @click="goToVolunteerDetails(volunteer.id)">
              <v-card-title class="d-flex align-center pb-2">
                <v-icon icon="mdi-account" class="mr-2"></v-icon>
                <span>{{ volunteer.name }} ({{ volunteer.masked_email || volunteer.email }})</span>
              </v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col v-if="volunteer.jobtitle_id" cols="12" sm="6" md="4">
                    <div class="d-flex align-center">
                      <v-icon icon="mdi-briefcase" class="mr-2"></v-icon>
                      <strong>{{ getJobTitle(volunteer.jobtitle_id) }}</strong>
                    </div>
                  </v-col>
                  <v-col v-if="volunteer.phone" cols="12" sm="6" md="4">
                    <div class="d-flex align-center">
                      <v-icon icon="mdi-phone" class="mr-2"></v-icon>
                      <span>{{ volunteer.phone }}</span>
                    </div>
                  </v-col>
                  <v-col v-if="volunteer.linkedin" cols="12" sm="6" md="4">
                    <div class="d-flex align-center">
                      <v-icon icon="mdi-linkedin" class="mr-2"></v-icon>
                      <a :href="volunteer.linkedin" target="_blank" @click.stop>{{
                        volunteer.linkedin
                      }}</a>
                    </div>
                  </v-col>
                  <v-col v-if="volunteer.github" cols="12" sm="6" md="4">
                    <div class="d-flex align-center">
                      <v-icon icon="mdi-github" class="mr-2"></v-icon>
                      <a :href="volunteer.github" target="_blank" @click.stop>{{
                        volunteer.github
                      }}</a>
                    </div>
                  </v-col>
                  <v-col v-if="volunteer.discord" cols="12" sm="6" md="4">
                    <div class="d-flex align-center">
                      <v-icon icon="fa:fab fa-discord" class="mr-2"></v-icon>
                      <span>{{ volunteer.discord }}</span>
                    </div>
                  </v-col>
                  <v-col v-if="volunteer.status" cols="12" sm="6" md="4">
                    <div class="d-flex align-center">
                      <v-icon icon="mdi-list-status" class="mr-2"></v-icon>
                      <span :class="['status-badge', getStatusClass(volunteer.status.name)]">
                        {{ volunteer.status.name }}
                      </span>
                    </div>
                  </v-col>
                  <v-col v-if="volunteer.created_at" cols="12" sm="6" md="4">
                    <div class="d-flex align-center">
                      <v-icon icon="mdi-clock-outline" class="mr-2"></v-icon>
                      <span>Cadastrado {{ formatTimeAgo(volunteer.created_at) }}</span>
                    </div>
                  </v-col>
                  <v-col v-if="volunteer.volunteer_type" cols="12" sm="6" md="4">
                    <div class="d-flex align-center">
                      <v-icon icon="mdi-account-star" class="mr-2"></v-icon>
                      <span>{{ volunteer.volunteer_type.name }}</span>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-list-item>
          <v-list-item v-if="!volunteerStore.loading && volunteerStore.volunteers.length === 0">
            <v-card class="pa-4 w-100">
              <v-card-text>Nenhum voluntário encontrado.</v-card-text>
            </v-card>
          </v-list-item>
        </v-list>
        <div class="d-flex justify-center pt-4 ga-4 align-center">
          <v-btn
            :disabled="page <= 1 || volunteerStore.loading"
            variant="outlined"
            @click="prevPage"
            >Anterior</v-btn
          >
          <span>Página {{ page }}</span>
          <v-btn
            :disabled="volunteerStore.volunteers.length < itemsPerPage || volunteerStore.loading"
            variant="outlined"
            @click="nextPage"
            >Próximo</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useVolunteerStore } from '@/stores/volunteer'
import { useJobtitleStore } from '@/stores/jobtitle'
import { useSquadStore } from '@/stores/squad'
import { useVolunteerTypeStore } from '@/stores/volunteerType'
import { useRouter, useRoute } from 'vue-router' // Import useRouter and useRoute
import { formatTimeAgo } from '@/utils/date'

const volunteerStore = useVolunteerStore()
const jobtitleStore = useJobtitleStore()
const squadStore = useSquadStore()
const volunteerTypeStore = useVolunteerTypeStore()
const router = useRouter() // Initialize router
const route = useRoute() // Initialize route
const page = ref(1)
const itemsPerPage = 15

const nameFilter = ref('')
const emailFilter = ref('')
const jobtitleFilter = ref(null)
const statusFilter = ref(null) // New status filter
const squadFilter = ref(null)
const volunteerTypeFilter = ref(null)

async function loadVolunteers() {
  const filters = {}
  if (nameFilter.value && nameFilter.value.trim()) filters.name = nameFilter.value.trim()
  if (emailFilter.value && emailFilter.value.trim()) filters.email = emailFilter.value.trim()
  if (jobtitleFilter.value) filters.jobtitle_id = jobtitleFilter.value
  if (statusFilter.value) filters.status_id = statusFilter.value // Add status filter
  if (squadFilter.value) filters.squad_id = squadFilter.value
  if (volunteerTypeFilter.value) filters.volunteer_type_id = volunteerTypeFilter.value

  await volunteerStore.fetchAll(page.value, itemsPerPage, filters)
}

function applyFilters() {
  page.value = 1
  loadVolunteers()
}

function clearFilters() {
  nameFilter.value = ''
  emailFilter.value = ''
  jobtitleFilter.value = null
  statusFilter.value = null // Clear status filter
  squadFilter.value = null
  volunteerTypeFilter.value = null
  applyFilters()
}

function prevPage() {
  if (page.value > 1) {
    page.value--
    loadVolunteers()
  }
}

function nextPage() {
  if (volunteerStore.volunteers.length === itemsPerPage) {
    page.value++
    loadVolunteers()
  }
}

function getJobTitle(id) {
  if (!jobtitleStore.data || !Array.isArray(jobtitleStore.data)) return ''
  const job = jobtitleStore.data.find((j) => j.id === id)
  return job ? job.title : ''
}

const getStatusClass = (statusName) => {
  switch (statusName) {
    case 'INTERESTED':
      return 'status-interested'
    case 'CONTACTED':
      return 'status-contacted'
    case 'SCREENING':
      return 'status-screening'
    case 'ACTIVE':
      return 'status-active'
    case 'INACTIVE':
      return 'status-inactive'
    default:
      return 'status-default'
  }
}

const goToVolunteerDetails = (volunteerId) => {
  router.push({ name: 'volunteer-details', params: { id: volunteerId } })
}

onMounted(async () => {
  await jobtitleStore.fetchJobtitles()
  await volunteerStore.fetchStatuses() // Fetch statuses on mount
  await squadStore.fetchAllSquads()
  await volunteerTypeStore.fetchVolunteerTypes()

  if (route.query.status) {
    const statusParam = route.query.status
    const foundStatus = volunteerStore.statuses.find((s) => s.id == statusParam)
    if (foundStatus) {
      statusFilter.value = foundStatus.id
    }
  }

  if (route.query.squad) {
    const squadParam = route.query.squad
    // Ensure we are comparing compatible types (e.g. string vs number)
    const foundSquad = squadStore.squads.find((s) => s.id == squadParam)
    if (foundSquad) {
      squadFilter.value = foundSquad.id
    }
  }

  if (route.query.volunteer_type) {
    const typeParam = route.query.volunteer_type
    const foundType = volunteerTypeStore.data.find((t) => t.id == typeParam)
    if (foundType) {
      volunteerTypeFilter.value = foundType.id
    }
  }

  await loadVolunteers()
})
</script>

<style scoped>
/* Adicione estilos específicos aqui, se necessário */
.status-badge {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  font-size: 0.85em;
  margin-left: 10px;
}

.status-interested {
  background-color: #ffc107;
  color: #333;
} /* Warning yellow */
.status-contacted {
  background-color: #17a2b8;
} /* Info blue */
.status-screening {
  background-color: #6f42c1;
} /* Purple */
.status-active {
  background-color: #28a745;
} /* Success green */
.status-inactive {
  background-color: #dc3545;
} /* Danger red */
.status-default {
  background-color: #6c757d;
} /* Secondary grey */
</style>
