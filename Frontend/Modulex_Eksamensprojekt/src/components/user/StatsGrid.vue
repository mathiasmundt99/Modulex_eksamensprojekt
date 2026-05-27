<script setup>
import { ref, onMounted } from "vue";
import { getUserProgress, getUserStats } from "../../services/progressService.js";
import { getUser } from "../../utils/auth.js";

const completedModules = ref(0);
const totalModules = ref(0);
const activeCourses = ref(0);
const notStarted = ref(0);

onMounted(async () => {
  try {
    const user = getUser();
    if (!user) return;

    const [stats, progress] = await Promise.all([
      getUserStats(user.id),
      getUserProgress(user.id),
    ]);

    completedModules.value = stats.data?.completedModules ?? 0;
    totalModules.value = stats.data?.totalModules ?? 0;
    activeCourses.value = stats.data?.activeCourses ?? 0;

    const courses = progress.data?.courses ?? [];
    notStarted.value = courses.filter((c) => !c.hasStarted).length;
  } catch (err) {
    console.error("Failed to load stats:", err);
  }
});
</script>

<template>
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-card__header">
        <span class="stat-card__label">Completed Modules</span>
        <span class="material-symbols-rounded icon--primary">check_circle_outline</span>
      </div>
      <p class="stat-card__value">
        {{ completedModules }}/{{ totalModules }}
        <span class="stat-card__pct">
          ({{ totalModules === 0 ? 0 : Math.round((completedModules / totalModules) * 100) }}%)
        </span>
      </p>
    </div>

    <div class="stat-card">
      <div class="stat-card__header">
        <span class="stat-card__label">Active Courses</span>
        <span class="material-symbols-rounded icon--accent">import_contacts</span>
      </div>
      <p class="stat-card__value">{{ activeCourses }}</p>
    </div>

    <div class="stat-card">
      <div class="stat-card__header">
        <span class="stat-card__label">Courses not Started</span>
        <span class="material-symbols-rounded icon--accent">pending</span>
      </div>
      <p class="stat-card__value">{{ notStarted }}</p>
    </div>
  </div>
</template>

<style scoped>
.icon--primary { color: var(--color-primary); }
.icon--accent  { color: var(--color-accent); }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 767px) {
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
}

.stat-card__pct {
  font-size: 16px;
  opacity: 0.6;
}
</style>
