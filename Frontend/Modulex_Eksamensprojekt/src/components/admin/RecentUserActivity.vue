<script setup>
import { ref, onMounted } from "vue";
import { getRecentActivity, getUserById } from "@/services/adminService";

const activities = ref([]);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  loading.value = true;

  try {
    const res = await getRecentActivity(10);
    const fetchedActivities = res.data;

    const activitiesWithUserNames = await Promise.all(
      fetchedActivities.map(async (activity) => {
        try {
          const userRes = await getUserById(activity.userId);
          const user = userRes.data?.data || userRes.data || userRes;
          const userName =
            user && (user.firstName || user.lastName)
              ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
              : "Unknown User";
          return { ...activity, userName };
        } catch (userError) {
          console.error(`Error fetching user ${activity.userId}:`, userError);
          return { ...activity, userName: "Unknown User" };
        }
      }),
    );
    activities.value = activitiesWithUserNames;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

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
</script>

<template>
  <div class="card">
    <h3 class="card__title">Recent Activity</h3>

    <div v-if="loading" class="empty-state">Loading...</div>

    <div v-else-if="activities.length === 0" class="empty-state">
      No activity yet.
    </div>

    <div v-else class="activity-list">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="activity-item">
        <span
          class="material-symbols-rounded"
          :class="
            activity.title.startsWith('Completed')
              ? 'icon--primary'
              : 'icon--accent'
          ">
          {{ iconFor(activity.title) }}
        </span>
        <div class="activity-item__text">
          <p class="activity-item__title">{{ activity.userName }}</p>
          <p>{{ activity.title }}</p>
          <p class="activity-item__time">{{ timeAgo(activity.timestamp) }}</p>
        </div>
      </div>
    </div>
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

.activity-item__title {
  font-weight: bold;
}
</style>
