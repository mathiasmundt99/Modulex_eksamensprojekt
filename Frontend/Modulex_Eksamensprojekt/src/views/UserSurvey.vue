<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

import SurveyNavbar from '../components/survey/SurveyNavbar.vue'
import SurveyIntro from '../components/survey/SurveyIntro.vue'
import SurveyProgress from '../components/survey/SurveyProgress.vue'
import SurveyQuestion from '../components/survey/SurveyQuestions.vue'
import SurveyNavigation from '../components/survey/SurveyNavigation.vue'

import {
    getSurveyQuestions,
    submitSurveyAnswers
} from '../services/surveyService'
import { useCurrentUser } from '../composables/useCurrentUser.js'

const { user } = useCurrentUser()

const questions = ref([])
const currentStep = ref(0)
const answers = ref({})
const introVisible = ref(true)

onMounted(async () => {
    try {
        questions.value = await getSurveyQuestions()
    } catch (error) {
        console.error(error)
    }
})

const currentQuestion = computed(() => questions.value[currentStep.value])

const isLastStep = computed(() =>
    questions.value.length > 0 && currentStep.value === questions.value.length - 1
)

const selectedAnswer = computed(() => {
    if (!currentQuestion.value) return null
    return answers.value[currentQuestion.value.step] ?? null
})

function selectAnswer(value) {
    answers.value[currentQuestion.value.step] = value
}

async function submitSurvey() {
    try {
        const payload = {
            user_id: user.value?.id,
            answers: Object.entries(answers.value).map(([step, selectedOption]) => ({
                step: Number(step),
                selected_option: selectedOption
            }))
        }

        await submitSurveyAnswers(payload)
        router.push('/dashboard')
    } catch (error) {
        console.error(error)
    }
}

async function next() {
    if (!selectedAnswer.value) return

    if (!isLastStep.value) {
        currentStep.value++
        return
    }

    await submitSurvey()
}

function previous() {
    if (currentStep.value > 0) {
        currentStep.value--
    }
}

const progress = computed(() => {
    if (!questions.value.length) return 0
    return ((currentStep.value + 1) / questions.value.length) * 100
})
</script>

<template>
    <div class="survey-page">
        <SurveyNavbar />

        <div class="survey-content">
            <!-- Intro step -->
            <SurveyIntro
                v-if="introVisible"
                :total-questions="questions.length"
                @start="introVisible = false" />

            <!-- Questions -->
            <template v-else-if="currentQuestion">
                <SurveyProgress
                    :step="currentStep + 1"
                    :total="questions.length"
                    :progress="progress" />

                <SurveyQuestion
                    :question="currentQuestion"
                    :selected="selectedAnswer"
                    @select="selectAnswer" />

                <SurveyNavigation
                    :can-go-back="currentStep > 0"
                    :is-last="isLastStep"
                    :can-go-next="!!selectedAnswer"
                    @back="previous"
                    @next="next" />
            </template>

            <p v-else>Loading survey...</p>
        </div>
    </div>
</template>

<style scoped>
.survey-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--color-bg);
}

.survey-content {
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding: 32px 24px;
}
</style>
