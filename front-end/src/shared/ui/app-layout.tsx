import { Link, Outlet } from '@tanstack/react-router'
import { APP_NAME, ROUTES } from '@/shared/config'
import styles from './app-layout.module.css'

export function AppLayout() {
  return (
    <div className={styles.appShell}>
      <aside className={styles.sidebar}>
        <div>
          <p className={styles.eyebrow}>
            Keep learning
          </p>
          <span className={styles.brand}>
            {APP_NAME}
          </span>
        </div>
        <nav className={styles.nav}>
          <Link
            activeOptions={{ exact: true }}
            activeProps={{ className: styles.active }}
            className={styles.navLink}
            to={ROUTES.dashboard}
          >
            Дашборд
          </Link>
          <Link
            activeProps={{ className: styles.active }}
            className={styles.navLink}
            to={ROUTES.courses}
          >
            Курсы
          </Link>
          <Link
            activeProps={{ className: styles.active }}
            className={styles.navLink}
            to={ROUTES.books}
          >
            Книги
          </Link>
          <Link
            activeProps={{ className: styles.active }}
            className={styles.navLink}
            to={ROUTES.sessions}
          >
            Сессии
          </Link>
          <Link
            activeProps={{ className: styles.active }}
            className={styles.navLink}
            to={ROUTES.goals}
          >
            Цели
          </Link>
          <Link
            activeProps={{ className: styles.active }}
            className={styles.navLink}
            to={ROUTES.categories}
          >
            Категории
          </Link>
        </nav>
      </aside>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}
