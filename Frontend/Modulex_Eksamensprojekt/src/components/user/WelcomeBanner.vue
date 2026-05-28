<script setup>
import { ref, watch } from "vue";
import { getOnboardingProgress, getUserCourses } from "../../services/progressService.js";
import { useCurrentUser } from "../../composables/useCurrentUser.js";

const { user } = useCurrentUser();
const overallProgress = ref(0);
const hasCourses = ref(false);

watch(user, async (u) => {
  if (!u) return;
  try {
    const [onboarding, courses] = await Promise.all([
      getOnboardingProgress(u.id),
      getUserCourses(u.id),
    ]);
    overallProgress.value = onboarding.data?.overallCompletion ?? 0;
    hasCourses.value = (courses.data ?? []).length > 0;
  } catch (err) {
    console.error("Failed to load welcome banner data:", err);
  }
}, { immediate: true });
</script>

<template>
  <div class="welcome-banner">
    <h2 class="welcome-banner__title">Welcome back, {{ user?.firstName }}!</h2>
    <p class="welcome-banner__subtitle">Continue your learning journey</p>
    <div v-if="hasCourses" class="welcome-banner__progress">
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
