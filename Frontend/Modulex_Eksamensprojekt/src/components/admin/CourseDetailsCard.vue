<script setup>
const props = defineProps({
  courseData: { type: Object, required: true },
  isEditing:  { type: Boolean, default: false },
})
const emit = defineEmits(['update:courseData'])

function update(field, value) {
  emit('update:courseData', { ...props.courseData, [field]: value })
}
</script>

<template>
  <div class="card">
    <h3 class="card__title">Course Details</h3>
    <div class="fields">
      <div class="field">
        <label class="field__label">Course Title</label>
        <input
          v-if="isEditing"
          type="text"
          class="field__input"
          :value="courseData.title"
          @input="update('title', $event.target.value)"
          placeholder="Enter course title"
        />
        <p v-else class="field__text">{{ courseData.title || '—' }}</p>
      </div>
      <div class="field">
        <label class="field__label">Description</label>
        <textarea
          v-if="isEditing"
          class="field__input field__textarea"
          rows="4"
          :value="courseData.description"
          @input="update('description', $event.target.value)"
          placeholder="Enter course description"
        ></textarea>
        <p v-else class="field__text">{{ courseData.description || '—' }}</p>
      </div>
      <div class="field">
        <label class="field__label">Status</label>
        <select
          v-if="isEditing"
          class="field__input"
          :value="courseData.status"
          @change="update('status', $event.target.value)"
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <span
          v-else
          :class="['badge', courseData.status === 'published' ? 'badge--published' : 'badge--draft']"
        >
          {{ courseData.status || 'draft' }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 24px;
}

.card__title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field__label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
}

.field__input {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 14px;
  color: var(--color-text);
  background-color: var(--color-white);
  outline: none;
  font-family: inherit;
  box-sizing: border-box;
}

.field__input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(239, 96, 35, 0.15);
}

.field__textarea {
  resize: vertical;
}

.field__text {
  font-size: 15px;
  color: var(--color-text);
  padding: 10px 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-bg);
  min-height: 42px;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  font-size: 12px;
  border-radius: 9999px;
  width: fit-content;
}

.badge--published {
  background-color: var(--color-accent);
  color: var(--color-white);
}

.badge--draft {
  background-color: var(--color-border);
  color: var(--color-text);
}
</style>
