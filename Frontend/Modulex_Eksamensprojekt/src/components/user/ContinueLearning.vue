<script setup>
import BaseButton from '../BaseButton.vue'

const course = {
  title: 'Product Configuration & Ordering',
  subtitle: 'Module 3 of 5',
  progress: 60
}
</script>

<template>
  <div class="card">
    <h3 class="card__title">Continue Learning</h3>
    <div class="continue-item">
      <div class="continue-item__info">
        <h4 class="continue-item__name">{{ course.title }}</h4>
        <p class="continue-item__meta">{{ course.subtitle }}</p>
        <div class="progress-bar">
          <div class="progress-bar__fill" :style="{ width: course.progress + '%' }"></div>
        </div>
        <span class="progress-label">{{ course.progress }}% complete</span>
      </div>
      <BaseButton>Resume Course</BaseButton>
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
  font-weight: 400;
  color: var(--color-text);
  margin-bottom: 16px;
}

.continue-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background-color: var(--color-bg);
  border-radius: 8px;
  padding: 16px;
  flex-wrap: wrap;
}

.continue-item__info {
  flex: 1;
  min-width: 0;
}

.continue-item__name {
  font-size: 18px;
  font-weight: 400;
  color: var(--color-text);
  margin-bottom: 4px;
}

.continue-item__meta {
  font-size: 14px;
  color: var(--color-text);
  margin-bottom: 12px;
}

.progress-bar {
  height: 8px;
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

.progress-label {
  font-size: 12px;
  color: var(--color-text);
  margin-top: 6px;
  display: block;
}

</style>
