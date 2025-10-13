<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getModules } from '@/services/modules.service'
import type { ModuleEntity } from '@shared/Domain/entities/module.domain'
import { getCourses } from '@/services/courses.service'

// Data
const allModules = ref<ModuleEntity[]>([])
const themes = ref<string[]>([])

// Filters
const selectedEc = ref<number | null>(null)
const selectedCourse = ref<string | null>(null)
const selectedNfql = ref<number | null>(null)
const searchQuery = ref('')

// Modules en courses laden bij opstart
onMounted(async () => {
  allModules.value = await getModules()
  const courses = await getCourses()
  themes.value = courses.map((c) => c.name).sort()
})

// Computed: automatisch filteren van modules
const modules = computed(() => {
  const query = searchQuery.value.toLowerCase()
  const course = selectedCourse.value?.toLowerCase() || null

  return allModules.value.filter((m) => {
    const matchEc = selectedEc.value ? m.ec === selectedEc.value : true
    const matchCourse = course ? m.course?.name.toLowerCase() === course : true
    const matchNfql = selectedNfql.value ? m.nlqf === selectedNfql.value : true
    const matchSearch = m.name.toLowerCase().includes(query)
    return matchEc && matchCourse && matchNfql && matchSearch
  })
})
</script>

<template>
  <div class="container mt-4">
    <h1 class="mb-3">Modules</h1>

    <!-- Filters -->
    <div class="d-flex gap-3 mb-3 flex-wrap">
      <select v-model.number="selectedEc" class="form-select" style="width: 150px">
        <option :value="null">Every EC’s</option>
        <option :value="15">15 EC</option>
        <option :value="30">30 EC</option>
      </select>

      <select v-model="selectedCourse" class="form-select" style="width: 200px">
        <option :value="null">Every Course</option>
        <option v-for="course in themes" :key="course" :value="course">{{ course }}</option>
      </select>

      <select v-model="selectedNfql" class="form-select" style="width: 200px">
        <option :value="null">Every NFQL</option>
        <option :value="5">NLQF5</option>
        <option :value="6">NLQF6</option>
      </select>

      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="Zoek op naam"
        style="max-width: 300px"
      />
    </div>

    <!-- Module lijst -->
    <div class="row g-3">
      <div v-for="module in modules" :key="module.id" class="col-md-6 col-lg-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">{{ module.name }}</h5>
            <p class="card-text">{{ module.description }}</p>

            <div><strong>NFQL:</strong> NLQF{{ module.nlqf }}</div>
            <div v-if="module.course">
              <strong>Module Course:</strong> {{ module.course.name }} ({{
                module.course.location
              }})
            </div>

            <div v-if="module.teacher">
              <strong>Teacher:</strong> {{ module.teacher.name }} - {{ module.teacher.email }}
              <div v-if="module.teacher.course">
                <em>Teacher's Course:</em> {{ module.teacher.course.name }} ({{
                  module.teacher.course.location
                }})
              </div>
            </div>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <span class="badge bg-info text-dark">{{ module.ec }} EC</span>
            <small class="text-muted">{{ module.course?.name }}</small>
          </div>
        </div>
      </div>

      <div v-if="modules.length === 0" class="text-muted">Geen modules gevonden</div>
    </div>
  </div>
</template>
