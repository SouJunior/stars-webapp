<template>
  <v-card variant="flat" class="overflow-hidden bg-transparent">
    <v-card-text class="pa-4 pa-md-8">
      <h2 class="text-h4 registry-form-title text-primary mb-6">Cadastro de voluntário</h2>

      <v-alert
        variant="flat"
        color="warning"
        icon="mdi-alert-circle-outline"
        density="compact"
        class="mb-6 text-caption required-fields-alert rounded-lg font-weight-medium"
      >
        Campos de preenchimento obrigatório (<span class="asterisco">*</span>)
      </v-alert>

      <v-form ref="form" @submit.prevent="$emit('submit')">
        <RegistryVolunteerType
          :model-value="applicant.jobtitle_id"
          @update:model-value="applicant.jobtitle_id = $event"
        />

        <v-divider class="site-divider my-6" />

        <RegistryAreas
          :areas="filteredAreas"
          :selected="applicant.vertical_ids"
          :show-error="attemptedSubmit && areasInvalid"
          @toggle="$emit('toggle-area', $event)"
        />

        <v-divider class="site-divider my-6" />

        <RegistryTechs
          :show-frontend="applicant.vertical_ids.includes('Front-end')"
          :show-backend="applicant.vertical_ids.includes('Back-end')"
          :frontend="applicant.techs_frontend"
          :frontend-outros="applicant.techs_frontend_outros"
          :backend="applicant.techs_backend"
          :backend-outros="applicant.techs_backend_outros"
          :show-frontend-error="attemptedSubmit && frontendTechsInvalid"
          :show-backend-error="attemptedSubmit && backendTechsInvalid"
          @update:frontend="applicant.techs_frontend = $event"
          @update:frontend-outros="applicant.techs_frontend_outros = $event"
          @update:backend="applicant.techs_backend = $event"
          @update:backend-outros="applicant.techs_backend_outros = $event"
        />

        <RegistryPersonalInfo
          :name="applicant.name"
          :email="applicant.email"
          :phone="applicant.phone"
          @update:name="applicant.name = $event"
          @update:email="applicant.email = $event"
          @update:phone="applicant.phone = $event"
        />

        <RegistryProfessional
          :linkedin="applicant.linkedin"
          :github="applicant.github"
          :discord="applicant.discord"
          @update:linkedin="applicant.linkedin = $event"
          @update:github="applicant.github = $event"
          @update:discord="applicant.discord = $event"
        />

        <RegistryReferral
          :was-referred="applicant.was_referred"
          :referred-by-name="applicant.referred_by_name"
          :referred-by-position="applicant.referred_by_position"
          :referred-by-linkedin="applicant.referred_by_linkedin"
          @update:was-referred="applicant.was_referred = $event"
          @update:referred-by-name="applicant.referred_by_name = $event"
          @update:referred-by-position="applicant.referred_by_position = $event"
          @update:referred-by-linkedin="applicant.referred_by_linkedin = $event"
        />

        <RegistryTermsActions
          :terms="applicant.terms"
          :loading="loading"
          @update:terms="applicant.terms = $event"
          @open-terms="$emit('open-terms')"
          @cancel="$emit('cancel')"
          @submit="$emit('submit')"
        />
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getAreasForJobtitle } from './constants.js'
import {
  isAreasInvalid,
  isFrontendTechsInvalid,
  isBackendTechsInvalid
} from './validation.js'
import RegistryVolunteerType from './RegistryVolunteerType.vue'
import RegistryAreas from './RegistryAreas.vue'
import RegistryTechs from './RegistryTechs.vue'
import RegistryPersonalInfo from './RegistryPersonalInfo.vue'
import RegistryProfessional from './RegistryProfessional.vue'
import RegistryReferral from './RegistryReferral.vue'
import RegistryTermsActions from './RegistryTermsActions.vue'

const props = defineProps({
  applicant: { type: Object, required: true },
  loading: { type: Boolean, default: false },
  attemptedSubmit: { type: Boolean, default: false }
})

defineEmits(['submit', 'cancel', 'open-terms', 'toggle-area'])

const form = ref(null)

const filteredAreas = computed(() => getAreasForJobtitle(props.applicant.jobtitle_id))
const areasInvalid = computed(() => isAreasInvalid(props.applicant))
const frontendTechsInvalid = computed(() => isFrontendTechsInvalid(props.applicant))
const backendTechsInvalid = computed(() => isBackendTechsInvalid(props.applicant))

defineExpose({
  validate: () => form.value?.validate(),
  reset: () => form.value?.reset()
})
</script>

<style scoped>
.registry-form-title {
  font-family: 'Funnel Sans', sans-serif;
  font-size: 28px;
  font-weight: 600;
  line-height: 32px;
}

.required-fields-alert {
  background-color: #fddabb80;
  border: 1px solid #f6af71;
  color: #422c18;
}

.required-fields-alert :deep(.v-alert__prepend .v-icon) {
  color: #f6af71 !important;
  opacity: 1;
}

.asterisco {
  color: rgb(var(--v-theme-error));
  font-weight: bold;
}

:deep(.v-field) {
  border-radius: 8px !important;
}

:deep(.v-field__outline) {
  --v-field-border-radius: 8px !important;
}

:deep(.v-input__details:not(:has(.v-messages__message))) {
  display: none !important;
}

:deep(.v-input__details) {
  padding-inline: 0 !important;
  min-height: auto !important;
  padding-top: 4px !important;
}
</style>
