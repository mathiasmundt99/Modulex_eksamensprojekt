<script setup>
import { useRouter } from "vue-router";
import BaseButton from "../BaseButton.vue";

defineProps({
  course: { type: Object, required: true },
});

const router = useRouter();
</script>

<template>
  <div class="course-card">
    <div class="course-card__body">
      <div class="course-card__info">
        <div class="course-card__title-row">
          <h3 class="course-card__title">{{ course.title }}</h3>
        </div>
        <div class="course-stats">
          <div class="course-stat">
            <p class="course-stat__label">Modules</p>
            <p class="course-stat__value">{{ course.contentIds?.length ?? 0 }}</p>
          </div>
          <div class="course-stat">
            <p class="course-stat__label">Enrolled Users</p>
            <p class="course-stat__value">{{ course.enrolledUsers ?? 0 }}</p>
          </div>
          <div class="course-stat">
            <p class="course-stat__label">Avg. Completion</p>
            <p class="course-stat__value">{{ course.avgCompletion ?? 0 }}%</p>
          </div>
        </div>
      </div>
      <div class="course-card__actions">
        <BaseButton variant="muted" @click="router.push('/admin/courses/' + course.id)">
          Edit Course
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.course-card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 24px;
  transition: box-shadow 0.15s;
}

.course-card:hover {
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
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
