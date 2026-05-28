<script setup>
import FormInputBox from "./FormInputBox.vue";
import BaseButton from "../BaseButton.vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { resetPassword } from "../../services/authService";

const router = useRouter();
const route = useRoute();
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const error = ref("");
const success = ref(false);

// Get token from URL query parameter
const token = route.query.token || "";

const handleResetPassword = async () => {
  error.value = "";
  success.value = false;
  loading.value = true;

  try {
    if (!token) {
      throw new Error(
        "Reset token is missing. Please use the link from your email.",
      );
    }

    if (!password.value || !confirmPassword.value) {
      throw new Error("Please fill in both password fields");
    }

    if (password.value.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }

    if (password.value !== confirmPassword.value) {
      throw new Error("Passwords do not match");
    }

    await resetPassword(token, password.value);

    success.value = true;
    password.value = "";
    confirmPassword.value = "";

    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (err) {
    error.value = err.message || "Password reset failed";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="reset-card">
    <h2>Reset Password</h2>

    <div v-if="success" class="success-message">
      <span class="material-symbols-rounded">check_circle</span>
      <p>Your password has been reset!</p>
      <p class="sub-text">Redirecting to login...</p>
    </div>

    <form v-if="!success" @submit.prevent>
      <label>New password:</label>
      <FormInputBox
        v-model="password"
        icon="lock"
        type="password"
        placeholder="At least 8 characters"
        suffix-icon="visibility_off" />

      <label>Confirm password:</label>
      <FormInputBox
        v-model="confirmPassword"
        icon="lock"
        type="password"
        placeholder="Repeat your password"
        suffix-icon="visibility_off" />

      <div v-if="error" class="error-message">{{ error }}</div>

      <BaseButton block @click="handleResetPassword" :disabled="loading">
        {{ loading ? "Resetting..." : "Reset Password" }}
      </BaseButton>

      <div class="back-link">
        <RouterLink to="/login">Back to login</RouterLink>
      </div>
    </form>
  </div>
</template>

<style scoped>
.reset-card {
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

.error-message {
  background-color: var(--color-error-bg);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  color: var(--color-error);
  font-size: 0.9rem;
}

.success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background-color: var(--color-success-bg);
  border-radius: 8px;
  padding: 24px 16px;
  color: var(--color-success);
}

.success-message .material-symbols-rounded {
  font-size: 48px;
}

.success-message p {
  margin: 0;
  font-size: 0.95rem;
}

.success-message .sub-text {
  font-size: 0.85rem;
  opacity: 0.8;
}

.back-link {
  text-align: center;
  margin-top: 20px;
}

.back-link a {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 0.9rem;
}

.back-link a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .reset-card {
    width: 100%;
    max-width: 390px;
  }
}
</style>
