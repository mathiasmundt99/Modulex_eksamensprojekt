<script setup>
import OverviewTab from './dashboard/OverviewTab.vue'
import CoursesTab from './dashboard/CoursesTab.vue'
import ProgressTab from './dashboard/ProgressTab.vue'

defineProps({
  activeTab: { type: String, default: 'overview' }
})
</script>

<template>
  <main class="dashboard">
    <OverviewTab v-if="activeTab === 'overview'" />
    <CoursesTab  v-if="activeTab === 'courses'" />
    <ProgressTab v-if="activeTab === 'progress'" />
  </main>
</template>

<style scoped>
.dashboard {
  flex: 1;
  width: 100%;
}
</style>
