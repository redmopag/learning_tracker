import { useAppSelector } from '@/shared/lib/hooks'
import { CreateGoalForm } from '@/features/create-goal'
import { GoalList } from '@/widgets/goal-list'

export function GoalsPage() {
  const goals = useAppSelector(state => state.goals.items)
  const status = useAppSelector(state => state.goals.status)

  return (
    <div className="page-shell stack">
      <section className="hero compact-hero">
        <h1>Цели</h1>
        <p className="hero-copy">
          Ставьте и отслеживайте свои цели в обучении.
        </p>
      </section>

      <CreateGoalForm />
      
      {status === 'loading' && <div className="panel">Загрузка...</div>}
      
      {status === 'success' && <GoalList goals={goals} />}

      {status === 'error' && <div className="panel">Ошибка загрузки целей.</div>}
    </div>
  )
}
