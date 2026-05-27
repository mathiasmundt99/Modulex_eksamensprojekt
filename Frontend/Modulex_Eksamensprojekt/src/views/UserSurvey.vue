<script setup>
import { ref, computed, onMounted } from 'vue'

import SurveyProgress from '../components/survey/SurveyProgress.vue'
import SurveyQuestion from '../components/survey/SurveyQuestions.vue'
import SurveyNavigation from '../components/survey/SurveyNavigation.vue'

import {
    getSurveyQuestions,
    submitSurveyAnswers
} from '../services/surveyService'

const questions = ref([])

const currentStep = ref(0)

const answers = ref({})

onMounted(async () => {
    try {
        questions.value = await getSurveyQuestions()

        console.log('Questions:', questions.value)
    } catch (error) {
        console.error(error)
    }
})

const currentQuestion = computed(() => {
    return questions.value[currentStep.value]
})

function selectAnswer(value) {
    answers.value[currentQuestion.value.step] = value

    console.log('Answers:', answers.value)
}

async function submitSurvey() {
    try {
        const user = JSON.parse(
            localStorage.getItem('user')
        )

        const payload = {
            user_id: user.id,
            answers: Object.entries(
                answers.value
            ).map(([step, selectedOption]) => ({
                step: Number(step),
                selected_option: selectedOption
            }))
        }

        console.log('Submitting survey:', payload)

        const result =
            await submitSurveyAnswers(payload)

        console.log('Survey submitted:', result)

        // redirect eller success message her

    } catch (error) {
        console.error(error)
    }
}

async function next() {

    if (
        currentStep.value <
        questions.value.length - 1
    ) {
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

    return (
        ((currentStep.value + 1) /
            questions.value.length) *
        100
    )
})

const selectedAnswer = computed(() => {
    if (!currentQuestion.value) return null

    return answers.value[
        currentQuestion.value.step
    ]
})
</script>

<template>
    <div class="survey-view">

        <template v-if="currentQuestion">

            <SurveyProgress :step="currentStep + 1" :total="questions.length" :progress="progress" />

            <SurveyQuestion :question="currentQuestion" :selected="selectedAnswer" @select="selectAnswer" />

            <SurveyNavigation :can-go-back="currentStep > 0" @back="previous" @next="next" />

        </template>

        <p v-else>
            Loading survey...
        </p>

    </div>
</template>

<style scoped>
.survey-view {
    max-width: 900px;
    margin: 0 auto;
    padding: 32px;
}
</style>