<script setup>
import WelcomeBanner from './WelcomeBanner.vue'
import StatsGrid from './StatsGrid.vue'
import ContinueLearning from './ContinueLearning.vue'
import RecentActivity from './RecentActivity.vue'
</script>

<template>
  <div class="tab-content">
    <WelcomeBanner />
    <StatsGrid />
    <ContinueLearning />
    <RecentActivity />
  </div>
</template>

<style scoped>
.tab-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
