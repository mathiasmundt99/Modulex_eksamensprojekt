<script setup>
import { ref, watch } from 'vue'

import SurveyResponsesCard from '../components/survey/SurveyResponseCard.vue'
import AssignCoursesDropdown from '../components/survey/AssignCoursesDropdown.vue'
import UserNavbar from '../components/user/UserNavbar.vue'

import { getUserSurveyAnswers } from '../services/surveyService'
import { useCurrentUser } from '../composables/useCurrentUser.js'

const { user } = useCurrentUser()

const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

const responses = ref({
  businessType: '',
  companySize: '',
  leadSource: '',
  primaryMarket: '',
  experienceLevel: '',
  challenge: '',
  submitted: ''
})

watch(user, async (u) => {
  if (!u) return
  try {
    const surveyData =
      await getUserSurveyAnswers(u.id)

    console.log(
      'Survey answers:',
      surveyData
    )

    if (!surveyData.length) {
      return
    }

    const latestSurvey =
      surveyData[surveyData.length - 1]

    console.log(
      'Latest survey:',
      latestSurvey
    )

    const answers =
      latestSurvey.answers

    console.log(
      'Answers:',
      answers
    )

    responses.value = {
      businessType:
        answers.find(a => a.step === 1)
          ?.selected_option || '',

      companySize:
        answers.find(a => a.step === 2)
          ?.selected_option || '',

      leadSource:
        answers.find(a => a.step === 3)
          ?.selected_option || '',

      primaryMarket:
        answers.find(a => a.step === 4)
          ?.selected_option || '',

      experienceLevel:
        answers.find(a => a.step === 5)
          ?.selected_option || '',

      challenge:
        answers.find(a => a.step === 6)
          ?.selected_option || '',

      submitted:
        latestSurvey.createdAt
          ? new Date(
            latestSurvey.createdAt
          ).toLocaleDateString()
          : ''
    }

    console.log(
      'Mapped responses:',
      responses.value
    )

  } catch (error) {
    console.error(error)
  }
})
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

.dashboard {
  flex: 1;
  min-width: 0;
  width: 100%;
}

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

@media (max-width: 1023px) {
  .user-dashboard__layout {
    flex-direction: column;
  }
}

@media (max-width: 900px) {
  .responses-row {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .content-grid {
    gap: 8px;
  }
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
}
</style>