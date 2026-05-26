<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "../BaseButton.vue";
import BreadCrumb from "../BreadCrumb.vue";
import {
  getAllCourses,
  deleteCourse,
  updateCourse,
} from "@/services/courseService";
import CreateCourseModal from "./CreateCourseModal.vue";
import CourseCard from "./CourseCard.vue";

const router = useRouter();
const courses = ref([]);
const isLoading = ref(false);
const error = ref(null);

onMounted(async () => {
  await loadCourses();
});

async function loadCourses() {
  isLoading.value = true;
  error.value = null;
  try {
    courses.value = await getAllCourses();
  } catch (err) {
    console.error("Failed to load courses:", err);
    error.value = "Failed to load courses";
  } finally {
    isLoading.value = false;
  }
}

async function handleDeleteCourse(courseId) {
  if (!confirm("Are you sure you want to delete this course?")) return;

  try {
    await deleteCourse(courseId);
    courses.value = courses.value.filter((c) => c.id !== courseId);
  } catch (err) {
    console.error("Failed to delete course:", err);
    error.value = "Failed to delete course";
  }
}

function handleEditCourse(courseId) {
  router.push("/admin/courses/" + courseId);
}

const showCreateModal = ref(false);

function handleCreateCourse() {
  showCreateModal.value = true;
}

async function handleCourseCreated(newCourse) {
  courses.value.push(newCourse);
}
</script>

<template>
  <div class="tab-content">
    <BreadCrumb />
    <div class="tab-header">
      <div>
        <h2 class="page-title">Courses &amp; Packages</h2>
        <p class="page-subtitle">Create and manage learning paths</p>
      </div>
      <BaseButton @click="handleCreateCourse">
        <span class="material-symbols-rounded">add</span>
        Create Course
      </BaseButton>
    </div>

    <div v-if="courses.length === 0" class="empty-state">
      <p>No courses yet. Create your first course!</p>
    </div>

    <CourseCard
      v-for="course in courses"
      :key="course.id"
      :course="course" />

    <CreateCourseModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @course-created="handleCourseCreated" />
  </div>
</template>

<style scoped>
.error-message {
  padding: 12px 16px;
  background-color: #fee;
  color: #c33;
  border-radius: 8px;
  margin-bottom: 16px;
}

.loading-message {
  padding: 12px 16px;
  background-color: #eef;
  color: #33c;
  border-radius: 8px;
  margin-bottom: 16px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: var(--color-text);
  opacity: 0.6;
}

.course-card__description {
  font-size: 14px;
  color: var(--color-text);
  opacity: 0.8;
  margin-bottom: 12px;
}

.tab-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
}

.tab-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.page-title {
  font-size: 24px;
  color: var(--color-text);
}

.page-subtitle {
  font-size: 15px;
  color: var(--color-text);
  margin-top: 4px;
}

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

.badge {
  padding: 4px 12px;
  font-size: 12px;
  border-radius: 9999px;
}

.badge--published {
  background-color: var(--color-accent);
  color: var(--color-white);
}

.badge--draft {
  background-color: var(--color-border);
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
