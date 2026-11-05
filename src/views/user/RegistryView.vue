<template>
   <v-container fluid class="pa-0 registration-page-background" :style="containerStyle">
    <RegistryBanner />

    <v-row align="center" justify="center" class="ma-0 mt-6">
      <v-col cols="12" md="9" lg="7" xl="6" class="container-principal px-md-8">
        <RegistryForm
          ref="form"
          :applicant="applicant"
          :loading="loading"
          :attempted-submit="attemptedSubmit"
          @submit="submitApplicant"
          @cancel="dialogCancel = true"
          @open-terms="dialogTerms = true"
          @toggle-area="onToggleArea"
        />
        <RegistryMascot />
      </v-col>
    </v-row>

    <RegistryDialogs
      v-model:terms="dialogTerms"
      v-model:cancel="dialogCancel"
      v-model:success="dialogSuccess"
      @accept-terms="acceptTerms"
      @reject-terms="rejectTerms"
      @confirm-cancel="confirmCancel"
      @reset="resetForm"
    />
  </v-container>
  <footer class="footer-gradiente" :class="{ 'theme-dark': isDark }"></footer>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { event } from 'vue-gtag'
import { useTheme } from 'vuetify'
import { useVolunteerStore } from '@/stores/volunteer.js'
import { useVolunteerTypeStore } from '@/stores/volunteerType.js'
import { useSnackbarStore } from '@/stores/snackbar.js'
import { createEmptyApplicant } from '@/components/registry/constants.js'
import { validateCustomFields, toggleAreaSelection } from '@/components/registry/validation.js'
import { buildPayload } from '@/components/registry/buildPayload.js'
import RegistryBanner from '@/components/registry/RegistryBanner.vue'
import RegistryForm from '@/components/registry/RegistryForm.vue'
import RegistryMascot from '@/components/registry/RegistryMascot.vue'
import RegistryDialogs from '@/components/registry/RegistryDialogs.vue'

const $router = useRouter()
const volunteerStore = useVolunteerStore()
const volunteerTypeStore = useVolunteerTypeStore()
const snackbarStore = useSnackbarStore()

volunteerTypeStore.fetchVolunteerTypes()

const form = ref(null)
const loading = ref(false)
const dialogTerms = ref(false)
const dialogCancel = ref(false)
const dialogSuccess = ref(false)
const attemptedSubmit = ref(false)

const applicant = reactive(createEmptyApplicant())

watch(() => applicant.jobtitle_id, () => {
  applicant.vertical_ids = []
  applicant.techs_frontend = []
  applicant.techs_frontend_outros = ''
  applicant.techs_backend = []
  applicant.techs_backend_outros = ''
  attemptedSubmit.value = false
})

const theme = useTheme()
const isDark = computed(() => theme.global.name.value === 'myDarkTheme')
const containerStyle = computed(() => ({
  backgroundColor: theme.current.value.colors.background
}))

function onToggleArea(area) {
  toggleAreaSelection(applicant, area)
}

function resetForm() {
  Object.assign(applicant, createEmptyApplicant())
  form.value?.reset()
  attemptedSubmit.value = false
}

function acceptTerms() {
  applicant.terms = true
  dialogTerms.value = false
}

function rejectTerms() {
  applicant.terms = false
  dialogTerms.value = false
}

function confirmCancel() {
  dialogCancel.value = false
  resetForm()
  $router.push({ name: 'home' })
}

async function submitApplicant() {
  const { valid } = (await form.value?.validate()) || { valid: false }
  attemptedSubmit.value = true
  const customValid = validateCustomFields(applicant)

  if (!valid || !customValid) return

  if (!applicant.terms) {
    dialogTerms.value = true
    return
  }

  const payload = buildPayload(applicant)

  try {
    loading.value = true
    await volunteerStore.create(payload)
    event('sign_up', {
      method: 'email',
      job_title: applicant.jobtitle_id
    })
    dialogSuccess.value = true
  } catch (error) {
    snackbarStore.showSnackbar({
      text: 'Erro ao realizar cadastro: ' + error.message,
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.registration-page-background {
  min-height: 100vh;
  padding: 24px 16px;
}

.container-principal {
  position: relative;
  max-width: 900px;
  font-family: 'Funnel Sans', sans-serif;
}

.footer-gradiente {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-top: -20px;
  padding: 40px 0;
  background: linear-gradient(90deg, #1e3a8a 0%, #3b82f6 50%, #2563eb 100%);
}

.theme-dark.footer-gradiente {
  background: #1A2550;
}
</style>
