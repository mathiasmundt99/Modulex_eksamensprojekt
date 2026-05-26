<script setup>
import { computed, ref } from 'vue'
import SurveyProgress from '../components/survey/SurveyProgress.vue'
import SurveyQuestion from '../components/survey/SurveyQuestions.vue'
import SurveyNavigation from '../components/survey/SurveyNavigation.vue'

const questions = [
    {
        id: 1,
        title: 'What type of business are you?',
        subtitle: 'This helps us tailor your onboarding experience',
        options: [
            {
                value: 'reseller',
                title: 'Distributor / Reseller',
                description: 'I sell products to end customers'
            },
            {
                value: 'installer',
                title: 'Installation Company',
                description: 'I install signage systems'
            },
            {
                value: 'both',
                title: 'Distributor & Installer',
                description: 'I sell and install'
            },
            {
                value: 'architect',
                title: 'Architect / Designer',
                description: 'I specify products for projects'
            },
            {
                value: 'other',
                title: 'Other',
                description: 'My business type is not listed'
            }
        ]
    }
]

const currentStep = ref(0)

const answers = ref({})

const currentQuestion = computed(
    () => questions[currentStep.value]
)

function selectAnswer(value) {
    answers.value[currentQuestion.value.id] = value
}

function next() {
    if (currentStep.value < questions.length - 1) {
        currentStep.value++
    }
}

function previous() {
    if (currentStep.value > 0) {
        currentStep.value--
    }
}

const progress = computed(() => {
    return ((currentStep.value + 1) / questions.length) * 100
})
</script>

<template>
    <div class="survey-view">

        <SurveyProgress :step="currentStep + 1" :total="questions.length" :progress="progress" />

        <SurveyQuestion :question="currentQuestion" :selected="answers[currentQuestion.id]" @select="selectAnswer" />

        <SurveyNavigation :can-go-back="currentStep > 0" @back="previous" @next="next" />

    </div>
</template>

<style scoped>
.survey-view {
    max-width: 900px;
    margin: 0 auto;
    padding: 32px;
}
</style>