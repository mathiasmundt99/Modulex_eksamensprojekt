<script setup>
const onboardingProgress = 45
</script>

<template>
  <div class="welcome-banner">
    <h2 class="welcome-banner__title">Welcome back, John!</h2>
    <p class="welcome-banner__subtitle">Continue your onboarding journey</p>
    <div class="welcome-banner__progress">
      <div class="progress-header">
        <span>Overall Progress</span>
        <span>{{ onboardingProgress }}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar__fill" :style="{ width: onboardingProgress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-banner {
  background: linear-gradient(to right, var(--color-primary), var(--color-primary-hover));
  border-radius: 8px;
  padding: 32px;
  color: var(--color-white);
}

.welcome-banner__title {
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 8px;
}

.welcome-banner__subtitle {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 24px;
}

.welcome-banner__progress {
  margin-top: 8px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 8px;
}

.progress-bar {
  height: 12px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  background-color: var(--color-white);
  border-radius: 9999px;
  transition: width 0.5s;
}
</style>
