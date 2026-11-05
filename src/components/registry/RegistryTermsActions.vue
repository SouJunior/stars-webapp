<template>
  <div class="registration-footer-container">
    <div class="terms-box-wrapper" :class="{ 'theme-dark': isDark }">
      <v-checkbox :model-value="terms" hide-details class="terms-checkbox py-2" color="#3C7EF9" @update:model-value="$emit('update:terms', $event)">
        <template #label>
          <span class="text-body-2 text-terms-responsive terms-label">
            Eu aceito e concordo com os termos de condições
            <a
              href="#"
              class="text-primary font-weight-bold text-decoration-none ml-1"
              @click.prevent.stop="$emit('open-terms')"
            >
              Termos e condições <span class="text-red">*</span>
            </a>
          </span>
        </template>
      </v-checkbox>
    </div>

    <div class="action-buttons-row">
      <v-btn
        variant="outlined"
        color="grey-darken-1"
        size="large"
        class="action-btn text-none"
        @click="$emit('cancel')"
      >
        Cancelar
      </v-btn>
      <v-btn
        variant="elevated"
        color="primary"
        size="large"
        class="action-btn text-none cta-btn"
        :loading="loading"
        :disabled="!terms"
        @click="$emit('submit')"
      >
        Cadastrar
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const isDark = computed(() => theme.global.name.value === 'myDarkTheme')

defineProps({
  terms: { type: Boolean, default: false },
  loading: { type: Boolean, default: false }
})

defineEmits(['update:terms', 'open-terms', 'cancel', 'submit'])
</script>

<style scoped>
.registration-footer-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 28px;
}

.terms-box-wrapper {
  background-color: rgba(var(--v-theme-primary), 0.08);
  border: 1px solid rgba(var(--v-theme-primary), 0.24);
  border-radius: 16px;
  width: 100%;
  padding: 8px 16px;
  display: flex;
  align-items: center;
}

.terms-checkbox {
  width: 100%;
  margin: 0;
  padding: 0;
}

/* Vuetify selection control overrides */
.terms-checkbox :deep(.v-selection-control) {
  width: 100%;
  padding: 0;
  min-height: 0;
  align-items: center;
}

.terms-checkbox :deep(.v-selection-control__input) {
  width: 30px;
  height: 30px;
  border: 1px solid #137FEC;
  border-radius: 5px;
  background-color: #ffffff;
  box-sizing: border-box;
  position: relative;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.terms-checkbox :deep(.v-selection-control__ripple) {
  display: none;
}

.terms-checkbox :deep(.v-selection-control__input .v-icon),
.terms-checkbox :deep(.v-selection-control__input svg) {
  display: none;
}

.terms-checkbox :deep(.v-selection-control__label) {
  margin: 0;
  line-height: 1.3;
  color: rgb(var(--v-theme-on-surface));
}

.terms-checkbox :deep(.v-selection-control__input::after) {
  content: "";
  position: absolute;
  top: 45%;
  left: 50%;
  width: 7px;
  height: 12px;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  transform: translate(-50%, -60%) rotate(45deg);
  opacity: 0;
  transition: opacity 0.15s ease;
  pointer-events: none;
}

.terms-checkbox :deep(.v-selection-control--dirty .v-selection-control__input) {
  background-color: #3C7EF9;
  border-color: #3C7EF9;
}

.terms-checkbox :deep(.v-selection-control--dirty .v-selection-control__input::after) {
  opacity: 1;
}

.terms-checkbox :deep(.v-selection-control__input input) {
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.terms-checkbox,
.terms-checkbox :deep(.v-label) {
  cursor: pointer;
}

.terms-label {
  font-family: 'Funnel Sans', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: rgb(var(--v-theme-on-surface));
}

.text-terms-responsive {
  width: 100%;
  display: block;
  white-space: normal;
  color: inherit;
  line-height: 1.4;
}

.action-buttons-row {
  display: flex;
  gap: 16px;
  width: 100%;
}

.action-btn {
  flex: 1;
  min-height: 44px;
  height: 44px;
  padding: 0 22px;
  border-radius: 12px;
  font-family: 'Funnel Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 44px;
}

/* Vuetify btn size overrides */
.action-btn {
  min-height: 44px;
  height: 44px ;
  border-radius: 12px ;
}

.cta-btn:not(:disabled) {
  background-color: #3c7ef9;
  color: #ffffff;
}

.theme-dark :deep(.terms-checkbox .v-selection-control__input) {
  background-color: transparent;
  border-color: #3D4570;
}
</style>
