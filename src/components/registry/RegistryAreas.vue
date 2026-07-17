<template>
  <div class="mb-6">
    <div class="d-flex justify-space-between align-baseline mb-3">
      <p class="text-body-2 font-weight-bold mb-0">
        2. Área de Atuação <span class="asterisco">*</span>
      </p>
      <span class="text-body-2 text-grey-darken-1">Selecione até 3 áreas</span>
    </div>

    <div class="areas-container">
      <v-chip
        v-for="area in areas"
        :key="area"
        :color="selected.includes(area) ? 'primary' : 'grey-lighten-1'"
        :variant="selected.includes(area) ? 'flat' : 'outlined'"
        class="custom-chip"
        :class="{ 'text-grey-darken-3': !selected.includes(area) }"
        @click="$emit('toggle', area)"
      >
        {{ area }}
      </v-chip>
    </div>

    <p v-if="showError" class="text-caption text-error mt-2 mb-0">
      Selecione ao menos uma área de atuação
    </p>
  </div>
</template>

<script setup>
defineProps({
  areas: { type: Array, required: true },
  selected: { type: Array, required: true },
  showError: { type: Boolean, default: false }
})

defineEmits(['toggle'])
</script>

<style scoped>
.areas-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
}

.asterisco {
  color: rgb(var(--v-theme-error));
  font-weight: bold;
}

/* Override Vuetify chip defaults — !important only where component styles win */
:deep(.custom-chip) {
  flex: 0 0 auto !important;
  height: 28px !important;
  min-width: unset !important;
  font-family: 'Funnel Sans', sans-serif !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 16px !important;
}

:deep(.custom-chip .v-chip__content) {
  white-space: nowrap;
}

:deep(.v-chip) {
  border-color: rgba(var(--v-theme-on-surface), 0.3) !important;
}

:deep(.v-chip__content) {
  color: rgba(var(--v-theme-on-surface), 0.87) !important;
  font-weight: 500;
}
</style>
