<script setup>
import { useRoute } from 'vue-router'

defineProps({
  sidebarOpen: { type: Boolean, default: false }
})

defineEmits(['navigate'])

const route = useRoute()

const navItems = [
  { to: '/dashboard/overview', label: 'Overview',   icon: 'dashboard' },
  { to: '/dashboard/courses',  label: 'My Courses', icon: 'videocam'  },
  { to: '/dashboard/progress', label: 'Progress',   icon: 'check_circle_outline'  },
]
</script>

<template>
  <aside :class="['sidebar', { 'sidebar--open': sidebarOpen }]">
    <div class="sidebar-card">
      <nav class="sidebar-nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="['nav-item', { 'nav-item--active': route.path === item.to }]"
          @click="$emit('navigate')">
          <span class="material-symbols-rounded">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  display: block;
  width: 256px;
  flex-shrink: 0;
}

@media (max-width: 1023px) {
  .sidebar { display: none; width: 100%; }
  .sidebar--open { display: block; }
}

.sidebar-card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 15px;
  color: var(--color-text);
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
  background: var(--color-white);
}

.nav-item:hover { background-color: var(--color-bg); }

.nav-item--active {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.nav-item--active:hover { background-color: var(--color-primary-hover); }
</style>
