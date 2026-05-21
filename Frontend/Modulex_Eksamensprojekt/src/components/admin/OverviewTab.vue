<script setup>
import BreadCrumb from '../BreadCrumb.vue'
import WelcomeBanner from './WelcomeBanner.vue'
import AdminStatsGrid from './AdminStatsGrid.vue'
import RecentUserActivity from './RecentUserActivity.vue'
import UsersNeedingAttention from './UsersNeedingAttention.vue'
</script>

<template>
  <div class="tab-content">
    <BreadCrumb />
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
  width: 100%;
  gap: 24px;
}
</style>
