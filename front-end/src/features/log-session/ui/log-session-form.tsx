import { useState } from 'react'
import { useBooks } from '@/entities/book'
import { useCourses } from '@/entities/course'
import { useLearningSessions, LearningSession } from '@/entities/learning-session'
import styles from './log-session-form.module.css'

export function LogSessionForm() {
  const { createLearningSession } = useLearningSessions()
  const { courses } = useCourses()
  const { books } = useBooks()

  const [duration, setDuration] = useState(30)
  const [relatedItemId, setRelatedItemId] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!duration || !relatedItemId) return

    const [type, id] = relatedItemId.split(':')

    const newSession: Omit<LearningSession, 'id'> = {
      date: new Date().toISOString(),
      duration,
      relatedItemId: id,
      type: type as 'course' | 'book',
    }
    createLearningSession(newSession)

    // Reset form
    setDuration(30)
    setRelatedItemId('')
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.panel} ${styles.stack}`}>
      <h3>Записать сессию обучения</h3>
      <label className={styles.field}>
        <span>Продолжительность (в минутах)</span>
        <input
          className={styles.input}
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          required
          min="1"
        />
      </label>
      <label className={styles.field}>
        <span>Курс или книга</span>
        <select
          className={styles.input}
          value={relatedItemId}
          onChange={(e) => setRelatedItemId(e.target.value)}
          required
        >
          <option value="" disabled>
            Выберите...
          </option>
          <optgroup label="Курсы">
            {courses.map((course) => (
              <option key={`course:${course.id}`} value={`course:${course.id}`}>
                {course.title}
              </option>
            ))}
          </optgroup>
          <optgroup label="Книги">
            {books.map((book) => (
              <option key={`book:${book.id}`} value={`book:${book.id}`}>
                {book.title}
              </option>
            ))}
          </optgroup>
        </select>
      </label>
      <button type="submit" className={`${styles.button} ${styles.buttonAccent}`}>
        Записать
      </button>
    </form>
  )
}
