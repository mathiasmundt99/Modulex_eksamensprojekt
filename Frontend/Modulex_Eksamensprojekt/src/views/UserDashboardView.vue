<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import UserNavbar  from '../components/user/UserNavbar.vue'
import UserSidebar from '../components/user/UserSidebar.vue'

const route = useRoute()
const sidebarOpen = ref(false)
const isProfile = computed(() => route.path === '/dashboard/profile')

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
  <div class="user-dashboard">
    <UserNavbar @toggleSidebar="toggleSidebar" @logout="() => {}" />
    <div class="user-dashboard__layout">
      <UserSidebar v-if="!isProfile" :sidebarOpen="sidebarOpen" @navigate="sidebarOpen = false" />
      <main class="dashboard">
        <RouterView />
      </main>
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
    flex-direction: column;
  }
}

.dashboard {
  flex: 1;
  min-width: 0;
  width: 100%;
}
</style>
