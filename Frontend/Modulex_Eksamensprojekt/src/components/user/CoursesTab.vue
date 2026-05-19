<script setup>
import HelpBanner from '../HelpBanner.vue'
import BaseButton from '../BaseButton.vue'

const courses = [
  {
    id: 1,
    title: 'Introduction to Modulex Sign Systems',
    description: 'Learn the basics of our modular signage solutions',
    progress: 100,
    status: 'completed',
    modules: 4,
    duration: '2 hours'
  },
  {
    id: 2,
    title: 'Product Configuration & Ordering',
    description: 'Master the ordering process and configuration tools',
    progress: 60,
    status: 'in-progress',
    modules: 5,
    duration: '3 hours'
  },
  {
    id: 3,
    title: 'Installation Best Practices',
    description: 'Professional installation techniques and guidelines',
    progress: 0,
    status: 'locked',
    modules: 6,
    duration: '4 hours'
  }
]
</script>

<template>
  <div class="tab-content">
    <h2 class="page-title">My Courses</h2>

    <div v-for="course in courses" :key="course.id" class="course-card">
      <div class="course-card__body">
        <div class="course-card__info">
          <div class="course-card__title-row">
            <h3 class="course-card__title">{{ course.title }}</h3>
            <svg v-if="course.status === 'completed'" class="icon--primary" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <p class="course-card__description">{{ course.description }}</p>
          <div class="course-card__meta">
            <span class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 0 3-3h7z"/>
              </svg>
              {{ course.modules }} modules
            </span>
            <span class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              {{ course.duration }}
            </span>
          </div>
          <div v-if="course.status !== 'locked'" class="course-card__progress">
            <div class="progress-bar">
              <div class="progress-bar__fill" :style="{ width: course.progress + '%' }"></div>
            </div>
            <span class="progress-label">{{ course.progress }}% complete</span>
          </div>
        </div>
        <div class="course-card__actions">
          <BaseButton v-if="course.status === 'completed'" variant="muted">Review</BaseButton>
          <BaseButton v-if="course.status === 'in-progress'">Continue</BaseButton>
          <BaseButton v-if="course.status === 'locked'" variant="disabled" disabled>Locked</BaseButton>
        </div>
      </div>
    </div>
    <HelpBanner />
  </div>
</template>

<style scoped>
.icon--primary { color: var(--color-primary); }

.tab-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.page-title {
  font-size: 24px;
  font-weight: 400;
  color: var(--color-text);
}

.course-card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 24px;
  transition: box-shadow 0.15s;
}

.course-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.course-card__body {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
}

.course-card__info {
  flex: 1;
}

.course-card__title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.course-card__title {
  font-size: 20px;
  font-weight: 400;
  color: var(--color-text);
}

.course-card__description {
  font-size: 15px;
  color: var(--color-text);
  margin-bottom: 16px;
}

.course-card__meta {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: var(--color-text);
}

.course-card__progress {
  margin-top: 8px;
}

.course-card__actions {
  flex-shrink: 0;
}

.progress-bar {
  height: 8px;
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

.progress-label {
  font-size: 12px;
  color: var(--color-text);
  margin-top: 6px;
  display: block;
}

</style>
