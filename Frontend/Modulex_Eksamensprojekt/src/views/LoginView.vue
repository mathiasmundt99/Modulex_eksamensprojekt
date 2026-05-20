<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="wrapper">
    <section class="left-col">
      <div class="left-content">
        <h1>Modulex</h1>
        <h2>Billund Academy</h2>

        <p class="intro">
          Your gateway to becoming a certified<br />
          Modulex reseller partner
        </p>

        <div class="access-box">
          <h3>What you'll get access to:</h3>

          <div class="access-item">
            <span class="material-symbols-rounded"> check </span>
            <span>Comprehensive product training modules</span>
          </div>
          <div class="access-item">
            <span class="material-symbols-rounded"> check </span>
            <span>Video tutorials and PDF documentation</span>
          </div>
          <div class="access-item">
            <span class="material-symbols-rounded"> check </span>
            <span>Track your onboarding progress</span>
          </div>
          <div class="access-item">
            <span class="material-symbols-rounded"> check </span>
            <span>Direct support from Modulex team</span>
          </div>
        </div>
      </div>
    </section>

    <section class="right-col">
      <div class="logo">
        <img src="../assets/images/modulex-logo.png" alt="modulex logo" />
      </div>

      <div class="login-card">
        <h2>Welcome Back</h2>

        <form>
          <label>Email address:</label>
          <div class="input-box">
            <span class="material-symbols-rounded"> mail </span>
            <input type="email" placeholder="partner@example.com" />
          </div>

          <label>Password:</label>
          <div class="input-box">
            <span class="material-symbols-rounded"> lock </span>
            <input type="password" placeholder="Enter your password" />
            <span class="material-symbols-rounded"> visibility_off </span>
          </div>

          <div class="options">
            <label class="remember">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <a href="#">Forgot password?</a>
          </div>

          <button type="button">Sign in</button>
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
    </section>
  </div>
</template>

<style scoped>
.wrapper {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.left-col {
  background-color: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-content {
  max-width: 430px;
}

h1 {
  font-size: 3.4rem;
  font-weight: 700;
  margin-bottom: 0.9rem;
}

.left-col h2 {
  font-size: 2.6rem;
  font-weight: 700;
  margin-bottom: 1.6rem;
}

.intro {
  font-size: 1.05rem;
  line-height: 1.35;
  margin-bottom: 0.8rem;
}

.access-box {
  width: 390px;
  background: rgba(255, 255, 255, 0.18);
  border-radius: 6px;
  padding: 16px 20px;
}

.access-box h3 {
  font-size: 1rem;
  margin-bottom: 14px;
}

.access-item {
  display: flex;
  gap: 18px;
  align-items: center;
  font-size: 0.92rem;
  margin-bottom: 17px;
}

.access-item:last-child {
  margin-bottom: 0;
}

.right-col {
  position: relative;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  position: absolute;
  top: 36px;
  right: 34px;
  height: 42px;
}

.logo img {
  height: 100%;
}

.login-card {
  width: 390px;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 18px;
  padding: 34px 38px 24px;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.login-card h2 {
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
  color: var(--color-text);
}

.input-box {
  height: 46px;
  background: #f6f6f6;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 0 14px;
  margin-bottom: 26px;
}

.input-box input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.95rem;
}

.input-box input::placeholder {
  color: #aaa;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: -4px 0 34px;
  font-size: 0.86rem;
}

.remember {
  display: flex;
  align-items: center;
  gap: 8px;
}

.remember input {
  width: 20px;
  height: 20px;
}

.options a {
  color: var(--color-primary);
  text-decoration: none;
}

button {
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 5px;
  background: var(--color-primary);
  color: white;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
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
