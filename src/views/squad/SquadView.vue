<template>
  <v-container>
    <v-sheet class="pa-4 rounded-lg mb-4">
      <h1 class="mb-8">Detalhes da Squad</h1>
      <v-form v-if="squad">
        <div class="d-flex align-items-center ga-8">
          <div>
            <v-avatar size="140" color="grey-darken-3">
              <span class="text-h2">{{ squad.name?.charAt(0) }}</span>
            </v-avatar>
          </div>
          <div class="w-100">
            <div class="mb-4">
              <label class="text-caption text-grey">Nome</label>
              <p class="text-h5">{{ squad.name }}</p>
            </div>
            <div>
              <label class="text-caption text-grey">Descrição</label>
              <p class="text-body-1">{{ squad.description || 'Sem descrição' }}</p>
            </div>
          </div>
        </div>
        <div class="mt-8 d-flex align-center ga-4">
          <v-btn
            v-if="authStore.isHead()"
            color="primary"
            :to="{ name: 'squad-update', params: { uuid: squad.id || squad.uuid } }"
          >
            Editar
          </v-btn>
          <v-btn
            v-if="authStore.isAdmin()"
            color="error"
            variant="outlined"
            @click="confirmDelete"
          >
            Deletar
          </v-btn>
          <v-btn color="tertiary" @click="cancel"> Voltar </v-btn>
        </div>
      </v-form>
      <div v-else>
        <v-progress-circular indeterminate></v-progress-circular>
      </div>

      <!-- Delete Dialog -->
      <v-dialog v-model="deleteDialog" max-width="400px">
        <v-card class="rounded-lg">
          <v-card-title class="text-h6 px-6 py-4">Deletar Squad?</v-card-title>
          <v-card-text class="px-6 pb-2">
            Tem certeza que deseja deletar a squad <strong>{{ squad.name }}</strong>? Esta ação não pode ser desfeita.
          </v-card-text>
          <v-card-actions class="px-6 pb-4 justify-end">
            <v-btn color="grey-darken-1" variant="text" @click="deleteDialog = false">Cancelar</v-btn>
            <v-btn color="error" variant="flat" :loading="isDeleting" @click="deleteSquad">Deletar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-sheet>

    <v-sheet v-if="squad" class="pa-4 rounded-lg mt-4">
      <h2 class="mb-4">Projetos</h2>
      <v-list v-if="squad.projects?.length > 0">
        <v-list-item
          v-for="project in squad.projects"
          :key="project.id"
          :href="project.link"
          target="_blank"
          prepend-icon="mdi-briefcase-variant"
        >
          <v-list-item-title class="font-weight-bold">{{ project.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ project.description || 'Sem descrição' }}</v-list-item-subtitle>
          <template v-if="project.link" #append>
            <v-icon size="small">mdi-open-in-new</v-icon>
          </template>
        </v-list-item>
      </v-list>
      <div v-else class="text-center py-4 text-grey">Nenhum projeto associado a esta squad.</div>
    </v-sheet>

    <v-sheet v-if="squad" class="pa-4 rounded-lg mt-4">
      <h2 class="mb-4">Participantes</h2>

      <div v-for="group in sortedGroups" :key="group.name" class="mb-4">
        <h3 class="text-subtitle-1 text-primary mb-2">{{ group.name }}</h3>
        <v-list>
          <v-list-item
            v-for="volunteer in group.volunteers"
            :key="volunteer.id"
            :to="getVolunteerLink(volunteer.id)"
            :prepend-icon="
              group.name === 'Head' ? 'mdi-account-star' : 
              group.name === 'Mentor' ? 'mdi-account-school' : 
              group.name === 'Junior' ? 'mdi-account' : 
              'mdi-account-outline'
            "
          >
            <v-list-item-title class="font-weight-bold">
              {{ volunteer.name }}
              <v-chip size="x-small" color="success" class="ml-2" variant="tonal">Ativo</v-chip>
            </v-list-item-title>
            <v-list-item-subtitle v-if="volunteer.jobtitle">{{
              volunteer.jobtitle.title
            }}</v-list-item-subtitle>
            <v-list-item-subtitle v-else class="text-caption text-grey"
              >Sem cargo definido</v-list-item-subtitle
            >
          </v-list-item>
        </v-list>
      </div>

      <div
        v-if="activeVolunteers.length === 0 && inactiveVolunteers.length === 0"
        class="text-center py-4 text-grey"
      >
        Nenhum participante nesta squad.
      </div>

      <v-expansion-panels v-if="inactiveVolunteers.length > 0" class="mt-6">
        <v-expansion-panel>
          <v-expansion-panel-title class="text-grey-darken-1">
            Participantes Inativos ({{ inactiveVolunteers.length }})
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-list>
              <v-list-item
                v-for="volunteer in inactiveVolunteers"
                :key="volunteer.id"
                :to="getVolunteerLink(volunteer.id)"
                prepend-icon="mdi-account-off-outline"
                class="text-grey"
              >
                <v-list-item-title>{{ volunteer.name }}</v-list-item-title>
                <v-list-item-subtitle v-if="volunteer.jobtitle">
                  {{ volunteer.jobtitle.title }} ({{ volunteer.volunteer_type?.name || 'Tipo não definido' }})
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSquadStore } from '@/stores/squad'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const squadStore = useSquadStore()
const authStore = useAuthStore()
const squad = ref(null)
const deleteDialog = ref(false)
const isDeleting = ref(false)

const activeVolunteers = computed(() => squad.value?.volunteers?.filter((v) => v.status?.name !== 'INACTIVE') || [])
const inactiveVolunteers = computed(() => squad.value?.volunteers?.filter((v) => v.status?.name === 'INACTIVE') || [])

const sortedGroups = computed(() => {
  const groupsMap = {}
  activeVolunteers.value.forEach((v) => {
    const type = v.volunteer_type || { name: 'Outros', order: 999 }
    const typeName = type.name
    if (!groupsMap[typeName]) {
      groupsMap[typeName] = {
        name: typeName,
        order: type.order ?? 999,
        volunteers: []
      }
    }
    groupsMap[typeName].volunteers.push(v)
  })

  return Object.values(groupsMap).sort((a, b) => a.order - b.order)
})

onMounted(async () => {
  await squadStore.fetch(route.params.uuid)
  squad.value = squadStore.squad
})

function cancel() {
  router.back()
}

function confirmDelete() {
  deleteDialog.value = true
}

async function deleteSquad() {
  isDeleting.value = true
  try {
    await squadStore.del(squad.value.id || squad.value.uuid)
    router.push({ name: 'squads-list' })
  } catch (error) {
    console.error('Error deleting squad', error)
    alert('Erro ao deletar squad')
  } finally {
    isDeleting.value = false
    deleteDialog.value = false
  }
}

function getVolunteerLink(volunteerId) {
  if (authStore.auth.email) {
    return { name: 'volunteer-details', params: { id: volunteerId } }
  } else {
    return { name: 'public-profile', params: { id: volunteerId } }
  }
}
</script>
