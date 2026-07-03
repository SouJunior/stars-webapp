<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ isUpdate ? 'Editar Vaga' : 'Criar Nova Vaga' }}</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="submit">
              <v-text-field
                v-model="job.title"
                label="Título da Vaga"
                :rules="[(v) => !!v || 'Título é obrigatório']"
                required
              ></v-text-field>

              <v-textarea
                v-model="job.description"
                label="Descrição"
                :rules="[(v) => !!v || 'Descrição é obrigatória']"
                required
              ></v-textarea>

              <v-textarea
                v-model="job.requirements"
                label="Requisitos"
                hint="Liste os requisitos técnicos e comportamentais"
              ></v-textarea>

              <v-checkbox v-model="job.is_active" label="Vaga Ativa?"></v-checkbox>

              <v-btn
                :loading="loading"
                :disabled="!valid"
                color="primary"
                type="submit"
                block
                class="mt-4"
              >
                {{ isUpdate ? 'Atualizar' : 'Criar' }}
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createJob, getJob, updateJob } from '@/services/job'
import { useSnackbarStore } from '@/stores/snackbar'

const route = useRoute()
const router = useRouter()
const snackbar = useSnackbarStore()

const valid = ref(false)
const loading = ref(false)
const job = ref({
  title: '',
  description: '',
  requirements: '',
  is_active: true
})

const isUpdate = computed(() => !!route.params.id)

onMounted(async () => {
  if (isUpdate.value) {
    loading.value = true
    try {
      const response = await getJob(route.params.id)
      job.value = response.data
    } catch (error) {
      snackbar.showSnackbar({ show: true, text: 'Erro ao carregar vaga', color: 'error' })
      router.push({ name: 'jobs-list' })
    } finally {
      loading.value = false
    }
  }
})

const submit = async () => {
  if (!valid.value) return

  loading.value = true
  try {
    if (isUpdate.value) {
      await updateJob(route.params.id, job.value)
      snackbar.showSnackbar({ show: true, text: 'Vaga atualizada com sucesso!', color: 'success' })
    } else {
      await createJob(job.value)
      snackbar.showSnackbar({ show: true, text: 'Vaga criada com sucesso!', color: 'success' })
    }
    router.push({ name: 'jobs-list' })
  } catch (error) {
    console.error(error)
    snackbar.showSnackbar({ show: true, text: 'Erro ao salvar vaga', color: 'error' })
  } finally {
    loading.value = false
  }
}
</script>
