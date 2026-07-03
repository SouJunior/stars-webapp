<script setup>
import { ref } from 'vue'
import CheckboxList from './CheckboxList.vue'
import {
  roles,
  headAreas,
  juniorAreas,
  productManagerSubAreas,
  designSubAreas,
  dataSubAreas,
  businessSubAreas,
  availabilities,
  periods
} from '../config/options'

const selectedArea = ref('')
const selectedRole = ref('')

const handleAreaSelection = (area) => {
  if (selectedArea.value === area) {
    selectedArea.value = ''
  } else {
    selectedArea.value = area
  }
}
</script>

<template>
  <aside>
    <CheckboxList v-model="selectedRole" :values="roles" :input-type="'radio'" />

    <CheckboxList
      v-if="selectedRole === 'Head'"
      :model-value="selectedArea"
      :label="'ÁREA DE ATUAÇÃO'"
      :values="headAreas"
      @update:model-value="handleAreaSelection"
    />

    <CheckboxList
      v-if="selectedRole === 'Junior' || selectedRole === 'Mentor'"
      :model-value="selectedArea"
      :label="'ÁREA DE ATUAÇÃO'"
      :values="juniorAreas"
      @update:model-value="handleAreaSelection"
    />

    <div v-if="selectedRole !== 'Head' && selectedArea">
      <CheckboxList
        v-if="selectedArea === 'Produto'"
        :label="'SUB-ÁREA'"
        :values="productManagerSubAreas"
      />
      <CheckboxList v-if="selectedArea === 'Design'" :label="'SUB-ÁREA'" :values="designSubAreas" />
      <CheckboxList v-if="selectedArea === 'Dados'" :label="'SUB-ÁREA'" :values="dataSubAreas" />
      <CheckboxList
        v-if="selectedArea === 'Business'"
        :label="'SUB-ÁREA'"
        :values="businessSubAreas"
      />
    </div>

    <CheckboxList :label="'DISPONIBILIDADE'" :values="availabilities" />
    <CheckboxList :label="'PERÍODO DE DISPONIBILIDADE'" :values="periods" />
  </aside>
</template>
