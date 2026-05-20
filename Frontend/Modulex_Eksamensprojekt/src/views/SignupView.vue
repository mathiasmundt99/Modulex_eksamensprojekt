<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="signup-page">
    <img
      class="logo"
      src="../assets/images/modulex-logo.png"
      alt="Modulex logo" />

    <header class="header">
      <h1>Modulex Billund Academy</h1>
      <p>Create your account to get started</p>
    </header>

    <form class="signup-card">
      <section>
        <h2>Personal Information</h2>

        <div class="grid">
          <label>
            First Name *
            <div class="input-box">
              <span class="material-symbols-rounded"> person </span>
              <input type="text" placeholder="Karin" />
            </div>
          </label>

          <label>
            Last Name *
            <div class="input-box">
              <span class="material-symbols-rounded"> person </span>
              <input type="text" placeholder="Andersen" />
            </div>
          </label>
        </div>
      </section>

      <section>
        <h2>Contact Information</h2>

        <div class="grid">
          <label>
            Email*
            <div class="input-box">
              <span class="material-symbols-rounded"> mail </span>
              <input type="email" placeholder="partner@example.com" />
            </div>
            <small>This is the email from your invitation</small>
          </label>

          <label>
            Phone Number *
            <div class="input-box">
              <span class="material-symbols-rounded"> call </span>
              <input type="tel" placeholder="+45 12 23 45 67" />
            </div>
          </label>
        </div>
      </section>

      <section>
        <h2>Company Information</h2>

        <div class="grid">
          <label>
            Company Name *
            <div class="input-box">
              <span class="material-symbols-rounded"> apartment </span>
              <input type="text" placeholder="partner@example.com" />
            </div>
          </label>

          <label>
            Cvr*
            <div class="input-box">
              <span class="material-symbols-rounded"> security </span>
              <input type="text" placeholder="partner@example.com" />
            </div>
          </label>

          <label>
            Company Adress*
            <div class="input-box">
              <span class="material-symbols-rounded"> location_on </span>
              <input type="text" placeholder="partner@example.com" />
            </div>
          </label>

          <label>
            Country*
            <div class="input-box">
              <span class="material-symbols-rounded"> globe_location_pin </span>
              <input type="text" placeholder="partner@example.com" />
            </div>
          </label>
        </div>
      </section>

      <section>
        <h2>Create Password</h2>

        <div class="grid">
          <label>
            Password *
            <div class="input-box">
              <span class="material-symbols-rounded"> lock </span>
              <input type="password" placeholder="Min. 8 characters" />
              <span class="material-symbols-rounded"> visibility_off </span>
            </div>
          </label>

          <label>
            Confirm Password *
            <div class="input-box">
              <span class="material-symbols-rounded"> lock </span>
              <input type="password" placeholder="Min. 8 characters" />
              <span class="material-symbols-rounded"> visibility_off </span>
            </div>
          </label>
        </div>
      </section>

      <button type="submit">Create Account</button>
    </form>
  </div>
</template>

<style scoped>
.signup-page {
  min-height: 100vh;
  position: relative;
  background: #fafafa;
  padding: 56px 20px 80px;
  color: var(--color-text);
}

.logo {
  position: absolute;
  top: 26px;
  right: 28px;
  height: 42px;
}

.header {
  text-align: center;
  margin-bottom: 28px;
}

.header h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.header p {
  font-size: 1.15rem;
  font-weight: 600;
}

.signup-card {
  width: 820px;
  margin: 0 auto;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 18px;
  padding: 28px 34px 36px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

section {
  margin-bottom: 28px;
}

section h2 {
  font-size: 1.2rem;
  font-weight: 700;
  padding-bottom: 8px;
  margin-bottom: 18px;
  border-bottom: 1px solid var(--color-border);
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 26px 70px;
}

label {
  font-size: 0.95rem;
  font-weight: 500;
}

.input-box {
  height: 42px;
  margin-top: 8px;
  background: #f6f6f6;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
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

.input-box span {
  font-size: 1.1rem;
  color: #222;
}

small {
  display: block;
  margin-top: 8px;
  font-size: 0.8rem;
}

button {
  width: 100%;
  height: 38px;
  border: none;
  border-radius: 5px;
  background: var(--color-primary);
  color: white;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
}

@media (max-width: 900px) {
  .signup-card {
    width: 100%;
    max-width: 820px;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .header h1 {
    font-size: 2.2rem;
  }
}
</style>
