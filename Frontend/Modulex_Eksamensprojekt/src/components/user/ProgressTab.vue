<script setup>
import { ref, onMounted } from "vue";
import BreadCrumb from "../BreadCrumb.vue";
import HelpBanner from "../HelpBanner.vue";
import OverallProgress from "./OverallProgress.vue";
import OnboardingChecklist from "./OnboardingChecklist.vue";
import { getOnboardingProgress } from "../../services/progressService.js";
import { getUser } from "../../utils/auth.js";

const overallProgress = ref(0);
const checklistItems = ref([]);

onMounted(async () => {
  try {
    const user = getUser();
    if (!user) return;

    const result = await getOnboardingProgress(user.id);
    overallProgress.value = result.data?.overallCompletion ?? 0;
    checklistItems.value = result.data?.checklistItems ?? [];
  } catch (err) {
    console.error("Failed to load progress:", err);
  }
});
</script>

<template>
  <div class="tab-content">
    <BreadCrumb />
    <div class="page-header">
      <h2 class="page-title">Onboarding Progress</h2>
      <p class="page-subtitle">Track your journey to becoming a certified partner</p>
    </div>
    <OverallProgress :progress="overallProgress" />
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
