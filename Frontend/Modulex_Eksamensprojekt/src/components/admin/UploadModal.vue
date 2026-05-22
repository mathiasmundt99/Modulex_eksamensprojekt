<script setup>
import { ref, computed } from "vue";
import BaseButton from "../BaseButton.vue";
import {
  uploadPdf,
  createLibraryContent,
  updateLibraryContent,
} from "@/services/contentService";

const props = defineProps({
  item: { type: Object, default: null },
});
const emit = defineEmits(["close", "content-added"]);

const isEditMode = computed(() => !!props.item);

const form = ref({
  title: props.item?.title ?? "",
  type: props.item?.type ?? "video",
  description: props.item?.description ?? "",
  videoUrl: props.item?.videoUrl ?? "",
});

const hasExistingFile = ref(isEditMode.value);
const selectedFile = ref(null);
const videoUrl = ref("");

function handleFileChange(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.type !== "application/pdf") {
    alert("Only PDF files are allowed");
    return;
  }
  selectedFile.value = file;
}

async function handleUpload() {
  try {
    let uploadedContent;

    if (isEditMode.value) {
      console.log("Editing item with ID:", props.item.id); // DEBUG
      console.log("Item data:", props.item); // DEBUG

      uploadedContent = await updateLibraryContent(props.item.id, {
        title: form.value.title,
        description: form.value.description,
      });

      console.log("Content updated:", uploadedContent);
      emit("content-added", uploadedContent);
      emit("close");
      return;
    }

    if (form.value.type === "pdf") {
      if (!selectedFile.value) {
        alert("Please select a PDF");
        return;
      }

      const pdfResult = await uploadPdf(selectedFile.value);
      console.log("PDF upload result:", pdfResult);

      const contentPayload = {
        title: form.value.title,
        description: form.value.description,
        type: "pdf",
        url: pdfResult.data.fileName, // ÆNDRING: Brug fileName i stedet for url
        durationOrPages: pdfResult.data.size.toString() || "0",
      };
      console.log("Sending to library:", contentPayload);

      uploadedContent = await createLibraryContent(contentPayload);
      console.log("PDF uploaded and saved to library:", uploadedContent);
    }

    if (form.value.type === "video") {
      if (!form.value.videoUrl) {
        alert("Please enter a YouTube URL");
        return;
      }

      const contentPayload = {
        title: form.value.title,
        description: form.value.description,
        type: "video",
        url: form.value.videoUrl,
        durationOrPages: "0:00",
      };
      console.log("Sending to library:", contentPayload);

      uploadedContent = await createLibraryContent(contentPayload);
      console.log("Video saved to library:", uploadedContent);
    }

    emit("content-added", uploadedContent);
    emit("close");
  } catch (error) {
    console.error("Full error:", error);
    alert("Error uploading content");
  }
}
</script>

<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal">
      <h3 class="modal__title">
        {{ isEditMode ? "Edit Content" : "Upload New Content" }}
      </h3>
      <div class="form">
        <div class="form-group">
          <label class="form-label">Content Title</label>
          <input
            v-model="form.title"
            type="text"
            class="form-input"
            placeholder="Enter title" />
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
            placeholder="Write a short description of this content"></textarea>
        </div>
        <div class="form-group">
          <div v-if="hasExistingFile" class="existing-file">
            <span class="material-symbols-rounded existing-file__icon">
              {{ form.type === "video" ? "play_circle" : "picture_as_pdf" }}
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
          <div
            v-if="!isEditMode && form.type === 'pdf'"
            class="dropzone"
            @click="$refs.fileInput.click()">
            <input
              ref="fileInput"
              type="file"
              accept=".pdf"
              style="display: none"
              @change="handleFileChange" />

            <span class="material-symbols-rounded cloud-icon">
              cloud_upload
            </span>

            <p class="dropzone__text">Drag and drop or click to upload</p>

            <p v-if="selectedFile">
              {{ selectedFile.name }}
            </p>
          </div>
          <div v-else-if="form.type === 'video'" class="form-group">
            <label class="form-label">YouTube URL</label>
            <input
              v-model="form.videoUrl"
              type="text"
              class="form-input"
              placeholder="https://youtube.com/watch?v=..." />
          </div>
        </div>
        <div class="form-actions">
          <BaseButton variant="outline" @click="$emit('close')"
            >Cancel</BaseButton
          >
          <BaseButton @click="handleUpload">{{
            isEditMode ? "Save Changes" : "Upload"
          }}</BaseButton>
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
  display: flex;
  flex-direction: column;
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
