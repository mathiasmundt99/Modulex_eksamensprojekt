import { createRouter, createWebHistory } from 'vue-router'
import UserDashboardView from '../views/UserDashboardView.vue'
import AdminDashboardView from '../views/AdminDashboardView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import UserOverviewTab from '../components/user/OverviewTab.vue'
import UserCoursesTab from '../components/user/CoursesTab.vue'
import UserProgressTab from '../components/user/ProgressTab.vue'
import AdminOverviewTab from '../components/admin/OverviewTab.vue'
import AdminUsersTab from '../components/admin/UsersTab.vue'
import AdminContentTab from '../components/admin/ContentTab.vue'
import AdminCoursesTab from '../components/admin/CoursesTab.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },
    { path: '/overview',  redirect: '/dashboard/overview' },
    { path: '/courses',   redirect: '/dashboard/courses' },
    { path: '/progress',  redirect: '/dashboard/progress' },
    {
      path: '/dashboard',
      redirect: '/dashboard/overview',
      component: UserDashboardView,
      children: [
        { path: 'overview', component: UserOverviewTab },
        { path: 'courses',  component: UserCoursesTab },
        { path: 'progress', component: UserProgressTab },
        { path: 'profile',  component: UserProfileView }
      ]
    },
    {
      path: '/admin',
      redirect: '/admin/overview',
      component: AdminDashboardView,
      children: [
        { path: 'overview', component: AdminOverviewTab },
        { path: 'users',    component: AdminUsersTab },
        { path: 'content',  component: AdminContentTab },
        { path: 'courses',  component: AdminCoursesTab }
      ]
    }
  ]
})
