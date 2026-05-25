<script setup>
import AuthLeftColumn from '../components/auth/AuthLeftColumn.vue'
import InvitationCard from '../components/auth/InvitationCard.vue'
</script>

<template>
  <div class="wrapper">
    <AuthLeftColumn
      title="Modulex"
      subtitle="Billund Academy"
      description="Welcome to your onboarding journey. Learn everything you need to become a successful Modulex reseller partner.">
      <div class="step-list">
        <div class="list-item">
          <div class="list-num">1</div>
          <p>Complete Your Profile</p>
        </div>
        <div class="list-item">
          <div class="list-num">2</div>
          <p>Learn at Your Pace</p>
        </div>
        <div class="list-item">
          <div class="list-num">3</div>
          <p>Track Your Progress</p>
        </div>
      </div>
    </AuthLeftColumn>

    <div class="right-col">
      <div class="logo">
        <img src="../assets/images/modulex-logo.png" alt="modulex logo" />
      </div>
      <InvitationCard email="partner@example.com" />
    </div>
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

.logo img { height: 100%; }

.step-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
  color: white;
}

.list-num {
  background-color: #d9d9d92a;
  text-align: center;
  width: 36px;
  height: 36px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .wrapper { grid-template-columns: 1fr; }
  .right-col {
    min-height: 100vh;
    padding: 120px 20px 40px;
  }
}
</style>
