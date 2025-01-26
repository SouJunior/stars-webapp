<script setup lang="ts">
  defineProps({
    values: {
      type: Array,
      required: true
    },
    modelValue: {
      type: String,
      required: false,
      default: ''
    },
    inputType: {
      type: String,
      required: false,
      default: 'checkbox'
    },
    label: {
      type: String,
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
    <div v-for="(value, index) in values" :key="index">
      <input
        :id="`input-${index}`"
        :key="index"
        :value="value"
        :type="inputType"
        :checked="modelValue === value"
        name="value"
        @change="handleChange"
      />
      <label :for="`input-${index}`">{{ value }}</label>
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