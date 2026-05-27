<script setup>
import SurveyResponsesCard from '../components/survey/SurveyResponseCard.vue'
import AssignCoursesDropdown from '../components/survey/AssignCoursesDropdown.vue'
import UserNavbar from '../components/user/UserNavbar.vue'
import UserSidebar from '../components/user/UserSidebar.vue'
import { ref } from 'vue'

const sidebarOpen = ref(false)
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

const responses = {
  businessType: 'Distributor & Installer',
  companySize: '21-50 employees',
  experienceLevel: 'Basic experience',
  primaryMarkets: [
    'Corporate Offices',
    'Healthcare',
    'Education'
  ],
  productInterest: [
    'Directory Systems',
    'Room Identification',
    'Wayfinding Solutions'
  ],
  challenges: [
    'Product Selection',
    'Configuration',
    'Pricing & Quotes'
  ],
  timeline: 'Within 1 month',
  submitted: '2024-03-15'
}

</script>

<template>
  <div class="user-dashboard">
    <UserNavbar @toggleSidebar="toggleSidebar" @logout="() => { }" />
    <div class="user-dashboard__layout">
      <main class="dashboard">
        <PageHeader title="Survey Results & Onboarding Plan" subtitle="John Doe" />
        <div class="content-grid">
          <div class="responses-row">
            <SurveyResponsesCard :responses="responses" />
            <AssignCoursesDropdown />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* --- Dashboard Layout Styles (copied from UserDashboardView) --- */
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

/* --- Survey Content Styles --- */
/* --- Survey Content Styles --- */

.content-grid {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.responses-row {
  display: flex;
  gap: 24px;
  width: 100%;
}

@media (max-width: 900px) {
  .responses-row {
    flex-direction: column;
    gap: 16px;
    max-width: 100%;
    align-items: stretch;
  }
}

@media (max-width: 900px) {
  .content-grid {
    gap: 8px;
    max-width: 100%;
  }

  @media (max-width: 600px) {
    .user-dashboard__layout {
      padding: 8px;
      gap: 8px;
    }

    .dashboard {
      padding: 0;
    }

    .content-grid {
      gap: 8px;
    }

    .sidebar {
      flex-direction: column;
      gap: 8px;
    }
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}
</style>