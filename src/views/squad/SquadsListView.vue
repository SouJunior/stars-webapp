<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <h1 class="text-h4">Squads</h1>
        <v-btn v-if="authStore.isHead()" color="primary" :to="{ name: 'squad-create' }">
          <v-icon left>mdi-plus</v-icon>
          Criar Nova Squad
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="squadStore.squads.length > 0">
      <v-col v-for="squad in squadStore.squads" :key="squad.id" cols="12" md="6" lg="4">
        <v-card class="pa-4 h-100" @click="goToSquadDetails(squad.id)">
          <v-card-title class="text-h6 pb-2">{{ squad.name }}</v-card-title>
          <v-card-text>
            <p class="mb-2">{{ squad.description || 'Sem descrição' }}</p>
            <div class="d-flex flex-column ga-1 text-caption text-grey">
              <div class="d-flex align-center">
                <v-icon size="small" class="mr-1">mdi-account-group</v-icon>
                <span
                  >{{ squad.members_count }} voluntário{{
                    squad.members_count !== 1 ? 's' : ''
                  }}</span
                >
              </div>
              <div class="d-flex align-center">
                <v-icon size="small" class="mr-1">mdi-briefcase-variant</v-icon>
                <span
                  >{{ squad.projects_count }} projeto{{
                    squad.projects_count !== 1 ? 's' : ''
                  }}</span
                >
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary" :to="{ name: 'squad-by-id', params: { uuid: squad.id } }">
              Ver Detalhes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else-if="!squadStore.loading">
      <v-col cols="12">
        <v-alert type="info" variant="tonal">
          Nenhuma squad encontrada. Comece criando uma!
        </v-alert>
      </v-col>
    </v-row>

    <v-row v-if="squadStore.loading">
      <v-col cols="12" class="d-flex justify-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSquadStore } from '@/stores/squad'
import { useAuthStore } from '@/stores/auth'

const squadStore = useSquadStore()
const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  squadStore.fetchAllSquads()
})

const goToSquadDetails = (squadId) => {
  router.push({ name: 'squad-by-id', params: { uuid: squadId } })
}
</script>

<style scoped>
/* Adicione estilos específicos aqui, se necessário */
</style>
