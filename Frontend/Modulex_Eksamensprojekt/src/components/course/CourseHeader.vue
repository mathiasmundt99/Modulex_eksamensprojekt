<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completedCount: { type: Number, required: true },
  total: { type: Number, required: true },
  progressPercentage: { type: Number, required: true },
});
</script>

<template>
  <div class="course-header">
    <div class="course-header__inner">
      <h2 class="course-header__title">{{ title }}</h2>
      <p class="course-header__desc">{{ description }}</p>
      <div class="progress-row">
        <span class="progress-row__label">{{ completedCount }} of {{ total }} completed</span>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
        </div>
        <span class="progress-row__label">{{ progressPercentage }}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.course-header {
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  padding: 16px 24px;
}

.course-header__inner {
  max-width: var(--site-width);
  margin: 0 auto;
      padding: 0 24px;
}

.course-header__title {
  font-size: 22px;
  color: var(--color-text);
  margin-bottom: 6px;
}

.course-header__desc {
  font-size: 14px;
  color: var(--color-text);
  margin-bottom: 12px;
}

.progress-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-row__label {
  font-size: 13px;
  color: var(--color-text);
  white-space: nowrap;
}

.progress-track {
  flex: 1;
  max-width: 280px;
  height: 8px;
  background-color: var(--color-border);
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--color-primary);
  border-radius: 999px;
  transition: width 0.4s;
}
</style>
