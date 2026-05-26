<script setup>
import { ref, onMounted } from "vue";
import BreadCrumb from "../BreadCrumb.vue";
import HelpBanner from "../HelpBanner.vue";
import UserCourseCard from "./UserCourseCard.vue";
import { getUserCourses } from "../../services/progressService.js";
import { getCourseById } from "../../services/courseService.js";

const courses = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    if (!user) return;

    const result = await getUserCourses(user.id);
    const progressList = result.data;

    const enriched = await Promise.all(
      progressList.map(async (p) => {
        const course = await getCourseById(p.courseId);
        return {
          id: p.courseId,
          title: p.courseName,
          description: course.description ?? "",
          modules: course.contentIds?.length ?? 0,
          progress: p.completionPercentage,
          status: p.status,
          hasStarted: p.hasStarted,
        };
      }),
    );

    courses.value = enriched;
  } catch (err) {
    console.error("Failed to load courses:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="tab-content">
    <BreadCrumb />
    <h2 class="page-title">My Courses</h2>

    <div v-if="loading" class="state-message">Loading courses...</div>
    <div v-else-if="courses.length === 0" class="state-message">
      You have no courses assigned yet.
    </div>
    <template v-else>
      <UserCourseCard v-for="course in courses" :key="course.id" :course="course" />
    </template>

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

.state-message {
  font-size: 15px;
  color: var(--color-text);
  opacity: 0.6;
  padding: 16px 0;
}
</style>
