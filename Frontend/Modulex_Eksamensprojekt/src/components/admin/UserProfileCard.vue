<script setup>
defineProps({
  user: { type: Object, required: true }
})
</script>

<template>
  <div class="card">
    <div class="avatar-wrap">
      <span class="material-symbols-rounded avatar-icon">person</span>
    </div>
    <h2 class="user-name">{{ user.name }}</h2>

    <ul class="info-list">
      <li class="info-row">
        <span class="material-symbols-rounded info-icon">mail</span>
        <div>
          <p class="info-label">Email</p>
          <p class="info-value">{{ user.email }}</p>
        </div>
      </li>
      <li class="info-row">
        <span class="material-symbols-rounded info-icon">phone</span>
        <div>
          <p class="info-label">Phone</p>
          <p class="info-value">{{ user.phone ?? '—' }}</p>
        </div>
      </li>
      <li class="info-row">
        <span class="material-symbols-rounded info-icon">business</span>
        <div>
          <p class="info-label">Company</p>
          <p class="info-value">{{ user.company }}</p>
        </div>
      </li>
      <li class="info-row">
        <span class="material-symbols-rounded info-icon">location_on</span>
        <div>
          <p class="info-label">Country</p>
          <p class="info-value">{{ user.country }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 24px;
}

.avatar-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.avatar-icon {
  font-size: 40px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--color-accent);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-name {
  font-size: 20px;
  text-align: center;
  color: var(--color-text);
  margin-bottom: 20px;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.info-icon {
  font-size: 20px;
  color: var(--color-text);
  margin-top: 2px;
}

.info-label {
  font-size: 12px;
  color: var(--color-text);
}

.info-value {
  font-size: 14px;
  color: var(--color-text);
}
</style>
