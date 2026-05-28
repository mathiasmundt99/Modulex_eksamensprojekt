<script setup>
import FormInputBox from "./FormInputBox.vue";
import BaseButton from "../BaseButton.vue";
import { ref } from "vue";
import { forgotPassword } from "../../services/authService";

defineProps({
  show: { type: Boolean, required: true },
});
defineEmits(["close"]);

const email = ref("");
const loading = ref(false);
const error = ref("");
const success = ref(false);

const handleSubmit = async () => {
  error.value = "";
  success.value = false;
  loading.value = true;

  try {
    if (!email.value) {
      throw new Error("Please enter your email address");
    }

    await forgotPassword(email.value);
    success.value = true;
    email.value = "";

    setTimeout(() => {
      $emit("close");
    }, 3000);
  } catch (err) {
    error.value = err.message || "The request failed";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="backdrop" @click.self="$emit('close')">
      <div class="modal">
        <div class="modal__header">
          <h3 class="modal__title">Reset Password</h3>
          <BaseButton variant="ghost" @click="$emit('close')">
            <span class="material-symbols-rounded">close</span>
          </BaseButton>
        </div>

        <div class="modal__content">
          <p class="description">
            Enter your email address and we will send you a link to reset your
            password.
          </p>

          <div v-if="success" class="success-message">
            <span class="material-symbols-rounded">check_circle</span>
            <p>Email sent! Check your inbox for the reset link.</p>
          </div>

          <form v-if="!success" @submit.prevent>
            <label>Email address:</label>
            <FormInputBox
              v-model="email"
              icon="mail"
              type="email"
              placeholder="your@email.com" />

            <div v-if="error" class="error-message">{{ error }}</div>

            <BaseButton block @click="handleSubmit" :disabled="loading">
              {{ loading ? "Sending..." : "Send reset link" }}
            </BaseButton>
          </form>
        </div>

        <div class="modal__footer">
          <BaseButton variant="outline" block @click="$emit('close')">
            Cancel
          </BaseButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.backdrop {
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
  max-width: 480px;
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.modal__title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
}

.modal__content {
  margin-bottom: 24px;
}

.description {
  font-size: 0.95rem;
  color: var(--color-text);
  margin-bottom: 20px;
  line-height: 1.5;
}

form {
  text-align: left;
}

form > label {
  display: block;
  font-size: 0.95rem;
  margin-bottom: 10px;
  color: var(--color-text);
}

.success-message {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: var(--color-success-bg);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  color: var(--color-success);
}

.success-message .material-symbols-rounded {
  font-size: 24px;
  flex-shrink: 0;
}

.success-message p {
  margin: 0;
  font-size: 0.9rem;
}

.error-message {
  background-color: var(--color-error-bg);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  color: var(--color-error);
  font-size: 0.9rem;
}

.modal__footer {
  display: flex;
  gap: 12px;
}
</style>
