<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <h1 v-if="route.meta.type == 'create'">Cadastrar Squad</h1>
        <h1 v-if="route.meta.type == 'update'">Atualizar Squad</h1>
        <v-form ref="form" @submit.prevent="submit">
          <v-text-field
            v-model="squad.name"
            variant="outlined"
            label="Nome"
            :rules="[
              (v) => !!v || 'Nome é obrigatório',
              (v) => (v && v.length <= 50) || 'O nome deve ter no máximo 50 caracteres'
            ]"
            counter="50"
            maxlength="50"
          ></v-text-field>
          <v-text-field
            v-model="squad.description"
            variant="outlined"
            label="Descrição"
            :rules="[
              (v) => !v || v.length <= 255 || 'A descrição deve ter no máximo 255 caracteres'
            ]"
            counter="255"
            maxlength="255"
          ></v-text-field>
          <v-text-field
            v-model="squad.discord_role_id"
            variant="outlined"
            label="ID do cargo no Discord"
            :rules="[
              (v) => !v || v.length <= 255 || 'O ID do cargo deve ter no máximo 255 caracteres'
            ]"
            counter="255"
            maxlength="255"
          ></v-text-field>
          <v-autocomplete
            v-model="squad.project_ids"
            :items="projectStore.projects"
            item-title="name"
            item-value="id"
            label="Projetos"
            multiple
            chips
            closable-chips
            variant="outlined"
          ></v-autocomplete>
          <v-btn color="primary" class="me-4" @click="submit">Salvar</v-btn>
          <v-btn :to="{ name: 'squads-list' }" class="me-4">Cancelar</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import { useSquadStore } from '@/stores/squad'
import { useProjectStore } from '@/stores/project'
import { useRoute } from 'vue-router'

import router from '@/router'

const useSquad = useSquadStore()
const projectStore = useProjectStore()
const route = useRoute()
console.log('params:', route.params)
const form = ref(null)
const squad = reactive({
  name: '',
  description: '',
  discord_role_id: '',
  project_ids: [],
  uuid: ''
})

onMounted(async () => {
  await projectStore.fetchAllProjects()
  if (route.meta.type === 'update') {
    await useSquad.fetch(route.params.uuid)
    const s = useSquad.squad
    squad.name = s.name
    squad.description = s.description
    squad.discord_role_id = s.discord_role_id
    squad.project_ids = s.projects?.map((p) => p.id) || []
    squad.uuid = s.id || s.uuid
  }
})

const submit = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return

  if (route.meta.type == 'create') {
    await useSquad.create(squad)
    router.push({ name: 'squads-list' })
  } else {
    await useSquad.update(squad)
    router.push({ name: 'squads-list' })
  }
}
</script>
