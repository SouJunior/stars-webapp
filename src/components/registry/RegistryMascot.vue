<template>
  <div class="mascote-container">
    <img src="@/assets/mascote.png" alt="Mascote SouJunior" class="mascote-img" />
  </div>
</template>

<style scoped>
.mascote-container {
  position: absolute;
  left: -130px;
  bottom: 0;
  z-index: 10;
}

.mascote-img {
  width: 160px;
  height: auto;
  display: block;
}

@media (max-width: 768px) {
  .mascote-container {
    position: static;
    left: auto;
    bottom: auto;
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }

  .mascote-img {
    width: 90px;
  }
}
</style>
