<script setup>
import BaseButton from "../BaseButton.vue";

const emit = defineEmits(["delete-user"]);

function handleDelete() {
  emit("delete-user");
}
</script>

<template>
  <div class="card">
    <h3 class="card-title">Actions</h3>
    <div class="actions-list">
      <BaseButton variant="outline" block> Reset Password </BaseButton>
      <BaseButton variant="muted" block @click="handleDelete">
        Delete User
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
  font-size: 18px;
  color: var(--color-text);
}

.actions-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}
</style>
