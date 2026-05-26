<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "../BaseButton.vue";
import { getCompanies } from "@/services/companiesService.js";

const props = defineProps({
  users: { type: Array, required: true },
});

const router = useRouter();
const searchQuery = ref("");
const companies = ref([]);

const filteredUsers = computed(() => {
  const q = searchQuery.value.toLowerCase();
  if (!q) return props.users;
  return props.users.filter((u) => {
    const name = `${u.firstName ?? ""} ${u.lastName ?? ""}`.toLowerCase();
    const company = (u.companyId ?? "").toLowerCase();
    return (
      name.includes(q) ||
      u.email.toLowerCase().includes(q) ||
      company.includes(q)
    );
  });
});

onMounted(async () => {
  try {
    companies.value = await getCompanies();
  } catch (err) {
    console.error("Failed to load companies", err);
  }
});

const getCompanyName = (companyId) => {
  const company = companies.value.find((c) => c.id === companyId);
  return company?.name ?? "—";
};
</script>

<template>
  <div class="users-table">
    <div class="card search-card">
      <div class="search-wrap">
        <span class="material-symbols-rounded search-icon">search</span>
        <input
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="Search users by name, email, or company..." />
      </div>
    </div>

    <div class="card card--flush">
      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Company</th>
              <th>Country</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredUsers.length === 0">
              <td colspan="5" class="empty-row">Ingen brugere fundet</td>
            </tr>
            <tr v-for="user in filteredUsers" :key="user.id" class="table-row">
              <td>
                <p class="td-name">
                  {{ user.firstName ?? "" }}
                  {{ user.lastName ?? user.name ?? "" }}
                </p>
                <p class="td-sub">{{ user.email }}</p>
              </td>
              <td>
                <p class="td-main">
                  {{ getCompanyName(user.companyId) }}
                </p>
              </td>
              <td>
                <p class="td-main">{{ user.country ?? "—" }}</p>
              </td>
              <td>
                <span class="badge">{{ user.role ?? "user" }}</span>
              </td>
              <td>
                <div class="action-btns">
                  <BaseButton
                    variant="ghost"
                    class="action-btn"
                    @click="router.push('/admin/users/' + user.id)">
                    <span class="material-symbols-rounded">edit_square</span>
                  </BaseButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.users-table {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.search-card {
  padding: 16px;
}

.card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.card--flush {
  padding: 0;
  overflow: hidden;
}

.search-wrap {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 10px 16px 10px 42px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 14px;
  color: var(--color-text);
  background-color: var(--color-white);
  outline: none;
  font-family: inherit;
}

.search-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(239, 96, 35, 0.15);
}

.table-wrap {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table thead {
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}

.table th {
  padding: 12px 24px;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
}

.table-row {
  border-bottom: 1px solid var(--color-border);
  transition: background-color 0.15s;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background-color: var(--color-bg);
}

.table td {
  padding: 16px 24px;
  vertical-align: middle;
}

.td-name {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text);
}

.td-main {
  font-size: 15px;
  color: var(--color-text);
}

.td-sub {
  font-size: 13px;
  color: var(--color-text);
  margin-top: 2px;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  background-color: var(--color-accent);
  color: var(--color-white);
  font-size: 12px;
  border-radius: 9999px;
}

.action-btns {
  display: flex;
  align-items: center;
  gap: 4px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  color: var(--color-text);
  border-radius: 6px;
  cursor: pointer;
  transition: color 0.15s;
}

.action-btn:hover {
  color: var(--color-primary);
}

.empty-row {
  text-align: center;
  padding: 32px;
  color: var(--color-text);
  opacity: 0.5;
}
</style>
