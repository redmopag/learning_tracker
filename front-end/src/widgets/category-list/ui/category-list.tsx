import type { Category } from '@/entities/category'
import { deleteCategory, updateCategory } from '@/entities/category'
import { useAppDispatch } from '@/shared/lib/hooks'
import { useState } from 'react'
import styles from './category-list.module.css'

interface CategoryListProps {
  categories: Category[]
}

export function CategoryList({ categories }: CategoryListProps) {
  const dispatch = useAppDispatch()
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)
  const [editedName, setEditedName] = useState('')

  const handleEdit = (category: Category) => {
    setEditingCategoryId(category.id)
    setEditedName(category.name)
  }

  const handleSave = (id: string) => {
    if (!editedName.trim()) return
    dispatch(updateCategory({ id, name: editedName }))
    setEditingCategoryId(null)
  }

  const handleCancel = () => {
    setEditingCategoryId(null)
  }

  return (
    <div className={styles.stack}>
      {categories.map(category => (
        <div key={category.id} className={`${styles.panel} ${styles.sectionHeading}`}>
          {editingCategoryId === category.id ? (
            <div className={styles.stackRow}>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSave(category.id)}
                autoFocus
                className={styles.input}
              />
              <div className={styles.cardActions}>
                <button className={`${styles.button} ${styles.buttonAccent}`} onClick={() => handleSave(category.id)}>Сохранить</button>
                <button className={styles.buttonGhost} onClick={handleCancel}>Отмена</button>
              </div>
            </div>
          ) : (
            <>
              <h4>{category.name}</h4>
              <div className={styles.cardActions}>
                <button className={`${styles.button} ${styles.buttonAccent}`} onClick={() => handleEdit(category)}>
                  Редактировать
                </button>
                <button
                  className={styles.buttonGhost}
                  onClick={() => dispatch(deleteCategory(category.id))}
                >
                  Удалить
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
