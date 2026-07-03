<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <h1 class="text-h4">Projetos</h1>
        <v-btn v-if="authStore.isHead()" color="primary" :to="{ name: 'project-create' }">
          <v-icon left>mdi-plus</v-icon>
          Criar Novo Projeto
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="projectStore.projects.length > 0">
      <v-col v-for="project in projectStore.projects" :key="project.id" cols="12" md="6" lg="4">
        <v-card class="pa-4 h-100">
          <v-card-title class="text-h6 pb-2">{{ project.name }}</v-card-title>
          <v-card-text>
            <p>{{ project.description || 'Sem descrição' }}</p>
            <div v-if="project.squads && project.squads.length > 0" class="mt-2">
              <strong>Squads:</strong>
              <v-chip v-for="squad in project.squads" :key="squad.id" size="small" class="ma-1">
                {{ squad.name }}
              </v-chip>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn v-if="project.link" :href="project.link" target="_blank" text color="primary">
              Ver Link
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-if="authStore.isAdmin()"
              icon
              color="error"
              variant="text"
              @click="deleteProject(project.id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else-if="!projectStore.loading">
      <v-col cols="12">
        <v-alert type="info" variant="tonal">
          {{
            authStore.auth.email
              ? 'Nenhum projeto encontrado. Comece criando um!'
              : 'Nenhum projeto encontrado.'
          }}
        </v-alert>
      </v-col>
    </v-row>

    <v-row v-if="projectStore.loading">
      <v-col cols="12" class="d-flex justify-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProjectStore } from '@/stores/project'
import { useAuthStore } from '@/stores/auth'

const projectStore = useProjectStore()
const authStore = useAuthStore()

onMounted(() => {
  projectStore.fetchAllProjects()
})

const deleteProject = async (id) => {
  if (confirm('Tem certeza que deseja deletar este projeto?')) {
    await projectStore.del(id)
  }
}
</script>
