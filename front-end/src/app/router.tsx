import {
  createRootRoute,
  createRoute,
  createRouter,
  Navigate,
  RouterProvider,
} from '@tanstack/react-router'
import { BooksPage } from '@/pages/books-page'
import { CoursesPage } from '@/pages/courses-page'
import { DashboardPage } from '@/pages/dashboard-page'
import { GoalsPage } from '@/pages/goals-page'
import { SessionsPage } from '@/pages/sessions-page'
import { CategoriesPage } from '@/pages/categories-page'
import { ROUTES } from '@/shared/config'
import { AppLayout } from '@/shared/ui/app-layout'

const rootRoute = createRootRoute({
  component: AppLayout,
  notFoundComponent: () => <Navigate replace to={ROUTES.dashboard} />,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.dashboard,
  component: DashboardPage,
})

const coursesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.courses,
  component: CoursesPage,
})

const booksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.books,
  component: BooksPage,
})

const sessionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.sessions,
  component: SessionsPage,
})

const goalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.goals,
  component: GoalsPage,
})

// Add categoriesRoute
const categoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.categories,
  component: CategoriesPage,
})

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  coursesRoute,
  booksRoute,
  sessionsRoute,
  goalsRoute,
  categoriesRoute, // Add categoriesRoute to routeTree
])

export const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function AppRouter() {
  return <RouterProvider router={router} />
}
