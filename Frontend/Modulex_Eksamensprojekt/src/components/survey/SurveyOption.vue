<script setup>
defineProps({
    option: String,
    selected: Boolean
})

const emit = defineEmits(['select'])
</script>

<template>
    <button class="option" :class="{ selected }" @click="emit('select')">
        {{ option }}
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
}

.option.selected {
    border-color: #f36f21;
    background: #fff8f4;
}
</style>