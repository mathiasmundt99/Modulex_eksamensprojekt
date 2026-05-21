<script setup>
import BaseButton from '../BaseButton.vue'
</script>

<template>
  <div class="card">
    <h3 class="card-title">Actions</h3>
    <div class="actions-list">
      <BaseButton variant="muted" class="btn--block">
        Send Message
      </BaseButton>
      <BaseButton variant="outline" class="btn--block">
        Reset Password
      </BaseButton>
      <BaseButton variant="outline" class="btn--block">
        Deactivate User
      </BaseButton>
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
  font-size: 18px; color: var(--color-text); 
}

.actions-list { 
  display: flex; flex-direction: column; gap: 8px; margin-top: 16px; 
}

.btn--block {
  width: 100%;
  justify-content: center;
}
</style>
