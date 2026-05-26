<script setup>
import SurveyOption from './SurveyOption.vue'

defineProps({
    question: Object,
    selected: String
})

defineEmits(['select'])
</script>

<template>
    <div class="card">

        <h2>
            {{ question.title }}
        </h2>

        <p>
            {{ question.subtitle }}
        </p>

        <SurveyOption v-for="option in question.options" :key="option.value" :option="option"
            :selected="selected === option.value" @click="$emit('select', option.value)" />

    </div>
</template>

<style scoped>
.card {
    background: white;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 32px;
}
</style>