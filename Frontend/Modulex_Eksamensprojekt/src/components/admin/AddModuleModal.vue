<script setup>
import BaseButton from '../BaseButton.vue'

defineProps({
  show:             { type: Boolean, required: true },
  availableContent: { type: Array,   required: true },
})
defineEmits(['close', 'add'])
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="backdrop" @click.self="$emit('close')">
      <div class="modal">
        <div class="modal__header">
          <h3 class="modal__title">Add Module from Content Library</h3>
          <BaseButton variant="ghost" @click="$emit('close')">
            <span class="material-symbols-rounded">close</span>
          </BaseButton>
        </div>

        <div class="content-list">
          <div v-for="item in availableContent" :key="item.id" class="content-item">
            <div class="content-item__info">
              <span class="material-symbols-rounded content-item__icon">
                {{ item.type === 'video' ? 'play_circle' : 'picture_as_pdf' }}
              </span>
              <div>
                <p class="content-item__title">{{ item.title }}</p>
                <p class="content-item__meta">
                  {{ item.type === 'video' ? item.duration : item.pages + ' pages' }}
                </p>
              </div>
            </div>
            <BaseButton @click="$emit('add', item)">Add</BaseButton>
          </div>
        </div>

        <div class="modal__footer">
          <BaseButton variant="outline" class="btn--block" @click="$emit('close')">
            Close
          </BaseButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.backdrop {
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
  max-height: 80vh;
  overflow-y: auto;
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.modal__title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
}

.content-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.content-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.content-item__info {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
}

.content-item__icon {
  color: var(--color-accent);
  font-size: 20px;
  margin-top: 2px;
}

.content-item__title {
  font-size: 15px;
  color: var(--color-text);
  margin-bottom: 4px;
}

.content-item__meta {
  font-size: 13px;
  color: var(--color-text);
  opacity: 0.6;
}

.modal__footer {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
}

.btn--block {
  width: 100%;
  justify-content: center;
}
</style>
