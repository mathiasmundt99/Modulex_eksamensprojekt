<script setup>
import OverviewTab from './user/OverviewTab.vue'
import CoursesTab  from './user/CoursesTab.vue'
import ProgressTab from './user/ProgressTab.vue'

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
  min-width: 0;
}
</style>
