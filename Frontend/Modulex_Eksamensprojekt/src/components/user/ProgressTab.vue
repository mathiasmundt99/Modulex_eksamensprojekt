<script setup>
import HelpBanner from '../HelpBanner.vue'

const onboardingProgress = 45

const checklistItems = [
  { id: 1, title: 'Complete welcome survey', completed: true },
  { id: 2, title: 'Watch introduction video', completed: true },
  { id: 3, title: 'Review product catalog', completed: true },
  { id: 4, title: 'Complete product configuration course', completed: false },
  { id: 5, title: 'Access ordering system', completed: false },
  { id: 6, title: 'Complete first test order', completed: false }
]
</script>

<template>
  <div class="tab-content">
    <div class="page-header">
      <h2 class="page-title">Onboarding Progress</h2>
      <p class="page-subtitle">Track your journey to becoming a certified partner</p>
    </div>

    <div class="card">
      <div class="overall-header">
        <h3 class="card__title">Overall Completion</h3>
        <span class="overall-pct">{{ onboardingProgress }}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar__fill" :style="{ width: onboardingProgress + '%' }"></div>
      </div>
    </div>

    <div class="card">
      <h3 class="card__title">Onboarding Checklist</h3>
      <div class="checklist">
        <div
          v-for="item in checklistItems"
          :key="item.id"
          :class="['checklist-item', { 'checklist-item--done': item.completed }]"
        >
          <svg v-if="item.completed" class="icon--primary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <svg v-else class="icon--border" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
          </svg>
          <span :class="{ 'text-strikethrough': item.completed }">{{ item.title }}</span>
        </div>
      </div>
    </div>
    <HelpBanner />
  </div>
</template>

<style scoped>
.icon--primary { color: var(--color-primary); }
.icon--border  { color: var(--color-border); }

.tab-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text);
}

.page-subtitle {
  font-size: 15px;
  color: var(--color-text);
}

.card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 24px;
}

.card__title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 16px;
}

.overall-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.overall-header .card__title {
  margin-bottom: 0;
}

.overall-pct {
  font-size: 24px;
  color: var(--color-primary);
}

.progress-bar {
  height: 16px;
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

.checklist {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checklist-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background-color: var(--color-white);
  font-size: 15px;
  color: var(--color-text);
}

.checklist-item--done {
  background-color: var(--color-bg);
  border-color: var(--color-primary);
}

.text-strikethrough {
  text-decoration: line-through;
}
</style>
