<script setup>
defineProps({
    items: Array,
    variant: {
        type: String,
        default: 'default'
    }
})
</script>

<template>
    <div class="tags">
        <span v-for="item in items" :key="item" :class="['tag', variant]">
            {{ item }}
        </span>
    </div>
</template>

<style scoped>
.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.tag {
    padding: 8px 14px;
    border-radius: 999px;
    font-size: 14px;
}

.blue {
    background: var(--color-accent);
    color: var(--color-white);
}

.orange {
    background: var(--color-primary);
    color: var(--color-white);
}

.default {
    border: 1px solid var(--color-border);
}
</style>