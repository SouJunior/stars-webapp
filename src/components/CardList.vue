<script setup lang="ts">
import Card from "./Card.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

interface JobTitle {
  id: number;
  title: string;
  is_active: boolean;
}

interface Volunteer {
  id: number;
  name: string;
  linkedin: string;
  email: string;
  is_active: number;
  jobtitle_id: number;
}

const volunteers = ref<Volunteer[]>([]);
const jobTitles = ref<JobTitle[]>([]);
const isLoading = ref(true);
const error = ref<string>('');

const fetchVolunteers = async () => {
  try {
    const response = await axios.get("http://localhost:8000/volunteers");
    volunteers.value = response.data;
    error.value = '';
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao buscar voluntários:", error.message);
    } else {
      console.error("Erro ao buscar voluntários:", error);
    }
    console.error('Erro ao carregar voluntários. Tente novamente mais tarde.');
  } finally {
    isLoading.value = false;
  }
};

const fetchJobs = async () => {
  try {
    const response = await axios.get("http://localhost:8000/jobtitles");
    jobTitles.value = response.data;
    console.log(response)
    error.value = '';
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao buscar áreas de atuação:", error.message);
    } else {
      console.error("Erro ao buscar áreas de atuação:", error);
    }
    console.error('Erro ao carregar áreas de atuação. Tente novamente mais tarde.');
  }
}

onMounted(() => {
  fetchVolunteers();
  fetchJobs();
});
</script>

<template>
  <div class="cards-container">
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-else-if="isLoading" class="loading">Carregando...</div>
    <ul v-else class="cards-section">
      <li v-if="volunteers.length === 0" class="no-data">Nenhum voluntário encontrado</li>
      <li v-else v-for="volunteer in volunteers" :key="volunteer.id">
        <Card 
          :name="volunteer.name" 
          :linkedin="volunteer.linkedin" 
          :job="jobTitles.find(job => job.id === volunteer.jobtitle_id)?.title || 'Área não definida'"
          :status="volunteer.is_active === 1 ? 'Ativo' : 'Inativo'"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .cards-container {
    width: 100%;
  }
  
  .cards-section {
    border-left: 1px solid var(--secondary-color);
    padding-left: 97.5px;
    list-style: none;
  }    

  .error-message {
    color: red;
    padding: 1rem;
    text-align: center;
  }

  .loading, .no-data {
    text-align: center;
    padding: 1rem;
  }
</style>
