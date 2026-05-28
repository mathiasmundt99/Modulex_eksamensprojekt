<script setup>
defineProps({
  totalQuestions: { type: Number, default: 0 },
})

defineEmits(['start'])
</script>

<template>
  <div class="intro-card">
    <div class="intro-icon">
      <span class="material-symbols-rounded">quiz</span>
    </div>

    <h2 class="intro-title">Welcome to your onboarding survey</h2>

    <p class="intro-lead">
      Before we assign your courses, we'd like to learn a little about you.
      This short survey helps the Modulex team understand your background, role,
      and goals so we can match you with the training that is most relevant to you.
    </p>

    <ul class="intro-list">
      <li>
        <span class="material-symbols-rounded check-icon">check_circle</span>
        {{ totalQuestions }} short questions
      </li>
      <li>
        <span class="material-symbols-rounded check-icon">check_circle</span>
        Takes about 1–2 minutes to complete
      </li>
      <li>
        <span class="material-symbols-rounded check-icon">check_circle</span>
        Your answers are reviewed by the Modulex team
      </li>
      <li>
        <span class="material-symbols-rounded check-icon">check_circle</span>
        We'll assign the most relevant courses based on your responses
      </li>
    </ul>

    <button class="start-btn" @click="$emit('start')">
      Get Started
      <span class="material-symbols-rounded">arrow_forward</span>
    </button>
  </div>
</template>

<style scoped>
.intro-card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.intro-icon {
  width: 72px;
  height: 72px;
  background-color: rgba(243, 111, 33, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.intro-icon .material-symbols-rounded {
  font-size: 36px;
  color: var(--color-primary);
}

.intro-title {
  font-size: 26px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 16px;
}

.intro-lead {
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-text);
  opacity: 0.8;
  max-width: 560px;
  margin-bottom: 32px;
}

.intro-list {
  list-style: none;
  padding: 0;
  margin: 0 0 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
}

.intro-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--color-text);
}

.check-icon {
  font-size: 20px;
  color: var(--color-primary);
  flex-shrink: 0;
}

.start-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
}

.start-btn:hover {
  opacity: 0.88;
}

.start-btn .material-symbols-rounded {
  font-size: 20px;
}
</style>
