<script setup>
defineProps({
  progress: { type: Number, required: true },
});
</script>

<template>
  <div class="card">
    <div class="overall-header">
      <h3 class="card__title">Overall Completion</h3>
      <span class="overall-pct">{{ progress }}%</span>
    </div>
    <div class="progress-bar">
      <div class="progress-bar__fill" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 24px;
}

.card__title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0;
}

.overall-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.overall-pct {
  font-size: 24px;
  color: var(--color-primary);
}

.progress-bar {
  height: 16px;
  background-color: var(--color-border);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  background-color: var(--color-primary);
  border-radius: 9999px;
  transition: width 0.5s;
}
</style>
