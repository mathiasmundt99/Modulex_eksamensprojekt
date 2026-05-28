<script setup>
import { ref, watch } from 'vue'
import BaseButton from '../components/BaseButton.vue'
import BreadCrumb from '../components/BreadCrumb.vue'
import { useCurrentUser } from '../composables/useCurrentUser.js'
import { updateMe, changePassword } from '../services/authService.js'
import { getCompanyById } from '../services/companiesService.js'

const { user } = useCurrentUser()
const company = ref(null)

// Hent firmadata når bruger er loaded
watch(user, async (u) => {
  if (!u?.companyId) return
  try {
    const result = await getCompanyById(u.companyId)
    company.value = result.data ?? result
  } catch {
    // firma ikke fundet — vis ingenting
  }
}, { immediate: true })

// --- Redigering af profil ---
const editing = ref(false)
const saving = ref(false)
const saveError = ref('')
const saveSuccess = ref(false)

const form = ref({ firstName: '', lastName: '', phoneNumber: '' })

function startEdit() {
  form.value = {
    firstName: user.value?.firstName ?? '',
    lastName: user.value?.lastName ?? '',
    phoneNumber: user.value?.phoneNumber ?? '',
  }
  editing.value = true
  saveError.value = ''
  saveSuccess.value = false
}

async function saveProfile() {
  saving.value = true
  saveError.value = ''
  saveSuccess.value = false
  try {
    const updated = await updateMe(form.value)
    user.value = { ...user.value, ...updated }
    editing.value = false
    saveSuccess.value = true
    setTimeout(() => { saveSuccess.value = false }, 3000)
  } catch (err) {
    saveError.value = err.message
  } finally {
    saving.value = false
  }
}

// --- Password skift ---
const showPasswordForm = ref(false)
const pwForm = ref({ currentPassword: '', newPassword: '', confirmNewPassword: '' })
const pwSaving = ref(false)
const pwError = ref('')
const pwSuccess = ref(false)

async function submitPasswordChange() {
  pwSaving.value = true
  pwError.value = ''
  pwSuccess.value = false
  try {
    await changePassword(pwForm.value.currentPassword, pwForm.value.newPassword, pwForm.value.confirmNewPassword)
    pwSuccess.value = true
    pwForm.value = { currentPassword: '', newPassword: '', confirmNewPassword: '' }
    showPasswordForm.value = false
    setTimeout(() => { pwSuccess.value = false }, 3000)
  } catch (err) {
    pwError.value = err.message
  } finally {
    pwSaving.value = false
  }
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
        <div class="section__head">
          <h2 class="section__title">Personal Information</h2>
          <BaseButton v-if="!editing" @click="startEdit">
            <span class="material-symbols-rounded">edit_square</span>
            Edit
          </BaseButton>
        </div>

        <div v-if="!editing" class="field-grid">
          <div class="field">
            <label class="field__label">First Name</label>
            <div class="field__value">
              <span class="material-symbols-rounded">person</span>
              {{ user?.firstName }}
            </div>
          </div>
          <div class="field">
            <label class="field__label">Last Name</label>
            <div class="field__value">
              <span class="material-symbols-rounded">person</span>
              {{ user?.lastName }}
            </div>
          </div>
        </div>

        <div v-else class="field-grid">
          <div class="field">
            <label class="field__label">First Name</label>
            <input v-model="form.firstName" class="field__input" type="text" />
          </div>
          <div class="field">
            <label class="field__label">Last Name</label>
            <input v-model="form.lastName" class="field__input" type="text" />
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
              {{ user?.email }}
            </div>
            <p class="field__hint">This is the email from your invitation</p>
          </div>
          <div class="field">
            <label class="field__label">Phone Number</label>
            <div v-if="!editing" class="field__value">
              <span class="material-symbols-rounded">phone</span>
              {{ user?.phoneNumber }}
            </div>
            <input v-else v-model="form.phoneNumber" class="field__input" type="tel" />
          </div>
        </div>

        <div v-if="editing" class="edit-actions">
          <p v-if="saveError" class="feedback feedback--error">{{ saveError }}</p>
          <BaseButton variant="outline" @click="editing = false">Cancel</BaseButton>
          <BaseButton :disabled="saving" @click="saveProfile">
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </BaseButton>
        </div>
        <p v-if="saveSuccess && !editing" class="feedback feedback--success">Profile updated successfully</p>
      </section>

      <div class="divider"></div>

      <!-- Company Information -->
      <section v-if="company" class="section">
        <h2 class="section__title">Company Information</h2>
        <div class="field-grid">
          <div class="field">
            <label class="field__label">Company Name</label>
            <div class="field__value">
              <span class="material-symbols-rounded">business</span>
              {{ company.name }}
            </div>
          </div>
          <div class="field">
            <label class="field__label">CVR Number</label>
            <div class="field__value">
              <span class="material-symbols-rounded">badge</span>
              {{ company.cvr }}
            </div>
          </div>
          <div class="field">
            <label class="field__label">Address</label>
            <div class="field__value">
              <span class="material-symbols-rounded">location_on</span>
              {{ company.address }}
            </div>
          </div>
          <div class="field">
            <label class="field__label">Country</label>
            <div class="field__value">
              <span class="material-symbols-rounded">flag</span>
              {{ company.country }}
            </div>
          </div>
        </div>
      </section>

      <div class="divider"></div>

      <!-- Password -->
      <section class="section">
        <h2 class="section__title">Password</h2>
        <p v-if="pwSuccess" class="feedback feedback--success">Password changed successfully</p>

        <div v-if="!showPasswordForm">
          <BaseButton variant="outline" @click="showPasswordForm = true">
            <span class="material-symbols-rounded">lock</span>
            Change Password
          </BaseButton>
        </div>

        <div v-else class="pw-form">
          <div class="field">
            <label class="field__label">Current Password</label>
            <input v-model="pwForm.currentPassword" class="field__input" type="password" />
          </div>
          <div class="field">
            <label class="field__label">New Password</label>
            <input v-model="pwForm.newPassword" class="field__input" type="password" />
          </div>
          <div class="field">
            <label class="field__label">Confirm New Password</label>
            <input v-model="pwForm.confirmNewPassword" class="field__input" type="password" />
          </div>
          <p v-if="pwError" class="feedback feedback--error">{{ pwError }}</p>
          <div class="edit-actions">
            <BaseButton variant="outline" @click="showPasswordForm = false">Cancel</BaseButton>
            <BaseButton :disabled="pwSaving" @click="submitPasswordChange">
              {{ pwSaving ? 'Saving...' : 'Change Password' }}
            </BaseButton>
          </div>
        </div>
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

.section__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--color-border);
}

.section__title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
}

/* For sections without edit button */
.section > .section__title {
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

.field__input {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 15px;
  color: var(--color-text);
  font-family: inherit;
  outline: none;
  box-sizing: border-box;
}

.field__input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(239, 96, 35, 0.15);
}

.field__hint {
  font-size: 12px;
  color: var(--color-text);
  margin-top: 4px;
}

.edit-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  align-items: center;
}

.pw-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
}

.feedback {
  font-size: 13px;
}

.feedback--success {
  color: var(--color-success);
}

.feedback--error {
  color: var(--color-error);
}
</style>
