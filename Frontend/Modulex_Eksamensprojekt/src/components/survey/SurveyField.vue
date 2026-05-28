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
    padding: 10px 0;
    border-bottom: 1px solid var(--color-border);
}

.label {
    font-size: 10px;
    color: var(--color-white);
    background-color: var(--color-accent);
    width: fit-content;
    padding: 5px 10px;
    border-radius: 9999px;
}

.value {
    margin-top: 8px;
    font-size: 16px;
}
</style>