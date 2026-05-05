import { Goal, deleteGoal } from '@/entities/goal'
import { useAppDispatch } from '@/shared/lib/hooks'

interface GoalListProps {
  goals: Goal[]
}

export function GoalList({ goals }: GoalListProps) {
  const dispatch = useAppDispatch()

  return (
    <div className="stack">
      {goals.map(goal => (
        <div key={goal.id} className="panel stack">
          <div className="section-heading">
            <h3>{goal.title}</h3>
            {goal.deadline && <span className="badge">до {new Date(goal.deadline).toLocaleDateString('ru-RU')}</span>}
          </div>
          {goal.description && <p className="muted">{goal.description}</p>}
          
          <div className="card-actions">
            <button 
              className="button-ghost"
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
