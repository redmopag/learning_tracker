import { useAppSelector } from '@/shared/lib/hooks'
import { LogSessionForm } from '@/features/log-session'
import { SessionList } from '@/widgets/session-list'

export function SessionsPage() {
  const sessions = useAppSelector(state => state.learningSessions.items)
  const status = useAppSelector(state => state.learningSessions.status)

  return (
    <div className="page-shell stack">
      <section className="hero compact-hero">
        <h1>Сессии обучения</h1>
        <p className="hero-copy">
          Здесь вы можете отслеживать время, потраченное на обучение.
        </p>
      </section>

      <LogSessionForm />
      
      {status === 'loading' && <div className="panel">Загрузка...</div>}
      
      {status === 'success' && <SessionList sessions={sessions} />}

      {status === 'error' && <div className="panel">Ошибка загрузки сессий.</div>}
    </div>
  )
}
