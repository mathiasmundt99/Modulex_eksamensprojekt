<script setup>
import BaseButton from '../BaseButton.vue'

defineProps({
  show:             { type: Boolean,  required: true },
  userName:         { type: String,   required: true },
  availableCourses: { type: Array,    required: true },
})

const emit = defineEmits(['close', 'assign'])
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="modal-backdrop" @click.self="emit('close')">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">Assign Course to {{ userName }}</h3>
          <BaseButton variant="ghost" class="modal-close" @click="emit('close')">
            <span class="material-symbols-rounded">close</span>
          </BaseButton>
        </div>

        <div class="modal-body">
          <div
            v-for="course in availableCourses"
            :key="course.id"
            class="available-course"
          >
            <div class="available-course__info">
              <h4 class="course-title">{{ course.title }}</h4>
              <div class="available-course__meta">
                <span class="material-symbols-rounded meta-icon">menu_book</span>
                {{ course.modules }} modules
                <span class="material-symbols-rounded meta-icon meta-icon--gap">schedule</span>
                {{ course.duration }}
              </div>
            </div>
            <BaseButton variant="primary" class="assign-btn" @click="emit('assign', course)">Assign</BaseButton>
          </div>
        </div>

        <div class="modal-footer">
          <BaseButton variant="outline" class="btn--block" @click="emit('close')">
            Close
          </BaseButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 100;
}

.modal {
  background: var(--color-white);
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  font-size: 18px;
  color: var(--color-text);
}

.modal-close {
  display: flex;
  align-items: center;
  color: var(--color-text);
  cursor: pointer;
  border-radius: 6px;
  transition: color 0.15s;
}

.modal-close:hover {
  color: var(--color-primary);
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-footer {
  border-top: 1px solid var(--color-border);
  padding-top: 16px;
}

.available-course {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: border-color 0.15s;
}

.available-course:hover {
  border-color: var(--color-primary);
}

.available-course__info {
  flex: 1;
}

.available-course__meta {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--color-text);
  margin-top: 8px;
}

.meta-icon {
  font-size: 16px;
}

.meta-icon--gap {
  margin-left: 12px;
}

.btn--block {
  width: 100%;
  justify-content: center;
}

.course-title {
  font-size: 16px;
  color: var(--color-text);
}

.assign-btn {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.15s;
}

.assign-btn:hover {
  background-color: var(--color-primary-hover);
}
</style>
