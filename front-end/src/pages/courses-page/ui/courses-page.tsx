import { useCourses } from '@/entities/course'
import { CreateCourseForm } from '@/features/create-course'
import { CourseList } from '@/widgets/course-list'
import styles from './courses-page.module.css'

export function CoursesPage() {
  const { courses, status } = useCourses()

  return (
    <div className={`${styles.pageShell} ${styles.stack}`}>
      <section className={`${styles.hero} ${styles.compactHero}`}>
        <h1>Курсы</h1>
        <p className={styles.heroCopy}>
          Здесь вы можете управлять своими учебными курсами.
        </p>
      </section>

      <CreateCourseForm />
      
      {status === 'loading' && <div className={styles.panel}>Загрузка...</div>}
      
      {status === 'success' && <CourseList courses={courses} />}

      {status === 'error' && <div className={styles.panel}>Ошибка загрузки курсов.</div>}
    </div>
  )
}
