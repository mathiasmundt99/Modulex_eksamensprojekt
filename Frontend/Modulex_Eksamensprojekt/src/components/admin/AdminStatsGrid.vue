<script setup>
import { ref, computed, onMounted } from "vue";
import { getDashboardStatistics } from "@/services/adminService";

const stats = ref(null);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  loading.value = true;

  try {
    const res = await getDashboardStatistics();
    stats.value = res.data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

const activePercent = computed(() => {
  if (!stats.value) return 0;
  if (stats.value.totalUsers === 0) return 0;

  return Math.round((stats.value.activeUsers / stats.value.totalUsers) * 100);
});
</script>

<template>
  <div v-if="stats" class="stats-grid">
    <div class="stat-card">
      <div class="stat-card__header">
        <span class="stat-card__label">Total Users</span>
        <span class="material-symbols-rounded icon--primary">group</span>
      </div>
      <p class="stat-card__value">{{ stats.totalUsers }}</p>
    </div>

    <div class="stat-card">
      <div class="stat-card__header">
        <span class="stat-card__label">Active Users</span>
        <span class="material-symbols-rounded icon--accent"
          >check_circle_outline</span
        >
      </div>
      <p class="stat-card__value">{{ stats.activeUsers }}</p>
      <p class="stat-card__sub">{{ activePercent }}% active</p>
    </div>

    <div class="stat-card">
      <div class="stat-card__header">
        <span class="stat-card__label">Total Courses</span>
        <span class="material-symbols-rounded icon--accent"
          >import_contacts</span
        >
      </div>
      <p class="stat-card__value">{{ stats.totalCourses }}</p>
    </div>

    <div class="stat-card">
      <div class="stat-card__header">
        <span class="stat-card__label">Content Items</span>
        <span class="material-symbols-rounded icon--accent">cloud_upload</span>
      </div>
      <p class="stat-card__value">{{ stats.totalContent }}</p>
    </div>
  </div>

  <div v-else class="loading">Loading stats...</div>
</template>

<style scoped>
.icon--primary {
  color: var(--color-primary);
}
.icon--accent {
  color: var(--color-accent);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (max-width: 1023px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 599px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

.stat-card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 24px;
}

.stat-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.stat-card__label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
}

.stat-card__value {
  font-size: 30px;
  color: var(--color-text);
  margin-bottom: 4px;
}

.stat-card__sub {
  font-size: 12px;
  color: var(--color-text);
}
</style>
