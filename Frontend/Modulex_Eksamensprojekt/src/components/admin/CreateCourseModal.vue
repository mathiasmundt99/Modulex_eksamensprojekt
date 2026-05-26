<script setup>
import { ref, onMounted } from "vue";
import BaseButton from "../BaseButton.vue";
import { createCourse, linkContentToCourse } from "@/services/courseService";
import { getLibraryContent } from "@/services/contentService";

const emit = defineEmits(["close", "course-created"]);

const title = ref("");
const description = ref("");
const isLoading = ref(false);
const error = ref(null);
const contentItems = ref([]);
const selectedContentIds = ref([]);

onMounted(async () => {
  try {
    contentItems.value = await getLibraryContent();
  } catch {
    // content listen er valgfri — ignorer fejl
  }
});

async function handleCreateCourse() {
  if (!title.value.trim() || !description.value.trim()) {
    error.value = "Please fill in all fields";
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    const newCourse = await createCourse({
      title: title.value,
      description: description.value,
    });

    await Promise.all(
      selectedContentIds.value.map((id) =>
        linkContentToCourse(newCourse.id, id),
      ),
    );

    emit("course-created", { ...newCourse, contentIds: selectedContentIds.value });
    emit("close");
  } catch (err) {
    console.error("Failed to create course:", err);
    error.value = "Failed to create course";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal">
      <h3 class="modal__title">Create New Course</h3>
      <div class="form">
        <div v-if="error" class="error-message">{{ error }}</div>
        <div class="form-group">
          <label class="form-label">Course Title</label>
          <input
            v-model="title"
            type="text"
            class="form-input"
            placeholder="Enter course title" />
        </div>
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea
            v-model="description"
            class="form-input form-textarea"
            rows="3"
            placeholder="Enter course description"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Select Content</label>
          <div class="content-list">
            <p v-if="contentItems.length === 0" class="content-list__empty">
              No content available
            </p>
            <label
              v-for="item in contentItems"
              :key="item.id"
              class="content-list__item">
              <input
                v-model="selectedContentIds"
                type="checkbox"
                :value="item.id"
                class="checkbox" />
              <span>{{ item.title }}</span>
            </label>
          </div>
        </div>
        <div class="form-actions">
          <BaseButton variant="outline" @click="$emit('close')"
            >Cancel</BaseButton
          >
          <BaseButton @click="handleCreateCourse" :disabled="isLoading">
            {{ isLoading ? "Creating..." : "Create Course" }}
          </BaseButton>
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
  box-sizing: border-box;
}

.form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(239, 96, 35, 0.15);
}

.form-textarea {
  resize: vertical;
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

.content-list__empty {
  font-size: 14px;
  color: var(--color-text);
  opacity: 0.5;
  text-align: center;
  padding: 8px 0;
}

.checkbox {
  width: 16px;
  height: 16px;
  accent-color: var(--color-primary);
  cursor: pointer;
  flex-shrink: 0;
}

.error-message {
  padding: 10px 16px;
  background-color: #fee;
  color: #c33;
  border-radius: 8px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 12px;
  padding-top: 8px;
}
</style>
