import { createRouter, createWebHistory } from "vue-router";
import UserDashboardView from "../views/UserDashboardView.vue";
import AdminDashboardView from "../views/AdminDashboardView.vue";
import UserProfileView from "../views/UserProfileView.vue";
import UserOverviewTab from "../components/user/OverviewTab.vue";
import UserCoursesTab from "../components/user/CoursesTab.vue";
import UserProgressTab from "../components/user/ProgressTab.vue";
import AdminOverviewTab from "../components/admin/OverviewTab.vue";
import AdminUsersTab from "../components/admin/UsersTab.vue";
import AdminContentTab from "../components/admin/ContentTab.vue";
import AdminCoursesTab from "../components/admin/CoursesTab.vue";
import AdminUserDetailView from "../views/AdminUserDetailView.vue";
import AdminCourseEditorView from "../views/AdminCourseEditorView.vue";
import InvitationView from "../views/InvitationView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/dashboard" },
    { path: "/invitation", component: InvitationView },
    { path: "/login", component: LoginView },
    { path: "/signup", component: SignupView },
    { path: "/overview", redirect: "/dashboard/overview" },
    { path: "/courses", redirect: "/dashboard/courses" },
    { path: "/progress", redirect: "/dashboard/progress" },
    {
      path: "/dashboard",
      redirect: "/dashboard/overview",
      component: UserDashboardView,
      meta: { label: "Dashboard" },
      children: [
        { path: "overview", component: UserOverviewTab,  meta: { label: "Overview" } },
        { path: "courses",  component: UserCoursesTab,   meta: { label: "Courses" } },
        { path: "progress", component: UserProgressTab,  meta: { label: "Progress" } },
        { path: "profile",  component: UserProfileView,  meta: { label: "Profile" } },
      ],
    },
    {
      path: "/admin",
      redirect: "/admin/overview",
      component: AdminDashboardView,
      meta: { label: "Admin" },
      children: [
        { path: "overview",  component: AdminOverviewTab,     meta: { label: "Overview" } },
        { path: "users",     component: AdminUsersTab,        meta: { label: "Users" } },
        { path: "users/:id", component: AdminUserDetailView,  meta: { label: "User Detail" } },
        { path: "content",         component: AdminContentTab,       meta: { label: "Content" } },
        { path: "courses",         component: AdminCoursesTab,       meta: { label: "Courses" } },
        { path: "courses/new",     component: AdminCourseEditorView, meta: { label: "New Course" } },
        { path: "courses/:courseId", component: AdminCourseEditorView, meta: { label: "Edit Course" } },
      ],
    },
  ],
});
