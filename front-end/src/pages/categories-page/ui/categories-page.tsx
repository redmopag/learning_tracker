import { CreateCategoryForm } from '@/features/create-category'
import { useAppSelector } from '@/shared/lib/hooks'
import { CategoryList } from '@/widgets/category-list'

export function CategoriesPage() {
  const categories = useAppSelector(state => state.categories.items)
  const status = useAppSelector(state => state.categories.status)

  return (
    <div className="page-shell stack">
      <section className="hero compact-hero">
        <h1>Категории</h1>
        <p className="hero-copy">
          Здесь вы можете управлять своими категориями.
        </p>
      </section>

      <CreateCategoryForm />

      {status === 'loading' && <div className="panel">Загрузка...</div>}

      {status === 'success' && <CategoryList categories={categories} />}

      {status === 'error' && <div className="panel">Ошибка загрузки категорий.</div>}
    </div>
  )
}
