<template>
  <v-container>
    <h1 class="text-h4 mb-6">Dashboard</h1>

    <div
      v-if="dashboardStore.loading"
      class="d-flex justify-center align-center"
      style="min-height: 300px"
    >
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </div>

    <div v-else-if="dashboardStore.stats">
      <!-- Stats Row -->
      <v-row class="mb-6">
        <!-- Total Registered Today -->
        <v-col cols="12" md="4">
          <v-card color="primary" variant="tonal" class="pa-4">
            <v-card-item>
              <v-card-title class="text-h5">Novos Voluntários Hoje</v-card-title>
              <v-card-subtitle>Cadastrados desde 00:00</v-card-subtitle>
            </v-card-item>
            <v-card-text class="d-flex align-center justify-center">
              <span class="text-h2 font-weight-bold">{{
                dashboardStore.stats.total_volunteers_registered_today
              }}</span>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Total Volunteers -->
        <v-col cols="12" md="4">
          <v-card color="secondary" variant="tonal" class="pa-4">
            <v-card-item>
              <v-card-title class="text-h5">Total de Voluntários</v-card-title>
              <v-card-subtitle>Base completa</v-card-subtitle>
            </v-card-item>
            <v-card-text class="d-flex align-center justify-center">
              <span class="text-h2 font-weight-bold">{{
                dashboardStore.stats.total_volunteers
              }}</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <h2 class="text-h5 mb-4">Voluntários por Status</h2>
      <v-row>
        <v-col
          v-for="statusStat in dashboardStore.stats.total_volunteers_by_status"
          :key="statusStat.status"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card
            v-ripple="authStore.isMentor()"
            :class="{ 'h-100': true, 'cursor-pointer': authStore.isMentor() }"
            elevation="2"
            @click="navigateToVolunteers(statusStat.status)"
          >
            <v-card-item>
              <v-card-title class="d-flex justify-space-between align-center">
                <span>{{ statusStat.status }}</span>
                <v-icon
                  :color="getStatusColor(statusStat.status)"
                  icon="mdi-circle-slice-8"
                ></v-icon>
              </v-card-title>
            </v-card-item>
            <v-card-text>
              <div class="text-h3 font-weight-bold mb-2">{{ statusStat.count }}</div>
              <div class="text-caption text-medium-emphasis">Voluntários</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <h2 class="text-h5 mb-4 mt-6">Voluntários por Squad</h2>
      <v-row>
        <v-col
          v-for="squadStat in dashboardStore.stats.total_volunteers_by_squad"
          :key="squadStat.squad"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card
            v-ripple="authStore.isMentor()"
            :class="{ 'h-100': true, 'cursor-pointer': authStore.isMentor() }"
            elevation="2"
            @click="navigateToSquad(squadStat.squad)"
          >
            <v-card-item>
              <v-card-title class="d-flex justify-space-between align-center">
                <span class="text-truncate">{{ squadStat.squad }}</span>
                <v-icon color="primary" icon="mdi-account-group"></v-icon>
              </v-card-title>
            </v-card-item>
            <v-card-text>
              <div class="text-h3 font-weight-bold mb-2">{{ squadStat.count }}</div>
              <div class="text-caption text-medium-emphasis">Voluntários</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <h2 class="text-h5 mb-4 mt-6">Voluntários por Tipo</h2>
      <v-row>
        <v-col
          v-for="typeStat in dashboardStore.stats.total_volunteers_by_type"
          :key="typeStat.volunteer_type"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card
            v-ripple="authStore.isMentor()"
            :class="{ 'h-100': true, 'cursor-pointer': authStore.isMentor() }"
            elevation="2"
            @click="navigateToType(typeStat.volunteer_type)"
          >
            <v-card-item>
              <v-card-title class="d-flex justify-space-between align-center">
                <span class="text-truncate">{{ typeStat.volunteer_type }}</span>
                <v-icon color="info" icon="mdi-account-star"></v-icon>
              </v-card-title>
            </v-card-item>
            <v-card-text>
              <div class="text-h3 font-weight-bold mb-2">{{ typeStat.count }}</div>
              <div class="text-caption text-medium-emphasis">Voluntários</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <v-alert v-else type="error" variant="tonal" class="mt-4">
      Não foi possível carregar os dados do dashboard.
    </v-alert>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDashboardStore } from '@/stores/dashboard'
import { useVolunteerStore } from '@/stores/volunteer'
import { useSquadStore } from '@/stores/squad'
import { useVolunteerTypeStore } from '@/stores/volunteerType'
import { useAuthStore } from '@/stores/auth'

const dashboardStore = useDashboardStore()
const volunteerStore = useVolunteerStore()
const squadStore = useSquadStore()
const volunteerTypeStore = useVolunteerTypeStore()
const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  await Promise.all([
    dashboardStore.fetchStats(),
    volunteerStore.fetchStatuses(),
    squadStore.fetchAllSquads(),
    volunteerTypeStore.fetchVolunteerTypes()
  ])
})

const navigateToVolunteers = (statusName) => {
  if (!authStore.isMentor()) return
  const status = volunteerStore.statuses.find((s) => s.name === statusName)
  if (status) {
    router.push({ name: 'volunteers', query: { status: status.id } })
  }
}

const navigateToSquad = (squadName) => {
  if (!authStore.isMentor()) return
  const squad = squadStore.squads.find((s) => s.name === squadName)
  if (squad) {
    router.push({ name: 'volunteers', query: { squad: squad.id } })
  }
}

const navigateToType = (typeName) => {
  if (!authStore.isMentor()) return
  const type = volunteerTypeStore.data.find((t) => t.name === typeName)
  if (type) {
    router.push({ name: 'volunteers', query: { volunteer_type: type.id } })
  }
}

const getStatusColor = (statusName) => {
  switch (statusName) {
    case 'INTERESTED':
      return 'warning'
    case 'CONTACTED':
      return 'info'
    case 'SCREENING':
      return 'deep-purple'
    case 'ACTIVE':
      return 'success'
    case 'INACTIVE':
      return 'error'
    default:
      return 'grey'
  }
}
</script>
