<script setup>
defineProps({
    step: Number,
    total: Number,
    progress: Number
})
</script>

<template>
    <div class="progress">

        <div class="progress-top">
            <span>Step {{ step }} of {{ total }}</span>
            <span>{{ Math.round(progress) }}%</span>
        </div>

        <div class="bar">
            <div class="fill" :style="{ width: progress + '%' }" />
        </div>

    </div>
</template>

<style scoped>
.progress {
    margin-bottom: 32px;
}

.progress-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.bar {
    height: 8px;
    background: var(--color-border);
    border-radius: 999px;
}

.fill {
    height: 100%;
    background: var(--color-primary);
    border-radius: 999px;
}
</style>