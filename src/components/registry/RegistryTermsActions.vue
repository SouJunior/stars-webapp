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
  background-color: rgba(var(--v-theme-primary), 0.08);
  border: 1px solid rgba(var(--v-theme-primary), 0.24);
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
  padding: 0;
  min-height: 0;
  align-items: center;
}

.terms-checkbox :deep(.v-selection-control__input) {
  border-color: rgb(var(--v-theme-primary));
  width: 20px;
  height: 20px;
}

.terms-checkbox :deep(.v-selection-control__ripple) {
  width: 20px;
  height: 20px;
}

.terms-checkbox :deep(.v-icon) {
  color: rgb(var(--v-theme-primary));
  font-size: 16px;
}

.terms-checkbox :deep(.v-selection-control__label) {
  margin: 0;
  line-height: 1.3;
  color: rgb(var(--v-theme-on-surface));
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
</style>
