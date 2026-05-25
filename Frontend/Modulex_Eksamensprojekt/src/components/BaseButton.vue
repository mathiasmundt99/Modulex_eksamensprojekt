<script setup>
defineProps({
  variant: { type: String, default: 'primary' },
  block:   { type: Boolean, default: false },
})
</script>

<template>
  <button :class="['btn', `btn--${variant}`, { 'btn--block': block }]">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
  border: none;
  transition: background-color 0.15s, color 0.15s;
}

.btn--primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.btn--primary:hover {
  background-color: var(--color-primary-hover);
}

.btn--muted {
  background-color: var(--color-accent);
  color: var(--color-white);
}

.btn--muted:hover {
  background-color: var(--color-accent-hover);
}

.btn--ghost {
  background-color: var(--color-bg);
  color: var(--color-text);
}

.btn--ghost:hover {
  background-color: var(--color-border);
}

.btn--outline {
  background-color: var(--color-white);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn--outline:hover {
  background-color: var(--color-bg);
}

.btn--disabled {
  background-color: var(--color-border);
  color: var(--color-text);
  cursor: not-allowed;
  opacity: 0.5;
}

.btn--block {
  width: 100%;
  justify-content: center;
}
</style>
