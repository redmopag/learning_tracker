import { useGoals } from '@/entities/goal'
import { CreateGoalForm } from '@/features/create-goal'
import { GoalList } from '@/widgets/goal-list'
import styles from './goals-page.module.css'

export function GoalsPage() {
  const { goals, status } = useGoals()

  return (
    <div className={`${styles.pageShell} ${styles.stack}`}>
      <section className={`${styles.hero} ${styles.compactHero}`}>
        <h1>Цели</h1>
        <p className={styles.heroCopy}>Ставьте и отслеживайте свои цели в обучении.</p>
      </section>

      <CreateGoalForm />

      {status === 'loading' && <div className={styles.panel}>Загрузка...</div>}

      {status === 'success' && <GoalList goals={goals} />}

      {status === 'error' && <div className={styles.panel}>Ошибка загрузки целей.</div>}
    </div>
  )
}
