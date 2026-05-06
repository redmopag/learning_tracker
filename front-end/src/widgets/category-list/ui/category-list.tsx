import type { Category } from '@/entities/category'
import { deleteCategory, updateCategory } from '@/entities/category'
import { useAppDispatch } from '@/shared/lib/hooks'
import { useState } from 'react'

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
    <div className="stack">
      {categories.map(category => (
        <div key={category.id} className="panel section-heading">
          {editingCategoryId === category.id ? (
            <div className="stack-row" style={{ width: '100%', justifyContent: 'space-between' }}>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSave(category.id)}
                autoFocus
                className="input"
              />
              <div className="card-actions">
                <button className="button button-accent" onClick={() => handleSave(category.id)}>Сохранить</button>
                <button className="button-ghost" onClick={handleCancel}>Отмена</button>
              </div>
            </div>
          ) : (
            <>
              <h4>{category.name}</h4>
              <div className="card-actions">
                <button className="button button-accent" onClick={() => handleEdit(category)}>
                  Редактировать
                </button>
                <button
                  className="button-ghost"
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
