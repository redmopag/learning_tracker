import { DashboardMetrics } from '@/widgets/dashboard-metrics'
import styles from './dashboard-page.module.css'

export function DashboardPage() {
  return (
    <div className={`${styles.pageShell} ${styles.stack}`}>
      <section className={`${styles.hero} ${styles.compactHero}`}>
        <h1>Дашборд</h1>
        <p className={styles.heroCopy}>Обзор вашего прогресса в обучении.</p>
      </section>
      <DashboardMetrics />
    </div>
  )
}
