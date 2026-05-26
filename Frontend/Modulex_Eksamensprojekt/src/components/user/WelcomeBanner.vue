<script setup>
import { ref, onMounted } from "vue";
import { getCourseById } from "../../services/courseService.js";
import { getUserProgress } from "../../services/progressService.js";
import { getUser } from "../../utils/auth.js";

const firstName = ref("");
const overallProgress = ref(0);

onMounted(async () => {
  try {
    const user = getUser();
    if (!user) return;

    firstName.value = user.firstName;

    const result = await getUserProgress(user.id);
    const courses = result.data?.courses ?? [];

    const completedModules = courses.reduce(
      (sum, c) => sum + (c.completedContentIds?.length ?? 0),
      0,
    );
    const courseDetails = await Promise.all(courses.map((c) => getCourseById(c.courseId)));
    const totalModules = courseDetails.reduce((sum, c) => sum + (c.contentIds?.length ?? 0), 0);

    overallProgress.value =
      totalModules === 0 ? 0 : Math.round((completedModules / totalModules) * 100);
  } catch (err) {
    console.error("Failed to load welcome banner data:", err);
  }
});
</script>

<template>
  <div class="welcome-banner">
    <h2 class="welcome-banner__title">Welcome back, {{ firstName }}!</h2>
    <p class="welcome-banner__subtitle">Continue your learning journey</p>
    <div class="welcome-banner__progress">
      <div class="progress-header">
        <span>Overall Progress</span>
        <span>{{ overallProgress }}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar__fill" :style="{ width: overallProgress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-banner {
  background-image: url('@/assets/images/welcomebanner.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  padding: 32px;
  color: var(--color-white);
}

.welcome-banner__title {
  font-size: 28px;
  margin-bottom: 8px;
  max-width: 70%;
}

.welcome-banner__subtitle {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 24px;
  max-width: 70%;
}

.welcome-banner__progress {
  margin-top: 8px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 8px;
}

.progress-bar {
  height: 12px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  background-color: var(--color-white);
  border-radius: 9999px;
  transition: width 0.5s;
}
</style>
