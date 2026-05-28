<script setup>
import BaseButton from "../BaseButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const handleInvitation = () => {
  router.push("/signup");
};

defineProps({
  email: { type: String, default: "partner@example.com" },
});
</script>

<template>
  <div class="invite-card">
    <div class="icon-circle">
      <span class="material-symbols-rounded">school</span>
    </div>

    <h2>You're Invited!</h2>

    <p class="description">
      Modulex has invited you to join the Billund Academy. Accept your
      invitation to get started with your onboarding.
    </p>

    <BaseButton block style="margin-bottom: 40px" @click="handleInvitation"
      >Accept invitation</BaseButton
    >

    <p class="footer-text">
      Questions? Contact us at
      <a href="#">academy@modulex.com</a>
    </p>
  </div>
</template>

<style scoped>
.invite-card {
  width: 400px;
  border-radius: 24px;
  padding: 48px 36px;
  text-align: center;
  border: 1px solid var(--color-border);
  background: white;
}

.icon-circle {
  width: 60px;
  height: 60px;
  margin: 0 auto 28px;
  border-radius: 50%;
  background: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 42px;
}

.icon-circle .material-symbols-rounded {
  font-size: 35px;
  color: var(--color-white);
}

h2 {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--color-text);
}

.description {
  margin-top: 16px;
  margin-bottom: 40px;
  color: var(--color-text);
}

.invite-box {
  background-color: rgba(217, 217, 217, 0.2);
  border-radius: 8px;
  padding: 18px 16px;
  text-align: left;
  margin-bottom: 36px;
}

.invite-box span {
  display: block;
  margin-bottom: 10px;
  color: var(--color-text);
}

.invite-box p {
  color: var(--color-text-muted);
}

.footer-text {
  font-size: 14px;
  color: var(--color-text);
}

.footer-text a {
  color: var(--color-text);
  text-decoration: underline;
}
</style>
