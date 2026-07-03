<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn color="tertiary" variant="text" class="mb-4" @click="router.back()">
          <v-icon left>mdi-arrow-left</v-icon>
          Voltar
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <v-col cols="12" class="d-flex justify-center py-12">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      </v-col>
    </v-row>

    <template v-else-if="vertical">
      <v-row>
        <v-col cols="12">
          <v-sheet class="pa-6 rounded-lg mb-6">
            <div class="d-flex justify-space-between align-center mb-4">
              <h1 class="text-h4 font-weight-bold">{{ vertical.name }}</h1>
              <v-btn
                v-if="authStore.auth.email"
                color="primary"
                variant="outlined"
                @click="openEditDialog"
              >
                <v-icon left>mdi-pencil</v-icon>
                Editar
              </v-btn>
            </div>
            <p class="text-body-1 text-medium-emphasis mb-0">
              {{ vertical.description || 'Sem descrição' }}
            </p>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-sheet class="pa-6 rounded-lg">
            <h2 class="text-h5 font-weight-bold mb-6 d-flex align-center">
              <v-icon left class="mr-2">mdi-account-group</v-icon>
              Voluntários Associados ({{ vertical.volunteers?.length || 0 }})
            </h2>

            <v-divider class="mb-6"></v-divider>

            <div v-if="vertical.volunteers && vertical.volunteers.length > 0">
              <div v-for="group in sortedGroups" :key="group.name" class="mb-8">
                <h3 class="text-subtitle-1 font-weight-bold text-primary mb-4 d-flex align-center">
                  <v-icon size="small" class="mr-2">
                    {{ 
                      group.name === 'Head' ? 'mdi-account-star' : 
                      group.name === 'Mentor' ? 'mdi-account-school' : 
                      group.name === 'Junior' ? 'mdi-account' : 
                      'mdi-account-outline' 
                    }}
                  </v-icon>
                  {{ group.name }}
                </h3>
                <v-row>
                  <v-col
                    v-for="volunteer in group.volunteers"
                    :key="volunteer.id"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                  >
                    <v-card
                      variant="outlined"
                      class="rounded-lg h-100"
                      :to="getVolunteerLink(volunteer.id)"
                    >
                      <v-card-text class="d-flex align-center">
                        <v-avatar color="primary" size="48" class="mr-4">
                          <span class="text-white font-weight-bold">
                            {{ volunteer.name.charAt(0).toUpperCase() }}
                          </span>
                        </v-avatar>
                        <div class="overflow-hidden">
                          <div class="text-subtitle-1 font-weight-bold text-truncate">
                            {{ volunteer.name }}
                          </div>
                          <div class="text-caption text-medium-emphasis text-truncate">
                            {{ volunteer.jobtitle?.title || 'Sem cargo' }}
                          </div>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </div>

            <v-row v-else>
              <v-col cols="12" class="text-center py-12">
                <v-icon icon="mdi-account-off" size="64" class="mb-4 text-disabled"></v-icon>
                <p class="text-h6 text-medium-emphasis">Nenhum voluntário associado a esta vertical.</p>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </template>

    <v-row v-else>
      <v-col cols="12">
        <v-alert type="error" variant="tonal">
          Vertical não encontrada.
        </v-alert>
      </v-col>
    </v-row>

    <!-- Edit Dialog (Reuse from List if needed, but here simple) -->
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card class="rounded-xl">
        <v-card-title class="text-h6 px-6 py-4 border-b">
          Editar Vertical
        </v-card-title>
        <v-card-text class="pt-4 px-6">
          <v-form ref="form" @submit.prevent="saveVertical">
            <v-text-field
              v-model="formData.name"
              label="Nome *"
              variant="outlined"
              :rules="[
                (v) => !!v || 'Nome é obrigatório',
                (v) => (v && v.length <= 50) || 'O nome deve ter no máximo 50 caracteres'
              ]"
              counter="50"
              maxlength="50"
            ></v-text-field>

            <v-textarea
              v-model="formData.description"
              label="Descrição (Opcional)"
              variant="outlined"
              rows="3"
              :rules="[
                (v) => !v || v.length <= 255 || 'A descrição deve ter no máximo 255 caracteres'
              ]"
              counter="255"
              maxlength="255"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions class="px-6 pb-4 pt-0 justify-end">
          <v-btn color="grey-darken-1" variant="text" @click="editDialog = false">Cancelar</v-btn>
          <v-btn
            color="primary"
            variant="flat"
            :loading="saving"
            @click="saveVertical"
          >
            Atualizar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVerticalStore } from '@/stores/vertical.js'
import { useAuthStore } from '@/stores/auth.js'

const route = useRoute()
const router = useRouter()
const verticalStore = useVerticalStore()
const authStore = useAuthStore()

const vertical = ref(null)
const loading = ref(true)
const editDialog = ref(false)
const saving = ref(false)
const form = ref(null)

const formData = ref({
  name: '',
  description: ''
})

const sortedGroups = computed(() => {
  if (!vertical.value?.volunteers) return []

  const groupsMap = {}
  vertical.value.volunteers.forEach((v) => {
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
  await loadVertical()
})

const loadVertical = async () => {
  loading.value = true
  try {
    const id = route.params.id
    vertical.value = await verticalStore.getVertical(id)
    if (vertical.value) {
      formData.value = {
        name: vertical.value.name,
        description: vertical.value.description || ''
      }
    }
  } catch (error) {
    console.error('Error loading vertical:', error)
  } finally {
    loading.value = false
  }
}

const openEditDialog = () => {
  editDialog.value = true
}

const saveVertical = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return

  saving.value = true
  try {
    await verticalStore.updateVertical(vertical.value.id, formData.value)
    await loadVertical()
    editDialog.value = false
  } catch (error) {
    console.error('Error saving vertical:', error)
  } finally {
    saving.value = false
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

<style scoped>
.border-b {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>
