<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import BreadCrumb from "../components/BreadCrumb.vue";
import UserProfileCard from "../components/admin/UserProfileCard.vue";
import UserStatsCard from "../components/admin/UserStatsCard.vue";
import UserActionsCard from "../components/admin/UserActionsCard.vue";
import UserEnrolledCourses from "../components/admin/UserEnrolledCourses.vue";
import UserActivityLog from "../components/admin/UserActivityLog.vue";
import SurveyResponsesCard from "../components/survey/SurveyResponseCard.vue";

import { getAllCourses } from "../services/courseService";

import {
  getUserById,
  updateUser,
  deleteUser,
  getUserProgressDetails,
  getUserProgressCourses,
  getUserActivity,
  enrollUserInCourse,
} from "../services/adminService";

import { getUserSurveyAnswers } from "../services/surveyService";

const router = useRouter();
const route = useRoute();

const user = ref(null);
const loading = ref(false);
const error = ref(null);
const isEditing = ref(false);

const enrolledCourses = ref([]);
const availableCourses = ref([]);
const activityLog = ref([]);

const responses = ref({
  businessType: "",
  companySize: "",
  leadSource: "",
  primaryMarket: "",
  experienceLevel: "",
  challenge: "",
  submitted: "",
});

function mapCourses(courses) {
  return courses.map((course) => ({
    id: course.courseId,
    title: course.courseName,
    progress: course.completionPercentage || 0,
    enrolledDate: course.enrolledDate || "N/A",
    completedDate: null,
    timeSpent: "-",
  }));
}

function setUserData(baseUser, progressInfo, courses) {
  const avgProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce((sum, c) => sum + (c.completionPercentage || 0), 0) /
            courses.length,
        )
      : 0;

  const latestActivity = courses.reduce((latest, c) => {
    if (!c.lastAccessed) return latest;

    return !latest || new Date(c.lastAccessed) > new Date(latest)
      ? c.lastAccessed
      : latest;
  }, null);

  user.value = {
    ...baseUser,

    enrolledDate: progressInfo?.enrolledDate || baseUser?.enrolledDate || "N/A",

    progress: avgProgress,

    lastActive: latestActivity || "—",
  };
}

async function loadUserData(userId) {
  const [
    userResponse,
    activityResponse,
    progressCoursesResponse,
    progressResponse,
  ] = await Promise.all([
    getUserById(userId),

    getUserActivity(userId).catch(() => ({
      data: [],
    })),

    getUserProgressCourses(userId).catch(() => ({
      data: [],
    })),

    getUserProgressDetails(userId).catch(() => ({
      data: {
        courses: [],
        enrolledDate: null,
      },
    })),
  ]);

  const baseUser = userResponse.data?.data || userResponse.data;

  const progressInfo = progressResponse.data?.data || progressResponse.data;

  const courses = await getAllCourses();

  availableCourses.value = courses;

  setUserData(baseUser, progressInfo, courses);

  activityLog.value =
    activityResponse.data?.data || activityResponse.data || [];

  enrolledCourses.value = mapCourses(progressCoursesResponse.data || []);
}

async function loadSurveyData(userId) {
  const surveyData = await getUserSurveyAnswers(userId);

  if (!surveyData || surveyData.length === 0) {
    return;
  }

  const latestSurvey = surveyData[surveyData.length - 1];

  const answers = latestSurvey.answers || [];

  const mappedAnswers = {};

  answers.forEach((answer) => {
    mappedAnswers[answer.step] = answer.selected_option;
  });

  responses.value = {
    businessType: mappedAnswers[1] || "",

    companySize: mappedAnswers[2] || "",

    leadSource: mappedAnswers[3] || "",

    primaryMarket: mappedAnswers[4] || "",

    experienceLevel: mappedAnswers[5] || "",

    challenge: mappedAnswers[6] || "",

    submitted: latestSurvey.createdAt
      ? new Date(latestSurvey.createdAt).toLocaleDateString()
      : "",
  };
}

function removeCourse(id) {
  const idx = enrolledCourses.value.findIndex((c) => c.id === id);

  if (idx !== -1) {
    enrolledCourses.value.splice(idx, 1);
  }
}

async function assignCourse(course) {
  try {
    await enrollUserInCourse(user.value.id, course.id);

    const progressCoursesResponse = await getUserProgressCourses(user.value.id);

    enrolledCourses.value = mapCourses(progressCoursesResponse.data || []);
  } catch (error) {
    console.error("Failed to assign course:", error);
  }
}

async function saveUser(updatedUser) {
  try {
    loading.value = true;

    const response = await updateUser(user.value.id, updatedUser);

    user.value = {
      ...(response.data?.data || response.data),

      id: response.data?.data?.userId || response.data?.userId,
    };

    isEditing.value = false;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

async function handleDeleteUser() {
  if (!user.value) return;

  const confirmDelete = confirm(
    `Are you sure you want to delete ${user.value.firstName} ${user.value.lastName}?`,
  );

  if (!confirmDelete) return;

  try {
    loading.value = true;

    await deleteUser(user.value.id);

    alert("User deleted successfully");

    router.push("/admin/users");
  } catch (err) {
    console.error(err);

    alert("Failed to delete user");
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  loading.value = true;

  try {
    const userId = route.params.id;

    await loadUserData(userId);

    await loadSurveyData(userId);
  } catch (err) {
    console.error(err);

    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <div v-if="user" class="detail-root">
      <BreadCrumb
        :items="[
          { label: 'Admin', to: '/admin' },
          { label: 'Users', to: '/admin/users' },
          {
            label: `${user.firstName} ${user.lastName}`,
          },
        ]" />

      <div class="detail-grid">
        <div class="col">
          <UserProfileCard
            :user="user"
            :is-editing="isEditing"
            @start-edit="isEditing = true"
            @save-user="saveUser"
            @cancel-edit="isEditing = false" />
          <UserStatsCard :user="user" />
          <UserActionsCard @delete-user="handleDeleteUser" />
        </div>

        <div class="col">
          <UserEnrolledCourses
            :courses="enrolledCourses"
            :availableCourses="availableCourses"
            :userName="`${user.firstName} ${user.lastName}`"
            @remove-course="removeCourse"
            @assign-course="assignCourse" />
          <UserActivityLog :log="activityLog" />
          <SurveyResponsesCard :responses="responses" />
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
