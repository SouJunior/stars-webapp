<template>
  <div>
    <p class="text-body-2 font-weight-bold mb-4 mt-2">4. Perfil Profissional</p>

    <v-row class="ma-0">
      <v-col cols="12" class="pa-0 mb-4">
        <label class="text-caption font-weight-medium text-grey-darken-3 d-block mb-1">
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
          <label class="text-caption font-weight-medium text-grey-darken-3">Github</label>
          <span class="text-caption text-grey ml-1">(Opcional)</span>
          <v-icon
            size="16"
            class="text-grey ml-1"
            title="Digite apenas o seu nome de usuário"
          >
            mdi-information-outline
          </v-icon>
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
          <label class="text-caption font-weight-medium text-grey-darken-3">Discord</label>
          <span class="text-caption text-grey ml-1">(Opcional)</span>
          <v-icon
            size="16"
            class="text-grey ml-1"
            title="Digite apenas o seu nome de usuário"
          >
            mdi-information-outline
          </v-icon>
        </div>
        <v-text-field
          :model-value="discord"
          placeholder="Nome de Usuário"
          variant="outlined"
          density="comfortable"
          prepend-inner-icon="mdi-discord"
          validate-on="lazy submit"
          hide-details="auto"
          @update:model-value="$emit('update:discord', $event)"
        />
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
