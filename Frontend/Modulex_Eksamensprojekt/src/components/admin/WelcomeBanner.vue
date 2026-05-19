<script setup></script>

<template>
  <div class="welcome-banner">
    <h2 class="welcome-banner__title">Welcome back, Admin!</h2>
    <p class="welcome-banner__subtitle">Monitor and manage your academy</p>
  </div>
</template>

<style scoped>
.welcome-banner {
  background-image: url('@/assets/images/welcomebanner.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 8px;
  padding: 32px;
  color: var(--color-white);
}

.welcome-banner__title {
  font-size: 28px;
  margin-bottom: 8px;
  max-width: 70%;
}

.welcome-banner__subtitle {
  font-size: 18px;
  opacity: 0.9;
  max-width: 70%;
}
</style>
