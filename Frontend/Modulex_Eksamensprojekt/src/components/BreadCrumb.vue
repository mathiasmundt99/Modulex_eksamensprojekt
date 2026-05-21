<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  items:   { type: Array,  default: null },
  current: { type: String, default: null },
})

const route = useRoute()

const crumbs = computed(() => {
  if (props.items) {
    return props.items
  }

  const matched = route.matched.filter(r => r.meta?.label)

  const result = matched.map((r, i) => ({
    label: r.meta.label,
    to: i < matched.length - 1 ? r.path : null,
  }))

  if (props.current && result.length > 0) {
    result[result.length - 1] = {
      ...result[result.length - 1],
      label: props.current,
    }
  }

  return result
})
</script>

<template>
  <nav class="breadcrumb" aria-label="breadcrumb">
    <ol class="breadcrumb__list">
      <li
        v-for="(crumb, i) in crumbs"
        :key="i"
        class="breadcrumb__item"
      >
        <RouterLink
          v-if="crumb.to"
          :to="crumb.to"
          class="breadcrumb__link"
        >
          {{ crumb.label }}
        </RouterLink>
        <span v-else class="breadcrumb__current">
          {{ crumb.label }}
        </span>

        <span
          v-if="i < crumbs.length - 1"
          class="material-symbols-rounded breadcrumb__sep"
        >
          chevron_right
        </span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb {
  margin-bottom: 4px;
}

.breadcrumb__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2px;
  list-style: none;
}

.breadcrumb__item {
  display: flex;
  align-items: center;
  gap: 2px;
}

.breadcrumb__link {
  font-size: 13px;
  color: var(--color-primary);
  transition: opacity 0.15s;
}

.breadcrumb__link:hover {
  opacity: 0.75;
}

.breadcrumb__current {
  font-size: 13px;
  color: var(--color-text);
}

.breadcrumb__sep {
  font-size: 16px;
  color: var(--color-text);
  opacity: 0.4;
}
</style>
