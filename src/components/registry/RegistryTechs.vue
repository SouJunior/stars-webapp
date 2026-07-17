<template>
  <div>
    <div v-if="showFrontend" class="bg-transparent mt-6 pl-2">
      <div class="d-flex justify-space-between align-baseline mb-4">
        <p class="text-h6 font-weight-bold">Tecnologias Front-end</p>
        <span class="text-caption">Múltipla escolha</span>
      </div>

      <v-checkbox
        v-for="tech in techsFrontendOptions"
        :key="tech"
        :model-value="frontend"
        :label="tech"
        :value="tech"
        density="comfortable"
        hide-details
        class="mb-1 text-body-1 font-weight-medium"
        color="primary"
        @update:model-value="$emit('update:frontend', $event)"
      />

      <v-text-field
        v-if="frontend.includes('Outros')"
        :model-value="frontendOutros"
        placeholder="Especifique outras tecnologias..."
        variant="outlined"
        density="comfortable"
        maxlength="100"
        class="mt-4 mb-6 text-body-1 rounded-lg"
        hide-details="auto"
        :rules="[(v) => !!v || 'Por favor, especifique as tecnologias front-end']"
        @update:model-value="$emit('update:frontendOutros', $event)"
      />
      <v-divider class="site-divider my-6" />

      <p v-if="showFrontendError" class="text-caption text-error mt-2">
        Selecione ao menos uma tecnologia de Front-end
      </p>
    </div>

    <div v-if="showBackend" class="bg-transparent mt-6 pl-2">
      <div class="d-flex justify-space-between align-baseline mb-4">
        <p class="text-h6 font-weight-bold">Tecnologias Back-end</p>
        <span class="text-caption">Múltipla escolha</span>
      </div>

      <v-checkbox
        v-for="tech in techsBackendOptions"
        :key="tech"
        :model-value="backend"
        :label="tech"
        :value="tech"
        density="comfortable"
        hide-details
        class="mb-1 text-body-1 font-weight-medium"
        color="primary"
        @update:model-value="$emit('update:backend', $event)"
      />

      <v-text-field
        v-if="backend.includes('Outros')"
        :model-value="backendOutros"
        placeholder="Especifique outras tecnologias..."
        variant="outlined"
        density="comfortable"
        maxlength="100"
        class="mt-4 mb-6 text-body-1 rounded-lg"
        hide-details="auto"
        :rules="[(v) => !!v || 'Por favor, especifique as tecnologias back-end']"
        @update:model-value="$emit('update:backendOutros', $event)"
      />

      <v-divider class="site-divider my-6" />

      <p v-if="showBackendError" class="text-caption text-error mt-2">
        Selecione ao menos uma tecnologia de Back-end
      </p>
    </div>
  </div>
</template>

<script setup>
import { techsFrontendOptions, techsBackendOptions } from './constants.js'

defineProps({
  showFrontend: { type: Boolean, default: false },
  showBackend: { type: Boolean, default: false },
  frontend: { type: Array, required: true },
  frontendOutros: { type: String, default: '' },
  backend: { type: Array, required: true },
  backendOutros: { type: String, default: '' },
  showFrontendError: { type: Boolean, default: false },
  showBackendError: { type: Boolean, default: false }
})

defineEmits(['update:frontend', 'update:frontendOutros', 'update:backend', 'update:backendOutros'])
</script>
