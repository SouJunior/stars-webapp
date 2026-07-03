<template>
  <v-container class="fill-height bg-background pa-0" fluid>
    <v-row justify="center" class="ma-0 h-100">
      <v-col cols="12" sm="8" md="6" lg="5" class="pa-4 h-100 overflow-y-auto">
        <div v-if="loading" class="d-flex justify-center align-center h-100">
          <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
        </div>
        <div v-else-if="error" class="d-flex flex-column justify-center align-center h-100 text-center">
          <v-icon icon="mdi-alert-circle" size="64" color="error" class="mb-4"></v-icon>
          <h2 class="text-h5 text-medium-emphasis">Certificado não encontrado</h2>
          <v-btn variant="text" color="primary" class="mt-4" to="/">Voltar para Home</v-btn>
        </div>
        <div v-else-if="certificate" class="certificate-container">
          <div class="certificate-header">
            <h1 class="text-h4 font-weight-bold">Certificado de Participação</h1>
          </div>
          <div class="certificate-body">
            <p class="text-body-1">Certificamos que</p>
            <p class="text-h5 font-weight-bold my-4">{{ volunteer.name }}</p>
            <p class="text-body-1">
              participou como voluntário(a) na comunidade SouJunior na função de <strong>{{ volunteer.jobtitle.title }}</strong>, contribuindo com
              <strong>{{ certificate.hours }} horas</strong> de dedicação e trabalho.
            </p>
          </div>
          <div class="certificate-footer">
            <p class="text-caption">Emitido em: {{ formatDateTime(certificate.issued_at) }}</p>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import certificateService from '@/services/certificate.js'
import volunteerService from '@/services/volunteer.js'
import { formatDateTime } from '@/utils/date'

const route = useRoute()
const certificate = ref(null)
const volunteer = ref(null)
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  const certificateId = route.params.id
  try {
    certificate.value = await certificateService.get(certificateId)
    if (certificate.value) {
      volunteer.value = await volunteerService.getById(certificate.value.volunteer_id)
    }
  } catch (e) {
    console.error(e)
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.certificate-container {
  border: 1px solid #ccc;
  padding: 2rem;
  text-align: center;
}
.certificate-header {
  margin-bottom: 2rem;
}
.certificate-body {
  margin-bottom: 2rem;
}
</style>
