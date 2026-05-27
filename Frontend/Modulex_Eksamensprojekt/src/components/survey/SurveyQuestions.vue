<script setup>
import SurveyOption from './SurveyOption.vue'

defineProps({
    question: Object,
    selected: String
})

defineEmits(['select'])
</script>

<template>
    <div v-if="question" class="card">

        <h2>
            {{ question.question }}
        </h2>

        <SurveyOption v-for="option in question.options" :key="option" :option="option" :selected="selected === option"
            @select="$emit('select', option)" />

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