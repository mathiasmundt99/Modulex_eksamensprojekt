<script setup>
import WelcomeBanner from './WelcomeBanner.vue'
import StatsGrid from './StatsGrid.vue'
import ContinueLearning from './ContinueLearning.vue'
import RecentActivity from './RecentActivity.vue'
import HelpBanner from '../HelpBanner.vue'
</script>

<template>
  <div class="tab-content">
    <WelcomeBanner />
    <StatsGrid />
    <ContinueLearning />
    <RecentActivity />
    <HelpBanner />
  </div>
</template>

<style scoped>
.tab-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}
</style>
