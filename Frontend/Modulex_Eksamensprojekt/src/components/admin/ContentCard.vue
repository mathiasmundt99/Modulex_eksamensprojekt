<script setup>
import BaseButton from "../BaseButton.vue";

defineProps({
  item: { type: Object, required: true },
});

const emit = defineEmits(["edit", "delete"]);
</script>

<template>
  <div class="content-card">
    <div class="content-card__header">
      <h3 class="content-card__title">{{ item.title }}</h3>
      <div class="content-card__actions">
        <BaseButton variant="ghost" class="action-btn" @click="emit('edit', item)">
          <span class="material-symbols-rounded">edit_square</span>
        </BaseButton>
        <BaseButton variant="ghost" class="action-btn" @click="emit('delete', item.id)">
          <span class="material-symbols-rounded">delete</span>
        </BaseButton>
      </div>
    </div>
    <p v-if="item.description" class="content-card__description">
      {{ item.description }}
    </p>
    <div class="content-card__tags">
      <span class="tag">
        <span class="material-symbols-rounded tag__icon">{{
          item.type === "video" ? "play_circle" : "picture_as_pdf"
        }}</span>
        {{ item.type === "video" ? "Video" : "PDF" }}
      </span>
      <span class="tag">{{
        item.type === "video" ? item.durationOrPages : item.durationOrPages + " pages"
      }}</span>
    </div>
    <div class="content-card__footer">
      <span>Used in {{ item.usedInCourses ?? 0 }} courses</span>
      <span>{{ item.createdAt ? new Date(item.createdAt).toLocaleDateString('da-DK') : '' }}</span>
    </div>
  </div>
</template>

<style scoped>
.content-card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 24px;
  transition: box-shadow 0.15s;
}

.content-card:hover {
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.content-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 12px;
}

.content-card__title {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text);
}

.content-card__actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.action-btn {
  display: flex;
  padding: 6px;
  color: var(--color-text);
  border-radius: 6px;
  cursor: pointer;
  transition: color 0.15s;
}

.action-btn:hover {
  color: var(--color-primary);
}

.content-card__description {
  font-size: 14px;
  color: var(--color-text);
  opacity: 0.7;
  margin-bottom: 12px;
  line-height: 1.5;
}

.content-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  background-color: var(--color-bg);
  border-radius: 9999px;
  font-size: 13px;
  color: var(--color-text);
}

.tag__icon {
  font-size: 16px;
}

.content-card__footer {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--color-text);
}
</style>
