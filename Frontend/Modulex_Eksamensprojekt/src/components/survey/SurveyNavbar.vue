<template>
  <nav class="survey-navbar">
    <img
      src="../../assets/images/modulex-logo.png"
      alt="Modulex Billund Academy"
      class="logo" />
  </nav>
</template>

<style scoped>
.survey-navbar {
  background-color: var(--color-primary);
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 40;
}

.logo {
  height: 40px;
  filter: brightness(0) invert(1);
}
</style>
