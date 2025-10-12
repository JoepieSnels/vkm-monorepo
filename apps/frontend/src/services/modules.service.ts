import axios from 'axios'
import { ModuleEntity } from '@shared/Domain/entities/module.domain'

const API_URL = 'http://localhost:3000/modules'

export async function getModules(): Promise<ModuleEntity[]> {
  const response = await axios.get(API_URL)
  return response.data
}

export async function getModuleById(id: string): Promise<ModuleEntity> {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}

export async function createModule(module: Partial<ModuleEntity>): Promise<ModuleEntity> {
  const response = await axios.post(API_URL, module)
  return response.data
}
export async function getModulesByEc(ec: string): Promise<ModuleEntity[]> {
  const response = await axios.get(`${API_URL}/ec/${ec}`)
  return response.data
}
export async function getAllThemes(): Promise<string[]> {
  const response = await axios.get(`${API_URL}/theme`)
  return response.data
}
export async function getModulesByTheme(theme: string): Promise<ModuleEntity[]> {
  const response = await axios.get(`${API_URL}/theme/${theme}`)
  return response.data
}
