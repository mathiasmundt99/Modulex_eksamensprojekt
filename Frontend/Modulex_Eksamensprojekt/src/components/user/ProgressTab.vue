<script setup>
import BreadCrumb from '../BreadCrumb.vue'
import HelpBanner from '../HelpBanner.vue'
import OverallProgress from './OverallProgress.vue'
import OnboardingChecklist from './OnboardingChecklist.vue'

const onboardingProgress = 45

const checklistItems = [
  { id: 1, title: 'Complete welcome survey',                 completed: true  },
  { id: 2, title: 'Watch introduction video',               completed: true  },
  { id: 3, title: 'Review product catalog',                 completed: true  },
  { id: 4, title: 'Complete product configuration course',  completed: false },
  { id: 5, title: 'Access ordering system',                 completed: false },
  { id: 6, title: 'Complete first test order',              completed: false },
]
</script>

<template>
  <div class="tab-content">
    <BreadCrumb />
    <div class="page-header">
      <h2 class="page-title">Onboarding Progress</h2>
      <p class="page-subtitle">Track your journey to becoming a certified partner</p>
    </div>
    <OverallProgress :progress="onboardingProgress" />
    <OnboardingChecklist :items="checklistItems" />
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

.page-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text);
}

.page-subtitle {
  font-size: 15px;
  color: var(--color-text);
}
</style>
