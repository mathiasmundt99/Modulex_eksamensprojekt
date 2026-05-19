<script setup>
defineEmits(['back'])

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
      <button class="back-btn" @click="$emit('back')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back to Dashboard
      </button>
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              {{ user.firstName }}
            </div>
          </div>
          <div class="field">
            <label class="field__label">Last Name</label>
            <div class="field__value">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              {{ user.lastName }}
            </div>
          </div>
        </div>
      </section>

      <div class="divider"></div>

      <!-- Contact Information -->
      <section class="section">
        <h2 class="section__title">Contact Information</h2>
        <div class="field-stack">
          <div class="field">
            <label class="field__label">Email</label>
            <div class="field__value field__value--muted">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              {{ user.email }}
            </div>
            <p class="field__hint">This is the email from your invitation</p>
          </div>
          <div class="field">
            <label class="field__label">Phone Number</label>
            <div class="field__value">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              {{ user.phone }}
            </div>
          </div>
        </div>
      </section>

      <div class="divider"></div>

      <!-- Company Information -->
      <section class="section">
        <h2 class="section__title">Company Information</h2>
        <div class="field-stack">
          <div class="field">
            <label class="field__label">Company Name</label>
            <div class="field__value">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="2" width="14" height="14" rx="2"/>
                <rect x="20" y="2" width="14" height="14" rx="2"/>
                <rect x="2" y="20" width="14" height="14" rx="2"/>
                <rect x="20" y="20" width="7" height="7" rx="1.5"/>
              </svg>
              {{ user.company }}
            </div>
          </div>
          <div class="field">
            <label class="field__label">CVR Number</label>
            <div class="field__value">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              {{ user.cvr }}
            </div>
          </div>
          <div class="field">
            <label class="field__label">Address</label>
            <div class="field__value">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              {{ user.address }}
            </div>
          </div>
          <div class="field">
            <label class="field__label">Country</label>
            <div class="field__value">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {{ user.country }}
            </div>
          </div>
        </div>
      </section>

      <div class="divider"></div>

      <!-- Password -->
      <section class="section">
        <h2 class="section__title">Password</h2>
        <button class="change-pw-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Change Password
        </button>
      </section>

    </div>
  </div>
</template>

<style scoped>
.profile {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.profile__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--color-text);
  cursor: pointer;
  margin-bottom: 8px;
  width: fit-content;
  padding: 6px 0;
  transition: color 0.15s;
}

.back-btn:hover {
  color: var(--color-primary);
}

.profile__title {
  font-size: 24px;
  font-weight: 400;
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
  font-weight: 400;
  color: var(--color-text);
  padding-bottom: 12px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--color-border);
}

.divider {
  height: 1px;
  background-color: var(--color-border);
  margin: 24px 0;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 599px) {
  .field-grid {
    grid-template-columns: 1fr;
  }
}

.field-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field__label {
  display: block;
  font-size: 13px;
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
  color: var(--color-text);
}

.field__hint {
  font-size: 12px;
  color: var(--color-text);
  margin-top: 4px;
}

.change-pw-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 24px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 14px;
  color: var(--color-text);
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
}

.change-pw-btn:hover {
  background-color: var(--color-bg);
  color: var(--color-primary);
}
</style>
