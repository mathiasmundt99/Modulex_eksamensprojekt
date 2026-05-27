<script setup>
import { ref, computed, watch } from "vue";
import BaseButton from "../BaseButton.vue";
import {
  uploadPdfToLibrary,
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
  videoUrl: props.item?.url ?? "",
  pages: props.item?.type === "pdf" ? (props.item?.durationOrPages ?? "") : "",
  duration: props.item?.type === "video" ? (props.item?.durationOrPages ?? "") : "",
});

const hasExistingFile = ref(isEditMode.value);
const selectedFile = ref(null);
const isDragging = ref(false);
const isFetchingDuration = ref(false);

function extractYoutubeId(url) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

function parseIsoDuration(iso) {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return "0:00";
  const h = parseInt(m[1] ?? 0);
  const min = parseInt(m[2] ?? 0);
  const sec = parseInt(m[3] ?? 0);
  const mm = String(min).padStart(h > 0 ? 2 : 1, "0");
  const ss = String(sec).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

watch(
  () => form.value.videoUrl,
  async (url) => {
    const videoId = extractYoutubeId(url);
    if (!videoId) return;
    isFetchingDuration.value = true;
    try {
      const key = import.meta.env.VITE_YOUTUBE_API_KEY;
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoId}&key=${key}`,
      );
      const data = await res.json();
      const item = data.items?.[0];
      if (!item) return;
      const iso = item.contentDetails?.duration;
      if (iso) form.value.duration = parseIsoDuration(iso);
      if (!form.value.title) form.value.title = item.snippet?.title ?? "";
      if (!form.value.description) form.value.description = item.snippet?.description ?? "";
    } catch {
      // ignorer fejl — brugeren kan udfylde manuelt
    } finally {
      isFetchingDuration.value = false;
    }
  },
);

function handleDrop(event) {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (!file) return;
  if (file.type !== "application/pdf") {
    alert("Only PDF files are allowed");
    return;
  }
  selectedFile.value = file;
}

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
      // Har admin valgt en ny PDF-fil, uploader vi den i stedet for at patche metadata
      if (form.value.type === "pdf" && selectedFile.value) {
        const formData = new FormData();
        formData.append("pdfFile", selectedFile.value);
        formData.append("title", form.value.title);
        formData.append("description", form.value.description);
        formData.append("type", "pdf");
        formData.append("durationOrPages", form.value.pages || "0");
        uploadedContent = await uploadPdfToLibrary(formData);
      } else {
        uploadedContent = await updateLibraryContent(props.item.id, {
          title: form.value.title,
          description: form.value.description,
          durationOrPages:
            form.value.type === "pdf"
              ? form.value.pages || props.item.durationOrPages
              : form.value.duration || props.item.durationOrPages,
        });
      }

      emit("content-added", uploadedContent);
      emit("close");
      return;
    }

    if (form.value.type === "pdf") {
      if (!selectedFile.value) {
        alert("Please select a PDF");
        return;
      }

      const formData = new FormData();
      formData.append("pdfFile", selectedFile.value);
      formData.append("title", form.value.title);
      formData.append("description", form.value.description);
      formData.append("type", "pdf");
      formData.append("durationOrPages", form.value.pages || "0");

      uploadedContent = await uploadPdfToLibrary(formData);
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
        durationOrPages: form.value.duration || "0:00",
      };
      uploadedContent = await createLibraryContent(contentPayload);
    }

    emit("content-added", uploadedContent);
    emit("close");
  } catch (error) {
    console.error("Full error:", error);
    alert(`Upload fejlede: ${error.message}`);
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
        <div v-if="form.type === 'pdf'" class="form-group">
          <label class="form-label">Number of pages</label>
          <input
            v-model="form.pages"
            type="number"
            min="1"
            class="form-input"
            placeholder="e.g. 12" />
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
            v-if="!hasExistingFile && form.type === 'pdf'"
            :class="['dropzone', { 'dropzone--active': isDragging }]"
            @click="$refs.fileInput.click()"
            @dragover.prevent="isDragging = true"
            @dragenter.prevent="isDragging = true"
            @dragleave="isDragging = false"
            @drop.prevent="handleDrop">
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
            <div class="form-group" style="margin-top: 8px">
              <label class="form-label">
                Duration
                <span v-if="isFetchingDuration" class="fetching-label">henter...</span>
              </label>
              <input
                v-model="form.duration"
                type="text"
                class="form-input"
                placeholder="0:00" />
            </div>
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

.dropzone--active {
  border-color: var(--color-primary);
  background-color: rgba(239, 96, 35, 0.04);
}

.dropzone__text {
  font-size: 14px;
  color: var(--color-text);
}

.fetching-label {
  font-size: 12px;
  color: var(--color-primary);
  margin-left: 6px;
  opacity: 0.8;
}

.form-actions {
  display: flex;
  gap: 12px;
  padding-top: 8px;
}
</style>
