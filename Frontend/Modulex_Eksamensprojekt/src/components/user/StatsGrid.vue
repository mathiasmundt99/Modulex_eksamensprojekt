<script setup>
const completedModules = 3
const totalModules = 7
</script>

<template>
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-card__header">
        <span class="stat-card__label">Completed Modules</span>
        <span class="material-symbols-rounded icon--primary">check_circle_outline</span>
      </div>
      <p class="stat-card__value">{{ completedModules }}/{{ totalModules }}</p>
    </div>

    <div class="stat-card">
      <div class="stat-card__header">
        <span class="stat-card__label">Hours Completed</span>
        <span class="material-symbols-rounded icon--accent">schedule</span>
      </div>
      <p class="stat-card__value">5.5</p>
    </div>

    <div class="stat-card">
      <div class="stat-card__header">
        <span class="stat-card__label">Active Courses</span>
        <span class="material-symbols-rounded icon--accent">import_contacts</span>
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
    font-weight: 600;
  color: var(--color-text);
}

.stat-card__value {
  font-size: 30px;
  color: var(--color-text);
}
</style>
