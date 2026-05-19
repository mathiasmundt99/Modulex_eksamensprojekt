<script setup>
import { ref, computed } from 'vue'
import BaseButton from '../BaseButton.vue'

const searchQuery = ref('')

const users = [
  { id: 1, name: 'John Doe',    email: 'john@acmesigns.com',  company: 'Acme Signs Ltd.', country: 'Denmark', progress: 45, status: 'active' },
  { id: 2, name: 'Jane Smith',  email: 'jane@signpro.com',    company: 'SignPro Inc.',    country: 'Germany', progress: 80, status: 'active' },
  { id: 3, name: 'Mike Johnson', email: 'mike@visualsign.com', company: 'Visual Sign Co.', country: 'UK',     progress: 20, status: 'active' }
]

const filteredUsers = computed(() => {
  const q = searchQuery.value.toLowerCase()
  if (!q) return users
  return users.filter(u =>
    u.name.toLowerCase().includes(q) ||
    u.email.toLowerCase().includes(q) ||
    u.company.toLowerCase().includes(q)
  )
})
</script>

<template>
  <div class="tab-content">
    <div class="tab-header">
      <div>
        <h2 class="page-title">Manage Users</h2>
        <p class="page-subtitle">Track and manage partner onboarding</p>
      </div>
      <BaseButton>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Invite User
      </BaseButton>
    </div>

    <div class="card">
      <div class="search-wrap">
        <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="Search users by name, email, or company..."
        />
      </div>
    </div>

    <div class="card card--flush">
      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Company</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id" class="table-row">
              <td>
                <p class="td-name">{{ user.name }}</p>
                <p class="td-sub">{{ user.email }}</p>
              </td>
              <td>
                <p class="td-main">{{ user.company }}</p>
                <p class="td-sub">{{ user.country }}</p>
              </td>
              <td>
                <div class="progress-wrap">
                  <div class="progress-bar">
                    <div class="progress-bar__fill" :style="{ width: user.progress + '%' }"></div>
                  </div>
                  <p class="progress-label">{{ user.progress }}%</p>
                </div>
              </td>
              <td>
                <span class="badge">Active</span>
              </td>
              <td>
                <div class="action-btns">
                  <button class="action-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                  <button class="action-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
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

.card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
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

.progress-wrap {
  width: 128px;
}

.progress-bar {
  height: 8px;
  background-color: var(--color-border);
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 4px;
}

.progress-bar__fill {
  height: 100%;
  background-color: var(--color-primary);
  border-radius: 9999px;
  transition: width 0.5s;
}

.progress-label {
  font-size: 12px;
  color: var(--color-text);
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
</style>
