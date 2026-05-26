<script setup>
defineProps({
  title:       { type: String, required: true },
  subtitle:    { type: String, required: true },
  description: { type: String, required: true },
})
</script>

<template>
  <section class="left-col">
    <div class="left-content">
      <h1>{{ title }}</h1>
      <h2>{{ subtitle }}</h2>
      <p class="description">{{ description }}</p>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.left-col {
  background-color: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-content {
  max-width: 430px;
  padding: 60px 30px;
}

h1 {
  font-size: 3.4rem;
  font-weight: 700;
  margin-bottom: 0.9rem;
}

h2 {
  font-size: 2.6rem;
  font-weight: 700;
  margin-bottom: 1.6rem;
}

.description {
  font-size: 1.05rem;
  line-height: 1.35;
  margin-bottom: 1.6rem;
}

@media (max-width: 900px) {
  .left-col {
    padding: 80px 30px;
    justify-content: center;
  }
  .left-content {
    padding: 0;
  }
}
</style>
