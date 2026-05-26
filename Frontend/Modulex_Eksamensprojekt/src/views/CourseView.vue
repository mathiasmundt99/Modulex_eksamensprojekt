<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import UserNavbar from "../components/user/UserNavbar.vue";
import CourseHeader from "../components/course/CourseHeader.vue";
import CourseModuleSidebar from "../components/course/CourseModuleSidebar.vue";
import VideoPlayer from "../components/course/VideoPlayer.vue";
import PdfViewer from "../components/course/PdfViewer.vue";
import BaseButton from "../components/BaseButton.vue";

const router = useRouter();

const sidebarOpen = ref(true);
const currentItemIndex = ref(0);

const courseTitle = "Product Configuration & Ordering";
const courseDescription = "Master the ordering process and configuration tools";

const contentItems = ref([
  {
    id: 1,
    title: "Welcome to Product Configuration",
    type: "video",
    duration: "5 min",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    completed: true,
  },
  {
    id: 2,
    title: "Understanding Modular Sign Systems",
    type: "video",
    duration: "12 min",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    completed: true,
  },
  {
    id: 3,
    title: "Product Catalog Overview",
    type: "pdf",
    pages: 24,
    pdfUrl: "sample.pdf",
    completed: false,
  },
  {
    id: 4,
    title: "Configuration Tool Tutorial",
    type: "video",
    duration: "18 min",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    completed: false,
  },
  {
    id: 5,
    title: "Pricing & Quotes Guide",
    type: "pdf",
    pages: 12,
    pdfUrl: "sample.pdf",
    completed: false,
  },
]);

const currentItem = computed(() => contentItems.value[currentItemIndex.value]);
const completedCount = computed(() => contentItems.value.filter((i) => i.completed).length);
const progressPercentage = computed(() =>
  Math.round((completedCount.value / contentItems.value.length) * 100),
);

function handleMarkComplete() {
  contentItems.value[currentItemIndex.value].completed = true;
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

    <CourseHeader
      :title="courseTitle"
      :description="courseDescription"
      :completedCount="completedCount"
      :total="contentItems.length"
      :progressPercentage="progressPercentage" />

    <div class="layout">
      <div class="viewer">
        <div class="viewer__inner">
          <!-- Item heading -->
          <div class="item-heading">
            <div class="item-heading__top">
              <span class="material-symbols-rounded item-heading__icon">
                {{ currentItem.type === "video" ? "play_circle" : "picture_as_pdf" }}
              </span>
              <h3 class="item-heading__title">{{ currentItem.title }}</h3>
            </div>
            <div class="item-heading__meta">
              <span>Module {{ currentItemIndex + 1 }} of {{ contentItems.length }}</span>
              <span v-if="currentItem.duration">{{ currentItem.duration }}</span>
              <span v-if="currentItem.pages">{{ currentItem.pages }} pages</span>
            </div>
          </div>

          <!-- Content -->
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

          <!-- Navigation -->
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
  </div>
</template>

<style scoped>
.course-page {
  min-height: 100vh;
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
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
