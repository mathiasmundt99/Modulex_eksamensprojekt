<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  user: { type: Object, required: true },
});

const emit = defineEmits(["save-user"]);

const isEditing = ref(false);

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  company: "",
  country: "",
});

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      form.value = {
        firstName: newUser.firstName || "",
        lastName: newUser.lastName || "",
        email: newUser.email || "",
        phoneNumber: newUser.phoneNumber || "",
        company: newUser.company || "",
        country: newUser.country || "",
        status: newUser.status || "active",
        progress: newUser.progress || 0,
        id: newUser.id,
      };
    }
  },
  { immediate: true },
);

function saveChanges() {
  emit("save-user", form.value);
  isEditing.value = false;
}
</script>

<template>
  <div class="card">
    <div class="avatar-wrap">
      <span class="material-symbols-rounded avatar-icon">person</span>
    </div>
    <div v-if="isEditing" class="name-fields">
      <input v-model="form.firstName" placeholder="First name" />
      <input v-model="form.lastName" placeholder="Last name" />
    </div>

    <h2 v-else class="user-name">{{ user.firstName }} {{ user.lastName }}</h2>

    <ul class="info-list">
      <li class="info-row">
        <span class="material-symbols-rounded info-icon">mail</span>
        <div>
          <p class="info-label">Email</p>
          <input v-if="isEditing" v-model="form.email" class="edit-input" />

          <p v-else class="info-value">
            {{ user.email }}
          </p>
        </div>
      </li>
      <li class="info-row">
        <span class="material-symbols-rounded info-icon">phone</span>
        <div>
          <p class="info-label">Phone</p>
          <input
            v-if="isEditing"
            v-model="form.phoneNumber"
            class="edit-input" />

          <p v-else class="info-value">
            {{ user.phoneNumber }}
          </p>
        </div>
      </li>
      <li class="info-row">
        <span class="material-symbols-rounded info-icon">business</span>
        <div>
          <p class="info-label">Company</p>
          <input v-if="isEditing" v-model="form.company" class="edit-input" />

          <p v-else class="info-value">
            {{ user.company }}
          </p>
        </div>
      </li>
      <li class="info-row">
        <span class="material-symbols-rounded info-icon">location_on</span>
        <div>
          <p class="info-label">Country</p>
          <input v-if="isEditing" v-model="form.country" class="edit-input" />

          <p v-else class="info-value">
            {{ user.country }}
          </p>
        </div>
      </li>
    </ul>
    <div class="actions">
      <button v-if="!isEditing" @click="isEditing = true">Edit User</button>

      <button v-else @click="saveChanges">Save Changes</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 24px;
}

.avatar-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.avatar-icon {
  font-size: 40px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--color-accent);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-name {
  font-size: 20px;
  text-align: center;
  color: var(--color-text);
  margin-bottom: 20px;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.info-icon {
  font-size: 20px;
  color: var(--color-text);
  margin-top: 2px;
}

.info-label {
  font-size: 12px;
  color: var(--color-text);
}

.info-value {
  font-size: 14px;
  color: var(--color-text);
}

.edit-input {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
}

.name-fields {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.actions {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.actions button {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: var(--color-primary);
  color: white;
}
</style>
