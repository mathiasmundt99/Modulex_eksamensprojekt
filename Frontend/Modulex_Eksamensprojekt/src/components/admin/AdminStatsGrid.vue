<script setup>
const stats = {
  totalUsers: 24,
  activeUsers: 18,
  totalCourses: 8,
  totalContent: 45
}

const activePercent = Math.round((stats.activeUsers / stats.totalUsers) * 100)
</script>

<template>
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-card__header">
        <span class="stat-card__label">Total Users</span>
        <svg class="icon--primary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      </div>
      <p class="stat-card__value">{{ stats.totalUsers }}</p>
      <p class="stat-card__sub">+3 this month</p>
    </div>

    <div class="stat-card">
      <div class="stat-card__header">
        <span class="stat-card__label">Active Users</span>
        <svg class="icon--accent" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <p class="stat-card__value">{{ stats.activeUsers }}</p>
      <p class="stat-card__sub">{{ activePercent }}% active</p>
    </div>

    <div class="stat-card">
      <div class="stat-card__header">
        <span class="stat-card__label">Total Courses</span>
        <svg class="icon--accent" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 0 3-3h7z"/>
        </svg>
      </div>
      <p class="stat-card__value">{{ stats.totalCourses }}</p>
      <p class="stat-card__sub">2 published</p>
    </div>

    <div class="stat-card">
      <div class="stat-card__header">
        <span class="stat-card__label">Content Items</span>
        <svg class="icon--accent" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="16 16 12 12 8 16"/>
          <line x1="12" y1="12" x2="12" y2="21"/>
          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
        </svg>
      </div>
      <p class="stat-card__value">{{ stats.totalContent }}</p>
      <p class="stat-card__sub">Videos &amp; PDFs</p>
    </div>
  </div>
</template>

<style scoped>
.icon--primary { color: var(--color-primary); }
.icon--accent  { color: var(--color-accent); }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (max-width: 1023px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 599px) {
  .stats-grid { grid-template-columns: 1fr; }
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
  margin-bottom: 4px;
}

.stat-card__sub {
  font-size: 12px;
  color: var(--color-text);
}
</style>
