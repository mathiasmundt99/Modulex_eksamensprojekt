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
        <svg v-if="activity.type === 'check'" class="icon--primary" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <svg v-if="activity.type === 'users'" class="icon--accent" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <svg v-if="activity.type === 'clock'" class="icon--accent" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
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
