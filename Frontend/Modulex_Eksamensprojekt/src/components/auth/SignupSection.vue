<script setup>
defineProps({
  title: { type: String, required: true },
})
</script>

<template>
  <section class="section">
    <h2>{{ title }}</h2>
    <div class="grid">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.section {
  margin-bottom: 28px;
}

h2 {
  font-size: 1.2rem;
  font-weight: 700;
  padding-bottom: 8px;
  margin-bottom: 18px;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 26px 70px;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
