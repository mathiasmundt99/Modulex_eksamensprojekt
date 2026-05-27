<script setup>
import AuthLeftColumn from "../components/auth/AuthLeftColumn.vue";
import LoginCard from "../components/auth/LoginCard.vue";
</script>

<template>
  <div class="wrapper">
    <AuthLeftColumn
      title="Modulex"
      subtitle="Billund Academy"
      description="Your gateway to becoming a certified Modulex reseller partner">
      <div class="access-box">
        <h3>What you'll get access to:</h3>
        <div class="access-item">
          <span class="material-symbols-rounded">check</span>
          <span>Comprehensive product training modules</span>
        </div>
        <div class="access-item">
          <span class="material-symbols-rounded">check</span>
          <span>Video tutorials and PDF documentation</span>
        </div>
        <div class="access-item">
          <span class="material-symbols-rounded">check</span>
          <span>Track your onboarding progress</span>
        </div>
        <div class="access-item">
          <span class="material-symbols-rounded">check</span>
          <span>Direct support from Modulex team</span>
        </div>
      </div>
    </AuthLeftColumn>

    <section class="right-col">
      <div class="logo">
        <img src="../assets/images/modulex-logo.png" alt="modulex logo" />
      </div>
      <LoginCard />
    </section>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100vh;
}

.right-col {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.logo {
  height: 50px;
  top: 16px;
  right: 16px;
  position: absolute;
}

.logo img {
  height: 100%;
}

.access-box {
  background: rgba(255, 255, 255, 0.18);
  border-radius: 6px;
  padding: 16px 20px;
}

.access-box h3 {
  font-size: 1rem;
  margin-bottom: 14px;
  color: white;
}

.access-item {
  display: flex;
  gap: 18px;
  align-items: center;
  font-size: 0.92rem;
  margin-bottom: 17px;
  color: white;
}

.access-item:last-child {
  margin-bottom: 0;
}

@media (max-width: 900px) {
  .wrapper {
    grid-template-columns: 1fr;
  }
  .right-col {
    padding: 120px 20px 40px;
  }
}
</style>
