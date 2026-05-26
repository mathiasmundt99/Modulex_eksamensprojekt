<script setup>
import { ref, onMounted } from "vue";
import { getCourseById } from "../../services/courseService.js";

const completedModules = ref(0);
const totalModules = ref(0);
const activeCourses = ref(0);
const notStarted = ref(0);

onMounted(async () => {
  try {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    if (!user) return;

    const [statsRes, progressRes] = await Promise.all([
      fetch(`http://localhost:3000/api/progress/${user.id}/stats`, { credentials: "include" }),
      fetch(`http://localhost:3000/api/progress/${user.id}`, { credentials: "include" }),
    ]);

    if (statsRes.ok) {
      const stats = await statsRes.json();
      activeCourses.value = stats.data?.activeCourses ?? 0;
    }

    if (progressRes.ok) {
      const progress = await progressRes.json();
      const courses = progress.data?.courses ?? [];
      completedModules.value = courses.reduce(
        (sum, c) => sum + (c.completedContentIds?.length ?? 0),
        0,
      );
      notStarted.value = courses.filter((c) => !c.hasStarted).length;
      const courseDetails = await Promise.all(courses.map((c) => getCourseById(c.courseId)));
      totalModules.value = courseDetails.reduce(
        (sum, c) => sum + (c.contentIds?.length ?? 0),
        0,
      );
    }
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
