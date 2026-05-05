import { useEffect } from 'react'
import { AppRouter } from '@/app/router'
import { fetchBooks } from '@/entities/book'
import { fetchCategories } from '@/entities/category'
import { fetchCourses } from '@/entities/course'
import { fetchGoals } from '@/entities/goal'
import { fetchLearningSessions } from '@/entities/learning-session'
import { useAppDispatch } from '@/shared/lib/hooks'


export function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchBooks())
    dispatch(fetchCategories())
    dispatch(fetchCourses())
    dispatch(fetchGoals())
    dispatch(fetchLearningSessions())
  }, [dispatch])

  return <AppRouter />
}
