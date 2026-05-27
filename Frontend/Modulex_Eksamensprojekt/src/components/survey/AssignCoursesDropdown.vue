<script setup>
import { ref, onMounted } from 'vue'
import { getAllCourses } from '../../services/courseService'

const courses = ref([])

const user = JSON.parse(
    localStorage.getItem('user')
)

const userName =
    user?.firstName || 'User'

onMounted(async () => {
    try {

        courses.value =
            await getAllCourses()

        console.log(
            'Courses:',
            courses.value
        )

    } catch (error) {
        console.error(error)
    }
})

function assignCourse(course) {
    console.log(
        'Assign course:',
        course
    )
}
</script>

<template>
    <div class="panel">

        <h2>
            Assign Course to {{ userName }}
        </h2>

        <div v-for="course in courses" :key="course.id" class="course-card">
            <div class="course-info">

                <h3>
                    {{ course.title }}
                </h3>

                <div class="course-meta">

                    <span v-if="course.modules">
                        📖 {{ course.modules }} modules
                    </span>

                    <span v-if="course.duration">
                        🕒 {{ course.duration }}
                    </span>

                    <span v-if="course.description">
                        {{ course.description }}
                    </span>

                </div>

            </div>

            <button class="assign-button" @click="assignCourse(course)">
                Assign
            </button>

        </div>

    </div>
</template>

<style scoped>
.panel {
    background: white;
    border: 1.5px solid #e0e0e0;
    border-radius: 14px;
    padding: 24px;
    width: 100%;
}

.panel h2 {
    margin: 0 0 20px;
    font-size: 1.3rem;
    font-weight: 600;
}

.course-card {
    display: flex;
    justify-content: space-between;
    align-items: center;

    border: 1px solid #d9d9d9;
    border-radius: 10px;

    padding: 18px;
    margin-bottom: 16px;
}

.course-info {
    flex: 1;
}

.course-info h3 {
    margin: 0 0 8px;
}

.course-meta {
    display: flex;
    gap: 16px;
    color: #666;
    font-size: 14px;
    flex-wrap: wrap;
}

.assign-button {
    background: #f36f21;
    color: white;

    border: none;
    border-radius: 8px;

    padding: 10px 18px;
    font-weight: 600;
    cursor: pointer;
}
</style>