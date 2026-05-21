<script setup>
import BaseButton from '../components/BaseButton.vue'
import BreadCrumb from '../components/BreadCrumb.vue'

const user = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@acmesigns.com',
  phone: '+45 12 34 56 78',
  company: 'Acme Signs Ltd.',
  cvr: '12345678',
  address: 'Vestergade 12, 7190 Billund',
  country: 'Denmark'
}
</script>

<template>
  <div class="profile">
    <div class="profile__header">
      <BreadCrumb />
      <h1 class="profile__title">My Profile</h1>
      <p class="profile__subtitle">Your account information</p>
    </div>

    <div class="profile__card">

      <!-- Personal Information -->
      <section class="section">
        <h2 class="section__title">Personal Information</h2>
        <div class="field-grid">
          <div class="field">
            <label class="field__label">First Name</label>
            <div class="field__value">
              <span class="material-symbols-rounded">person</span>
              {{ user.firstName }}
            </div>
          </div>
          <div class="field">
            <label class="field__label">Last Name</label>
            <div class="field__value">
              <span class="material-symbols-rounded">person</span>
              {{ user.lastName }}
            </div>
          </div>
        </div>
      </section>

      <div class="divider"></div>

      <!-- Contact Information -->
      <section class="section">
        <h2 class="section__title">Contact Information</h2>
        <div class="field-grid">
          <div class="field">
            <label class="field__label">Email</label>
            <div class="field__value field__value--muted">
              <span class="material-symbols-rounded">email</span>
              {{ user.email }}
            </div>
            <p class="field__hint">This is the email from your invitation</p>
          </div>
          <div class="field">
            <label class="field__label">Phone Number</label>
            <div class="field__value">
              <span class="material-symbols-rounded">phone</span>
              {{ user.phone }}
            </div>
          </div>
        </div>
      </section>

      <div class="divider"></div>

      <!-- Company Information -->
      <section class="section">
        <h2 class="section__title">Company Information</h2>
        <div class="field-grid">
          <div class="field">
            <label class="field__label">Company Name</label>
            <div class="field__value">
              <span class="material-symbols-rounded">business</span>
              {{ user.company }}
            </div>
          </div>
          <div class="field">
            <label class="field__label">CVR Number</label>
            <div class="field__value">
              <span class="material-symbols-rounded">badge</span>
              {{ user.cvr }}
            </div>
          </div>
          <div class="field">
            <label class="field__label">Address</label>
            <div class="field__value">
              <span class="material-symbols-rounded">location_on</span>
              {{ user.address }}
            </div>
          </div>
          <div class="field">
            <label class="field__label">Country</label>
            <div class="field__value">
              <span class="material-symbols-rounded">flag</span>
              {{ user.country }}
            </div>
          </div>
        </div>
      </section>

      <div class="divider"></div>

      <!-- Password -->
      <section class="section">
        <h2 class="section__title">Password</h2>
        <BaseButton variant="outline">
          <span class="material-symbols-rounded">lock</span>
          Change Password
        </BaseButton>
      </section>

    </div>
  </div>
</template>

<style scoped>
.profile {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.profile__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.profile__title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text);
}

.profile__subtitle {
  font-size: 15px;
  color: var(--color-text);
}

.profile__card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 32px;
}

.section {
  padding: 8px 0;
}

.section__title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  padding-bottom: 12px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--color-border);
}

.divider {
  height: 1px;
  background-color: var(--color-primary);
  margin: 24px 0;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 767px) {
  .field-grid {
    grid-template-columns: 1fr;
  }
}

.field__label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 6px;
}

.field__value {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 15px;
  color: var(--color-text);
  background-color: var(--color-white);
}

.field__value--muted {
  background-color: var(--color-bg);
}

.field__hint {
  font-size: 12px;
  color: var(--color-text);
  margin-top: 4px;
}

</style>
