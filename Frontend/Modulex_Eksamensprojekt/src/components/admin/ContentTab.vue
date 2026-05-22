<script setup>
import { ref, onMounted } from "vue";
import UploadModal from "./UploadModal.vue";
import BaseButton from "../BaseButton.vue";
import BreadCrumb from "../BreadCrumb.vue";
import { getPdfs } from "@/services/contentService";

const showUploadModal = ref(false);
const editingItem = ref(null);

function openEdit(item) {
  editingItem.value = item;
  showUploadModal.value = true;
}

function closeModal() {
  showUploadModal.value = false;
  editingItem.value = null;
}

function deleteContent(id) {
  content.value = content.value.filter((item) => item.id !== id);
}

const content = ref([]);

onMounted(async () => {
  try {
    const pdfs = await getPdfs();
    content.value = pdfs.map((pdf, index) => ({
      id: index + 1,
      title: pdf.originalName,
      description: "",
      type: "pdf",
      pages: 0,
      uploadDate: new Date().toISOString().split("T")[0],
      usedInCourses: 0,
      url: pdf.url,
    }));
  } catch (error) {
    console.error("Error loading PDFs:", error);
  }
});
</script>

<template>
  <div class="tab-content">
    <BreadCrumb />
    <div class="tab-header">
      <div>
        <h2 class="page-title">Content Library</h2>
        <p class="page-subtitle">Manage videos, PDFs, and learning materials</p>
      </div>
      <BaseButton @click="showUploadModal = true">
        <span class="material-symbols-rounded">cloud_upload</span>
        Upload Content
      </BaseButton>
    </div>

    <div class="content-grid">
      <div v-for="item in content" :key="item.id" class="content-card">
        <div class="content-card__header">
          <h3 class="content-card__title">{{ item.title }}</h3>
          <div class="content-card__actions">
            <BaseButton
              variant="ghost"
              class="action-btn"
              @click="openEdit(item)">
              <span class="material-symbols-rounded">edit_square</span>
            </BaseButton>
            <BaseButton
              variant="ghost"
              class="action-btn"
              @click="deleteContent(item.id)">
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
            item.type === "video" ? item.duration : item.pages + " pages"
          }}</span>
        </div>
        <div class="content-card__footer">
          <span>Used in {{ item.usedInCourses }} courses</span>
          <span>Uploaded: {{ item.uploadDate }}</span>
        </div>
      </div>
    </div>

    <UploadModal
      v-if="showUploadModal"
      :item="editingItem"
      @close="closeModal" />
  </div>
</template>

<style scoped>
.tab-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
}

.tab-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.page-title {
  font-size: 24px;
  color: var(--color-text);
}

.page-subtitle {
  font-size: 15px;
  color: var(--color-text);
  margin-top: 4px;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 767px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

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
