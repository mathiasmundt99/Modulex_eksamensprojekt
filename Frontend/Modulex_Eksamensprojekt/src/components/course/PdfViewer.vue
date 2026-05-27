<script setup>
const props = defineProps({
  title: { type: String, required: true },
  pages: { type: Number, default: null },
  pdfUrl: { type: String, required: true },
});

async function downloadPdf() {
  try {
    const response = await fetch(props.pdfUrl, { credentials: "include" });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = props.title + ".pdf";
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Download failed:", err);
  }
}
</script>

<template>
  <div class="pdf-viewer">
    <span class="material-symbols-rounded pdf-viewer__icon">picture_as_pdf</span>
    <p class="pdf-viewer__title">{{ title }}</p>
    <p v-if="pages" class="pdf-viewer__meta">{{ pages }} pages</p>
    <div class="pdf-viewer__actions">
      <button class="download-btn" @click="downloadPdf">
        <span class="material-symbols-rounded">download</span>
        Download PDF
      </button>
      <a class="view-link" :href="pdfUrl" target="_blank">Or view in browser</a>
    </div>
  </div>
</template>

<style scoped>
.pdf-viewer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 32px;
  gap: 12px;
  background-color: var(--color-bg);
  border: 2px dashed var(--color-border);
  border-radius: 10px;
  margin: 24px;
}

.pdf-viewer__icon {
  font-size: 52px;
  color: var(--color-accent);
}

.pdf-viewer__title {
  font-size: 18px;
  color: var(--color-text);
}

.pdf-viewer__meta {
  font-size: 14px;
  color: var(--color-text);
  opacity: 0.7;
}

.pdf-viewer__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  text-decoration: none;
  transition: background-color 0.15s;
}

.download-btn:hover {
  background-color: var(--color-primary-hover);
}

.view-link {
  font-size: 13px;
  color: var(--color-text);
  text-decoration: none;
  opacity: 0.7;
}

.view-link:hover {
  opacity: 1;
}

@media (max-width: 600px) {
  .pdf-viewer {
    padding: 32px 16px;
    margin: 16px;
  }

  .pdf-viewer__title {
    font-size: 16px;
  }
}
</style>
