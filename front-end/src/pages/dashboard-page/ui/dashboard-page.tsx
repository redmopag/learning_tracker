import { DashboardMetrics } from "@/widgets/dashboard-metrics";

export function DashboardPage() {
  return (
    <div className="page-shell stack">
      <section className="hero compact-hero">
        <h1>Дашборд</h1>
        <p className="hero-copy">
          Обзор вашего прогресса в обучении.
        </p>
      </section>
      <DashboardMetrics />
    </div>
  )
}
