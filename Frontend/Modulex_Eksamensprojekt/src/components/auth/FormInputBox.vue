<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  icon: { type: String, required: true },
  type: { type: String, default: "text" },
  placeholder: { type: String, default: "" },
  modelValue: { type: String, default: "" },
  suffixIcon: { type: String, default: null },
});

defineEmits(["update:modelValue", "click-suffix"]);

const showPassword = ref(false);

const inputType = computed(() => {
  if (props.type === "password")
    return showPassword.value ? "text" : "password";
  return props.type;
});

const visibilityIcon = computed(() =>
  showPassword.value ? "visibility" : "visibility_off",
);
</script>

<template>
  <div class="input-box">
    <span class="material-symbols-rounded">{{ icon }}</span>

    <input
      :type="inputType"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" />
    <span
      v-if="suffixIcon"
      class="material-symbols-rounded suffix-icon"
      @click="showPassword = !showPassword">
      {{ visibilityIcon }}
    </span>
  </div>
</template>

<style scoped>
.input-box {
  height: 46px;
  background: var(--color-input-bg);
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
  color: var(--color-text-muted);
}

.suffix-icon {
  cursor: pointer;
  user-select: none;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.suffix-icon:hover {
  color: var(--color-text);
}
</style>
