<script setup>
import WelcomeBanner from './WelcomeBanner.vue'
import AdminStatsGrid from './AdminStatsGrid.vue'
import RecentUserActivity from './RecentUserActivity.vue'
import UsersNeedingAttention from './UsersNeedingAttention.vue'
</script>

<template>
  <div class="tab-content">
    <WelcomeBanner />
    <AdminStatsGrid />
    <RecentUserActivity />
    <UsersNeedingAttention />
  </div>
</template>

<style scoped>
.tab-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
