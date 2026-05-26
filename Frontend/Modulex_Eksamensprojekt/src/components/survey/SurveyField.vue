<script setup>
defineProps({
    label: String,
    value: String
})
</script>

<template>
    <div class="field">
        <div class="label">
            {{ label }}
        </div>

        <slot>
            <div class="value">
                {{ value }}
            </div>
        </slot>
    </div>
</template>

<style scoped>
.field {
    padding: 20px 0;
    border-bottom: 1px solid #e5e5e5;
}

.label {
    font-size: 14px;
    color: #666;
}

.value {
    margin-top: 8px;
    font-size: 24px;
}
</style>