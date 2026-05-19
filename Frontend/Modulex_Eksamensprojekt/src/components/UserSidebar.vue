<script setup>
import { useRoute } from 'vue-router'

defineProps({
  sidebarOpen: { type: Boolean, default: false }
})

defineEmits(['navigate'])

const route = useRoute()

const navItems = [
  { to: '/dashboard/overview', label: 'Overview',    icon: 'book' },
  { to: '/dashboard/courses',  label: 'My Courses',  icon: 'video' },
  { to: '/dashboard/progress', label: 'Progress',    icon: 'check-circle' }
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
          @click="$emit('navigate')"
        >
          <svg v-if="item.icon === 'book'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 0 3-3h7z"/>
          </svg>
          <svg v-if="item.icon === 'video'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="15" height="10" rx="1"/>
            <polygon points="17 8 22 4 22 20 17 16"/>
          </svg>
          <svg v-if="item.icon === 'check-circle'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
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
  .sidebar {
    display: none;
    width: 100%;
  }

  .sidebar--open {
    display: block;
  }
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

.nav-item:hover {
  background-color: var(--color-bg);
}

.nav-item--active {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.nav-item--active:hover {
  background-color: var(--color-primary-hover);
}
</style>
