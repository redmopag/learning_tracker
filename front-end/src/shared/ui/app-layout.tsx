import { Link, Outlet } from '@tanstack/react-router'
import { APP_NAME, ROUTES } from '@/shared/config'

export function AppLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">
            Keep learning
          </p>
          <span className="brand">
            {APP_NAME}
          </span>
        </div>
        <nav className="nav">
          <Link
            activeOptions={{ exact: true }}
            activeProps={{ className: 'nav-link active' }}
            className="nav-link"
            to={ROUTES.dashboard}
          >
            Дашборд
          </Link>
          <Link
            activeProps={{ className: 'nav-link active' }}
            className="nav-link"
            to={ROUTES.courses}
          >
            Курсы
          </Link>
          <Link
            activeProps={{ className: 'nav-link active' }}
            className="nav-link"
            to={ROUTES.books}
          >
            Книги
          </Link>
          <Link
            activeProps={{ className: 'nav-link active' }}
            className="nav-link"
            to={ROUTES.sessions}
          >
            Сессии
          </Link>
          <Link
            activeProps={{ className: 'nav-link active' }}
            className="nav-link"
            to={ROUTES.goals}
          >
            Цели
          </Link>
        </nav>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}
