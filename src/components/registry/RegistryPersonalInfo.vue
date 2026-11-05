<template>
  <div>
    <p class="text-body-1 font-weight-bold mb-4">
      3. Informações Pessoais <span class="asterisco">*</span>
    </p>

    <v-row class="ma-0">
      <v-col cols="12" class="pa-0 mb-4">
        <label class="text-caption registry-field-label d-block mb-1">
          Nome Completo <span class="text-red">*</span>
        </label>
        <v-text-field
          :model-value="name"
          placeholder="Preencha seu nome completo"
          variant="outlined"
          density="comfortable"
          :rules="[(v) => !!v || 'Nome é obrigatório']"
          validate-on="lazy submit"
          hide-details="auto"
          @update:model-value="$emit('update:name', $event)"
        />
      </v-col>

      <v-col cols="12" md="6" class="pa-0 pr-md-2 mb-4">
        <label class="text-caption registry-field-label d-block mb-1">
          Email <span class="text-red">*</span>
        </label>
        <v-text-field
          :model-value="email"
          placeholder="your.email@example.com"
          variant="outlined"
          density="comfortable"
          :rules="emailRules"
          validate-on="lazy submit"
          hide-details="auto"
          @update:model-value="$emit('update:email', $event)"
        />
      </v-col>

      <v-col cols="12" md="6" class="pa-0 pl-md-2 mb-4">
        <label class="text-caption font-weight-medium registry-field-label d-block mb-1">
          WhatsApp <span class="text-red">*</span>
        </label>
        <v-text-field
          :model-value="phone"
          placeholder="+55 (11) 99999-9999"
          variant="outlined"
          density="comfortable"
          :rules="phoneRules"
          maxlength="15"
          validate-on="lazy submit"
          hide-details="auto"
          @update:model-value="onPhoneInput"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { emailRules, phoneRules, formatPhone } from './validation.js'

defineProps({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' }
})

const emit = defineEmits(['update:name', 'update:email', 'update:phone'])

function onPhoneInput(value) {
  emit('update:phone', formatPhone(value))
}
</script>

<style scoped>
.registry-field-label {
  font-family: 'Funnel Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: rgb(var(--v-theme-on-surface));
}

.asterisco {
  color: rgb(var(--v-theme-error));
  font-weight: bold;
}
</style>
