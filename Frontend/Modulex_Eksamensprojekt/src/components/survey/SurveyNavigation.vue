<script setup>
defineProps({
    canGoBack: Boolean,
    isLast: Boolean,
    canGoNext: Boolean,
})

defineEmits(['back', 'next'])
</script>

<template>
    <div class="navigation">
        <div class="nav-left">
            <button v-if="canGoBack" class="secondary" @click="$emit('back')">
                Back
            </button>
        </div>
        <div class="nav-right">
            <button
                class="primary"
                :disabled="!canGoNext"
                @click="$emit('next')">
                {{ isLast ? 'Submit Survey' : 'Next' }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
}

.nav-left {
    flex: 1;
}

.nav-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
}

button {
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    border: none;
    transition: opacity 0.15s, background 0.15s;
}

.primary {
    background: var(--color-primary);
    color: white;
}

.primary:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.secondary {
    background: white;
    border: 1px solid #ccc;
    color: var(--color-text);
}

.secondary:hover {
    background: var(--color-bg);
}
</style>
