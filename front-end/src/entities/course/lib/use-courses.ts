import { useCallback, useEffect } from 'react'
import {
  createCourse,
  deleteCourse,
  fetchCourses,
  updateCourse,
} from '@/entities/course/model/course-slice'
import type { Course } from '@/entities/course/model/types'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'

export function useCourses() {
  const dispatch = useAppDispatch()

  const courses = useAppSelector(state => state.courses.items)
  const status = useAppSelector(state => state.courses.status)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCourses())
    }
  }, [status, dispatch])

  const handleCreateCourse = useCallback(
    (course: Omit<Course, 'id'>) => {
      return dispatch(createCourse(course)).unwrap()
    },
    [dispatch],
  )

  const handleUpdateCourse = useCallback(
    (course: Partial<Course> & { id: string }) => {
      return dispatch(updateCourse(course)).unwrap()
    },
    [dispatch],
  )

  const handleDeleteCourse = useCallback(
    (id: string) => {
      return dispatch(deleteCourse(id)).unwrap()
    },
    [dispatch],
  )

  return {
    courses,
    status,
    createCourse: handleCreateCourse,
    updateCourse: handleUpdateCourse,
    deleteCourse: handleDeleteCourse,
  }
}
