<script setup>
import { computed } from 'vue'

const props = defineProps({
  modules:       { type: Array,  required: true },
  enrolledUsers: { type: Number, default: 0 },
})

const videoCount = computed(() => props.modules.filter(m => m.type === 'video').length)
const pdfCount   = computed(() => props.modules.filter(m => m.type === 'pdf').length)
</script>

<template>
  <div class="card">
    <h3 class="card__title">Statistics</h3>
    <div class="stats">
      <div class="stat">
        <p class="stat__label">Total Modules</p>
        <p class="stat__value">{{ modules.length }}</p>
      </div>
      <div class="stat">
        <p class="stat__label">Enrolled Users</p>
        <p class="stat__value">{{ enrolledUsers }}</p>
      </div>
      <div class="stat">
        <p class="stat__label">Videos</p>
        <p class="stat__value">{{ videoCount }}</p>
      </div>
      <div class="stat">
        <p class="stat__label">PDFs</p>
        <p class="stat__value">{{ pdfCount }}</p>
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

.card__title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stat__label {
  font-size: 13px;
  color: var(--color-text);
  margin-bottom: 2px;
}

.stat__value {
  font-size: 24px;
  color: var(--color-text);
}
</style>
