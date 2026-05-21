<script setup>
import { ref } from 'vue'
import BaseButton from '../BaseButton.vue'
import AssignCourseModal from './AssignCourseModal.vue'

const props = defineProps({
  courses:          { type: Array, required: true },
  availableCourses: { type: Array, required: true },
  userName:         { type: String, required: true },
})

const emit = defineEmits(['remove-course', 'assign-course'])

const showModal = ref(false)
</script>

<template>
  <div class="card">
    <div class="section-header">
      <h3 class="card-title">Enrolled Courses</h3>
      <BaseButton @click="showModal = true">
        <span class="material-symbols-rounded">add</span>
        Assign Course
      </BaseButton>
    </div>

    <div class="course-list">
      <div
        v-for="course in courses"
        :key="course.id"
        class="course-card"
      >
        <div class="course-card__body">
          <div class="course-card__info">
            <div class="course-title-row">
              <h4 class="course-title">{{ course.title }}</h4>
              <span
                v-if="course.progress === 100"
                class="material-symbols-rounded completed-icon"
              >task_alt</span>
            </div>
            <div class="course-meta">
              <span><span class="meta-label">Enrolled:</span> {{ course.enrolledDate }}</span>
              <span v-if="course.completedDate">
                <span class="meta-label">Completed:</span> {{ course.completedDate }}
              </span>
              <span><span class="meta-label">Time spent:</span> {{ course.timeSpent }}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-bar__fill" :style="{ width: course.progress + '%' }"></div>
            </div>
            <p class="progress-label">{{ course.progress }}% complete</p>
          </div>
          <BaseButton variant="ghost" class="remove-btn" @click="emit('remove-course', course.id)">Remove</BaseButton>
        </div>
      </div>
    </div>

    <AssignCourseModal
      :show="showModal"
      :userName="userName"
      :availableCourses="availableCourses"
      @close="showModal = false"
      @assign="(course) => { emit('assign-course', course); showModal = false }"
    />
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

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}

.course-list { 
  display: flex; 
  flex-direction: column; 
  gap: 12px; 
}

.course-card {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  transition: box-shadow 0.15s;
}
.course-card:hover { 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); 
}

.course-card__body {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.course-card__info { 
  flex: 1; 
  min-width: 0; 
}

.course-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.course-title   { 
  font-size: 16px; 
  color: var(--color-text); 
}

.completed-icon { 
  font-size: 20px; 
  color: var(--color-accent); 
}

.course-meta {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  font-size: 13px;
  color: var(--color-text);
}

.meta-label { 
  font-size: 11px; 
  opacity: 0.7; 
}

.progress-bar {
  height: 8px;
  background-color: var(--color-border);
  border-radius: 9999px;
  overflow: hidden;
  margin: 10px 0 4px;
}

.progress-bar__fill {
  height: 100%;
  background-color: var(--color-primary);
  border-radius: 9999px;
  transition: width 0.4s;
}

.progress-label { 
  font-size: 12px; 
  color: var(--color-text); 
}

.remove-btn {
  font-size: 13px;
  color: var(--color-primary);
  background: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: color 0.15s;
}

.remove-btn:hover { 
  color: var(--color-primary-hover); 
}
</style>
