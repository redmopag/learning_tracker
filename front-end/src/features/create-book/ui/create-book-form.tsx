import { useState } from 'react'
import { createBook, Book } from '@/entities/book'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'

export function CreateBookForm() {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(state => state.categories.items)
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
    dispatch(createBook(newBook))

    // Reset form
    setTitle('')
    setAuthor('')
    setUrl('')
    setTotalSteps(10)
    setCategoryId(null)
  }

  return (
    <form onSubmit={handleSubmit} className="panel stack">
      <h3>Добавить новую книгу</h3>
      <label className="field">
        <span>Название</span>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label className="field">
        <span>Автор</span>
        <input
          className="input"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>
      <label className="field">
        <span>URL</span>
        <input
          className="input"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      <label className="field">
        <span>Всего глав/разделов</span>
        <input
          className="input"
          type="number"
          value={totalSteps}
          onChange={(e) => setTotalSteps(Number(e.target.value))}
          required
          min="1"
        />
      </label>
      <label className="field">
        <span>Категория</span>
        <select
          className="input"
          value={categoryId ?? ''}
          onChange={(e) => setCategoryId(e.target.value || null)}
        >
          <option value="">Без категории</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </label>
      <button type="submit" className="button button-accent">Добавить книгу</button>
    </form>
  )
}
