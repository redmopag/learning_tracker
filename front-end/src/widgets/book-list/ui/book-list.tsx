import { Book, deleteBook, updateBook } from '@/entities/book'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { useState } from 'react'

interface BookListProps {
  books: Book[]
}

export function BookList({ books }: BookListProps) {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(state => state.categories.items)
  const [editingBookId, setEditingBookId] = useState<string | null>(null)

  const getCategoryName = (categoryId: string | null) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Без категории'
  }

  return (
    <div className="stack">
      {books.map(book => {
        const progress = Math.round((book.currentStep / book.totalSteps) * 100)
        return (
          <div key={book.id} className="panel stack">
            <div className="section-heading">
              <h3>{book.title}</h3>
              <span className="badge">{book.status}</span>
            </div>

            {editingBookId === book.id ? (
              <select
                className="input"
                value={book.categoryId ?? ''}
                onChange={(e) => {
                  dispatch(updateBook({ id: book.id, categoryId: e.target.value || null }))
                  setEditingBookId(null)
                }}
              >
                <option value="">Без категории</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            ) : (
              <p className="muted" onClick={() => setEditingBookId(book.id)}>
                {book.author} | {getCategoryName(book.categoryId)} ✎
              </p>
            )}

            {book.url && <a href={book.url} target="_blank" rel="noopener noreferrer" className="link-button">Перейти к книге</a>}
            
            <div>
              <span>Прогресс: {progress}%</span>
              <input 
                type="range" 
                min="0" 
                max={book.totalSteps} 
                value={book.currentStep}
                onChange={(e) => dispatch(updateBook({ id: book.id, currentStep: Number(e.target.value) }))}
              />
              <span>{book.currentStep} / {book.totalSteps} глав</span>
            </div>

            <div className="card-actions">
              <button 
                className="button button-accent"
                onClick={() => dispatch(updateBook({ id: book.id, status: 'in_progress' }))}
              >
                Начать читать
              </button>
              <button 
                className="button button-accent"
                onClick={() => dispatch(updateBook({ id: book.id, status: 'completed', currentStep: book.totalSteps }))}
              >
                Прочитано
              </button>
              <button 
                className="button-ghost"
                onClick={() => dispatch(deleteBook(book.id))}
              >
                Удалить
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
