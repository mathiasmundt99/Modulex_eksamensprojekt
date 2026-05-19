<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import Dashboard from '../components/Dashboard.vue'

const activeTab = ref('overview')
const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
  <div class="user-dashboard">
    <Navbar @toggleSidebar="toggleSidebar" @logout="() => {}" />
    <div class="user-dashboard__layout">
      <Sidebar
        :activeTab="activeTab"
        :sidebarOpen="sidebarOpen"
        @update:activeTab="activeTab = $event; sidebarOpen = false"
      />
      <Dashboard :activeTab="activeTab" />
    </div>
  </div>
</template>

<style scoped>
.user-dashboard {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg);
}

.user-dashboard__layout {
  width: 80%;
  max-width: 1500px;
  margin: 0 auto;
  display: flex;
  gap: 24px;
  padding: 24px;
  flex: 1;
  align-items: flex-start;
}

@media (max-width: 1023px) {
  .user-dashboard__layout {
    width: 100%;
    flex-direction: column;
  }
}
</style>
