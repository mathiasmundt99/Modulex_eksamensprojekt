<script setup>
const recentActivities = [
  { id: 1, title: 'Completed: Product Materials Overview', time: '2 hours ago', type: 'video' },
  { id: 2, title: 'Started: Pricing & Quotes Module', time: '1 day ago', type: 'pdf' },
  { id: 3, title: 'Completed: Welcome Survey', time: '3 days ago', type: 'survey' }
]
</script>

<template>
  <div class="card">
    <h3 class="card__title">Recent Activity</h3>
    <div class="activity-list">
      <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
        <svg v-if="activity.type === 'video'" class="icon--accent" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="7" width="15" height="10" rx="1"/>
          <polygon points="17 8 22 4 22 20 17 16"/>
        </svg>
        <svg v-if="activity.type === 'pdf'" class="icon--accent" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
        <svg v-if="activity.type === 'survey'" class="icon--primary" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
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
  font-weight: 400;
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
  color: var(--color-text);
}

.activity-item__time {
  font-size: 12px;
  color: var(--color-text);
  margin-top: 2px;
}
</style>
