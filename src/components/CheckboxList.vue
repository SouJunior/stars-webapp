<script setup lang="ts">
import { PropType } from 'vue';

  defineProps({
    values: {
      type: Array as PropType<string[]>,
      required: true
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    inputType: {
      type: String,
      required: false,
      default: 'checkbox'
    },
    modelValue: {
      type: String as PropType<string>,
      required: false,
      default: ''
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.checked ? target.value : '')
  }
</script>

<template>
  <div class="checkboxList">
    <p>{{ label }}</p>
    <div v-for="value in values" :key="value">
      <input
        :id="`input-${value}`"
        :key="value"
        :value="value"
        :type="inputType"
        :checked="modelValue === value"
        :aria-label="value"
        name="value"
        @change="handleChange"
      />
      <label :for="`input-${value}`">{{ value }}</label>
    </div>
  </div>
</template>

<style scoped>
  .checkboxList {
    margin-top: 40px;

    p {
      margin-bottom: 8px;
    }

    label {
      margin-left: 4px;
    }
  }
</style>