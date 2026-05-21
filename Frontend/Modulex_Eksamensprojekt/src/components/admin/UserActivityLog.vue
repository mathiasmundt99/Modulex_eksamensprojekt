<script setup>
defineProps({
  log: { type: Array, required: true }
})
</script>

<template>
  <div class="card">
    <h3 class="card-title">Activity Log</h3>
    <div class="activity-list">
      <div
        v-for="entry in log"
        :key="entry.id"
        class="activity-row"
      >
        <span class="material-symbols-rounded activity-icon">schedule</span>
        <div>
          <p class="activity-action">{{ entry.action }}</p>
          <p class="activity-meta">{{ entry.course }} &bull; {{ entry.timestamp }}</p>
        </div>
      </div>
    </div>
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
  color: var(--color-accent); 
  flex-shrink: 0; 
  margin-top: 2px; 
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
