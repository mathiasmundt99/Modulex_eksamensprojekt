<script setup>
defineProps({
  items: { type: Array, required: true },
});
</script>

<template>
  <div class="card">
    <h3 class="card__title">Onboarding Checklist</h3>
    <div class="checklist">
      <div
        v-for="item in items"
        :key="item.id"
        :class="['checklist-item', { 'checklist-item--done': item.completed }]">
        <span class="material-symbols-rounded" :class="item.completed ? 'icon--primary' : ''">
          {{ item.completed ? 'check_circle_outline' : 'radio_button_unchecked' }}
        </span>
        <span :class="{ 'text-strikethrough': item.completed }">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon--primary { color: var(--color-primary); }

.card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 24px;
}

.card__title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 16px;
}

.checklist {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checklist-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background-color: var(--color-white);
  font-size: 15px;
  color: var(--color-text);
}

.checklist-item--done {
  background-color: var(--color-bg);
  border-color: var(--color-primary);
}

.text-strikethrough {
  text-decoration: line-through;
}
</style>
