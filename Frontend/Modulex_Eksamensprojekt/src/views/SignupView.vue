<script setup>
import SignupSection from "../components/auth/SignupSection.vue";
import FormInputBox from "../components/auth/FormInputBox.vue";
import BaseButton from "../components/BaseButton.vue";
import { ref } from "vue";
import { registerUser } from "../services/authService";
import { useRouter } from "vue-router";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phone = ref("");
const companyName = ref("");
const cvr = ref("");
const companyAddress = ref("");
const country = ref("");
const password = ref("");
const confirmPassword = ref("");

const router = useRouter();
const loading = ref(false);
const error = ref("");

const handleSignup = async () => {
  error.value = "";
  loading.value = true;

  try {
    // Validation
    if (!firstName.value || !lastName.value || !email.value) {
      throw new Error("Venligst udfyld alle påkrævede felter");
    }

    if (password.value !== confirmPassword.value) {
      throw new Error("Adgangskoderne matcher ikke");
    }

    if (password.value.length < 8) {
      throw new Error("Adgangskoden skal være mindst 8 tegn");
    }

    const result = await registerUser({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      companyName: companyName.value,
      cvr: cvr.value,
      companyAddress: companyAddress.value,
      country: country.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });

    router.push("/login");
  } catch (err) {
    error.value = err.message || "Der skete en fejl under registrering";
  } finally {
    loading.value = false;
  }
};
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

    <form class="signup-card" @submit.prevent>
      <SignupSection title="Personal Information">
        <label>
          First Name *
          <FormInputBox v-model="firstName" icon="person" placeholder="Karin" />
        </label>
        <label>
          Last Name *
          <FormInputBox
            v-model="lastName"
            icon="person"
            placeholder="Andersen" />
        </label>
      </SignupSection>

      <SignupSection title="Contact Information">
        <label>
          Email *
          <FormInputBox
            v-model="email"
            icon="mail"
            type="email"
            placeholder="partner@example.com" />
          <small>This is the email from your invitation</small>
        </label>
        <label>
          Phone Number *
          <FormInputBox
            v-model="phone"
            icon="call"
            type="tel"
            placeholder="+45 12 23 45 67" />
        </label>
      </SignupSection>

      <SignupSection title="Company Information">
        <label>
          Company Name *
          <FormInputBox
            v-model="companyName"
            icon="apartment"
            placeholder="Firma ApS" />
        </label>
        <label>
          CVR *
          <FormInputBox v-model="cvr" icon="security" placeholder="12345678" />
        </label>
        <label>
          Company Address *
          <FormInputBox
            v-model="companyAddress"
            icon="location_on"
            placeholder="Eksempelgade 1" />
        </label>
        <label>
          Country *
          <FormInputBox
            v-model="country"
            icon="globe_location_pin"
            placeholder="Denmark" />
        </label>
      </SignupSection>

      <SignupSection title="Create Password">
        <label>
          Password *
          <FormInputBox
            v-model="password"
            icon="lock"
            type="password"
            placeholder="Min. 8 characters"
            suffix-icon="visibility_off" />
        </label>
        <label>
          Confirm Password *
          <FormInputBox
            v-model="confirmPassword"
            icon="lock"
            type="password"
            placeholder="Min. 8 characters"
            suffix-icon="visibility_off" />
        </label>
      </SignupSection>

      <BaseButton
        block
        style="margin-top: 10px"
        @click="handleSignup"
        :disabled="loading">
        {{ loading ? "Creating user..." : "Create Account" }}
      </BaseButton>

      <div v-if="error" class="error-message">{{ error }}</div>
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

label {
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

small {
  font-size: 0.8rem;
  font-weight: 400;
}

@media (max-width: 900px) {
  .signup-card {
    width: 100%;
    max-width: 820px;
  }

  .header h1 {
    font-size: 2.2rem;
  }
}
</style>
