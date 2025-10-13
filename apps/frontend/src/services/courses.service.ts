import axios from 'axios'
import { CourseEntity } from '@shared/Domain/entities/course.domain'

const API_URL = 'http://localhost:3000/course'

export async function getCourses(): Promise<CourseEntity[]> {
  const response = await axios.get(API_URL)
  return response.data
}

export async function getCourseById(id: string): Promise<CourseEntity> {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}
