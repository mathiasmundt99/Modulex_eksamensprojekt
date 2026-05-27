<script setup>
import BaseButton from '../BaseButton.vue'

defineProps({
  show: { type: Boolean, required: true },
  userName: { type: String, required: true },
  availableCourses: { type: Array, required: true },
})

const emit = defineEmits([
  'close',
  'assign'
])
</script>

<template>
  <Teleport to="body">

    <div v-if="show" class="modal-backdrop" @click.self="emit('close')">

      <div class="modal">

        <div class="modal-header">

          <h3 class="modal-title">
            Assign Course to {{ userName }}
          </h3>

          <BaseButton variant="ghost" class="modal-close" @click="emit('close')">
            <span class="material-symbols-rounded">
              close
            </span>
          </BaseButton>

        </div>

        <div class="modal-body">

          <div v-for="course in availableCourses" :key="course.id" class="available-course">

            <div class="available-course__info">

              <h4 class="course-title">
                {{ course.title }}
              </h4>

              <div class="available-course__meta">

                <span v-if="course.type">
                  {{ course.type }}
                </span>

                <span v-if="course.durationOrPages">
                  • {{ course.durationOrPages }}
                </span>

              </div>

              <p v-if="course.description" class="course-description">
                {{ course.description }}
              </p>

            </div>

            <BaseButton variant="primary" class="assign-btn" @click="emit('assign', course)">
              Assign
            </BaseButton>

          </div>

        </div>

        <div class="modal-footer">

          <BaseButton variant="outline" block @click="emit('close')">
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
  max-width: 700px;
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
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.available-course {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;

  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
}

.available-course:hover {
  border-color: var(--color-primary);
}

.available-course__info {
  flex: 1;
}

.course-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.available-course__meta {
  margin-top: 6px;
  font-size: 13px;
  color: #666;
}

.course-description {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.assign-btn {
  flex-shrink: 0;
}

.modal-footer {
  border-top: 1px solid var(--color-border);
  padding-top: 16px;
}
</style>