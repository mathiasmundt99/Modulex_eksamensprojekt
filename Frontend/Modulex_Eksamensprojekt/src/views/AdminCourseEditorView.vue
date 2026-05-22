<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import BreadCrumb from "../components/BreadCrumb.vue";
import BaseButton from "../components/BaseButton.vue";
import CourseDetailsCard from "../components/admin/CourseDetailsCard.vue";
import CourseStatsCard from "../components/admin/CourseStatsCard.vue";
import CourseDangerZone from "../components/admin/CourseDangerZone.vue";
import CourseModulesList from "../components/admin/CourseModulesList.vue";
import {
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  linkModuleToCourse,
} from "@/services/courseService";

const route = useRoute();
const router = useRouter();

const isNew = computed(() => !route.params.courseId);

const courseData = ref({
  title: "",
  description: "",
  modulesId: [],
});

const modules = ref([]);
const isEditing = ref(isNew.value);
const isLoading = ref(false);
const error = ref(null);

const breadcrumbItems = computed(() => [
  { label: "Admin", to: "/admin" },
  { label: "Courses", to: "/admin/courses" },
  { label: isNew.value ? "New Course" : courseData.value.title },
]);

onMounted(async () => {
  if (isNew.value) return;

  isLoading.value = true;
  error.value = null;

  try {
    const course = await getCourseById(route.params.courseId);
    courseData.value = { ...course };
    // modulesId kommer fra API'en, men vi viser dem som tom liste til vi har modules endpoint
    modules.value = [];
  } catch (err) {
    console.error("Failed to load course:", err);
    error.value = "Failed to load course data";
  } finally {
    isLoading.value = false;
  }
});

function handleSave() {
  isEditing.value = false;
}

function handleCancel() {
  if (isNew.value) {
    router.push("/admin/courses");
  } else {
    isEditing.value = false;
  }
}

function handleDelete() {
  router.push("/admin/courses");
}

function removeModule(id) {
  const idx = modules.value.findIndex((m) => m.id === id);
  if (idx !== -1) modules.value.splice(idx, 1);
}

function addModule(content) {
  modules.value.push({
    id: Date.now(),
    title: content.title,
    type: content.type,
    duration: content.type === "video" ? content.duration : undefined,
    pages: content.type === "pdf" ? content.pages : undefined,
    contentId: content.id,
  });
}

function reorderModules({ from, to }) {
  const list = [...modules.value];
  const [moved] = list.splice(from, 1);
  list.splice(to, 0, moved);
  modules.value = list;
}
</script>

<template>
  <div class="editor">
    <BreadCrumb :items="breadcrumbItems" />

    <div class="editor__header">
      <div class="editor__heading">
        <h1 class="editor__title">
          {{ isNew ? "Create Course" : "Edit Course" }}
        </h1>
        <p class="editor__subtitle">
          {{
            isNew
              ? "Set up your new course"
              : "Manage course content and settings"
          }}
        </p>
      </div>
      <div class="editor__actions">
        <template v-if="isNew">
          <BaseButton variant="outline" @click="handleCancel"
            >Cancel</BaseButton
          >
          <BaseButton @click="handleSave">Save Course</BaseButton>
        </template>
        <template v-else-if="isEditing">
          <BaseButton variant="outline" @click="handleCancel"
            >Cancel</BaseButton
          >
          <BaseButton @click="handleSave">
            <span class="material-symbols-rounded">save</span>
            Save Changes
          </BaseButton>
        </template>
        <template v-else>
          <BaseButton variant="muted" @click="isEditing = true">
            <span class="material-symbols-rounded">edit</span>
            Edit Course
          </BaseButton>
        </template>
      </div>
    </div>

    <div class="editor__grid">
      <div class="col">
        <CourseDetailsCard
          :courseData="courseData"
          :isEditing="isEditing"
          @update:courseData="courseData = $event" />
        <CourseStatsCard
          :modules="modules"
          :enrolledUsers="courseData.enrolledUsers" />
        <CourseDangerZone v-if="isEditing && !isNew" @delete="handleDelete" />
      </div>
      <div class="col">
        <CourseModulesList
          :modules="modules"
          :isEditing="isEditing"
          :availableContent="availableContent"
          @remove-module="removeModule"
          @add-module="addModule"
          @reorder="reorderModules" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.editor__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.editor__heading {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.editor__title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text);
}

.editor__subtitle {
  font-size: 15px;
  color: var(--color-text);
}

.editor__actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.editor__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 1024px) {
  .editor__grid {
    grid-template-columns: 320px 1fr;
  }
}

.col {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
