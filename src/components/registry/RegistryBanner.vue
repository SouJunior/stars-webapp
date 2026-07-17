<template>
  <div class="banner-principal py-6 py-md-12 px-4 text-center w-100 mt-n16 position-relative overflow-hidden">
    <img
      src="@/assets/banner-quadrado-transparente.png"
      alt=""
      class="banner-pattern banner-pattern--left"
    />
    <img
      src="@/assets/banner-quadrado-transparente.png"
      alt=""
      class="banner-pattern banner-pattern--right"
    />

    <div class="banner-content position-relative">
      <h1 class="text-white mb-4 text-center titulo-banner">
        Olá, quer participar da <br v-if="$vuetify.display.mdAndUp" /> SouJunior?
      </h1>
      <p class="banner-subtitle text-body-1 text-md-h6 text-white mx-auto opacity-90">
        Para prosseguir e fazer parte da nossa comunidade, precisamos que você realize um breve
        cadastro. É rápido e fácil!
      </p>
    </div>
  </div>
</template>

<style scoped>
.banner-principal {
  background: linear-gradient(135deg, #3c7ef9 0%, #1f4fde 100%);
}

.banner-pattern {
  position: absolute;
  height: 100%;
  opacity: 0.75;
  pointer-events: none;
}

.banner-pattern--left {
  top: 0;
  left: 0;
}

.banner-pattern--right {
  bottom: 0;
  right: 0;
  transform: scaleX(-1) scaleY(-1);
}

.banner-content {
  z-index: 2;
}

.banner-subtitle {
  max-width: 800px;
  line-height: 1.5;
}

.titulo-banner {
  font-family: 'Funnel Display', sans-serif;
  font-size: 51px;
  line-height: 56px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

@media (max-width: 600px) {
  .banner-principal {
    padding-top: 40px;
    padding-bottom: 40px;
    margin-top: 0;
  }

  .titulo-banner {
    font-size: 28px;
    line-height: 34px;
  }
}
</style>
