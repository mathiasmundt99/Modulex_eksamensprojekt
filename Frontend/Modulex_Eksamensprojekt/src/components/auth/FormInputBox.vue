<script setup>
defineProps({
  icon:        { type: String, required: true },
  type:        { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  modelValue:  { type: String, default: '' },
  suffixIcon:  { type: String, default: null },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="input-box">
    <span class="material-symbols-rounded">{{ icon }}</span>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" />
    <span v-if="suffixIcon" class="material-symbols-rounded">{{ suffixIcon }}</span>
  </div>
</template>

<style scoped>
.input-box {
  height: 46px;
  background: #f6f6f6;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 0 14px;
}

.input-box input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.95rem;
  font-family: inherit;
}

.input-box input::placeholder {
  color: #aaa;
}
</style>
