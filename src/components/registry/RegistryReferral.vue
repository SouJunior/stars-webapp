<template>
  <div>
    <p class="text-body-2 font-weight-bold mb-2 mt-2">5. Indicação</p>
    <p class="text-caption text-medium-emphasis mb-3">
      Você foi indicado(a) por alguém da SouJunior?
    </p>

    <v-btn-toggle
      :model-value="wasReferred"
      mandatory
      density="compact"
      class="mb-4"
      @update:model-value="$emit('update:wasReferred', $event)"
    >
      <v-btn value="sim" variant="outlined" size="small">Sim</v-btn>
      <v-btn value="nao" variant="outlined" size="small" color="primary">Não</v-btn>
    </v-btn-toggle>

    <v-row v-if="wasReferred === 'sim'" class="ma-0 mt-2">
      <v-col cols="12" class="pa-0 mb-4">
        <label class="text-caption font-weight-medium text-grey-darken-3 d-block mb-1">
          Nome da pessoa <span class="text-red">*</span>
        </label>
        <v-text-field
          :model-value="referredByName"
          placeholder="Nome completo da pessoa que te indicou"
          variant="outlined"
          density="comfortable"
          :rules="[(v) => !!v || 'Nome é obrigatório']"
          validate-on="lazy submit"
          hide-details="auto"
          @update:model-value="$emit('update:referredByName', $event)"
        />
      </v-col>

      <v-col cols="12" md="6" class="pa-0 pr-md-2 mb-4">
        <label class="text-caption font-weight-medium text-grey-darken-3 d-block mb-1">
          Cargo <span class="text-red">*</span>
        </label>
        <v-text-field
          :model-value="referredByPosition"
          placeholder="Ex: Desenvolvedor Front-end"
          variant="outlined"
          density="comfortable"
          :rules="[(v) => !!v || 'Cargo da indicação é obrigatório']"
          validate-on="lazy submit"
          hide-details="auto"
          @update:model-value="$emit('update:referredByPosition', $event)"
        />
      </v-col>

      <v-col cols="12" md="6" class="pa-0 pl-md-2 mb-4">
        <label class="text-caption font-weight-medium text-grey-darken-3 d-block mb-1">
          LinkedIn da indicação <span class="text-red">*</span>
        </label>
        <v-text-field
          :model-value="referredByLinkedin"
          placeholder="https://linkedin.com/in/..."
          variant="outlined"
          density="comfortable"
          :rules="linkedinRules"
          validate-on="lazy submit"
          hide-details="auto"
          @update:model-value="$emit('update:referredByLinkedin', $event)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { linkedinRules } from './validation.js'

defineProps({
  wasReferred: { type: String, default: 'nao' },
  referredByName: { type: String, default: '' },
  referredByPosition: { type: String, default: '' },
  referredByLinkedin: { type: String, default: '' }
})

defineEmits([
  'update:wasReferred',
  'update:referredByName',
  'update:referredByPosition',
  'update:referredByLinkedin'
])
</script>
