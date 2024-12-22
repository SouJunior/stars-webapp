<script setup lang="ts">
import { ref } from 'vue';
import '../styles/variables.css'

const selectedIndex = ref<number>(1);

// Função para atualizar o índice do link selecionado
const selectLink = (index: number) => {
  selectedIndex.value = index;
};
</script>

<template>
  <header>
    <h1>Recrutamento & Seleção | SouJunior</h1>
    <div class="account">
      <img src="https://placehold.co/71x71" alt="Foto de perfil" />
      <div class="accountInfo">
        <p id="name">Ana Clara Alves</p>
        <p id="role">Tech Recruiter</p>
      </div>
      <div class="logout">
        <p>Logout</p>
        <img src="../../public/logout.png" alt="" />
      </div>
    </div>
  </header>
  <nav>
    <a
      href="#"
      v-for="(link, index) in ['Home', 'Candidatos', 'Vagas', 'Apoiador']"
      :key="index"
      :class="{ selected: selectedIndex === index }"
      @click.prevent="selectLink(index)"
    >
      {{ link }}
    </a>
  </nav>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  max-height: 116px;
  height: 100%;
  width: 100%;
  background-color: var(--primary-color);
  align-items: center;
  padding: 24px 22.5px;
  justify-content: space-between;
  color: var(--secondary-text-color);

  h1 {
    font-size: 2.5rem;
    font-weight: 500;
  }

  .account {
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: center;

    img {
      border-radius: 50%;
      max-width: 71px;
      max-height: 71px;
    }

    .accountInfo {
      display: flex;
      flex-direction: column;
      padding: 11.5px 106px 11.5px 14px;

      #name {
        font-weight: 600;
      }
    }
  }

  .logout {
    padding-left: 156px;
    padding-right: 23px;
    display: flex;
    align-items: center;

    img {
      max-width: 24px;
      max-height: 24px;
    }
  }
}

nav {
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  padding-left: 64.5px;
  padding-right: 64.5px;

  a {
    padding: 8px 36.5px;
    border-radius: 0px 0px 12px 12px;

    &.selected {
      background-color: var(--primary-color);
      color: var(--secondary-text-color);
      font-weight: 600;
      font-size: 1.2rem;
    }
  }
}
</style>
