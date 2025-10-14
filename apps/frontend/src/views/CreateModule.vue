<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getTeachers } from '@/services/teachers.service'
import { getCourses } from '@/services/courses.service'
import type { TeacherEntity } from '@shared/Domain/entities/teacher.domain'
import type { CourseEntity } from '@shared/Domain/entities/course.domain'
import type { CreateModuleDTO } from '@shared/Domain/entities/module.domain'
import { createModule } from '@/services/modules.service'

// Module state
const newModule = ref<CreateModuleDTO>({
  name: '',
  ec: 15,
  nlqf: 5,
  description: '',
  teacherId: '',
  courseId: '',
})

// Courses & teachers
const courses = ref<CourseEntity[]>([])
const teachers = ref<TeacherEntity[]>([])
const filteredTeachers = ref<TeacherEntity[]>([])

// Selected course and teacher
const selectedCourseId = ref<string | null>(null)
const selectedTeacherId = ref<string | null>(null)

// Load courses and teachers on mount
onMounted(async () => {
  try {
    const courseRes = await getCourses()
    if (Array.isArray(courseRes)) {
      courses.value = courseRes
    } else if (courseRes && typeof courseRes === 'object' && 'data' in courseRes) {
      courses.value = (courseRes as { data: CourseEntity[] }).data || []
    } else {
      courses.value = []
    }

    const teacherRes = await getTeachers()
    if (Array.isArray(teacherRes)) {
      teachers.value = teacherRes
    } else if (teacherRes && typeof teacherRes === 'object' && 'data' in teacherRes) {
      teachers.value = (teacherRes as { data: TeacherEntity[] }).data || []
    } else {
      teachers.value = []
    }
    console.log('Loaded courses and teachers successfully')
    console.log('Courses:', courses.value)
    console.log('Teachers:', teachers.value)
  } catch (err) {
    console.error('Failed to load courses or teachers', err)
    courses.value = []
    teachers.value = []
  }
})

// Watch course selection to filter teachers
watch(selectedCourseId, (courseId) => {
  if (Array.isArray(teachers.value)) {
    filteredTeachers.value = teachers.value.filter((t) => t.course?.id === courseId)
  } else {
    filteredTeachers.value = []
  }
  newModule.value = {
    ...newModule.value,
    courseId: courseId || '',
    teacherId: '', // reset teacher when changing course
  }
})

// Watch teacher selection
watch(selectedTeacherId, (teacherId) => {
  newModule.value = {
    ...newModule.value,
    teacherId: teacherId || '',
  }
})

// Allowed dropdown values
const ecOptions = [15, 30]
const nfqlOptions = [5, 6]

// Handle create module
const handleCreate = async () => {
  if (!confirm('Are you sure you want to create this module?')) return

  try {
    // Backend verwacht teacher en course als ObjectId references
    const payload: CreateModuleDTO = {
      name: newModule.value.name,
      ec: newModule.value.ec,
      nlqf: newModule.value.nlqf,
      description: newModule.value.description,
      courseId: newModule.value.courseId,
      teacherId: newModule.value.teacherId,
    }
    const module = await createModule(payload)
    alert('Module created successfully!')

    window.location.href = '/modules/' + module.id
  } catch (err) {
    console.error(err)
    alert('Failed to create module')
  }
}
</script>

<template>
  <div class="container mt-4">
    <h1>Create Module</h1>
    <form @submit.prevent="handleCreate">
      <!-- Module Name -->
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          v-model="newModule.name"
          type="text"
          class="form-control"
          id="name"
          name="name"
          required
          autocomplete="off"
        />
      </div>

      <!-- EC -->
      <div class="mb-3">
        <label for="ec" class="form-label">EC</label>
        <select v-model.number="newModule.ec" id="ec" name="ec" class="form-select" required>
          <option v-for="ec in ecOptions" :key="ec" :value="ec">{{ ec }}</option>
        </select>
      </div>

      <!-- NLQF -->
      <div class="mb-3">
        <label for="nlqf" class="form-label">NLQF</label>
        <select v-model.number="newModule.nlqf" id="nlqf" name="nlqf" class="form-select" required>
          <option v-for="n in nfqlOptions" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>

      <!-- Description -->
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          v-model="newModule.description"
          id="description"
          name="description"
          class="form-control"
          rows="3"
          autocomplete="off"
        ></textarea>
      </div>

      <!-- Course -->
      <div class="mb-3">
        <label for="course" class="form-label">Course</label>
        <select v-model="selectedCourseId" id="course" name="course" class="form-select" required>
          <option value="">Select a course</option>
          <option v-for="c in courses" :key="c.id" :value="c.id">{{ c.name }}</option>
        </select>
      </div>

      <!-- Teacher -->
      <div class="mb-3">
        <label for="teacher" class="form-label">Teacher</label>
        <select
          v-model="selectedTeacherId"
          id="teacher"
          name="teacher"
          class="form-select"
          required
          :disabled="!selectedCourseId"
        >
          <option value="">Select a teacher</option>
          <option v-for="t in filteredTeachers" :key="t.id" :value="t.id">
            {{ t.name }}
          </option>
        </select>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary">Create Module</button>
    </form>
  </div>
</template>
