<script setup lang="ts">
import Aside from "./components/Aside.vue";
import Header from "./components/Header.vue";
import CardList from "./components/CardList.vue";
import { computed, ref } from "vue";


// Define o estado reativo
const isArrowUp = ref(true);

// Computa dinamicamente o caminho da seta
const arrowSrc = computed(() =>
  isArrowUp.value ? "../public/seta-cima.png" : "../public/seta-baixo.png"
);

// Alterna entre seta para cima e para baixo
function toggleArrow() {
  isArrowUp.value = !isArrowUp.value;
}
</script>

<template>
  <div>
    <Header />
    <div class="main-section">
      <Aside />
      <div class="cards">
        <div class="order">
          <div class="order-select">
            <div class="select-placeholder" @click="toggleArrow">
              <p>Classificar por</p>
              <img :src="arrowSrc" alt="Seta" />
            </div>
            <div class="order-options" >
              <p :class="{ visible: !isArrowUp }">Mais Antigas para Recentes</p>
              <p :class="{ visible: !isArrowUp }">Mais Recentes para Antigas</p>
            </div>
          </div>
        </div>
        <CardList />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-section {
  display: flex;
    .cards {
      padding-right: 32px;
      width: 100%;
        
        .order {
          display: flex;
          flex-direction: row-reverse;
          
          .order-select {
            margin: 68px 0px 24px 0px;
            max-width: 230px;
            width: 100%;
            cursor: pointer;
            
            .select-placeholder {
              padding: 4px 8px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              background-color: var(--secondary-color);
              width: 100%;
        
              img {
                height: fit-content;
                max-width: 16px;
                width: 100%;
              }
            }

            .order-options {
              padding-right: 32px;
              padding-left: 97.5px;
              width: 100%;
              
              p {
                display: none; /* Invisível inicialmente */
                opacity: 0;
                transition: opacity 0.3s ease-in-out;
                padding-left: 4.5px;
                
                &.visible {
                  display: block;
                  opacity: 1;
                }
                &:hover{
                  background-color: var(--primary-color);
                  color: var(--secondary-text-color);
                  transition: .1s;
                }
                
              }
            }
          }
        }
  }
}
</style>
