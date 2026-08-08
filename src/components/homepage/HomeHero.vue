<template>
  <section class="hero-section position-relative overflow-hidden">
    
    <div 
      class="hero-background-details" 
      :style="{ backgroundImage: `url(${detalheFundoHome})` }"
    ></div>
    <img :src="detalheQuadrado" class="detail-square-top" alt="" />
    <v-container fluid class="position-relative style-container pa-0">
      <v-row align="start" justify="space-between" class="hero-row ma-0">

        <v-col cols="12" md="6" class="text-left hero-text-col" style="padding-left: 130px; padding-top: 117px;">
          <h1 class="text-h4 font-weight-bold text-neutral-dark mb-4 text-lh-base">
            Ganhe experiência prática
            <span class="text-primary-blue d-block">construindo seu futuro na tecnologia.</span>
          </h1>

          <p class="text-subtitle-3 font-weight-bold text-body-dark mb-3">
            Sua primeira experiência na área tech começa aqui.
          </p>

          <v-list class="bg-transparent mb-6" density="compact">
            <v-list-item
              v-for="(item, index) in benefits"
              :key="index"
              class="px-0 min-h-auto"
            >
              <template v-slot:prepend>
                <v-icon color="primary-blue" icon="mdi-check" size="18" class="mr-2"></v-icon>
              </template>
              <v-list-item-title class="text-body-3 text-wrap line-height-tight text-body-dark">
                {{ item }}
              </v-list-item-title>
            </v-list-item>
          </v-list>

          <v-btn
            color="#3b82f6"
            size="large"
            class="text-none text-white font-weight-bold px-8 rounded-lg custom-btn"
            elevation="0"
          >
            Quero fazer parte
          </v-btn>
        </v-col>

        <v-col cols="12" md="5" class="text-center position-relative hero-mascot-col">
          <v-img
            :src="mascoteImg"
            alt="Mascote SouJunior"
            width="483"
            height="528"
            contain
            class="mx-auto hero-mascot"
          ></v-img>
        </v-col>

      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import mascoteImg from '@/assets/mascote-axolote-home.png'
import detalheFundoHome from '@/assets/detalhes-fundo-home.png'
import detalheQuadrado from '@/assets/logo-sj-header.png'

const benefits = ref([
  'Conectamos você a projetos reais para fortalecer seu portfólio.',
  'Desenvolva suas habilidades ao lado de mentores e uma comunidade colaborativa.',
  'Tudo 100% online, gratuito e focado em voluntariado.'
])
</script>

<style scoped>
.hero-section {
  background: #f8fbff;
  background-image:
    radial-gradient(circle at top left, rgba(59, 131, 246, 0.597), transparent 33%),
    radial-gradient(circle at bottom right, rgba(59, 131, 246, 0.486), transparent 30%);
  background-repeat: no-repeat;
  background-position: top left, bottom right;
  width: 100%;
  min-height: auto;
  margin-top: 0;
  padding-top: 0;
  display: block;
}

.style-container {
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
}

.hero-row {
  gap: 5px;
}

.hero-mascot-col {
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
}

.hero-mascot {
  margin-top: 0px;
  margin-bottom: -141.5px;
  width: 483px;
  height: 528px;
  max-width: initial;
}

.hero-background-details {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 150px;
  width: 55%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: right center;
  background-size: contain;
  z-index: 1;
  pointer-events: none;
}

.style-container {
  z-index: 2;
}

.text-primary-blue {
  color: #1d4ed8;
}

.text-neutral-dark {
  color: #1e293b;
}

.text-body-dark {
  color: #334155;
}

.text-lh-base {
  line-height: 1.25;
}

.v-list-item.min-h-auto {
  min-height: unset;
}

.detail-square-top {
  position: absolute;
  top: 20px;       /* Ajuste a altura em relação à navbar aqui */
  left: 40px;      /* Ajuste a distância da borda esquerda aqui */
  width: 60px;     /* Defina o tamanho ideal do quadradinho */
  opacity: 0.7;    /* Controla a opacidade para ficar suave como no print */
  z-index: 1;      /* Fica abaixo do texto se eles se sobreporem */
  pointer-events: none;
}
</style>