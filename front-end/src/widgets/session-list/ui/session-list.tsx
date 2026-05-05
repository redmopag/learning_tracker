import { LearningSession, deleteLearningSession } from '@/entities/learning-session'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { useMemo } from 'react'

interface SessionListProps {
  sessions: LearningSession[]
}

export function SessionList({ sessions }: SessionListProps) {
  const dispatch = useAppDispatch()
  const courses = useAppSelector(state => state.courses.items)
  const books = useAppSelector(state => state.books.items)

  const items = useMemo(() => {
    return sessions.map(session => {
      const relatedItem = session.type === 'course'
        ? courses.find(c => c.id === session.relatedItemId)
        : books.find(b => b.id === session.relatedItemId)
      
      return {
        ...session,
        relatedItemName: relatedItem?.title ?? 'Неизвестно',
      }
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [sessions, courses, books])

  return (
    <div className="stack">
      {items.map(session => (
        <div key={session.id} className="panel section-heading">
          <div>
            <p className="muted">{new Date(session.date).toLocaleDateString('ru-RU')}</p>
            <h4>{session.relatedItemName}</h4>
          </div>
          <div className='card-actions'>
            <span className="badge">{session.duration} мин.</span>
            <button 
              className="button-ghost"
              onClick={() => dispatch(deleteLearningSession(session.id))}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
