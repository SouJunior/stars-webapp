<template>
  <div>
    <div
      v-for="vacancies in vacancies"
      :key="vacancies.id"
      class="vacancies-card"
    >
      <h3>Produto {{ vacancies.id }}</h3>
      <p><strong>Cargo:</strong> {{ vacancies.position }}</p>
      <p><strong>Produto:</strong> {{ vacancies.product }}</p>
      <p><strong>Data da candidatura:</strong> {{ vacancies.applicationDate }}</p>
      <p><strong>Candidatos:</strong> {{ vacancies.candidates }}</p>
      <p><strong>Prioridade da vaga:</strong> {{ vacancies.priority }}</p>
      <button class="details-btn">Detalhes da vaga</button>
    </div>
  </div>
</template>

<script>
import vacancies from "./components/data/vancacyMok.json";

export default {
  data() {
    return {
      vacancies, // Dados importados arquivo JSON
    };
  },
};
</script>
<style scoped>
.vacancies-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  background-color: #f9f9f9;
  color: rgb(0, 0, 0);
}

.details-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.details-btn:hover {
  background-color: #0056b3;
}
</style>
