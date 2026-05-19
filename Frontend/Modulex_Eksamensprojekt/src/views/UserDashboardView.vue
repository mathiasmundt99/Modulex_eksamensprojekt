<script setup>
import { ref } from 'vue'
import UserNavbar     from '../components/UserNavbar.vue'
import UserSidebar    from '../components/UserSidebar.vue'
import UserDashboard  from '../components/UserDashboard.vue'
import UserProfileView from './UserProfileView.vue'

const activeTab   = ref('overview')
const sidebarOpen = ref(false)
const showProfile = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
  <div class="user-dashboard">
    <UserNavbar @toggleSidebar="toggleSidebar" @logout="() => {}" @profile="showProfile = true" />
    <div class="user-dashboard__layout">
      <template v-if="!showProfile">
        <UserSidebar
          :activeTab="activeTab"
          :sidebarOpen="sidebarOpen"
          @update:activeTab="activeTab = $event; sidebarOpen = false"
        />
        <UserDashboard :activeTab="activeTab" />
      </template>
      <UserProfileView v-else @back="showProfile = false" />
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
  .user-dashboard__layout {
    width: 100%;
    flex-direction: column;
    padding: 24px;
  }
}
</style>
