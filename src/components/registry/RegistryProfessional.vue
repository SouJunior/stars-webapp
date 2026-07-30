<template>
  <div>
    <p class="text-body-1 font-weight-bold mb-4 mt-2">4. Perfil Profissional</p>

    <v-row class="ma-0">
      <v-col cols="12" class="pa-0 mb-4">
        <label class="text-caption font-weight-medium field-label d-block mb-1">
          LinkedIn <span class="text-red">*</span>
        </label>
        <v-text-field
          :model-value="linkedin"
          placeholder="https://linkedin.com/in/seu-perfil"
          variant="outlined"
          density="comfortable"
          prepend-inner-icon="mdi-linkedin"
          :rules="linkedinRules"
          validate-on="lazy submit"
          hide-details="auto"
          @update:model-value="$emit('update:linkedin', $event)"
        />
      </v-col>

      <v-col cols="12" md="6" class="pa-0 pr-md-2 mb-4">
        <div class="d-flex align-center mb-1">
          <label class="text-caption font-weight-medium field-label">Github</label>
          <span class="text-caption text-grey ml-1">(Opcional)</span>
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-icon
                size="16"
                class="text-grey ml-1"
                v-bind="props"
              >
                mdi-information-outline
              </v-icon>
            </template>
            <span>Digite apenas o seu nome de usuário</span>
          </v-tooltip>
        </div>
        <v-text-field
          :model-value="github"
          placeholder="Nome de Usuário"
          variant="outlined"
          density="comfortable"
          prepend-inner-icon="mdi-github"
          validate-on="lazy submit"
          hide-details="auto"
          @update:model-value="$emit('update:github', $event)"
        />
      </v-col>

      <v-col cols="12" md="6" class="pa-0 pl-md-2 mb-4">
        <div class="d-flex align-center mb-1">
          <label class="text-caption font-weight-medium field-label">Discord</label>
          <span class="text-caption text-grey ml-1">(Opcional)</span>
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-icon
                size="16"
                class="text-grey ml-1"
                v-bind="props"
              >
                mdi-information-outline
              </v-icon>
            </template>
            <span>Digite apenas o seu nome de usuário</span>
          </v-tooltip>
        </div>
        <v-text-field
          :model-value="discord"
          placeholder="Nome de Usuário"
          variant="outlined"
          density="comfortable"
          validate-on="lazy submit"
          hide-details="auto"
          @update:model-value="$emit('update:discord', $event)"
        >
          <template v-slot:prepend-inner>
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.5 12.5159L1.475 9.5909C-0.268 7.01315 0.4055 3.6869 3.05 1.8104C5.6945 -0.0653451 9.4925 0.0884049 11.9338 2.1704C14.375 4.25315 14.705 7.61991 12.7055 10.0462C10.706 12.4724 6.99425 13.2074 4.025 11.7659L0.5 12.5159Z" stroke="#9098A7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { linkedinRules } from './validation.js'

defineProps({
  linkedin: { type: String, default: '' },
  github: { type: String, default: '' },
  discord: { type: String, default: '' }
})

defineEmits(['update:linkedin', 'update:github', 'update:discord'])
</script>

<style scoped>
.field-label {
  color: rgb(var(--v-theme-on-surface));
}
</style>
