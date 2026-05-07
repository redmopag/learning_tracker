import { useLearningSessions } from '@/entities/learning-session'
import { LogSessionForm } from '@/features/log-session'
import { SessionList } from '@/widgets/session-list'
import styles from './sessions-page.module.css'

export function SessionsPage() {
  const { learningSessions: sessions, status } = useLearningSessions()

  return (
    <div className={`${styles.pageShell} ${styles.stack}`}>
      <section className={`${styles.hero} ${styles.compactHero}`}>
        <h1>Сессии обучения</h1>
        <p className={styles.heroCopy}>
          Здесь вы можете отслеживать время, потраченное на обучение.
        </p>
      </section>

      <LogSessionForm />

      {status === 'loading' && <div className={styles.panel}>Загрузка...</div>}

      {status === 'success' && <SessionList sessions={sessions} />}

      {status === 'error' && <div className={styles.panel}>Ошибка загрузки сессий.</div>}
    </div>
  )
}
