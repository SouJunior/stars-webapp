<template>
  <div class="d-flex flex-column justify-center align-center">
    <div class="d-flex flex-column ga-6">
      <div>
        <h1 class="home-title text-left mb-2">Seja Bem vindo(a) ao Stars</h1>
        <h2 class="home-subtitle text-left text-grey-darken-1 text-h4">Backoffice do Soujunior</h2>
      </div>
      <br />
      <div class="ma-2">
        <p>
          <v-btn class="font-weight-semibold" :to="{ name: 'volunteers' }"> Ver Voluntários </v-btn>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup></script>
