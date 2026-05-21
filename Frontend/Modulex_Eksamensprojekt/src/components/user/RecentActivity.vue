<script setup>
const recentActivities = [
  { id: 1, title: 'Completed: Product Materials Overview', time: '2 hours ago', status: 'completed' },
  { id: 2, title: 'Started: Pricing & Quotes Module',      time: '1 day ago',   status: 'started' },
  { id: 3, title: 'Completed: Welcome Survey',             time: '3 days ago',  status: 'completed' }
]
</script>

<template>
  <div class="card">
    <h3 class="card__title">Recent Activity</h3>
    <div class="activity-list">
      <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
        <span
          class="material-symbols-rounded"
          :class="activity.status === 'completed' ? 'icon--primary' : 'icon--accent'"
        >
          {{ activity.status === 'completed' ? 'sports_score' : 'start' }}
        </span>
        <div class="activity-item__text">
          <p class="activity-item__title">{{ activity.title }}</p>
          <p class="activity-item__time">{{ activity.time }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon--primary { color: var(--color-primary); }
.icon--accent  { color: var(--color-accent); }

.card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 24px;
}

.card__title {
  font-size: 20px;
  color: var(--color-text);
  margin-bottom: 16px;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: var(--color-bg);
  border-radius: 8px;
  padding: 12px;
}

.activity-item__title {
  font-size: 14px;
  font-weight: 500;;
  color: var(--color-text);
}

.activity-item__time {
  font-size: 12px;
  color: var(--color-text);
  margin-top: 2px;
}
</style>
