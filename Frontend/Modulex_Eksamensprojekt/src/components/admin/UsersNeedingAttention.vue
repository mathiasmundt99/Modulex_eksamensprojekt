<script setup>
import { ref, onMounted } from "vue";
import { getUsersAttention, getUserById } from "../../services/adminService";
import BaseButton from "../BaseButton.vue";

const users = ref([]);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await getUsersAttention(5, 0);
    const attentionData = response.data || [];

    users.value = await Promise.all(
      attentionData.map(async (item) => {
        try {
          const userResponse = await getUserById(item.userId);
          const userData =
            userResponse.data?.data || userResponse.data || userResponse;

          return {
            ...item,
            userName: userData.firstName
              ? `${userData.firstName} ${userData.lastName}`
              : "Ukendt Bruger",
          };
        } catch (e) {
          return { ...item, userName: "Ukendt Bruger" };
        }
      }),
    );
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="card">
    <h3 class="card__title">Users Needing Attention</h3>

    <div v-if="loading" class="status-msg">Henter data...</div>
    <div v-else-if="error" class="status-msg error">{{ error }}</div>
    <div v-else-if="users.length === 0" class="status-msg">
      Ingen brugere kræver opmærksomhed lige nu.
    </div>

    <div v-else class="user-list">
      <div
        v-for="item in users"
        :key="item.userId + item.courseId"
        class="user-item">
        <div class="user-item__info">
          <p class="user-item__name">
            {{ item.userName }}
          </p>
          <p class="user-item__company">{{ item.courseName }}</p>
          <div class="progress-bar">
            <div
              class="progress-bar__fill"
              :style="{ width: item.completionPercentage + '%' }"></div>
          </div>
          <p class="progress-label">
            {{ item.completionPercentage }}% completed
          </p>
        </div>
        <BaseButton variant="muted">Send Reminder</BaseButton>
      </div>
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

.card__title {
  font-size: 20px;
  color: var(--color-text);
  margin-bottom: 16px;
}

.status-msg {
  font-size: 14px;
  color: var(--color-text);
  opacity: 0.6;
  padding: 10px 0;
}

.error {
  color: var(--color-primary);
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background-color: var(--color-bg);
  border-radius: 8px;
  padding: 16px;
  flex-wrap: wrap;
}

.user-item__info {
  flex: 1;
}

.user-item__name {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text);
}

.user-item__company {
  font-size: 14px;
  color: var(--color-text);
  margin-bottom: 8px;
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
</style>
