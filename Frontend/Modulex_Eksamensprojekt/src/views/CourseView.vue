<script setup>
import { computed, ref } from "vue";

const currentStep = ref(0);

const steps = [
  {
    type: "video",
    title: "Welcome to Product Configuration",
    module: "Module 1 of 5",
    meta: "5 min",
  },
  {
    type: "video",
    title: "Configuration Basics",
    module: "Module 2 of 5",
    meta: "5 min",
  },
  {
    type: "pdf",
    title: "Product Catalog Overview",
    module: "Module 3 of 5",
    meta: "24 pages",
  },
  {
    type: "video",
    title: "Ordering Process",
    module: "Module 4 of 5",
    meta: "5 min",
  },
];

const activeStep = computed(() => steps[currentStep.value]);

const nextStep = () => {
  if (currentStep.value < steps.length - 1) currentStep.value++;
};

const previousStep = () => {
  if (currentStep.value > 0) currentStep.value--;
};
</script>

<template>
  <div class="course-page">
    <header class="topbar">
      <h1>Modulex Billund Academy</h1>

      <div class="top-actions">
        <button class="user-btn">
          <span class="material-symbols-rounded"> person </span> Amalie
        </button>
        <button class="back-btn">‹ Back to dashboard</button>
      </div>
    </header>

    <section class="course-header">
      <h2>Product Configuration & Ordering</h2>
      <p>Master the ordering process and configuration tools</p>

      <div class="progress-row">
        <span>2 of 5 completed</span>
        <div class="progress-track">
          <div class="progress-fill"></div>
        </div>
        <span>40%</span>
      </div>
    </section>

    <main class="layout">
      <section class="lesson-area">
        <div class="lesson-heading">
          <div class="lesson-left">
            <span class="lesson-icon">
              {{ activeStep.type === "pdf" ? "▣" : "▣" }}
            </span>

            <div>
              <h3>{{ activeStep.title }}</h3>
              <div class="meta">
                <span>{{ activeStep.module }}</span>
                <span>{{ activeStep.meta }}</span>
              </div>
            </div>
          </div>

          <button class="complete-btn">
            Mark as completed
            <span class="material-symbols-rounded"> check </span>
          </button>
        </div>

        <div v-if="activeStep.type === 'video'" class="video-placeholder"></div>

        <div v-else class="pdf-card">
          <div class="pdf-preview">
            <div class="pdf-center">
              <div class="pdf-small-icon">
                <span class="material-symbols-rounded"> picture_as_pdf </span>
              </div>
              <h3>{{ activeStep.title }}</h3>
              <p>{{ activeStep.meta }}</p>

              <button class="download-btn">
                <span class="material-symbols-rounded"> download </span>
                Download PDF
              </button>
              <a href="#">Or view in browser</a>
            </div>
          </div>
        </div>

        <div class="nav-buttons">
          <button
            class="prev-btn"
            :disabled="currentStep === 0"
            @click="previousStep">
            ‹ Previous
          </button>

          <button
            class="next-btn"
            :disabled="currentStep === steps.length - 1"
            @click="nextStep">
            Next ›
          </button>
        </div>
      </section>

      <aside class="sidebar">
        <h4>Course content</h4>

        <button
          v-for="(step, index) in steps"
          :key="step.title"
          class="content-card"
          :class="{ active: currentStep === index }"
          @click="currentStep = index">
          <span class="circle" :class="{ checked: index < 2 }">
            {{ index < 2 ? "✓" : "" }}
          </span>

          <div>
            <strong>▣ {{ step.type === "pdf" ? "PDF" : "Video" }}</strong>
            <p>{{ step.title }}</p>
            <span>{{ step.meta }}</span>
          </div>
        </button>
      </aside>
    </main>
  </div>
</template>

<style scoped>
.course-page {
  min-height: 100vh;
  background: #f1f2f2;
  color: var(--color-text);
}

.topbar {
  height: 98px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.topbar h1 {
  font-size: 2rem;
  font-weight: 700;
}

.top-actions {
  display: flex;
  gap: 20px;
}

.top-actions button {
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: 700;
  height: 34px;
  padding: 0 18px;
  cursor: pointer;
}

.user-btn {
  background: #9bb6d5;
}

.back-btn {
  background: var(--color-primary);
}

.course-header {
  padding: 26px 26px 20px;
  border-bottom: 1px solid #d2d2d2;
}

.course-header h2 {
  font-size: 1.75rem;
  margin-bottom: 10px;
}

.course-header p {
  margin-bottom: 12px;
}

.progress-row {
  display: flex;
  align-items: center;
  gap: 28px;
  font-size: 0.9rem;
}

.progress-track {
  width: 350px;
  height: 10px;
  background: white;
  border-radius: 999px;
}

.progress-fill {
  width: 40%;
  height: 100%;
  background: var(--color-primary);
  border-radius: 999px;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 215px;
}

.lesson-area {
  padding: 38px;
}

.lesson-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
}

.lesson-left {
  display: flex;
  align-items: flex-start;
  gap: 22px;
}

.lesson-icon {
  font-size: 34px;
  color: #222;
}

.lesson-left h3 {
  font-size: 1.35rem;
  margin-bottom: 14px;
}

.meta {
  display: flex;
  gap: 70px;
  font-size: 0.9rem;
}

.complete-btn {
  height: 32px;
  border: none;
  border-radius: 4px;
  background: #9bb6d5;
  color: white;
  font-weight: 700;
  padding: 0 18px;
}

.video-placeholder {
  height: 432px;
  background: #d4d4d4;
}

.pdf-card {
  background: white;
  border: 1px solid #d7d7d7;
  border-radius: 14px;
  padding: 20px 28px;
}

.pdf-preview {
  height: 490px;
  border: 1px dotted #777;
  border-radius: 14px;
  background: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pdf-center {
  text-align: center;
}

.pdf-small-icon {
  color: #9bb6d5;
  font-size: 32px;
  margin-bottom: 18px;
}

.pdf-center h3 {
  font-size: 1.35rem;
  margin-bottom: 12px;
}

.pdf-center p {
  margin-bottom: 28px;
}

.download-btn {
  border: none;
  border-radius: 4px;
  background: var(--color-primary);
  color: white;
  font-weight: 700;
  padding: 10px 22px;
  margin-bottom: 16px;
}

.pdf-center a {
  display: block;
  color: var(--color-text);
  text-decoration: none;
  font-size: 0.85rem;
}

.nav-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}

.prev-btn,
.next-btn {
  height: 32px;
  min-width: 124px;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: 700;
  background: var(--color-primary);
  cursor: pointer;
}

.prev-btn:disabled,
.next-btn:disabled {
  background: #cfd4d8;
  cursor: not-allowed;
}

.sidebar {
  background: white;
  padding: 12px 15px;
}

.sidebar h4 {
  text-align: center;
  margin-bottom: 12px;
}

.content-card {
  width: 100%;
  min-height: 92px;
  border: 1px solid #e1e1e1;
  border-radius: 18px;
  padding: 14px 16px;
  display: flex;
  gap: 14px;
  margin-bottom: 10px;
  background: white;
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
}

.content-card.active {
  background: var(--color-primary);
  color: white;
}

.circle {
  width: 22px;
  height: 22px;
  border: 2px solid currentColor;
  border-radius: 50%;
  flex-shrink: 0;
}

.checked {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.content-card strong {
  font-size: 0.9rem;
  font-weight: 500;
}

.content-card p {
  font-size: 0.75rem;
  margin: 8px 0;
}

.content-card span {
  font-size: 0.85rem;
}
</style>
