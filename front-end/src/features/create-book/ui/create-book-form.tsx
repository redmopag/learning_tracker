import { useState } from 'react'
import { useBooks, Book } from '@/entities/book'
import { useCategories } from '@/entities/category'
import styles from './create-book-form.module.css'

export function CreateBookForm() {
  const { createBook } = useBooks()
  const { categories } = useCategories()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [totalSteps, setTotalSteps] = useState(10)
  const [categoryId, setCategoryId] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !totalSteps) return

    const newBook: Omit<Book, 'id'> = {
      title,
      author,
      url,
      categoryId,
      status: 'planned',
      totalSteps,
      currentStep: 0,
    }
    createBook(newBook)

    // Reset form
    setTitle('')
    setAuthor('')
    setUrl('')
    setTotalSteps(10)
    setCategoryId(null)
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.panel} ${styles.stack}`}>
      <h3>Добавить новую книгу</h3>
      <label className={styles.field}>
        <span>Название</span>
        <input
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label className={styles.field}>
        <span>Автор</span>
        <input
          className={styles.input}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>
      <label className={styles.field}>
        <span>URL</span>
        <input
          className={styles.input}
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      <label className={styles.field}>
        <span>Всего глав/разделов</span>
        <input
          className={styles.input}
          type="number"
          value={totalSteps}
          onChange={(e) => setTotalSteps(Number(e.target.value))}
          required
          min="1"
        />
      </label>
      <label className={styles.field}>
        <span>Категория</span>
        <select
          className={styles.input}
          value={categoryId ?? ''}
          onChange={(e) => setCategoryId(e.target.value || null)}
        >
          <option value="">Без категории</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className={`${styles.button} ${styles.buttonAccent}`}>
        Добавить книгу
      </button>
    </form>
  )
}
