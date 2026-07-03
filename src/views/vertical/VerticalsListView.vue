<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <h1 class="text-h4">Verticais</h1>
        <v-btn v-if="authStore.auth.email" color="primary" @click="openCreateDialog">
          <v-icon left>mdi-plus</v-icon>
          Criar Nova Vertical
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="verticals.length > 0">
      <v-col v-for="vertical in verticals" :key="vertical.id" cols="12" md="6" lg="4">
        <v-card class="pa-4 h-100 cursor-pointer" :to="{ name: 'vertical-details', params: { id: vertical.id } }">
          <v-card-title class="text-h6 pb-2 d-flex justify-space-between">
            <span>{{ vertical.name }}</span>
            <div v-if="authStore.auth.email" class="d-flex gap-1" @click.stop>
              <v-btn
                icon="mdi-pencil"
                size="small"
                variant="text"
                color="primary"
                @click="openEditDialog(vertical)"
              ></v-btn>
              <v-btn
                icon="mdi-delete"
                size="small"
                variant="text"
                color="error"
                @click="openDeleteDialog(vertical)"
              ></v-btn>
            </div>
          </v-card-title>
          <v-card-text>
            <p class="text-body-2 mb-3">{{ vertical.description || 'Sem descrição' }}</p>
            <v-divider class="my-2"></v-divider>
            <p class="text-caption text-medium-emphasis">
              <v-icon size="small" icon="mdi-account-group"></v-icon>
              {{ vertical.volunteers?.length || 0 }} voluntário(s)
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else-if="!loading">
      <v-col cols="12">
        <v-alert type="info" variant="tonal">
          Nenhuma vertical encontrada. Comece criando uma!
        </v-alert>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <v-col cols="12" class="d-flex justify-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>

    <!-- Create/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="rounded-xl">
        <v-card-title class="text-h6 px-6 py-4 border-b">
          {{ editingId ? 'Editar Vertical' : 'Criar Nova Vertical' }}
        </v-card-title>
        <v-card-text class="pt-4 px-6">
          <v-form ref="form" @submit.prevent="saveVertical">
            <v-text-field
              v-model="formData.name"
              label="Nome *"
              variant="outlined"
              placeholder="Ex: Backend, Frontend, DevOps..."
              :rules="[
                (v) => !!v || 'Nome é obrigatório',
                (v) => (v && v.length <= 50) || 'O nome deve ter no máximo 50 caracteres'
              ]"
              counter="50"
              maxlength="50"
              prepend-inner-icon="mdi-layers"
            ></v-text-field>

            <v-textarea
              v-model="formData.description"
              label="Descrição (Opcional)"
              variant="outlined"
              placeholder="Descreva a vertical..."
              rows="3"
              auto-grow
              :rules="[
                (v) => !v || v.length <= 255 || 'A descrição deve ter no máximo 255 caracteres'
              ]"
              counter="255"
              maxlength="255"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions class="px-6 pb-4 pt-0 justify-end">
          <v-btn color="grey-darken-1" variant="text" @click="closeDialog">Cancelar</v-btn>
          <v-btn
            color="primary"
            variant="flat"
            :loading="saving"
            @click="saveVertical"
          >
            {{ editingId ? 'Atualizar' : 'Criar' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card class="rounded-xl">
        <v-card-title class="text-h6 px-6 py-4">Deletar Vertical?</v-card-title>
        <v-card-text class="px-6 pb-2">
          Tem certeza que deseja deletar a vertical <strong>{{ verticalToDelete?.name }}</strong
          >? Esta ação não pode ser desfeita.
        </v-card-text>
        <v-card-actions class="px-6 pb-4 justify-end">
          <v-btn color="grey-darken-1" variant="text" @click="deleteDialog = false">
            Cancelar
          </v-btn>
          <v-btn color="error" variant="flat" :loading="saving" @click="confirmDelete">
            Deletar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useVerticalStore } from '@/stores/vertical.js'
import { useAuthStore } from '@/stores/auth.js'

const verticalStore = useVerticalStore()
const authStore = useAuthStore()

const verticals = ref([])
const loading = ref(true)
const dialog = ref(false)
const deleteDialog = ref(false)
const saving = ref(false)
const editingId = ref(null)
const form = ref(null)
const verticalToDelete = ref(null)

const formData = ref({
  name: '',
  description: ''
})

onMounted(async () => {
  await loadVerticals()
})

const loadVerticals = async () => {
  loading.value = true
  try {
    await verticalStore.fetchVerticals()
    verticals.value = verticalStore.data
  } catch (error) {
    console.error('Error loading verticals:', error)
  } finally {
    loading.value = false
  }
}

const openCreateDialog = () => {
  editingId.value = null
  formData.value = { name: '', description: '' }
  dialog.value = true
}

const openEditDialog = (vertical) => {
  editingId.value = vertical.id
  formData.value = { name: vertical.name, description: vertical.description || '' }
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  editingId.value = null
  formData.value = { name: '', description: '' }
}

const saveVertical = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return

  saving.value = true
  try {
    if (editingId.value) {
      await verticalStore.updateVertical(editingId.value, formData.value)
    } else {
      await verticalStore.createVertical(formData.value)
    }
    await loadVerticals()
    closeDialog()
  } catch (error) {
    console.error('Error saving vertical:', error)
    alert('Erro ao salvar vertical')
  } finally {
    saving.value = false
  }
}

const openDeleteDialog = (vertical) => {
  verticalToDelete.value = vertical
  deleteDialog.value = true
}

const confirmDelete = async () => {
  if (!verticalToDelete.value) return

  saving.value = true
  try {
    await verticalStore.deleteVertical(verticalToDelete.value.id)
    await loadVerticals()
    deleteDialog.value = false
    verticalToDelete.value = null
  } catch (error) {
    console.error('Error deleting vertical:', error)
    alert('Erro ao deletar vertical')
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.gap-1 {
  gap: 4px;
}

.cursor-pointer {
  cursor: pointer;
  transition: all 0.3s ease;
}

.cursor-pointer:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12) !important;
}
</style>
