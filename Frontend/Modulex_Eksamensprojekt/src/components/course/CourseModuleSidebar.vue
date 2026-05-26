<script setup>
import { useRouter } from "vue-router";
import BaseButton from "../BaseButton.vue";

defineProps({
  contentItems: { type: Array, required: true },
  currentItemIndex: { type: Number, required: true },
  completedCount: { type: Number, required: true },
  progressPercentage: { type: Number, required: true },
  isOpen: { type: Boolean, required: true },
});

const emit = defineEmits(["select", "close"]);
const router = useRouter();
</script>

<template>
  <aside class="sidebar" :class="{ 'sidebar--open': isOpen }">
    <div class="sidebar__inner">
      <div class="sidebar__header">
        <h3 class="sidebar__title">Course Content</h3>
        <button class="sidebar-close" @click="emit('close')">
          <span class="material-symbols-rounded">close</span>
        </button>
      </div>

      <div class="module-list">
        <button
          v-for="(item, index) in contentItems"
          :key="item.id"
          class="module-item"
          :class="{ 'module-item--active': index === currentItemIndex }"
          @click="emit('select', index)">
          <div class="module-item__status">
            <span
              class="material-symbols-rounded"
              :class="{ 'icon--completed': item.completed && index !== currentItemIndex }">
              {{ item.completed ? "check_circle" : "radio_button_unchecked" }}
            </span>
          </div>
          <div class="module-item__body">
            <div class="module-item__type">
              <span class="material-symbols-rounded module-item__type-icon">
                {{ item.type === "video" ? "play_circle" : "picture_as_pdf" }}
              </span>
              <span class="module-item__type-label">{{ item.type === "video" ? "Video" : "PDF" }}</span>
            </div>
            <p class="module-item__title">{{ item.title }}</p>
            <p class="module-item__meta">{{ item.duration || item.pages + " pages" }}</p>
          </div>
        </button>
      </div>

      <div class="progress-summary">
        <p class="progress-summary__label">Your Progress</p>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
        </div>
        <p class="progress-summary__detail">
          {{ completedCount }} of {{ contentItems.length }} modules completed ({{ progressPercentage }}%)
        </p>
      </div>

      <BaseButton
        v-if="progressPercentage === 100"
        @click="router.push('/dashboard/courses')">
        <span class="material-symbols-rounded">check_circle</span>
        Back to My Courses
      </BaseButton>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 300px;
  background-color: var(--color-white);
  border-left: 1px solid var(--color-border);
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  transform: translateX(100%);
  transition: transform 0.3s;
  z-index: 30;
  flex-shrink: 0;
}

.sidebar--open {
  transform: translateX(0);
}

@media (min-width: 1024px) {
  .sidebar {
    position: relative;
    top: auto;
    right: auto;
    height: auto;
    transform: none;
  }
}

.sidebar__inner {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sidebar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar__title {
  font-size: 16px;
  color: var(--color-text);
}

.sidebar-close {
  display: none;
  background: none;
  color: var(--color-text);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.15s;
}

@media (max-width: 1023px) {
  .sidebar-close {
    display: flex;
  }
}

.sidebar-close:hover {
  color: var(--color-primary);
}

.module-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.module-item {
  width: 100%;
  text-align: left;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background-color: var(--color-white);
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  transition: background-color 0.15s, border-color 0.15s;
}

.module-item:not(.module-item--active):hover {
  background-color: var(--color-bg);
}

.module-item--active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
}

.module-item__status {
  flex-shrink: 0;
  font-size: 20px;
  margin-top: 2px;
}

.icon--completed {
  color: var(--color-primary);
}

.module-item__body {
  flex: 1;
  min-width: 0;
}

.module-item__type {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
  opacity: 0.75;
}

.module-item__type-icon {
  font-size: 16px;
}

.module-item__type-label {
  font-size: 12px;
}

.module-item__title {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 4px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.module-item__meta {
  font-size: 12px;
  opacity: 0.7;
}

.progress-summary {
  padding: 14px;
  background-color: var(--color-bg);
  border-radius: 8px;
}

.progress-summary__label {
  font-size: 13px;
  color: var(--color-text);
  margin-bottom: 8px;
}

.progress-summary__detail {
  font-size: 12px;
  color: var(--color-text);
  opacity: 0.7;
  margin-top: 8px;
}

.progress-track {
  width: 100%;
  height: 8px;
  background-color: var(--color-border);
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--color-primary);
  border-radius: 999px;
  transition: width 0.4s;
}

</style>
