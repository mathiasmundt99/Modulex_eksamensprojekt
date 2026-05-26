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
  updateCourse,
  deleteCourse,
  linkContentToCourse,
  unlinkContentFromCourse,
} from "@/services/courseService";
import { getLibraryContent } from "@/services/contentService";

const route = useRoute();
const router = useRouter();

const isNew = computed(() => !route.params.courseId);

const courseData = ref({
  title: "",
  description: "",
  modulesId: [],
});

const modules = ref([]);
const availableContent = ref([]);
const isEditing = ref(isNew.value);
const isLoading = ref(false);
const error = ref(null);

const breadcrumbItems = computed(() => [
  { label: "Admin", to: "/admin" },
  { label: "Courses", to: "/admin/courses" },
  { label: isNew.value ? "New Course" : courseData.value.title },
]);

function contentToModule(item) {
  return {
    id: item.id,
    title: item.title,
    type: item.type,
    duration: item.type === "video" ? item.durationOrPages : undefined,
    pages: item.type === "pdf" ? item.durationOrPages : undefined,
  };
}

onMounted(async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const [allContent, course] = await Promise.all([
      getLibraryContent(),
      isNew.value ? null : getCourseById(route.params.courseId),
    ]);

    availableContent.value = allContent;

    if (course) {
      courseData.value = { ...course };
      const linkedIds = new Set(course.contentIds ?? []);
      modules.value = allContent
        .filter((item) => linkedIds.has(item.id))
        .sort((a, b) => course.contentIds.indexOf(a.id) - course.contentIds.indexOf(b.id))
        .map(contentToModule);
    }
  } catch (err) {
    console.error("Failed to load course:", err);
    error.value = "Failed to load course data";
  } finally {
    isLoading.value = false;
  }
});

async function handleSave() {
  try {
    await updateCourse(route.params.courseId, {
      title: courseData.value.title,
      description: courseData.value.description,
    });
    isEditing.value = false;
  } catch (err) {
    console.error("Failed to save course:", err);
    error.value = "Failed to save course";
  }
}

function handleCancel() {
  if (isNew.value) {
    router.push("/admin/courses");
  } else {
    isEditing.value = false;
  }
}

async function handleDelete() {
  try {
    await deleteCourse(route.params.courseId);
    router.push("/admin/courses");
  } catch (err) {
    console.error("Failed to delete course:", err);
    error.value = "Failed to delete course";
  }
}

async function removeModule(id) {
  try {
    await unlinkContentFromCourse(route.params.courseId, id);
    modules.value = modules.value.filter((m) => m.id !== id);
  } catch (err) {
    console.error("Failed to remove module:", err);
  }
}

async function addModule(content) {
  if (modules.value.some((m) => m.id === content.id)) return;
  try {
    await linkContentToCourse(route.params.courseId, content.id);
    modules.value.push(contentToModule(content));
  } catch (err) {
    console.error("Failed to add module:", err);
  }
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
