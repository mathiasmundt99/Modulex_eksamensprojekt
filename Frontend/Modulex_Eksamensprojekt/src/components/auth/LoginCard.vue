<script setup>
import FormInputBox from './FormInputBox.vue'
import BaseButton from '../BaseButton.vue'
import { ref } from 'vue'

const email    = ref('')
const password = ref('')
const remember = ref(false)
</script>

<template>
  <div class="login-card">
    <h2>Welcome Back</h2>

    <form @submit.prevent>
      <label>Email address:</label>
      <FormInputBox
        v-model="email"
        icon="mail"
        type="email"
        placeholder="partner@example.com" />

      <label>Password:</label>
      <FormInputBox
        v-model="password"
        icon="lock"
        type="password"
        placeholder="Enter your password"
        suffix-icon="visibility_off" />

      <div class="options">
        <label class="remember">
          <input v-model="remember" type="checkbox" />
          <span>Remember me</span>
        </label>
        <a href="#">Forgot password?</a>
      </div>

      <BaseButton block>Sign in</BaseButton>
    </form>

    <div class="divider"></div>

    <p class="note">
      Don't have an account? Check your email for an<br />
      invitation link
    </p>

    <p class="footer-text">
      Questions? Contact us at
      <a href="#">academy@modulex.com</a>
    </p>
  </div>
</template>

<style scoped>
.login-card {
  width: 390px;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 18px;
  padding: 34px 38px 24px;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

h2 {
  font-size: 2.35rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--color-text);
}

form {
  text-align: left;
}

form > label {
  display: block;
  font-size: 0.95rem;
  margin-bottom: 10px;
  margin-top: 0;
  color: var(--color-text);
}

form > label + .input-box-wrap,
form :deep(.input-box) {
  margin-bottom: 26px;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0 34px;
  font-size: 0.86rem;
}

.remember {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.86rem;
}

.remember input {
  width: 20px;
  height: 20px;
}

.options a {
  color: var(--color-primary);
  text-decoration: none;
}


.divider {
  height: 1px;
  background: var(--color-border);
  margin: 26px 0 14px;
}

.note {
  font-size: 0.88rem;
  line-height: 1.4;
  color: var(--color-text);
  margin-bottom: 18px;
}

.footer-text {
  font-size: 0.75rem;
  color: var(--color-text);
}

.footer-text a {
  color: var(--color-text);
  text-decoration: underline;
}
</style>
