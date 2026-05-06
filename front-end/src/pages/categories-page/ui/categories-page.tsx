import { useCategories } from '@/entities/category'
import { CreateCategoryForm } from '@/features/create-category'
import { CategoryList } from '@/widgets/category-list'
import styles from './categories-page.module.css'

export function CategoriesPage() {
  const { categories, status } = useCategories()

  return (
    <div className={`${styles.pageShell} ${styles.stack}`}>
      <section className={`${styles.hero} ${styles.compactHero}`}>
        <h1>Категории</h1>
        <p className={styles.heroCopy}>
          Здесь вы можете управлять своими категориями.
        </p>
      </section>

      <CreateCategoryForm />

      {status === 'loading' && <div className={styles.panel}>Загрузка...</div>}

      {status === 'success' && <CategoryList categories={categories} />}

      {status === 'error' && <div className={styles.panel}>Ошибка загрузки категорий.</div>}
    </div>
  )
}
