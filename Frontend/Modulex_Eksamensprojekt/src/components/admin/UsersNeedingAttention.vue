<script setup>
import BaseButton from '../BaseButton.vue'

const users = [
  { id: 1, name: 'John Doe',    company: 'Acme Signs Ltd.', progress: 45 },
  { id: 3, name: 'Mike Johnson', company: 'Visual Sign Co.', progress: 20 }
]
</script>

<template>
  <div class="card">
    <h3 class="card__title">Users Needing Attention</h3>
    <div class="user-list">
      <div v-for="user in users" :key="user.id" class="user-item">
        <div class="user-item__info">
          <p class="user-item__name">{{ user.name }}</p>
          <p class="user-item__company">{{ user.company }}</p>
          <div class="progress-bar">
            <div class="progress-bar__fill" :style="{ width: user.progress + '%' }"></div>
          </div>
          <p class="progress-label">{{ user.progress }}% complete</p>
        </div>
        <BaseButton variant="muted">Send Reminder</BaseButton>
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
  font-size: 20px;
  font-weight: 400;
  color: var(--color-text);
  margin-bottom: 16px;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background-color: var(--color-bg);
  border-radius: 8px;
  padding: 16px;
  flex-wrap: wrap;
}

.user-item__info {
  flex: 1;
}

.user-item__name {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text);
}

.user-item__company {
  font-size: 14px;
  color: var(--color-text);
  margin-bottom: 8px;
}

.progress-bar {
  height: 8px;
  background-color: var(--color-border);
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 4px;
}

.progress-bar__fill {
  height: 100%;
  background-color: var(--color-primary);
  border-radius: 9999px;
  transition: width 0.5s;
}

.progress-label {
  font-size: 12px;
  color: var(--color-text);
}

</style>
