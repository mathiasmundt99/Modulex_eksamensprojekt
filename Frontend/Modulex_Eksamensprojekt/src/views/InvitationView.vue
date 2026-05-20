<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="wrapper">
    <div class="left-col">
      <div class="left-col-text">
        <h1>Modulex</h1>
        <h2>Billund Academy</h2>
        <p>
          Welcome to your onboarding journey. <br />
          Learn everything you need to become <br />
          a successful Modulex reseller partner.
        </p>
      </div>
      <div class="left-col-list">
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
    </div>
    <div class="right-col">
      <div class="logo">
        <img src="../assets/images/modulex-logo.png" alt="modulex logo" />
      </div>
      <div class="invite-card">
        <div class="icon-circle">🎓</div>

        <h2>You're Invited!</h2>

        <p class="description">
          Modulex has invited you to join the Billund Academy. Accept your
          invitation to get started with your onboarding.
        </p>

        <div class="invite-box">
          <span>Invitation for:</span>
          <p>partner@example.com</p>
        </div>

        <button>Accept invitation</button>

        <p class="footer-text">
          Questions? Contact us at
          <a href="#">academy@modulex.com</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 3rem;
  font-weight: 700;
}
h2 {
  font-size: 2.25rem;
  font-weight: 700;
}
.left-col {
  display: flex;
  flex-direction: column;

  padding-left: 15%;
  justify-content: center;
  gap: 4rem;
  background-color: var(--color-primary);
  color: white;
}
.left-col-text {
  display: flex;
  flex-direction: column;
  gap: 14px;
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
}
.list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
}
.right-col {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
}
.invite-card {
  width: 400px;
  border-radius: 24px;
  padding: 48px 36px;
  text-align: center;
  border: 1px solid var(--color-border);
}

.icon-circle {
  width: 60px;
  height: 60px;
  margin: 0 auto 28px;

  border-radius: 50%;
  background: #a9bfdc;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 42px;
}

.description {
  margin-top: 16px;
  margin-bottom: 40px;
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
}

.invite-box p {
  color: #bbb;
}

button {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 8px;

  background-color: var(--color-primary);
  color: white;
  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
  margin-bottom: 40px;
}
.footer-text {
  font-size: 14px;
}
.footer-text a {
  color: var(--color-text);
  text-decoration: underline;
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
.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100vh;
}
@media (max-width: 900px) {
  .wrapper {
    grid-template-columns: 1fr;
  }

  .left-col {
    padding: 80px 30px;
    justify-content: center;
  }

  .right-col {
    min-height: 100vh;
    padding: 120px 20px 40px;
  }
}
</style>
