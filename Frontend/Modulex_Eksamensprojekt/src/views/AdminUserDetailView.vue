<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import BreadCrumb from "../components/BreadCrumb.vue";
import UserProfileCard from "../components/admin/UserProfileCard.vue";
import UserStatsCard from "../components/admin/UserStatsCard.vue";
import UserActionsCard from "../components/admin/UserActionsCard.vue";
import UserEnrolledCourses from "../components/admin/UserEnrolledCourses.vue";
import UserActivityLog from "../components/admin/UserActivityLog.vue";
import { getUserById, updateUser } from "../services/adminService";

const route = useRoute();
const user = ref(null);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await getUserById(route.params.id);
    user.value = response.data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

const enrolledCourses = ref([
  {
    id: 1,
    title: "Introduction to Modulex Sign Systems",
    progress: 100,
    enrolledDate: "2024-03-15",
    completedDate: "2024-03-20",
    timeSpent: "2.5 hours",
  },
  {
    id: 2,
    title: "Product Configuration & Ordering",
    progress: 60,
    enrolledDate: "2024-03-20",
    completedDate: null,
    timeSpent: "3.2 hours",
  },
]);

const availableCourses = [
  {
    id: 3,
    title: "Installation Best Practices",
    modules: 6,
    duration: "4 hours",
  },
  {
    id: 4,
    title: "Advanced Product Customization",
    modules: 5,
    duration: "3.5 hours",
  },
  {
    id: 5,
    title: "Customer Service Excellence",
    modules: 4,
    duration: "2 hours",
  },
];

const activityLog = [
  {
    id: 1,
    action: "Completed module: Product Materials Overview",
    timestamp: "2024-03-25 14:30",
    course: "Product Configuration & Ordering",
    status: "completed",
  },
  {
    id: 2,
    action: "Started course: Product Configuration & Ordering",
    timestamp: "2024-03-20 10:15",
    course: "Product Configuration & Ordering",
    status: "started",
  },
  {
    id: 3,
    action: "Completed course: Introduction to Modulex Sign Systems",
    timestamp: "2024-03-20 09:45",
    course: "Introduction to Modulex Sign Systems",
    status: "completed",
  },
];

function removeCourse(id) {
  const idx = enrolledCourses.value.findIndex((c) => c.id === id);
  if (idx !== -1) enrolledCourses.value.splice(idx, 1);
}

function assignCourse(course) {
  enrolledCourses.value.push({
    id: course.id,
    title: course.title,
    progress: 0,
    enrolledDate: new Date().toISOString().slice(0, 10),
    completedDate: null,
    timeSpent: "0 hours",
  });
}

async function saveUser(updatedUser) {
  try {
    loading.value = true;

    const payload = {
      name: `${updatedUser.firstName} ${updatedUser.lastName}`,
      email: updatedUser.email,
      company: updatedUser.company,
      country: updatedUser.country,
      status: updatedUser.status,
      progress: updatedUser.progress,
    };

    const response = await updateUser(updatedUser.id, payload);

    user.value = response.data;

    alert("User updated successfully");
  } catch (err) {
    console.error(err);
    alert("Failed to update user");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <div v-if="user" class="detail-root">
      <BreadCrumb
        :items="[
          { label: 'Admin', to: '/admin' },
          { label: 'Users', to: '/admin/users' },
          { label: user.name },
        ]" />

      <div class="detail-grid">
        <div class="col">
          <UserProfileCard :user="user" @save-user="saveUser" />
          <UserStatsCard :user="user" />
          <UserActionsCard />
        </div>

        <div class="col">
          <UserEnrolledCourses
            :courses="enrolledCourses"
            :availableCourses="availableCourses"
            :userName="user.name"
            @remove-course="removeCourse"
            @assign-course="assignCourse" />
          <UserActivityLog :log="activityLog" />
        </div>
      </div>
    </div>

    <div v-else class="not-found">User not found.</div>
  </div>
</template>

<style scoped>
.detail-root {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: var(--color-text);
  cursor: pointer;
  width: fit-content;
  padding: 4px 0;
  transition: color 0.15s;
}
.back-btn:hover {
  color: var(--color-primary);
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 1024px) {
  .detail-grid {
    grid-template-columns: 320px 1fr;
  }
}

.col {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.not-found {
  color: var(--color-text);
  font-size: 15px;
}
</style>
