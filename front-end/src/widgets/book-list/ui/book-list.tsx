import { Book, useBooks } from '@/entities/book'
import { useCategories } from '@/entities/category'
import { useState } from 'react'
import styles from './book-list.module.css'

interface BookListProps {
  books: Book[]
}

export function BookList({ books }: BookListProps) {
  const { updateBook, deleteBook } = useBooks()
  const { categories } = useCategories()
  const [editingBookId, setEditingBookId] = useState<string | null>(null)

  const getCategoryName = (categoryId: string | null) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Без категории'
  }

  return (
    <div className={styles.stack}>
      {books.map(book => {
        const progress = Math.round((book.currentStep / book.totalSteps) * 100)
        return (
          <div key={book.id} className={`${styles.panel} ${styles.stack}`}>
            <div className={styles.sectionHeading}>
              <h3>{book.title}</h3>
              <span className={styles.badge}>{book.status}</span>
            </div>

            {editingBookId === book.id ? (
              <select
                className={styles.input}
                value={book.categoryId ?? ''}
                onChange={(e) => {
                  updateBook({ id: book.id, categoryId: e.target.value || null })
                  setEditingBookId(null)
                }}
              >
                <option value="">Без категории</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            ) : (
              <p className={styles.muted} onClick={() => setEditingBookId(book.id)}>
                {book.author} | {getCategoryName(book.categoryId)} ✎
              </p>
            )}

            {book.url && <a href={book.url} target="_blank" rel="noopener noreferrer" className={styles.linkButton}>Перейти к книге</a>}
            
            <div>
              <span>Прогресс: {progress}%</span>
              <input 
                type="range" 
                min="0" 
                max={book.totalSteps} 
                value={book.currentStep}
                onChange={(e) => updateBook({ id: book.id, currentStep: Number(e.target.value) })}
              />
              <span>{book.currentStep} / {book.totalSteps} глав</span>
            </div>

            <div className={styles.cardActions}>
              <button 
                className={`${styles.button} ${styles.buttonAccent}`}
                onClick={() => updateBook({ id: book.id, status: 'in_progress' })}
              >
                Начать читать
              </button>
              <button 
                className={`${styles.button} ${styles.buttonAccent}`}
                onClick={() => updateBook({ id: book.id, status: 'completed', currentStep: book.totalSteps })}
              >
                Прочитано
              </button>
              <button 
                className={styles.buttonGhost}
                onClick={() => deleteBook(book.id)}
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
