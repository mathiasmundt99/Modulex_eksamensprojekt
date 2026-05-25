<script setup>
import BreadCrumb from '../BreadCrumb.vue'
import HelpBanner from '../HelpBanner.vue'
import UserCourseCard from './UserCourseCard.vue'

const courses = [
  { id: 1, title: 'Introduction to Modulex Sign Systems',  description: 'Learn the basics of our modular signage solutions',       progress: 100, status: 'completed',  modules: 4, duration: '2 hours' },
  { id: 2, title: 'Product Configuration & Ordering',      description: 'Master the ordering process and configuration tools',      progress: 60,  status: 'in-progress', modules: 5, duration: '3 hours' },
  { id: 3, title: 'Installation Best Practices',           description: 'Professional installation techniques and guidelines',      progress: 0,   status: 'locked',      modules: 6, duration: '4 hours' },
]
</script>

<template>
  <div class="tab-content">
    <BreadCrumb />
    <h2 class="page-title">My Courses</h2>
    <UserCourseCard v-for="course in courses" :key="course.id" :course="course" />
    <HelpBanner />
  </div>
</template>

<style scoped>
.tab-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text);
}
</style>
