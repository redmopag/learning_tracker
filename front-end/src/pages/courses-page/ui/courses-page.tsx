import { useAppSelector } from '@/shared/lib/hooks'
import { CreateCourseForm } from '@/features/create-course'
import { CourseList } from '@/widgets/course-list'

export function CoursesPage() {
  const courses = useAppSelector(state => state.courses.items)
  const status = useAppSelector(state => state.courses.status)

  return (
    <div className="page-shell stack">
      <section className="hero compact-hero">
        <h1>Курсы</h1>
        <p className="hero-copy">
          Здесь вы можете управлять своими учебными курсами.
        </p>
      </section>

      <CreateCourseForm />
      
      {status === 'loading' && <div className="panel">Загрузка...</div>}
      
      {status === 'success' && <CourseList courses={courses} />}

      {status === 'error' && <div className="panel">Ошибка загрузки курсов.</div>}
    </div>
  )
}
