<script setup>
import AuthLeftColumn from "../components/auth/AuthLeftColumn.vue";
import ResetPasswordCard from "../components/auth/ResetPasswordCard.vue";
</script>

<template>
  <div class="wrapper">
    <AuthLeftColumn
      title="Modulex"
      subtitle="Billund Academy"
      description="Your gateway to becoming a certified Modulex reseller partner">
      <div class="access-box">
        <h3>Reset your password</h3>
        <p>Enter your new password below to regain access to your account.</p>
      </div>
    </AuthLeftColumn>

    <section class="right-col">
      <div class="logo">
        <img src="../assets/images/modulex-logo.png" alt="modulex logo" />
      </div>
      <ResetPasswordCard />
    </section>
  </div>
</template>

<style scoped>
.wrapper {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.right-col {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.logo {
  margin-bottom: 40px;
}

.logo img {
  height: 60px;
}

@media (max-width: 767px) {
  .wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
