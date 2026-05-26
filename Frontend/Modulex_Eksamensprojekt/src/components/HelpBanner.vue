<script setup>
import { getUser } from "../utils/auth.js";
const user = getUser();
</script>

<template>
  <div class="help-banner">
    <div class="banner-content">
      <div class="help-banner__icon">
        <span class="material-symbols-rounded">live_help</span>
      </div>
      <div class="help-banner__text">
        <p class="help-banner__title">Need help, {{ user?.firstName }}?</p>
        <p class="help-banner__subtitle">Our support team is ready to assist you with any questions about the academy.</p>
      </div>
      <a href="mailto:support@modulex.com" class="help-banner__btn">Contact Support</a>
    </div>
  </div>
</template>

<style scoped>
.help-banner {
  background: url('@/assets/images/helpbanner.png') no-repeat center/cover;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px 24px;
  flex-wrap: wrap;
}

.help-banner__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  background-color: var(--color-primary);
  border-radius: 50%;
  color: var(--color-white);
  flex-shrink: 0;
}

.banner-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 50%;
}

.help-banner__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-white);
  margin-bottom: 4px;
}

.help-banner__subtitle {
  font-size: 14px;
  color: var(--color-white);
}

.help-banner__btn {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color 0.15s;
  width: fit-content;
}

.help-banner__btn:hover {
  background-color: var(--color-primary-hover);
}
</style>
