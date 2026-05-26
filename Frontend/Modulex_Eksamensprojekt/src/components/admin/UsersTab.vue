<script setup>
import { useRouter } from "vue-router";
import BaseButton from "../BaseButton.vue";
import BreadCrumb from "../BreadCrumb.vue";
import UsersTable from "./UsersTable.vue";
import { ref, onMounted } from "vue";
import { getAllUsers } from "../../services/adminService";

const router = useRouter();

const users = ref([]);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await getAllUsers();
    users.value = response.data || [];
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="tab-content">
    <BreadCrumb />
    <div class="tab-header">
      <div>
        <h2 class="page-title">Manage Users</h2>
        <p class="page-subtitle">Track and manage partner onboarding</p>
      </div>
      <BaseButton @click="router.push('/admin/invite')">
        <span class="material-symbols-rounded">add</span>
        Invite User
      </BaseButton>
    </div>

    <UsersTable :users="users" />
  </div>
</template>

<style scoped>
.tab-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
}

.tab-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.page-title {
  font-size: 24px;
  color: var(--color-text);
}

.page-subtitle {
  font-size: 15px;
  color: var(--color-text);
  margin-top: 4px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: var(--color-text);
  opacity: 0.6;
}

.error-state {
  text-align: center;
  padding: 40px 20px;
  color: #c33;
}
</style>
