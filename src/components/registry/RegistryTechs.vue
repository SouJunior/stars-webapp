<template>
  <div>
    <!-- Front-end Block -->
    <div v-if="showFrontend" class="bg-transparent mt-6 pl-2" :class="{ 'theme-dark': isDark }">
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
        class="mb-1 text-body-1 font-weight-medium tech-checkbox"
        color="#3C7EF9"
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
      <v-divider class="site-divider my-5" />

      <p v-if="showFrontendError" class="text-caption text-error mt-2">
        Selecione ao menos uma tecnologia de Front-end
      </p>
    </div>

    <!-- Back-end Block -->
    <div v-if="showBackend" class="bg-transparent mt-6 pl-2" :class="{ 'theme-dark': isDark }">
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
        class="mb-1 text-body-1 font-weight-medium tech-checkbox"
        color="#3C7EF9"
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

      <v-divider class="site-divider my-5" />

      <p v-if="showBackendError" class="text-caption text-error mt-2">
        Selecione ao menos uma tecnologia de Back-end
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { techsFrontendOptions, techsBackendOptions } from './constants.js'

const theme = useTheme()
const isDark = computed(() => theme.global.name.value === 'myDarkTheme')

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

<style>
/* Reset de alinhamento e espaçamento do container principal do Vuetify */
.tech-checkbox.v-checkbox {
  --v-input-control-height: auto;
}

.tech-checkbox .v-selection-control {
  min-height: 24px; 
  gap: 10px;
}

.tech-checkbox .v-selection-control__wrapper {
  width: 20px;
  height: 20px;
}

/* Oculta o efeito Ripple circular nativo do Material Design */
.tech-checkbox .v-selection-control__ripple {
  display: none;
}

/* Oculta o ícone MDI/SVG padrão do Vuetify para renderizarmos o custom */
.tech-checkbox .v-selection-control__input .v-icon,
.tech-checkbox .v-selection-control__input svg {
  display: none;
}

/* Estilo Base da Caixa (Estado Desmarcado / Vazio) */
.tech-checkbox .v-selection-control__input {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 1px solid #3C7EF9;
  background-color: #ffffff;
  box-sizing: border-box;
  position: relative;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

/* Desenho do Ícone Check (Pseudo-elemento ::after) */
.tech-checkbox .v-selection-control__input::after {
  content: "";
  position: absolute;
  top: 45%;
  left: 50%;
  width: 5px;
  height: 9px;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  transform: translate(-50%, -60%) rotate(45deg);
  opacity: 0;
  transition: opacity 0.15s ease;
}

/* Estado Marcado (Checked) */
.tech-checkbox .v-selection-control--dirty .v-selection-control__input {
  background-color: #3C7EF9;
  border-color: #3C7EF9;
}

.tech-checkbox .v-selection-control--dirty .v-selection-control__input::after {
  opacity: 1;
}

/* Corrigir alinhamento do label */
.tech-checkbox .v-label {
  opacity: 1;
  color: rgb(var(--v-theme-on-surface));
}

/* Cursor pointer em toda a linha do checkbox */
.tech-checkbox,
.tech-checkbox .v-label {
  cursor: pointer;
}

/* Garante que o input nativo cubra 100% da área clicável */
.tech-checkbox .v-selection-control__input input {
  width: 100%;
  height: 100%;
  cursor: pointer;
}

/* Evita que o pseudo-elemento ::after bloqueie cliques no input */
.tech-checkbox .v-selection-control__input::after {
  pointer-events: none;
}

.theme-dark .tech-checkbox .v-selection-control__input {
  background-color: transparent;
  border-color: #3D4570;
}
</style>