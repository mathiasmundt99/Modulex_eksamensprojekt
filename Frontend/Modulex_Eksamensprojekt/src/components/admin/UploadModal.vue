<script setup>
import { ref, computed } from 'vue'
import BaseButton from '../BaseButton.vue'

const props = defineProps({
  item: { type: Object, default: null },
})
defineEmits(['close'])

const isEditMode = computed(() => !!props.item)

const form = ref({
  title:       props.item?.title       ?? '',
  type:        props.item?.type        ?? 'video',
  description: props.item?.description ?? '',
})

const hasExistingFile = ref(isEditMode.value)
</script>

<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal">
      <h3 class="modal__title">{{ isEditMode ? 'Edit Content' : 'Upload New Content' }}</h3>
      <div class="form">
        <div class="form-group">
          <label class="form-label">Content Title</label>
          <input
            v-model="form.title"
            type="text"
            class="form-input"
            placeholder="Enter title"
          />
        </div>
        <div class="form-group">
          <label class="form-label">Content Type</label>
          <select v-model="form.type" class="form-input">
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea
            v-model="form.description"
            class="form-input form-textarea"
            rows="3"
            placeholder="Write a short description of this content"
          ></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">File</label>
          <div v-if="hasExistingFile" class="existing-file">
            <span class="material-symbols-rounded existing-file__icon">
              {{ form.type === 'video' ? 'play_circle' : 'picture_as_pdf' }}
            </span>
            <div class="existing-file__info">
              <p class="existing-file__name">{{ form.title }}</p>
              <p class="existing-file__meta">Current file</p>
            </div>
            <BaseButton variant="ghost" @click="hasExistingFile = false">
              <span class="material-symbols-rounded">delete</span>
              Remove
            </BaseButton>
          </div>
          <div v-else class="dropzone">
            <span class="material-symbols-rounded cloud-icon">cloud_upload</span>
            <p class="dropzone__text">Drag and drop or click to upload</p>
          </div>
        </div>
        <div class="form-actions">
          <BaseButton variant="outline" @click="$emit('close')">Cancel</BaseButton>
          <BaseButton>{{ isEditMode ? 'Save Changes' : 'Upload' }}</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cloud-icon {
  font-size: 48px;
  color: var(--color-primary);
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 50;
}

.modal {
  background-color: var(--color-white);
  border-radius: 8px;
  padding: 24px;
  width: 100%;
  max-width: 448px;
}

.modal__title {
  font-size: 20px;
  font-weight: 400;
  color: var(--color-text);
  margin-bottom: 24px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  color: var(--color-text);
}

.form-input {
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

.form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(239, 96, 35, 0.15);
}

.form-textarea {
  resize: vertical;
}

.existing-file {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-bg);
}

.existing-file__icon {
  font-size: 24px;
  color: var(--color-accent);
  flex-shrink: 0;
}

.existing-file__info {
  flex: 1;
  min-width: 0;
}

.existing-file__name {
  font-size: 14px;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.existing-file__meta {
  font-size: 12px;
  color: var(--color-text);
  opacity: 0.6;
  margin-top: 2px;
}

.dropzone {
  border: 2px dashed var(--color-border);
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  cursor: pointer;
}

.dropzone__text {
  font-size: 14px;
  color: var(--color-text);
}

.form-actions {
  display: flex;
  gap: 12px;
  padding-top: 8px;
}
</style>
