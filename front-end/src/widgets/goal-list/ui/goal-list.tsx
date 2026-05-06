import { Goal, deleteGoal } from '@/entities/goal'
import { useAppDispatch } from '@/shared/lib/hooks'
import styles from './goal-list.module.css'

interface GoalListProps {
  goals: Goal[]
}

export function GoalList({ goals }: GoalListProps) {
  const dispatch = useAppDispatch()

  return (
    <div className={styles.stack}>
      {goals.map(goal => (
        <div key={goal.id} className={`${styles.panel} ${styles.stack}`}>
          <div className={styles.sectionHeading}>
            <h3>{goal.title}</h3>
            {goal.deadline && <span className={styles.badge}>до {new Date(goal.deadline).toLocaleDateString('ru-RU')}</span>}
          </div>
          {goal.description && <p className={styles.muted}>{goal.description}</p>}
          
          <div className={styles.cardActions}>
            <button 
              className={styles.buttonGhost}
              onClick={() => dispatch(deleteGoal(goal.id))}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
