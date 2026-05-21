<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BreadCrumb        from '../components/BreadCrumb.vue'
import BaseButton        from '../components/BaseButton.vue'
import CourseDetailsCard from '../components/admin/CourseDetailsCard.vue'
import CourseStatsCard   from '../components/admin/CourseStatsCard.vue'
import CourseDangerZone  from '../components/admin/CourseDangerZone.vue'
import CourseModulesList from '../components/admin/CourseModulesList.vue'

const route  = useRoute()
const router = useRouter()

const isNew = computed(() => !route.params.courseId)

// Mock data — replace with API call using route.params.courseId
const allCourses = [
  {
    id: 1,
    title: 'Introduction to Modulex Sign Systems',
    description: 'Learn the basics of our modular signage solutions',
    status: 'published',
    enrolledUsers: 24,
  },
  {
    id: 2,
    title: 'Product Configuration & Ordering',
    description: 'Master the ordering process and configuration tools for Modulex sign systems',
    status: 'published',
    enrolledUsers: 18,
  },
  {
    id: 3,
    title: 'Advanced Installation Techniques',
    description: 'Professional installation techniques and quality control standards',
    status: 'draft',
    enrolledUsers: 0,
  },
]

const allModules = {
  1: [
    { id: 1, title: 'Welcome to Modulex',    type: 'video', duration: '5 min',  contentId: 101 },
    { id: 2, title: 'Product Overview',       type: 'video', duration: '10 min', contentId: 102 },
    { id: 3, title: 'Sign Systems Catalog',   type: 'pdf',   pages: 18,          contentId: 103 },
    { id: 4, title: 'Getting Started Quiz',   type: 'pdf',   pages: 4,           contentId: 104 },
  ],
  2: [
    { id: 1, title: 'Welcome to Product Configuration',   type: 'video', duration: '5 min',  contentId: 101 },
    { id: 2, title: 'Understanding Modular Sign Systems', type: 'video', duration: '12 min', contentId: 102 },
    { id: 3, title: 'Product Catalog Overview',           type: 'pdf',   pages: 24,          contentId: 103 },
    { id: 4, title: 'Configuration Tool Tutorial',        type: 'video', duration: '18 min', contentId: 104 },
    { id: 5, title: 'Pricing & Quotes Guide',             type: 'pdf',   pages: 12,          contentId: 105 },
  ],
  3: [],
}

const availableContent = [
  { id: 201, title: 'Advanced Installation Techniques',       type: 'video', duration: '15 min' },
  { id: 202, title: 'Quality Control Standards',              type: 'pdf',   pages: 18 },
  { id: 203, title: 'Customer Communication Best Practices',  type: 'video', duration: '10 min' },
]

const foundCourse = isNew.value
  ? null
  : allCourses.find(c => c.id === Number(route.params.courseId))

const courseData = ref(
  foundCourse
    ? { ...foundCourse }
    : { title: '', description: '', status: 'draft', enrolledUsers: 0 }
)

const modules = ref(
  isNew.value ? [] : [...(allModules[Number(route.params.courseId)] || [])]
)

const isEditing = ref(isNew.value)

const breadcrumbItems = computed(() => [
  { label: 'Admin',   to: '/admin' },
  { label: 'Courses', to: '/admin/courses' },
  { label: isNew.value ? 'New Course' : courseData.value.title },
])

function handleSave() {
  isEditing.value = false
}

function handleCancel() {
  if (isNew.value) {
    router.push('/admin/courses')
  } else {
    isEditing.value = false
  }
}

function handleDelete() {
  router.push('/admin/courses')
}

function removeModule(id) {
  const idx = modules.value.findIndex(m => m.id === id)
  if (idx !== -1) modules.value.splice(idx, 1)
}

function addModule(content) {
  modules.value.push({
    id: Date.now(),
    title: content.title,
    type: content.type,
    duration: content.type === 'video' ? content.duration : undefined,
    pages:    content.type === 'pdf'   ? content.pages    : undefined,
    contentId: content.id,
  })
}

function reorderModules({ from, to }) {
  const list = [...modules.value]
  const [moved] = list.splice(from, 1)
  list.splice(to, 0, moved)
  modules.value = list
}
</script>

<template>
  <div class="editor">
    <BreadCrumb :items="breadcrumbItems" />

    <div class="editor__header">
      <div class="editor__heading">
        <h1 class="editor__title">{{ isNew ? 'Create Course' : 'Edit Course' }}</h1>
        <p class="editor__subtitle">
          {{ isNew ? 'Set up your new course' : 'Manage course content and settings' }}
        </p>
      </div>
      <div class="editor__actions">
        <template v-if="isNew">
          <BaseButton variant="outline" @click="handleCancel">Cancel</BaseButton>
          <BaseButton @click="handleSave">Save Course</BaseButton>
        </template>
        <template v-else-if="isEditing">
          <BaseButton variant="outline" @click="handleCancel">Cancel</BaseButton>
          <BaseButton @click="handleSave">
            <span class="material-symbols-rounded">save</span>
            Save Changes
          </BaseButton>
        </template>
        <template v-else>
          <BaseButton variant="muted" @click="isEditing = true">
            <span class="material-symbols-rounded">edit</span>
            Edit Course
          </BaseButton>
        </template>
      </div>
    </div>

    <div class="editor__grid">
      <div class="col">
        <CourseDetailsCard
          :courseData="courseData"
          :isEditing="isEditing"
          @update:courseData="courseData = $event"
        />
        <CourseStatsCard
          :modules="modules"
          :enrolledUsers="courseData.enrolledUsers"
        />
        <CourseDangerZone
          v-if="isEditing && !isNew"
          @delete="handleDelete"
        />
      </div>
      <div class="col">
        <CourseModulesList
          :modules="modules"
          :isEditing="isEditing"
          :availableContent="availableContent"
          @remove-module="removeModule"
          @add-module="addModule"
          @reorder="reorderModules"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.editor__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.editor__heading {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.editor__title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text);
}

.editor__subtitle {
  font-size: 15px;
  color: var(--color-text);
}

.editor__actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.editor__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 1024px) {
  .editor__grid {
    grid-template-columns: 320px 1fr;
  }
}

.col {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
