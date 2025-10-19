import axios from 'axios'
import { TeacherEntity } from '@shared/Domain/entities/teacher.domain'

const API_URL = import.meta.env.VITE_API_URL + 'teachers'

export const getTeachers = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

export const getTeacherById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}
