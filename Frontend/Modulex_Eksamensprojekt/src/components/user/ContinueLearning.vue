<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "../BaseButton.vue";
import NoCoursesPending from "./NoCoursesPending.vue";
import { getUserCourses } from "../../services/progressService.js";
import { useCurrentUser } from "../../composables/useCurrentUser.js";

const { user } = useCurrentUser();
const router = useRouter();
const inProgressCourses = ref([]);
const hasAnyCourses = ref(false);
const loading = ref(true);

watch(user, async (u) => {
  if (!u) return;
  try {
    const result = await getUserCourses(u.id);
    const all = result.data ?? [];
    hasAnyCourses.value = all.length > 0;
    inProgressCourses.value = all.filter((c) => c.status === "in_progress" && c.hasStarted);
  } catch (err) {
    console.error("Failed to load continue learning:", err);
  } finally {
    loading.value = false;
  }
}, { immediate: true });
</script>

<template>
  <!-- Loading -->
  <div v-if="loading" class="card">
    <h3 class="card__title">Continue Learning</h3>
    <div class="empty-state">Loading...</div>
  </div>

  <!-- No courses assigned yet -->
  <NoCoursesPending v-else-if="!hasAnyCourses" />

  <!-- Has courses -->
  <div v-else class="card">
    <h3 class="card__title">Continue Learning</h3>

    <div v-if="inProgressCourses.length === 0" class="empty-state">
      No courses in progress. Head to
      <a class="empty-link" @click="router.push('/dashboard/courses')">My Courses</a>
      to get started.
    </div>

    <div v-else class="course-list">
      <div v-for="course in inProgressCourses" :key="course.courseId" class="continue-item">
        <div class="continue-item__info">
          <h4 class="continue-item__name">{{ course.courseName }}</h4>
          <p class="continue-item__meta">{{ course.completionPercentage }}% complete</p>
          <div class="progress-bar">
            <div
              class="progress-bar__fill"
              :style="{ width: course.completionPercentage + '%' }"></div>
          </div>
        </div>
        <BaseButton @click="router.push(`/course/${course.courseId}`)">Resume Course</BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Shared card base ── */
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

/* ── Empty / in-progress states ── */
.empty-state {
  font-size: 14px;
  color: var(--color-text);
  opacity: 0.6;
}

.empty-link {
  color: var(--color-primary);
  cursor: pointer;
  text-decoration: underline;
}

.course-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.continue-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background-color: var(--color-bg);
  border-radius: 8px;
  padding: 16px;
  flex-wrap: wrap;
}

.continue-item__info {
  flex: 1;
  min-width: 0;
}

.continue-item__name {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 4px;
}

.continue-item__meta {
  font-size: 13px;
  color: var(--color-text);
  opacity: 0.7;
  margin-bottom: 10px;
}

.progress-bar {
  height: 8px;
  background-color: var(--color-border);
  border-radius: 9999px;
  overflow: hidden;
  max-width: 320px;
}

.progress-bar__fill {
  height: 100%;
  background-color: var(--color-primary);
  border-radius: 9999px;
  transition: width 0.5s;
}
</style>
