<script setup>
import OverviewTab from './admin/OverviewTab.vue'
import UsersTab    from './admin/UsersTab.vue'
import ContentTab  from './admin/ContentTab.vue'
import CoursesTab  from './admin/CoursesTab.vue'

defineProps({
  activeTab: { type: String, default: 'overview' }
})
</script>

<template>
  <main class="dashboard">
    <OverviewTab v-if="activeTab === 'overview'" />
    <UsersTab    v-if="activeTab === 'users'" />
    <ContentTab  v-if="activeTab === 'content'" />
    <CoursesTab  v-if="activeTab === 'courses'" />
  </main>
</template>

<style scoped>
.dashboard {
  flex: 1;
  width: 100%;
}
</style>
