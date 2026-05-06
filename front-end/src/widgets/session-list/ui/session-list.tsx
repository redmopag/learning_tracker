import { LearningSession, deleteLearningSession } from '@/entities/learning-session'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { useMemo } from 'react'
import styles from './session-list.module.css'

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
    <div className={styles.stack}>
      {items.map(session => (
        <div key={session.id} className={`${styles.panel} ${styles.sectionHeading}`}>
          <div>
            <p className={styles.muted}>{new Date(session.date).toLocaleDateString('ru-RU')}</p>
            <h4>{session.relatedItemName}</h4>
          </div>
          <div className={styles.cardActions}>
            <span className={styles.badge}>{session.duration} мин.</span>
            <button 
              className={styles.buttonGhost}
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
