<script setup>
import SurveyField from './SurveyField.vue'
import TagList from './TagList.vue'

defineProps({
    responses: Object
})
</script>

<template>
    <div class="survey-box">
        <div class="survey-header">
            <h2>Survey Responses</h2>
            <span class="submitted">Submitted: {{ responses.submitted }}</span>
        </div>
        <div class="survey-fields">
            <SurveyField label="Business Type" :value="responses.businessType" />
            <SurveyField label="Company Size" :value="responses.companySize" />
            <SurveyField label="Experience Level" :value="responses.experienceLevel" />
            <SurveyField label="Primary Markets">
                <TagList :items="responses.primaryMarkets" variant="blue" />
            </SurveyField>
            <SurveyField label="Product Interest">
                <TagList :items="responses.productInterest" variant="orange" />
            </SurveyField>
            <SurveyField label="Main Challenges">
                <TagList :items="responses.challenges" />
            </SurveyField>
            <SurveyField label="Setup Timeline" :value="responses.timeline" />
        </div>
    </div>
</template>

<style scoped>
.survey-box {
    background: var(--color-white, #fff);
    border: 1.5px solid var(--color-border, #e0e0e0);
    border-radius: 14px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    padding: 28px 24px 20px 24px;
    max-width: none;
    width: 100%;
}

.survey-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
}

.survey-header h2 {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0;
}

.submitted {
    color: #888;
    font-size: 0.95rem;
}

.survey-fields {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

@media (max-width: 600px) {
    .survey-box {
        padding: 14px 6px 10px 6px;
    }

    .survey-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }
}
</style>