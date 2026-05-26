<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import UserNavbar from "../components/user/UserNavbar.vue";
import CourseHeader from "../components/course/CourseHeader.vue";
import CourseModuleSidebar from "../components/course/CourseModuleSidebar.vue";
import VideoPlayer from "../components/course/VideoPlayer.vue";
import PdfViewer from "../components/course/PdfViewer.vue";
import BaseButton from "../components/BaseButton.vue";
import { getCourseById } from "../services/courseService.js";
import { getLibraryContentById } from "../services/contentService.js";
import { getUserCourseProgress, updateProgress } from "../services/progressService.js";
import { getUser } from "../utils/auth.js";

const router = useRouter();
const route = useRoute();

const sidebarOpen = ref(true);
const currentItemIndex = ref(0);
const courseTitle = ref("");
const courseDescription = ref("");
const contentItems = ref([]);
const loading = ref(true);

const user = getUser();

function toEmbedUrl(url) {
  if (!url) return "";
  const match = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;
  return url;
}

function toPdfUrl(url) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${import.meta.env.VITE_API_URL.replace("/api", "")}${url}`;
}

onMounted(async () => {
  try {
    const courseId = route.params.courseId;

    const [courseRes, progressRes] = await Promise.all([
      getCourseById(courseId),
      user ? getUserCourseProgress(user.id, courseId) : Promise.resolve(null),
    ]);

    courseTitle.value = courseRes.title;
    courseDescription.value = courseRes.description;

    const completedIds = progressRes?.data?.completedContentIds ?? [];

    const items = await Promise.all(
      courseRes.contentIds.map(async (id) => {
        const item = await getLibraryContentById(id);
        return {
          id: item.id,
          title: item.title,
          description: item.description ?? "",
          type: item.type,
          duration: item.type === "video" ? item.durationOrPages : null,
          pages: item.type === "pdf" ? Number(item.durationOrPages) || null : null,
          videoUrl: item.type === "video" ? toEmbedUrl(item.url) : null,
          pdfUrl: item.type === "pdf" ? toPdfUrl(item.url) : null,
          completed: completedIds.includes(id),
        };
      }),
    );

    contentItems.value = items;
  } catch (err) {
    console.error("Failed to load course:", err);
  } finally {
    loading.value = false;
  }
});

const currentItem = computed(() => contentItems.value[currentItemIndex.value]);
const completedCount = computed(() => contentItems.value.filter((i) => i.completed).length);
const progressPercentage = computed(() =>
  contentItems.value.length === 0
    ? 0
    : Math.round((completedCount.value / contentItems.value.length) * 100),
);

async function handleMarkComplete() {
  const item = contentItems.value[currentItemIndex.value];
  if (item.completed) return;
  item.completed = true;
  if (user) {
    try {
      await updateProgress(user.id, route.params.courseId, item.id, true);
    } catch (err) {
      console.error("Failed to save progress:", err);
    }
  }
  if (currentItemIndex.value < contentItems.value.length - 1) {
    currentItemIndex.value++;
  }
}

function handleSelectModule(index) {
  currentItemIndex.value = index;
  sidebarOpen.value = false;
}

function handleLogout() {
  localStorage.removeItem("user");
  router.push("/login");
}
</script>

<template>
  <div class="course-page">
    <UserNavbar @toggleSidebar="sidebarOpen = !sidebarOpen" @logout="handleLogout" />

    <div v-if="loading" class="loading-state">Loading course...</div>

    <template v-else>
      <CourseHeader
        :title="courseTitle"
        :description="courseDescription"
        :completedCount="completedCount"
        :total="contentItems.length"
        :progressPercentage="progressPercentage" />

      <div class="layout">
        <div class="viewer">
          <div class="viewer__inner">
            <div class="item-heading">
              <div class="item-heading__top">
                <span class="material-symbols-rounded item-heading__icon">
                  {{ currentItem.type === "video" ? "play_circle" : "picture_as_pdf" }}
                </span>
                <h3 class="item-heading__title">{{ currentItem.title }}</h3>
              </div>
              <p v-if="currentItem.description" class="item-heading__desc">
                {{ currentItem.description }}
              </p>
              <div class="item-heading__meta">
                <span>Module {{ currentItemIndex + 1 }} of {{ contentItems.length }}</span>
                <span v-if="currentItem.duration">{{ currentItem.duration }}</span>
                <span v-if="currentItem.pages">{{ currentItem.pages }} pages</span>
              </div>
            </div>

            <div class="content-box">
              <VideoPlayer
                v-if="currentItem.type === 'video'"
                :videoUrl="currentItem.videoUrl"
                :title="currentItem.title" />
              <PdfViewer
                v-else
                :title="currentItem.title"
                :pages="currentItem.pages"
                :pdfUrl="currentItem.pdfUrl" />
            </div>

            <div class="nav-buttons">
              <BaseButton
                variant="outline"
                :disabled="currentItemIndex === 0"
                @click="currentItemIndex--">
                <span class="material-symbols-rounded">chevron_left</span>
                Previous
              </BaseButton>

              <BaseButton
                v-if="!currentItem.completed"
                variant="muted"
                @click="handleMarkComplete">
                <span class="material-symbols-rounded">check_circle</span>
                Mark as Complete
              </BaseButton>

              <BaseButton
                :disabled="currentItemIndex === contentItems.length - 1"
                @click="currentItemIndex++">
                Next
                <span class="material-symbols-rounded">chevron_right</span>
              </BaseButton>
            </div>
          </div>
        </div>

        <CourseModuleSidebar
          :contentItems="contentItems"
          :currentItemIndex="currentItemIndex"
          :completedCount="completedCount"
          :progressPercentage="progressPercentage"
          :isOpen="sidebarOpen"
          @select="handleSelectModule"
          @close="sidebarOpen = false" />
      </div>

      <div
        v-if="sidebarOpen"
        class="sidebar-overlay"
        @click="sidebarOpen = false" />
    </template>
  </div>
</template>

<style scoped>
.course-page {
  min-height: 100vh;
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
}

.loading-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: var(--color-text);
  opacity: 0.6;
}

.layout {
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
  max-width: var(--site-width);
  margin: 0 auto;
  width: 100%;
}

.viewer {
  flex: 1;
  overflow-y: auto;
}

.viewer__inner {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: var(--color-bg);
}

.item-heading__top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.item-heading__icon {
  color: var(--color-primary);
  font-size: 22px;
}

.item-heading__title {
  font-size: 20px;
  color: var(--color-text);
}

.item-heading__desc {
  font-size: 14px;
  color: var(--color-text);
  opacity: 0.75;
  line-height: 1.6;
  margin-top: 8px;
}

.item-heading__meta {
  display: flex;
  gap: 24px;
  font-size: 13px;
  color: var(--color-text);
  opacity: 0.7;
}

.content-box {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .content-box {
    max-width: 80%;
  }
}

.nav-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.sidebar-overlay {
  display: block;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 20;
}

@media (min-width: 1024px) {
  .sidebar-overlay {
    display: none;
  }
}
</style>
