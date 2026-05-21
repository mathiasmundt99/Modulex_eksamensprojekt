<script setup>
const activities = [
  { id: 1, text: 'John Doe completed "Product Configuration"',   time: '2 hours ago', type: 'check' },
  { id: 2, text: 'New user registered: Mike Johnson',            time: '5 hours ago', type: 'users' },
  { id: 3, text: 'Jane Smith started "Installation Best Practices"', time: '1 day ago', type: 'clock' }
]
</script>

<template>
  <div class="card">
    <h3 class="card__title">Recent User Activity</h3>
    <div class="activity-list">
      <div v-for="activity in activities" :key="activity.id" class="activity-item">
        <span
          class="material-symbols-rounded"
          :class="activity.type === 'check' ? 'icon--primary' : 'icon--accent'"
        >
          {{ activity.type === 'check' ? 'task_alt' : activity.type === 'users' ? 'person' : 'schedule' }}
        </span>
        <div>
          <p class="activity-item__text">{{ activity.text }}</p>
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

.activity-item__text {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
}

.activity-item__time {
  font-size: 12px;
  color: var(--color-text);
  margin-top: 2px;
}
</style>
