import { Course, deleteCourse, updateCourse } from '@/entities/course'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'

interface CourseListProps {
  courses: Course[]
}

export function CourseList({ courses }: CourseListProps) {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(state => state.categories.items)

  const getCategoryName = (categoryId: string | null) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Без категории'
  }

  return (
    <div className="stack">
      {courses.map(course => {
        const progress = Math.round((course.currentStep / course.totalSteps) * 100)
        return (
          <div key={course.id} className="panel stack">
            <div className="section-heading">
              <h3>{course.title}</h3>
              <span className="badge">{course.status}</span>
            </div>
            <p className="muted">{getCategoryName(course.categoryId)}</p>
            {course.description && <p>{course.description}</p>}
            {course.url && <a href={course.url} target="_blank" rel="noopener noreferrer" className="link-button">Перейти к курсу</a>}
            
            <div>
              <span>Прогресс: {progress}%</span>
              <input 
                type="range" 
                min="0" 
                max={course.totalSteps} 
                value={course.currentStep}
                onChange={(e) => dispatch(updateCourse({ id: course.id, currentStep: Number(e.target.value) }))}
              />
              <span>{course.currentStep} / {course.totalSteps} шагов</span>
            </div>

            <div className="card-actions">
              <button 
                className="button"
                onClick={() => dispatch(updateCourse({ id: course.id, status: 'in_progress' }))}
              >
                Начать
              </button>
              <button 
                className="button"
                onClick={() => dispatch(updateCourse({ id: course.id, status: 'completed', currentStep: course.totalSteps }))}
              >
                Завершить
              </button>
              <button 
                className="button-ghost"
                onClick={() => dispatch(deleteCourse(course.id))}
              >
                Удалить
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
