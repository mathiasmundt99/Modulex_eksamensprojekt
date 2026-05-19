<script setup>
defineEmits(['toggleSidebar', 'logout'])
</script>

<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <div class="navbar-left">
        <button class="menu-btn" @click="$emit('toggleSidebar')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <img class="brand-logo" src="../assets/images/modulex-logo.png" alt="">
        <div class="brand-text">
          <h1 class="brand-name">Modulex Billund Academy</h1>
          <p class="brand-sub">Admin Panel</p>
        </div>
      </div>
      <div class="navbar-right">
        <div class="admin-badge">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          <span>Admin</span>
        </div>
        <button class="logout-btn" @click="$emit('logout')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
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

.menu-btn:hover {
  color: var(--color-primary);
}

@media (max-width: 1023px) {
  .menu-btn {
    display: flex;
  }
}

.brand-logo {
  height: 40px;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

@media (max-width: 530px) {
  .brand-text {
    display: none;
  }
}

@media (max-width: 300px) {
  .brand-logo {
    height: 30px;
  }
}

.brand-name {
  font-size: 18px;
  font-weight: 400;
  color: var(--color-text);
  line-height: 1.2;
}

.brand-sub {
  font-size: 12px;
  color: var(--color-text);
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.admin-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--color-bg);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  color: var(--color-text);
}

@media (max-width: 767px) {
  .admin-badge {
    display: none;
  }
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

.logout-btn:hover {
  color: var(--color-primary);
}

@media (max-width: 767px) {
  .logout-btn span {
    display: none;
  }
}
</style>
