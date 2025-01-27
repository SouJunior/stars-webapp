<template>
  <main>
    <h1 class="sr-only">Lista de Vagas</h1>
    <section v-if="vacancies.length" aria-label="Lista de vagas disponíveis">
      <div v-for="vacancy in vacancies" :key="vacancy.id" class="vacancies-card">
        <h2>Produto {{ vacancy.id }}</h2>
        <p><strong>Cargo:</strong> {{ vacancy.position }}</p>
        <p><strong>Produto:</strong> {{ vacancy.product }}</p>
        <p><strong>Data da candidatura:</strong> {{ vacancy.applicationDate }}</p>
        <p><strong>Candidatos:</strong> {{ vacancy.candidates }}</p>
        <p><strong>Prioridade da vaga:</strong> {{ vacancy.priority }}</p>
        <button class="details-btn" :aria-label="'Ver detalhes da vaga para ' + vacancy.position">
          Detalhes da vaga
        </button>
      </div>
    </section>
    <p v-else class="empty-state">Nenhuma vaga disponível no momento.</p>
  </main>
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
