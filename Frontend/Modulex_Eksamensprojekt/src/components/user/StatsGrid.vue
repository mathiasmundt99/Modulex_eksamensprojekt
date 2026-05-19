<script setup>
const completedModules = 3
const totalModules = 7
</script>

<template>
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-card__header">
        <span class="stat-card__label">Completed Modules</span>
        <svg class="icon--primary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <p class="stat-card__value">{{ completedModules }}/{{ totalModules }}</p>
    </div>

    <div class="stat-card">
      <div class="stat-card__header">
        <span class="stat-card__label">Hours Completed</span>
        <svg class="icon--accent" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      </div>
      <p class="stat-card__value">5.5</p>
    </div>

    <div class="stat-card">
      <div class="stat-card__header">
        <span class="stat-card__label">Active Courses</span>
        <svg class="icon--accent" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 0 3-3h7z"/>
        </svg>
      </div>
      <p class="stat-card__value">1</p>
    </div>
  </div>
</template>

<style scoped>
.icon--primary { color: var(--color-primary); }
.icon--accent  { color: var(--color-accent); }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 767px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

.stat-card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 24px;
}

.stat-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.stat-card__label {
  font-size: 14px;
  color: var(--color-text);
}

.stat-card__value {
  font-size: 30px;
  color: var(--color-text);
}
</style>
