<template>
  <section class="about-section py-12 px-4">
    <v-container class="style-container mx-auto">
      
      <div class="text-center mb-10 about-heading">
        <h2 class="about-title">Quem somos?</h2>
        <p class="about-description mx-auto max-w-text">
          A SouJunior é uma comunidade online e colaborativa que conecta pessoas em início ou transição de carreira a projetos reais, mentores experientes e oportunidades de desenvolvimento profissional. Aqui, você ganha experiência prática, fortalece seu portfólio, amplia sua rede de contatos e desenvolve as competências necessárias para ingressar ou crescer na área de tecnologia.
        </p>
      </div>

      <v-row class="home-numbers-row" justify="center" align="stretch">
        <v-col 
          v-for="(card, index) in stats" 
          :key="index" 
          cols="12" 
          sm="4" 
          md="4" 
          lg="4" 
          class="pa-0"
        >
          <v-card class="stat-card text-center pa-6 h-100" variant="flat">
            <v-avatar color="#eff6ff" size="56" class="mb-4 stat-avatar">
              <v-icon :icon="card.icon" color="#2563eb" size="28"></v-icon>
            </v-avatar>
            
            <div class="stat-number">
              {{ card.number }}
            </div>
            
            <div class="stat-title">
              {{ card.title }}
            </div>
            
            <div class="stat-description">
              {{ card.description }}
            </div>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </section>
</template>
<script setup>
import { ref } from 'vue'

const stats = ref([
  {
    icon: 'mdi-handshake-outline', // Ícone que lembra a parceria/juniores
    number: '58+',
    title: 'Juniores',
    description: 'Juniores ativos da comunidade'
  },
  {
    icon: 'mdi-school-outline', // Ícone de chapéu de formatura para mentores
    number: '33+',
    title: 'Mentores',
    description: 'Profissionais apoiando carreiras'
  },
  {
    icon: 'mdi-folder-outline', // Ícone de pasta para áreas
    number: '10+',
    title: 'Áreas',
    description: 'Áreas presente na SouJunior'
  }
])
</script>

<style scoped>
.about-section {
  background: #f8fbff;
}

.style-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.about-heading {
  padding-top: 72px;
  padding-bottom: 48px;
}

.about-title {
  color: #2563eb;
  font-family: 'Funnel Sans', sans-serif;
  font-size: 40px;
  line-height: 48px;
  font-weight: 700;
  margin-bottom: 16px;
}

.about-description {
  color: #475569;
  font-size: 16px;
  line-height: 30px;
  max-width: 760px;
  margin: 0 auto;
  font-weight: 400;
}

.home-numbers-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
}

@media (min-width: 1200px) {
  .home-numbers-row {
    flex-wrap: nowrap;
  }
}

.stat-card {
  border-radius: 32px;
  background: #ffffff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
  border: 1px solid rgba(148, 163, 184, 0.493);
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.stat-avatar {
  background: rgba(59, 130, 246, 0.12) !important;
}

.stat-number {
  color: #1F4FDE;
  font-family: 'Funnel Sans', sans-serif;
  font-size: 51px;
  line-height: 56px;
  font-weight: 700;
  margin-bottom: 8px;
}

.stat-title {
  color: rgba(0, 0, 0, 0.8);
  font-family: 'Funnel Sans', sans-serif;
  font-size: 18px;
  line-height: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

.stat-description {
  color: #B0B7C4;
  font-family: 'Funnel Sans', sans-serif;
  font-size: 12px;
  line-height: 16px;
  max-width: 240px;
  margin: 0 auto;
}

.max-w-text {
  max-width: 760px;
}
</style>