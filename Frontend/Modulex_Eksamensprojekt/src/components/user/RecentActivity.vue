<script setup>
import { ref, watch } from "vue";
import { getUserActivity } from "../../services/progressService.js";
import { useCurrentUser } from "../../composables/useCurrentUser.js";

const { user } = useCurrentUser();
const activities = ref([]);
const loading = ref(true);

function timeAgo(timestamp) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

function iconFor(title) {
  if (title.startsWith("Completed")) return "sports_score";
  return "start";
}

watch(user, async (u) => {
  if (!u) return;
  try {
    const result = await getUserActivity(u.id, 5);
    activities.value = result.data ?? [];
  } catch (err) {
    console.error("Failed to load activity:", err);
  } finally {
    loading.value = false;
  }
}, { immediate: true });
</script>

<template>
  <div class="card">
    <h3 class="card__title">Recent Activity</h3>

    <div v-if="loading" class="empty-state">Loading...</div>

    <div v-else-if="activities.length === 0" class="empty-state">
      No activity yet.
    </div>

    <div v-else class="activity-list">
      <div v-for="activity in activities" :key="activity.id" class="activity-item">
        <span
          class="material-symbols-rounded"
          :class="activity.title.startsWith('Completed') ? 'icon--primary' : 'icon--accent'">
          {{ iconFor(activity.title) }}
        </span>
        <div class="activity-item__text">
          <p class="activity-item__title">{{ activity.title }}</p>
          <p class="activity-item__time">{{ timeAgo(activity.timestamp) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon--primary { color: var(--color-primary); }
.icon--accent  { color: var(--color-accent); }

.card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 24px;
}

.card__title {
  font-size: 20px;
  color: var(--color-text);
  margin-bottom: 16px;
}

.empty-state {
  font-size: 14px;
  color: var(--color-text);
  opacity: 0.6;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: var(--color-bg);
  border-radius: 8px;
  padding: 12px;
}

.activity-item__title {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
}

.activity-item__time {
  font-size: 12px;
  color: var(--color-text);
  opacity: 0.6;
  margin-top: 2px;
}
</style>
