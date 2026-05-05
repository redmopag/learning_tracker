import { useState } from 'react'
import { createLearningSession, LearningSession } from '@/entities/learning-session'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'

export function LogSessionForm() {
  const dispatch = useAppDispatch()
  const courses = useAppSelector(state => state.courses.items)
  const books = useAppSelector(state => state.books.items)
  
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
    dispatch(createLearningSession(newSession))

    // Reset form
    setDuration(30)
    setRelatedItemId('')
  }

  return (
    <form onSubmit={handleSubmit} className="panel stack">
      <h3>Записать сессию обучения</h3>
      <label className="field">
        <span>Продолжительность (в минутах)</span>
        <input
          className="input"
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          required
          min="1"
        />
      </label>
      <label className="field">
        <span>Курс или книга</span>
        <select
          className="input"
          value={relatedItemId}
          onChange={(e) => setRelatedItemId(e.target.value)}
          required
        >
          <option value="" disabled>Выберите...</option>
          <optgroup label="Курсы">
            {courses.map(course => (
              <option key={`course:${course.id}`} value={`course:${course.id}`}>{course.title}</option>
            ))}
          </optgroup>
          <optgroup label="Книги">
            {books.map(book => (
              <option key={`book:${book.id}`} value={`book:${book.id}`}>{book.title}</option>
            ))}
          </optgroup>
        </select>
      </label>
      <button type="submit" className="button button-accent">Записать</button>
    </form>
  )
}
