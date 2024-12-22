<script setup lang="ts">
defineProps({
  placeholder: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: false
  }
});
</script>

<template>
  <div class="button">
    <img :src="`../../public/${iconName}`" alt="">
    <p>{{ placeholder }}</p>
  </div>
</template>
<style scoped>
.button {
  background-color: var(--primary-color);
  color: var(--secondary-text-color);
  font-size: 16px;
  padding: 8px 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin-top: 8px;
  height: 40px;


  img {
    max-width: 24px;
    height: 24px;
    margin-right: 8px;
  }
}
</style>
