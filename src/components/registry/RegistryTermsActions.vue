<template>
  <div class="registration-footer-container">
    <div class="terms-box-wrapper mb-4">
      <v-checkbox :model-value="terms" hide-details class="terms-checkbox px-4 py-2" @update:model-value="$emit('update:terms', $event)">
        <template #label>
          <span class="text-body-2 text-terms-responsive terms-label">
            Eu aceito e concordo com os termos de condições
            <a
              href="#"
              class="text-primary font-weight-bold text-decoration-none ml-1"
              @click.prevent.stop="$emit('open-terms')"
            >
              Termos e condições *
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
  gap: 16px;
}

.terms-box-wrapper {
  background-color: #e8f2ff;
  border: 1px solid rgba(59, 126, 249, 0.18);
  border-radius: 16px;
  width: 100%;
  padding: 8px 14px;
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
  padding: 0 !important;
  min-height: 0 !important;
  align-items: center !important;
}

.terms-checkbox :deep(.v-selection-control__input) {
  border-color: #3c7ef9 !important;
  background-color: #ffffff !important;
  width: 20px !important;
  height: 20px !important;
}

.terms-checkbox :deep(.v-selection-control__ripple) {
  width: 20px !important;
  height: 20px !important;
}

.terms-checkbox :deep(.v-icon) {
  color: #3c7ef9 !important;
  font-size: 16px !important;
}

.terms-checkbox :deep(.v-selection-control__label) {
  margin: 0 !important;
  line-height: 1.3 !important;
  color: #475569 !important;
}

.terms-label {
  font-family: 'Funnel Sans', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: #475569;
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
  min-height: 44px !important;
  height: 44px !important;
  border-radius: 12px !important;
}

.cta-btn:not(:disabled) {
  background-color: #3c7ef9 !important;
  color: #ffffff !important;
}

.cta-btn:disabled {
  background-color: rgba(59, 126, 249, 0.18) !important;
  color: rgba(15, 23, 42, 0.4) !important;
}

.v-btn--variant-outlined.action-btn {
  background-color: #ffffff !important;
  border-color: rgba(148, 163, 184, 0.3) !important;
}

:deep(.v-theme--myDarkTheme) .terms-box-wrapper,
:deep(.v-theme--dark) .terms-box-wrapper {
  background-color: rgba(59, 126, 249, 0.16);
  border-color: rgba(96, 165, 250, 0.28);
}

:deep(.v-theme--myDarkTheme) .terms-label,
:deep(.v-theme--dark) .terms-label {
  color: #eff6ff;
}
</style>
