<script setup lang="ts">
import { ref, watch } from 'vue'
import CheckboxList from './CheckboxList.vue'

const selectedArea = ref('')
const selectedRole = ref('')

const roles = ['Head', 'Mentor', 'Junior']

const headAreas = [
  'Agilidade',
  'Back-End',
  'Business',
  'Dados',
  'Design',
  'DevOps',
  'Front-End',
  'Produto',
  'QA - Quality Assurance',
  'Tech Recruitment'
]

const juniorAreas = [
  'Agilidade',
  'Back-End',
  'Business',
  'Dados',
  'Design',
  'DevOps',
  'Front-End',
  'Produto',
  'QA - Quality Assurance',
  'Social Media',
  'Tech Recruitment'
]

const productManagerSubAreas = [
  'APM - Associate Product Manager',
  'Product Growth',
  'Product Marketing Manager',
  'Product Ops'
]
const designSubAreas = ['Design Ops', 'UX/UI']
const dataSubAreas = ['Analytics', 'BI', 'Engenharia de Dados']
const businessSubAreas = ['Análise de negócios', 'Análise de processos', 'Outros']

const availabilities = ['5h/semanais', '10h/semanais', '15h/semanais', '+15h/semanais']
const periods = ['Manhã', 'Tarde', 'Noite']

// Função para garantir que apenas uma área seja selecionada
const handleAreaSelection = (area: string) => {
  if (selectedArea.value === area) {
    // Se a área já está selecionada, desmarque-a
    selectedArea.value = ''
  } else {
    // Caso contrário, selecione a nova área
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
    <CheckboxList :label="'PERÍODO DE DISPONIBILIDADE'" :values="periods"/>

    <button type="button">Pesquisar</button>
  </aside>
</template>