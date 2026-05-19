<script setup>
import { ref } from 'vue'
import AdminNavbar    from '../components/AdminNavbar.vue'
import AdminSidebar   from '../components/AdminSidebar.vue'
import AdminDashboard from '../components/AdminDashboard.vue'

const activeTab  = ref('overview')
const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
  <div class="admin-dashboard">
    <AdminNavbar @toggleSidebar="toggleSidebar" @logout="() => {}" />
    <div class="admin-dashboard__layout">
      <AdminSidebar
        :activeTab="activeTab"
        :sidebarOpen="sidebarOpen"
        @update:activeTab="activeTab = $event; sidebarOpen = false"
      />
      <AdminDashboard :activeTab="activeTab" />
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
    width: 100%;
    flex-direction: column;
    padding: 24px;
  }
}
</style>
