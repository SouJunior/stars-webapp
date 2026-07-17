<template>
  <div class="mb-6">
    <p class="text-body-2 registry-section-title mb-2">
      1. Tipo de voluntário <span class="asterisco">*</span>
    </p>
    <v-select
      :model-value="modelValue"
      :items="volunteerTypes"
      item-title="label"
      item-value="id"
      placeholder="Selecionar"
      variant="outlined"
      density="comfortable"
      :rules="[(v) => !!v || 'Selecione um tipo de voluntário']"
      class="mb-4"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<script setup>
import { volunteerTypes } from './constants.js'

defineProps({
  modelValue: { type: Number, default: null }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.registry-section-title {
  font-family: 'Funnel Sans', sans-serif;
  font-size: 21px;
  font-weight: 600;
  line-height: 24px;
}

.asterisco {
  color: rgb(var(--v-theme-error));
  font-weight: bold;
}
</style>
