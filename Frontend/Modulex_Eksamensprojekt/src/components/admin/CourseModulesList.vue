<script setup>
import { ref } from 'vue'
import BaseButton     from '../BaseButton.vue'
import AddModuleModal from './AddModuleModal.vue'

const props = defineProps({
  modules:          { type: Array,   required: true },
  isEditing:        { type: Boolean, default: false },
  availableContent: { type: Array,   required: true },
})
const emit = defineEmits(['remove-module', 'add-module', 'reorder'])

const showModal   = ref(false)
const draggedIdx  = ref(null)
const dragOverIdx = ref(null)

function handleAdd(content) {
  emit('add-module', content)
  showModal.value = false
}

function onDragStart(index) {
  draggedIdx.value = index
}

function onDragOver(event, index) {
  event.preventDefault()
  dragOverIdx.value = index
}

function onDrop(index) {
  if (draggedIdx.value === null || draggedIdx.value === index) return
  emit('reorder', { from: draggedIdx.value, to: index })
  draggedIdx.value  = null
  dragOverIdx.value = null
}

function onDragEnd() {
  draggedIdx.value  = null
  dragOverIdx.value = null
}
</script>

<template>
  <div class="card">
    <div class="card__header">
      <h3 class="card__title">Course Modules</h3>
      <BaseButton v-if="isEditing" @click="showModal = true">
        <span class="material-symbols-rounded">add</span>
        Add Module
      </BaseButton>
    </div>

    <div class="modules">
      <div
        v-for="(module, index) in modules"
        :key="module.id"
        :class="[
          'module-item',
          { 'module-item--dragging':  draggedIdx === index },
          { 'module-item--drag-over': dragOverIdx === index && draggedIdx !== index },
        ]"
        :draggable="isEditing"
        @dragstart="onDragStart(index)"
        @dragover="onDragOver($event, index)"
        @drop="onDrop(index)"
        @dragend="onDragEnd"
      >
        <span
          v-if="isEditing"
          class="material-symbols-rounded module-item__grip"
        >
          drag_indicator
        </span>
        <div class="module-item__number">{{ index + 1 }}</div>
        <div class="module-item__body">
          <div class="module-item__type">
            <span class="material-symbols-rounded module-item__icon">
              {{ module.type === 'video' ? 'play_circle' : 'picture_as_pdf' }}
            </span>
            <span class="module-item__type-label">
              {{ module.type === 'video' ? 'Video' : 'PDF' }}
            </span>
          </div>
          <p class="module-item__title">{{ module.title }}</p>
          <p class="module-item__meta">
            {{ module.duration || module.pages + ' pages' }}
          </p>
        </div>
        <BaseButton
          v-if="isEditing"
          variant="ghost"
          @click="$emit('remove-module', module.id)"
        >
          <span class="material-symbols-rounded">delete</span>
        </BaseButton>
      </div>

      <div v-if="modules.length === 0" class="empty">
        <p class="empty__text">No modules added yet</p>
        <BaseButton v-if="isEditing" @click="showModal = true">
          Add First Module
        </BaseButton>
      </div>
    </div>

    <AddModuleModal
      :show="showModal"
      :availableContent="availableContent"
      @close="showModal = false"
      @add="handleAdd"
    />
  </div>
</template>

<style scoped>
.card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 24px;
}

.card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
}

.card__title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
}

.modules {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.module-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  transition: box-shadow 0.15s, opacity 0.15s, border-color 0.15s;
}

.module-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.module-item--dragging {
  opacity: 0.4;
}

.module-item--drag-over {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(239, 96, 35, 0.15);
}

.module-item__grip {
  color: var(--color-border);
  cursor: grab;
  font-size: 20px;
  flex-shrink: 0;
  transition: color 0.15s;
}

.module-item__grip:hover {
  color: var(--color-primary);
}

.module-item__number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  background-color: var(--color-accent);
  color: var(--color-white);
  font-size: 14px;
  font-weight: 500;
  flex-shrink: 0;
}

.module-item__body {
  flex: 1;
  min-width: 0;
}

.module-item__type {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.module-item__icon {
  font-size: 16px;
  color: var(--color-accent);
}

.module-item__type-label {
  font-size: 12px;
  color: var(--color-text);
  opacity: 0.6;
}

.module-item__title {
  font-size: 15px;
  color: var(--color-text);
  margin-bottom: 2px;
}

.module-item__meta {
  font-size: 13px;
  color: var(--color-text);
  opacity: 0.6;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 48px 24px;
  text-align: center;
}

.empty__text {
  font-size: 15px;
  color: var(--color-text);
}
</style>
