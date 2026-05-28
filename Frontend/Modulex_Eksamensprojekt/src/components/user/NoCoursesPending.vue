<template>
  <div class="pending-card">
    <div class="pending-icon">
      <span class="material-symbols-rounded">pending_actions</span>
    </div>
    <div class="pending-body">
      <h3 class="pending-title">Your courses are on their way!</h3>
      <p class="pending-text">
        No courses have been assigned to you yet. Your survey answers are currently
        being reviewed by the Modulex team, and we'll assign the courses most
        relevant to your role and goals as soon as possible.
      </p>
      <p class="pending-sub">We'll notify you as soon as your learning path is ready.</p>
    </div>
  </div>
</template>

<style scoped>
.pending-card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 32px 28px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.pending-icon {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  background-color: rgba(243, 111, 33, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pending-icon .material-symbols-rounded {
  font-size: 28px;
  color: var(--color-primary);
}

.pending-body {
  flex: 1;
  min-width: 0;
}

.pending-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 10px;
}

.pending-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text);
  opacity: 0.8;
  margin-bottom: 10px;
}

.pending-sub {
  font-size: 13px;
  color: var(--color-text);
  opacity: 0.5;
  font-style: italic;
}
</style>
