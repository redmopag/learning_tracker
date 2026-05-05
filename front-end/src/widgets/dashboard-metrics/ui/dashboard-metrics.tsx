import { useAppSelector } from '@/shared/lib/hooks'
import { useMemo } from 'react'

export function DashboardMetrics() {
  const courses = useAppSelector(state => state.courses.items)
  const books = useAppSelector(state => state.books.items)
  const learningSessions = useAppSelector(state => state.learningSessions.items)
  const categories = useAppSelector(state => state.categories.items)

  const stats = useMemo(() => {
    const totalMinutes = learningSessions.reduce((sum, s) => sum + s.duration, 0)
    const totalHours = (totalMinutes / 60).toFixed(1)

    const completedCourses = courses.filter(c => c.status === 'completed').length
    const completedBooks = books.filter(b => b.status === 'completed').length

    const timeByCategory = categories.map(category => {
      const categoryCourses = courses.filter(c => c.categoryId === category.id)
      const categoryBooks = books.filter(b => b.categoryId === category.id)
      const categoryItems = [...categoryCourses, ...categoryBooks].map(it => it.id)
      
      const categoryMinutes = learningSessions
        .filter(s => categoryItems.includes(s.relatedItemId))
        .reduce((sum, s) => sum + s.duration, 0)

      return {
        name: category.name,
        hours: (categoryMinutes / 60).toFixed(1),
      }
    }).filter(cat => Number(cat.hours) > 0)

    return { totalHours, completedCourses, completedBooks, timeByCategory }
  }, [courses, books, learningSessions, categories])

  return (
    <div className="panel stack">
      <h2>Статистика</h2>
      <div className="collection-grid">
          <div className="panel">
            <h3>Общее время</h3>
            <p className="hero-copy">{stats.totalHours} ч.</p>
          </div>
          <div className="panel">
            <h3>Курсы завершены</h3>
            <p className="hero-copy">{stats.completedCourses}</p>
          </div>
          <div className="panel">
            <h3>Книги прочитаны</h3>
            <p className="hero-copy">{stats.completedBooks}</p>
          </div>
      </div>

      <h3>Время по категориям</h3>
      {stats.timeByCategory.length > 0 ? (
        <div className="collection-grid">
          {stats.timeByCategory.map(cat => (
            <div className="panel" key={cat.name}>
              <h4>{cat.name}</h4>
              <p className="hero-copy">{cat.hours} ч.</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="muted">Нет данных по категориям.</p>
      )}
    </div>
  )
}
