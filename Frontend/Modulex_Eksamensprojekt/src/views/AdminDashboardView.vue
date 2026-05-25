<script setup>
import { ref } from 'vue'
import AdminNavbar  from '../components/admin/AdminNavbar.vue'
import AdminSidebar from '../components/admin/AdminSidebar.vue'

const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
  <div class="admin-dashboard">
    <AdminNavbar @toggleSidebar="toggleSidebar" @logout="() => {}" />
    <div class="admin-dashboard__layout">
      <AdminSidebar :sidebarOpen="sidebarOpen" @navigate="sidebarOpen = false" />
      <main class="dashboard">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg);
}

.admin-dashboard__layout {
  width: 100%;
  max-width: var(--site-width);
  margin: 0 auto;
  display: flex;
  gap: 24px;
  padding: 24px;
  flex: 1;
  align-items: flex-start;
}

@media (max-width: 1023px) {
  .admin-dashboard__layout {
    flex-direction: column;
  }
}

.dashboard {
  flex: 1;
  min-width: 0;
  width: 100%;
}
</style>
