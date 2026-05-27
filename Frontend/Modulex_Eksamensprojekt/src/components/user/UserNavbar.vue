<script setup>
import { useCurrentUser } from '../../composables/useCurrentUser.js'

defineEmits(['toggleSidebar', 'logout'])

const { user } = useCurrentUser()
</script>

<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <div class="navbar-left">
        <button class="menu-btn" @click="$emit('toggleSidebar')">
          <span class="material-symbols-rounded">menu</span>
        </button>
        <RouterLink to="/dashboard/overview" class="brand-link">
          <img class="brand-logo" src="../../assets/images/modulex-logo.png" alt="">
          <h1 class="brand-name">Modulex Billund Academy</h1>
        </RouterLink>
      </div>
      <div class="navbar-right">
        <RouterLink to="/dashboard/profile" class="user-badge">
          <span class="material-symbols-rounded">person</span>
          <span>{{ user?.firstName }} {{ user?.lastName }}</span>
        </RouterLink>
        <button class="logout-btn" @click="$emit('logout')">
          <span class="material-symbols-rounded">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 40;
}

.navbar-inner {
  max-width: var(--site-width);
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-btn {
  display: none;
  color: var(--color-text);
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: color 0.15s;
}

.menu-btn:hover { color: var(--color-primary); }

@media (max-width: 1023px) {
  .menu-btn { display: flex; }
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.brand-logo { height: 40px; }

.brand-name {
  font-size: 18px;
  font-weight: 400;
  color: var(--color-text);
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--color-bg);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  color: var(--color-text);
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
}

.user-badge:hover {
  background-color: var(--color-border);
  color: var(--color-primary);
}

@media (max-width: 767px) {
  .user-badge { display: none; }
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 14px;
  color: var(--color-text);
  border-radius: 8px;
  cursor: pointer;
  transition: color 0.15s;
}

.logout-btn:hover { color: var(--color-primary); }

@media (max-width: 767px) {
  .logout-btn span { display: none; }
}

@media (max-width: 530px) {
  .brand-name { display: none; }
}
</style>
