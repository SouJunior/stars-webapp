<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Gerenciar Usuários</h1>
        <v-card elevation="2">
          <v-data-table
            :headers="headers"
            :items="users"
            :loading="loading"
            class="elevation-1"
          >
            <template #[`item.role`]="{ item }">
              <v-select
                v-model="item.role"
                :items="roles"
                density="compact"
                hide-details
                @update:model-value="updateUserRole(item)"
              ></v-select>
            </template>
            <template #[`item.is_active`]="{ item }">
              <v-chip
                :color="item.is_active ? 'success' : 'error'"
                size="small"
              >
                {{ item.is_active ? 'Ativo' : 'Inativo' }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import userService from '@/services/user'
import { useSnackbarStore } from '@/stores/snackbar'

const snackbarStore = useSnackbarStore()

const users = ref([])
const loading = ref(false)

const roles = ['ADMIN', 'HEAD', 'MENTOR']

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Email', key: 'email' },
  { title: 'Papel (Role)', key: 'role', width: '200px' },
  { title: 'Status', key: 'is_active' }
]

const fetchUsers = async () => {
  loading.value = true
  try {
    const response = await userService.getUsers()
    users.value = response.data
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    snackbarStore.showSnackbar({
      text: 'Erro ao carregar lista de usuários',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}

const updateUserRole = async (user) => {
  try {
    await userService.updateRole(user.id, user.role)
    snackbarStore.showSnackbar({
      text: `Papel do usuário ${user.email} atualizado para ${user.role}`,
      color: 'success'
    })
  } catch (error) {
    console.error('Erro ao atualizar papel do usuário:', error)
    snackbarStore.showSnackbar({
      text: 'Erro ao atualizar papel do usuário',
      color: 'error'
    })
    // Revert role in UI on failure
    fetchUsers()
  }
}

onMounted(() => {
  fetchUsers()
})
</script>
