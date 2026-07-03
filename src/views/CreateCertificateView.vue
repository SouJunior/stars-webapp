<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>
            <span class="text-h5">Emitir Certificado</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-select
                v-model="volunteerId"
                :items="volunteers"
                item-title="name"
                item-value="id"
                label="Voluntário"
                :rules="[v => !!v || 'Voluntário é obrigatório']"
              ></v-select>
              <v-text-field
                v-model.number="hours"
                label="Horas"
                type="number"
                :rules="[v => !!v || 'Horas é obrigatório', v => v > 0 || 'Horas deve ser maior que 0']"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="createCertificate">Emitir</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import volunteerService from '@/services/volunteer.js'
import certificateService from '@/services/certificate.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const valid = ref(false)
const volunteers = ref([])
const volunteerId = ref(null)
const hours = ref(null)
const form = ref(null)

onMounted(async () => {
  volunteers.value = await volunteerService.fetchAll()
})

const createCertificate = async () => {
  const { valid } = await form.value.validate()

  if (valid) {
    try {
      const certificate = await certificateService.create(volunteerId.value, {
        volunteer_id: volunteerId.value,
        hours: hours.value
      })
      router.push({ name: 'certificate', params: { id: certificate.id } })
    } catch (error) {
      console.error(error)
      // TODO: show error to user
    }
  }
}
</script>
