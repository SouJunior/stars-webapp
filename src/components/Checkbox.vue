<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <label :for="label">
    <input type="checkbox" :name="label" :id="label" />{{label}}
  </label>
</template>

<style scoped>
input {
  margin-right: 8px;
}
</style>
