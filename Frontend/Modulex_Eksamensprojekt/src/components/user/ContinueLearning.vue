<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "../BaseButton.vue";
import { getUserCourses } from "../../services/progressService.js";

const router = useRouter();
const courses = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    if (!user) return;

    const result = await getUserCourses(user.id);
    courses.value = result.data.filter((c) => c.status === "in_progress" && c.hasStarted);
  } catch (err) {
    console.error("Failed to load continue learning:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="card">
    <h3 class="card__title">Continue Learning</h3>

    <div v-if="loading" class="empty-state">Loading...</div>

    <div v-else-if="courses.length === 0" class="empty-state">
      No courses in progress. Head to
      <a class="empty-link" @click="router.push('/dashboard/courses')">My Courses</a>
      to get started.
    </div>

    <div v-else class="course-list">
      <div v-for="course in courses" :key="course.courseId" class="continue-item">
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
