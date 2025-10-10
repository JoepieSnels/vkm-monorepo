<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getModules } from '../services/modules.service'
import type { ModuleEntity } from '@shared/Domain/entities/module.domain'

const modules = ref<ModuleEntity[]>([])

onMounted(async () => {
  modules.value = await getModules()
})
</script>

<template>
  <ul>
    <li v-for="module in modules" :key="module.id">{{ module.name }} ({{ module.ec }} EC)</li>
  </ul>
</template>
