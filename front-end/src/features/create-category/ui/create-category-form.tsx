import { createCategory } from '@/entities/category'
import { useAppDispatch } from '@/shared/lib/hooks'
import { useState } from 'react'

export function CreateCategoryForm() {
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    dispatch(createCategory({ name }))
    setName('')
  }

  return (
    <form onSubmit={handleSubmit} className="panel stack">
      <h3>Добавить новую категорию</h3>
      <label className="field">
        <span>Название</span>
        <input
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="button button-accent">Добавить категорию</button>
    </form>
  )
}
