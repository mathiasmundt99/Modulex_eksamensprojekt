<script setup>
import { ref, onMounted } from "vue";
import { getRecentActivity } from "@/services/adminService";

const activities = ref([]);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  loading.value = true;

  try {
    const res = await getRecentActivity(10);
    activities.value = res.data; // 👈 backend array
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

function formatTime(timestamp) {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
</script>

<template>
  <div class="card">
    <h3 class="card__title">Recent User Activity</h3>

    <div v-if="activities.length" class="activity-list">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="activity-item">
        <span
          class="material-symbols-rounded"
          :class="
            activity.status === 'completed' ? 'icon--primary' : 'icon--accent'
          ">
          {{
            activity.status === "completed"
              ? "sports_score"
              : activity.status === "registered"
                ? "person"
                : "start"
          }}
        </span>

        <div>
          <p class="activity-item__text">
            {{ activity.text }}
          </p>

          <p class="activity-item__time">
            {{ formatTime(activity.timestamp) }}
          </p>
        </div>
      </div>
    </div>

    <div v-else class="empty">No recent activity</div>
  </div>
</template>

<style scoped>
.icon--primary {
  color: var(--color-primary);
}
.icon--accent {
  color: var(--color-accent);
}

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

.activity-item__text {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
}

.activity-item__time {
  font-size: 12px;
  color: var(--color-text);
  margin-top: 2px;
}
</style>
