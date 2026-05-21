<script setup>
defineProps({
  user: { type: Object, required: true }
})
</script>

<template>
  <div class="card">
    <h3 class="card-title">Statistics</h3>
    <div class="stats-list">
      <div>
        <p class="stat-label">Enrolled Date</p>
        <p class="stat-value">{{ user.enrolledDate ?? '—' }}</p>
      </div>
      <div>
        <p class="stat-label">Last Active</p>
        <p class="stat-value">{{ user.lastActive ?? '—' }}</p>
      </div>
      <div>
        <p class="stat-label">Overall Progress</p>
        <div class="progress-bar">
          <div class="progress-bar__fill" :style="{ width: user.progress + '%' }"></div>
        </div>
        <p class="stat-value">{{ user.progress }}%</p>
      </div>
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

.card-title {
  font-size: 18px;
  color: var(--color-text);
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
}

.stat-label {
  font-size: 13px;
  color: var(--color-text);
  margin-bottom: 4px;
}

.stat-value {
  font-size: 15px;
  color: var(--color-text);
}

.progress-bar {
  height: 8px;
  background-color: var(--color-border);
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 4px;
}
.progress-bar__fill {
  height: 100%;
  background-color: var(--color-primary);
  border-radius: 9999px;
  transition: width 0.4s;
}
</style>
