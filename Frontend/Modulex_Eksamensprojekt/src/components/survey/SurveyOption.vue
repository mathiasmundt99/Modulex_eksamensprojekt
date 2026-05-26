<script setup>
defineProps({
    option: Object,
    selected: Boolean
})
</script>

<template>
    <button class="option" :class="{ selected }">
        <div class="title">
            {{ option.title }}
        </div>

        <div class="description">
            {{ option.description }}
        </div>
    </button>
</template>

<style scoped>
.option {
    width: 100%;
    text-align: left;

    padding: 20px;
    margin-top: 12px;

    border-radius: 10px;
    border: 1px solid #d9d9d9;

    background: white;
    cursor: pointer;

    transition: 0.2s;
}

.option:hover {
    border-color: #f36f21;
}

.option.selected {
    border-color: #f36f21;
    background: #fff8f4;
}

.title {
    font-weight: 600;
}

.description {
    margin-top: 4px;
    font-size: 14px;
    color: #666;
}
</style>