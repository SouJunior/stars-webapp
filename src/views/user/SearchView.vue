<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col  xl="6" sm="12"  align="center">
        <v-form>
          <v-text-field
              v-model="email.value"
              placeholder="Ex: example@teste.com"
              label="Pesquise seu email"
              :loading="loading"
              append-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
              clearable
              @click:append-inner="onClick"
              @keydown.enter.prevent="onClick" 
              ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col xl="6"  sm="12" align="center">
          <v-card align="left" class="pa-4">
              <p class="pa-1">Nome: <strong>{{volunteerStore.volunteer.name}}</strong></p>
              <p class="pa-1"> Linkedin: <strong>{{volunteerStore.volunteer.linkedin}}</strong></p>
              <p class="pa-1"> Cargo: <strong>{{job.title}}</strong></p>
              <p class="pa-1">Status: <strong>  <v-chip v-if="volunteerStore.volunteer.is_active">Ativo</v-chip></strong></p>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useVolunteerStore } from '@/stores/volunteer.js'
import { useJobtitleStore } from '@/stores/jobtitle.js'

const $router = useRouter()

const volunteerStore = useVolunteerStore()
const jobtitleStore = useJobtitleStore()
jobtitleStore.fetchJobtitles()

const job = computed( () => {
    if (jobtitleStore.data.length === 0) return ''
    if (volunteerStore.volunteer.length === 0) return ''

    const d = jobtitleStore.data.filter(x => x.id === volunteerStore.volunteer.jobtitle_id)
    return d.length > 0 ? d[0] : ''
})


const email = reactive({
  value: '',
})

const onClick = () => {
    console.log('click', email)
    volunteerStore.fetchByEmail(email.value)
}

const emailRules = [
  (v) => !!v || 'E-mail é obrigatório',
  (v) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido'
]

</script>
