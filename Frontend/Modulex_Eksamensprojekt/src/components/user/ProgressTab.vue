<script setup>
import { ref, onMounted } from "vue";
import BreadCrumb from "../BreadCrumb.vue";
import HelpBanner from "../HelpBanner.vue";
import OverallProgress from "./OverallProgress.vue";
import OnboardingChecklist from "./OnboardingChecklist.vue";
import { getCourseById } from "../../services/courseService.js";

const overallProgress = ref(0);
const checklistItems = ref([]);

onMounted(async () => {
  try {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    if (!user) return;

    const response = await fetch(`http://localhost:3000/api/progress/${user.id}`, {
      credentials: "include",
    });
    if (!response.ok) return;
    const result = await response.json();
    const courses = result.data?.courses ?? [];

    const completedModules = courses.reduce(
      (sum, c) => sum + (c.completedContentIds?.length ?? 0),
      0,
    );
    const courseDetails = await Promise.all(courses.map((c) => getCourseById(c.courseId)));
    const totalModules = courseDetails.reduce((sum, c) => sum + (c.contentIds?.length ?? 0), 0);

    overallProgress.value =
      totalModules === 0 ? 0 : Math.round((completedModules / totalModules) * 100);

    checklistItems.value = courses.map((c) => ({
      id: c.courseId,
      title: c.courseName,
      completed: c.status === "completed",
    }));
  } catch (err) {
    console.error("Failed to load progress:", err);
  }
});
</script>

<template>
  <div class="tab-content">
    <BreadCrumb />
    <div class="page-header">
      <h2 class="page-title">Onboarding Progress</h2>
      <p class="page-subtitle">Track your journey to becoming a certified partner</p>
    </div>
    <OverallProgress :progress="overallProgress" />
    <OnboardingChecklist :items="checklistItems" />
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

.page-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text);
}

.page-subtitle {
  font-size: 15px;
  color: var(--color-text);
}
</style>
