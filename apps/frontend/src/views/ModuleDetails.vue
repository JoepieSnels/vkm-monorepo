<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getModuleById, updateModule, deleteModule } from '@/services/modules.service'
import type { ModuleEntity } from '@shared/Domain/entities/module.domain'

const module = ref<ModuleEntity | null>(null)
const isEditing = ref(false)
const editableModule = ref<Partial<ModuleEntity>>({})

// Vastgestelde keuzelijsten
const ecOptions = [15, 30]
const nlqfOptions = [5, 6]

const toggleEdit = () => {
  if (!module.value) return
  if (!isEditing.value) {
    editableModule.value = { ...module.value }
  }
  isEditing.value = !isEditing.value
}

const handleSave = async () => {
  if (!editableModule.value.id) return

  // Stuur alleen IDs door voor relaties
  const payload = { ...editableModule.value }
  payload.course =
    (editableModule.value.course as any)?._id || (editableModule.value.course as any)?.id
  payload.teacher =
    (editableModule.value.teacher as any)?._id || (editableModule.value.teacher as any)?.id

  await updateModule(editableModule.value.id.toString(), payload)
  window.location.reload()
}

const handleDelete = async () => {
  if (!confirm('Are you sure you want to delete this module?')) return
  if (module.value?.id) {
    await deleteModule(module.value.id.toString())
    window.location.href = '/'
  }
}

onMounted(async () => {
  const route = useRoute()
  const moduleId = route.params.id?.toString() || ''
  module.value = await getModuleById(moduleId)
})
</script>

<template>
  <div v-if="module" class="container mt-4">
    <div class="row">
      <div class="card shadow-sm col-md-7 col-12">
        <!-- Name -->
        <h1 v-if="!isEditing">{{ module.name }}</h1>
        <input
          v-else
          v-model="editableModule.name"
          type="text"
          class="form-control mb-3"
          placeholder="Module name"
        />

        <!-- EC -->
        <p v-if="!isEditing"><strong>EC:</strong> {{ module.ec }}</p>
        <select v-else v-model.number="editableModule.ec" class="form-select mb-3">
          <option disabled value="">Select EC</option>
          <option v-for="ec in ecOptions" :key="ec" :value="ec">{{ ec }} EC</option>
        </select>

        <!-- NLQF -->
        <p v-if="!isEditing"><strong>NLQF:</strong> {{ module.nlqf }}</p>
        <select v-else v-model.number="editableModule.nlqf" class="form-select mb-3">
          <option disabled value="">Select NLQF</option>
          <option v-for="lvl in nlqfOptions" :key="lvl" :value="lvl">NLQF{{ lvl }}</option>
        </select>

        <!-- Description -->
        <p v-if="!isEditing"><strong>Description:</strong> {{ module.description }}</p>
        <textarea
          v-else
          v-model="editableModule.description"
          class="form-control mb-3"
          rows="3"
          placeholder="Description"
        ></textarea>
      </div>

      <div class="card shadow-sm col-md-4 col-12">
        <h2>Teacher</h2>
        <p><strong>Name:</strong> {{ module.teacher?.name || 'N/A' }}</p>
        <p><strong>Email:</strong> {{ module.teacher?.email || 'N/A' }}</p>
      </div>
    </div>

    <div class="row">
      <div class="card shadow-sm col-12">
        <h2>Course</h2>
        <p><strong>Name:</strong> {{ module.course?.name || 'N/A' }}</p>
        <p><strong>Location:</strong> {{ module.course?.location || 'N/A' }}</p>
      </div>
    </div>

    <!-- Buttons -->
    <div class="mt-3">
      <button v-if="!isEditing" class="btn btn-primary" @click="toggleEdit">Edit Module</button>

      <div v-else>
        <button class="btn btn-success" @click="handleSave">Save Changes</button>
        <button class="btn btn-secondary ms-2" @click="toggleEdit">Cancel</button>
      </div>

      <button class="btn btn-danger ms-2" @click="handleDelete">Delete Module</button>
    </div>
  </div>

  <div v-else class="alert alert-warning">Loading module details...</div>
</template>

<style scoped>
.card {
  padding: 20px;
  margin: 20px;
}
</style>
