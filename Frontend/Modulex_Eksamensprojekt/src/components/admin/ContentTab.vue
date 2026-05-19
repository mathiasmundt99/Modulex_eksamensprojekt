<script setup>
import { ref } from 'vue'
import UploadModal from './UploadModal.vue'

const showUploadModal = ref(false)

const content = [
  { id: 1, title: 'Introduction to Modulex Products', type: 'video', duration: '15 min',  uploadDate: '2024-02-01', usedInCourses: 3 },
  { id: 2, title: 'Product Catalog 2024',             type: 'pdf',   pages: 45,            uploadDate: '2024-01-15', usedInCourses: 5 },
  { id: 3, title: 'Installation Guidelines',          type: 'pdf',   pages: 28,            uploadDate: '2024-02-10', usedInCourses: 2 }
]
</script>

<template>
  <div class="tab-content">
    <div class="tab-header">
      <div>
        <h2 class="page-title">Content Library</h2>
        <p class="page-subtitle">Manage videos, PDFs, and learning materials</p>
      </div>
      <button class="btn btn--primary" @click="showUploadModal = true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="16 16 12 12 8 16"/>
          <line x1="12" y1="12" x2="12" y2="21"/>
          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
        </svg>
        Upload Content
      </button>
    </div>

    <div class="content-grid">
      <div v-for="item in content" :key="item.id" class="content-card">
        <div class="content-card__header">
          <h3 class="content-card__title">{{ item.title }}</h3>
          <div class="content-card__actions">
            <button class="action-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button class="action-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6"/><path d="M14 11v6"/>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="content-card__tags">
          <span class="tag">{{ item.type === 'video' ? '📹 Video' : '📄 PDF' }}</span>
          <span class="tag">{{ item.type === 'video' ? item.duration : item.pages + ' pages' }}</span>
        </div>
        <div class="content-card__footer">
          <span>Used in {{ item.usedInCourses }} courses</span>
          <span>Uploaded: {{ item.uploadDate }}</span>
        </div>
      </div>
    </div>

    <UploadModal v-if="showUploadModal" @close="showUploadModal = false" />
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
  font-weight: 400;
  color: var(--color-text);
}

.page-subtitle {
  font-size: 15px;
  color: var(--color-text);
  margin-top: 4px;
}

.btn--primary {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.15s;
}

.btn--primary:hover {
  background-color: var(--color-primary-hover);
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
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
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

.content-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.tag {
  padding: 4px 12px;
  background-color: var(--color-bg);
  border-radius: 9999px;
  font-size: 13px;
  color: var(--color-text);
}

.content-card__footer {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--color-text);
}
</style>
