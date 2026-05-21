<script setup>
import { useRouter } from 'vue-router'
import BaseButton from '../BaseButton.vue'
import BreadCrumb from '../BreadCrumb.vue'

const router = useRouter()

const courses = [
  { id: 1, title: 'Introduction to Modulex Sign Systems',  modules: 4, enrolledUsers: 24, avgCompletion: 75, status: 'Published' },
  { id: 2, title: 'Product Configuration & Ordering',       modules: 5, enrolledUsers: 18, avgCompletion: 42, status: 'Published' },
  { id: 3, title: 'Advanced Installation Techniques',       modules: 6, enrolledUsers: 0,  avgCompletion: 0,  status: 'Draft' }
]
</script>

<template>
  <div class="tab-content">
    <BreadCrumb />
    <div class="tab-header">
      <div>
        <h2 class="page-title">Courses &amp; Packages</h2>
        <p class="page-subtitle">Create and manage learning paths</p>
      </div>
      <BaseButton @click="router.push('/admin/courses/new')">
        <span class="material-symbols-rounded">add</span>
        Create Course
      </BaseButton>
    </div>

    <div v-for="course in courses" :key="course.id" class="course-card">
      <div class="course-card__body">
        <div class="course-card__info">
          <div class="course-card__title-row">
            <h3 class="course-card__title">{{ course.title }}</h3>
            <span :class="['badge', course.status === 'Published' ? 'badge--published' : 'badge--draft']">
              {{ course.status }}
            </span>
          </div>
          <div class="course-stats">
            <div class="course-stat">
              <p class="course-stat__label">Modules</p>
              <p class="course-stat__value">{{ course.modules }}</p>
            </div>
            <div class="course-stat">
              <p class="course-stat__label">Enrolled Users</p>
              <p class="course-stat__value">{{ course.enrolledUsers }}</p>
            </div>
            <div class="course-stat">
              <p class="course-stat__label">Avg. Completion</p>
              <p class="course-stat__value">{{ course.avgCompletion }}%</p>
            </div>
          </div>
        </div>
        <div class="course-card__actions">
          <BaseButton variant="muted" @click="router.push('/admin/courses/' + course.id)">Edit Course</BaseButton>
          <BaseButton variant="ghost">View Analytics</BaseButton>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.tab-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
}

.tab-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.page-title {
  font-size: 24px;
  color: var(--color-text);
}

.page-subtitle {
  font-size: 15px;
  color: var(--color-text);
  margin-top: 4px;
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
  gap: 12px;
  margin-bottom: 16px;
}

.course-card__title {
  font-size: 20px;
  color: var(--color-text);
}

.badge {
  padding: 4px 12px;
  font-size: 12px;
  border-radius: 9999px;
}

.badge--published {
  background-color: var(--color-accent);
  color: var(--color-white);
}

.badge--draft {
  background-color: var(--color-border);
  color: var(--color-text);
}

.course-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 599px) {
  .course-stats {
    grid-template-columns: 1fr;
  }
}

.course-stat {
  background-color: var(--color-bg);
  border-radius: 8px;
  padding: 12px;
}

.course-stat__label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 4px;
}

.course-stat__value {
  font-size: 24px;
  color: var(--color-text);
}

.course-card__actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}

</style>
