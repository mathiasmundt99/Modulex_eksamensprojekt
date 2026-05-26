<script setup>
import { useRouter } from "vue-router";
import BaseButton from "../BaseButton.vue";

const props = defineProps({
  course: { type: Object, required: true },
});

const router = useRouter();

function openCourse() {
  router.push(`/course/${props.course.id}`);
}
</script>

<template>
  <div class="course-card">
    <div class="course-card__body">
      <div class="course-card__info">
        <div class="course-card__title-row">
          <h3 class="course-card__title">{{ course.title }}</h3>
          <span
            v-if="course.status === 'completed'"
            class="material-symbols-rounded icon--primary">
            check_circle_outline
          </span>
        </div>
        <p class="course-card__description">{{ course.description }}</p>
        <div class="course-card__meta">
          <span class="meta-item">
            <span class="material-symbols-rounded">import_contacts</span>
            {{ course.modules }} modules
          </span>
        </div>
        <div class="course-card__progress">
          <div class="progress-bar">
            <div class="progress-bar__fill" :style="{ width: course.progress + '%' }"></div>
          </div>
          <span class="progress-label">{{ course.progress }}% complete</span>
        </div>
      </div>
      <div class="course-card__actions">
        <BaseButton v-if="course.status === 'completed'" variant="muted" @click="openCourse">
          Review
        </BaseButton>
        <BaseButton v-else-if="course.hasStarted" @click="openCourse">Continue</BaseButton>
        <BaseButton v-else @click="openCourse">Start Course</BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon--primary {
  color: var(--color-primary);
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
  font-weight: 600;
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
