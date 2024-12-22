<script setup lang="ts">
import Button from "./Button.vue";

defineProps({
  name: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
    default: ''
  },
  available_period: {
    type: String,
    required: false,
    default: ''
  },
  availability: {
    type: String,
    required: false,
    default: ''
  },
  linkedin: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: false,
    default: '01/01/2001'
  },
  status: {
    type: String,
    required: false,
    default: ''
  },
});
  
</script>

<template>
  <div class="card">
    <div class="contentOnLeft">
      
      <div class="field">
        <label>Nome: </label>
        <p>{{ name }}</p>
      </div>
      
      <div class="field">
        <label>Área de Atuação:</label>
        <p>{{ job }}</p>
      </div>

      <div class="field">
        <label>Subárea de atuação:</label>
        <p>{{ role }}</p>
      </div>
      
      <div class="field">
        <label>Período de Disponibilidade:</label>
        <p>{{ available_period }}</p>
      </div>

      <div class="field">
        <label>Disponibilidade:</label>
        <p>{{ availability }} horas</p>
      </div>

      <div class="field">
        <label>LinkedIn:</label>
        <p>{{ linkedin }}</p>
      </div>
    </div>
    <div class="contentOnRight">
      <div class="filedsOnRight">
        <div class="field">
          <label>Data da Candidatura:</label>
          <p>{{ date }}</p>
        </div>
        <div class="field">
          <label>Status:</label>
          <p>{{ status }}</p>
        </div>
      </div>
      <div class="buttons">
        <Button iconName="seta-direita.png" placeholder="Acessar Perfil" />
        <Button iconName="mais.png" placeholder="Associar à vaga" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--secondary-color);
  width: 100%;
  max-height: 192px;
  padding: 21px 19px;
  border-radius: 16px;
  display: flex;
  margin-right: 32px;
  margin-bottom: 24px;

  .contentOnLeft,
  .contentOnRight {
    width: 100%;
    
    .field {
      display: flex;
      label {
        margin-right: 8px;
        margin-bottom: 8px;
        font-weight: 700;
      }
    }
  }

  .contentOnRight {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: space-between;

    .buttons {
      display: flex;
      flex-direction: row-reverse;
      display: flex;
      flex-direction: row;
      gap: 4px;
      height: 100%;
      max-height: 40px;
    }
  }
}
</style>
