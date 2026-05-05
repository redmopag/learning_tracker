import type { Course } from '../model/types'
import { makeRequest } from '@/shared/api/make-request'

const endpoint = '/api/courses'

type CourseDto = Omit<Course, 'id'>

export const courseApiService = {
  fetchCourses(): Promise<Course[]> {
    return makeRequest<Course[]>({
      url: endpoint,
    })
  },

  createCourse(payload: CourseDto): Promise<Course> {
    return makeRequest<Course>({
      url: endpoint,
      method: 'POST',
      data: payload,
    })
  },

  updateCourse(payload: Partial<CourseDto> & { id: string }): Promise<Course> {
    return makeRequest<Course>({
      url: `${endpoint}/${payload.id}`,
      method: 'PATCH',
      data: payload,
    })
  },

  async deleteCourse(id: string): Promise<string> {
    await makeRequest<void>({
      url: `${endpoint}/${id}`,
      method: 'DELETE',
    })
    return id
  },
}
