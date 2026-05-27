<script setup>
defineProps({
  log: { type: Array, required: true },
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
    <h3 class="card-title">Activity Log</h3>

    <div v-if="log.length" class="activity-list">
      <div v-for="entry in log" :key="entry.id" class="activity-row">
        <span
          class="material-symbols-rounded activity-icon"
          :class="
            entry.status === 'completed'
              ? 'activity-icon--primary'
              : 'activity-icon--accent'
          ">
          {{ entry.status === "completed" ? "sports_score" : "start" }}
        </span>

        <div>
          <p class="activity-action">{{ entry.title }}</p>
          <p class="activity-meta">{{ formatTime(entry.timestamp) }}</p>
        </div>
      </div>
    </div>

    <div v-else class="empty">No recent activity</div>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 24px;
}

.card-title {
  font-size: 18px;
  color: var(--color-text);
  margin-bottom: 16px;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.activity-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background-color: var(--color-bg);
  border-radius: 8px;
}

.activity-icon {
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 2px;
}

.activity-icon--primary {
  color: var(--color-primary);
}

.activity-icon--accent {
  color: var(--color-accent);
}
.activity-action {
  font-size: 14px;
  color: var(--color-text);
}

.activity-meta {
  font-size: 12px;
  color: var(--color-text);
  opacity: 0.7;
  margin-top: 4px;
}
</style>
