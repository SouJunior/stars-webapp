<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card>
          <v-card-title class="text-h5">Criar Novo Projeto</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="submit">
              <v-text-field
                v-model="project.name"
                label="Nome do Projeto"
                :rules="[
                  (v) => !!v || 'Nome é obrigatório',
                  (v) => (v && v.length <= 100) || 'O nome deve ter no máximo 100 caracteres'
                ]"
                counter="100"
                maxlength="100"
                required
              ></v-text-field>

              <v-textarea v-model="project.description" label="Descrição" rows="3"></v-textarea>

              <v-text-field
                v-model="project.link"
                label="Link do Projeto"
                :rules="[
                  (v) => !v || v.length <= 255 || 'O link deve ter no máximo 255 caracteres'
                ]"
                counter="255"
                maxlength="255"
              ></v-text-field>

              <v-select
                v-model="project.squad_ids"
                :items="squadStore.squads"
                item-title="name"
                item-value="id"
                label="Squads Associadas"
                multiple
                chips
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text :to="{ name: 'projects-list' }">Cancelar</v-btn>
            <v-btn color="primary" :disabled="!valid || loading" @click="submit">
              {{ loading ? 'Salvando...' : 'Criar' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/project'
import { useSquadStore } from '@/stores/squad'

const router = useRouter()
const projectStore = useProjectStore()
const squadStore = useSquadStore()

const valid = ref(false)
const loading = ref(false)
const form = ref(null)

const project = reactive({
  name: '',
  description: '',
  link: '',
  squad_ids: []
})

onMounted(async () => {
  await squadStore.fetchAllSquads()
})

const submit = async () => {
  if (!form.value) return
  const { valid: isValid } = await form.value.validate()

  if (isValid) {
    loading.value = true
    const success = await projectStore.create(project)
    loading.value = false

    if (success) {
      router.push({ name: 'projects-list' })
    }
  }
}
</script>
