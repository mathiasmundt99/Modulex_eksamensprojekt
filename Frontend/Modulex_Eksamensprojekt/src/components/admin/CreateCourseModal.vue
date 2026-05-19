<script setup>
defineEmits(['close'])

const contentItems = [
  { id: 1, title: 'Introduction to Modulex Products' },
  { id: 2, title: 'Product Catalog 2024' },
  { id: 3, title: 'Installation Guidelines' }
]
</script>

<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal">
      <h3 class="modal__title">Create New Course</h3>
      <div class="form">
        <div class="form-group">
          <label class="form-label">Course Title</label>
          <input type="text" class="form-input" placeholder="Enter course title" />
        </div>
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea class="form-input form-textarea" rows="3" placeholder="Enter course description"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Select Content</label>
          <div class="content-list">
            <label v-for="item in contentItems" :key="item.id" class="content-list__item">
              <input type="checkbox" class="checkbox" />
              <span>{{ item.title }}</span>
            </label>
          </div>
        </div>
        <div class="form-actions">
          <button class="btn btn--cancel" @click="$emit('close')">Cancel</button>
          <button class="btn btn--submit">Create Course</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  max-width: 640px;
  max-height: 90vh;
  overflow-y: auto;
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
  resize: vertical;
}

.form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(239, 96, 35, 0.15);
}

.content-list {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 192px;
  overflow-y: auto;
}

.content-list__item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: var(--color-text);
}

.checkbox {
  width: 16px;
  height: 16px;
  accent-color: var(--color-primary);
  cursor: pointer;
}

.form-actions {
  display: flex;
  gap: 12px;
  padding-top: 8px;
}

.btn {
  flex: 1;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.15s;
}

.btn--cancel {
  border: 1px solid var(--color-border);
  background-color: var(--color-white);
  color: var(--color-text);
}

.btn--cancel:hover {
  background-color: var(--color-bg);
}

.btn--submit {
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
}

.btn--submit:hover {
  background-color: var(--color-primary-hover);
}
</style>
