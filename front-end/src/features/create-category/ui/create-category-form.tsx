import { useCategories } from '@/entities/category'
import { useState } from 'react'
import styles from './create-category-form.module.css'

export function CreateCategoryForm() {
  const { createCategory } = useCategories()
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    createCategory({ name })
    setName('')
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.panel} ${styles.stack}`}>
      <h3>Добавить новую категорию</h3>
      <label className={styles.field}>
        <span>Название</span>
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <button type="submit" className={`${styles.button} ${styles.buttonAccent}`}>Добавить категорию</button>
    </form>
  )
}
