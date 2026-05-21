<script setup>
import BaseButton from '../BaseButton.vue'
defineEmits(['delete'])
</script>

<template>
  <div class="danger-zone">
    <h3 class="danger-zone__title">Danger Zone</h3>
    <p class="danger-zone__text">
      Deleting this course will remove it from all enrolled users.
    </p>
    <BaseButton variant="primary" class="btn--block" @click="$emit('delete')">
      Delete Course
    </BaseButton>
  </div>
</template>

<style scoped>
.danger-zone {
  background-color: var(--color-white);
  border: 2px solid var(--color-primary);
  border-radius: 8px;
  padding: 24px;
}

.danger-zone__title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 12px;
}

.danger-zone__text {
  font-size: 14px;
  color: var(--color-text);
  margin-bottom: 16px;
}

.btn--block {
  width: 100%;
  justify-content: center;
}
</style>
