<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getModules, getAllThemes } from '@/services/modules.service'
import type { ModuleEntity } from '@shared/Domain/entities/module.domain'

// Alle modules uit de database
const allModules = ref<ModuleEntity[]>([])
// De modules die we effectief tonen
const filteredModules = ref<ModuleEntity[]>([])
// Thema’s (dynamisch geladen)
const themes = ref<string[]>([])

// Filters
const selectedEc = ref<number | null>(null)
const selectedTheme = ref<string | null>(null)
const selectedNfql = ref<number | null>(null)
const searchQuery = ref('')

// Modules laden bij opstart
onMounted(async () => {
  allModules.value = await getModules()
  themes.value = await getAllThemes()
})

// Computed property: modules worden automatisch gefilterd
const modules = computed(() => {
  return allModules.value.filter((m) => {
    const matchEc = selectedEc.value ? m.ec === selectedEc.value : true
    const matchTheme = selectedTheme.value ? m.theme === selectedTheme.value : true
    const matchNfql = selectedNfql.value ? m.nlqf === selectedNfql.value : true

    const query = searchQuery.value.toLowerCase()
    const matchSearch = m.name.toLowerCase().includes(query)
    return matchEc && matchTheme && matchNfql && matchSearch
  })
})
</script>

<template>
  <div class="container mt-4">
    <h1 class="mb-3">Modules</h1>

    <!-- Filters -->
    <div class="d-flex gap-3 mb-3">
      <select v-model.number="selectedEc" class="form-select" style="width: 150px">
        <option :value="null">Alle EC’s</option>
        <option :value="15">15 EC</option>
        <option :value="30">30 EC</option>
      </select>

      <select v-model="selectedTheme" class="form-select" style="width: 200px">
        <option :value="null">Alle thema’s</option>
        <option v-for="theme in themes" :key="theme" :value="theme">
          {{ theme }}
        </option>
      </select>
      <select v-model="selectedNfql" class="form-select" style="width: 200px">
        <option :value="null">Alle NFQL</option>
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
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <span class="badge bg-info text-dark">{{ module.ec }} EC</span>
            <small class="text-muted">{{ module.theme }}</small>
          </div>
        </div>
      </div>

      <div v-if="modules.length === 0" class="text-muted">Geen modules gevonden</div>
    </div>
  </div>
</template>
