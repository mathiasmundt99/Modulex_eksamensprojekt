<script setup>
import BaseButton from '../BaseButton.vue'
defineEmits(['close'])
</script>

<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal">
      <h3 class="modal__title">Upload New Content</h3>
      <div class="form">
        <div class="form-group">
          <label class="form-label">Content Title</label>
          <input type="text" class="form-input" placeholder="Enter title" />
        </div>
        <div class="form-group">
          <label class="form-label">Content Type</label>
          <select class="form-input">
            <option>Video</option>
            <option>PDF</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Upload File</label>
          <div class="dropzone">
            <span class="material-symbols-rounded cloud-icon">cloud_upload</span>
            <p class="dropzone__text">Drag and drop or click to upload</p>
          </div>
        </div>
        <div class="form-actions">
          <BaseButton variant="outline" @click="$emit('close')">Cancel</BaseButton>
          <BaseButton>Upload</BaseButton>
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
}

.form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(239, 96, 35, 0.15);
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
