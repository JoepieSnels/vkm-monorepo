<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getModules } from '@/services/modules.service'
import type { ModuleEntity } from '@shared/Domain/entities/module.domain.ts'

const modules = ref<ModuleEntity[]>([])

onMounted(async () => {
  modules.value = await getModules()
  console.log(modules.value)
})
</script>

<template>
  <div>
    <h1>Modules</h1>
    <ul>
      <li v-for="module in modules" :key="module.id">{{ module.name }} - {{ module.ec }} EC</li>
      <p v-if="modules.length === 0">no modules</p>
    </ul>
  </div>
</template>
