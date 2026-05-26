<script setup>
defineProps({
    canGoBack: Boolean
})

defineEmits([
    'back',
    'next'
])
</script>

<template>
    <div class="navigation">

        <button v-if="canGoBack" class="secondary" @click="$emit('back')">
            Back
        </button>

        <button class="primary" @click="$emit('next')">
            Next
        </button>

    </div>
</template>

<style scoped>
.navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
}

.primary {
    background: #f36f21;
    color: white;
}

.secondary {
    background: white;
    border: 1px solid #ccc;
}

button {
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
}
</style>