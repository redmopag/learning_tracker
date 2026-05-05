import { useAppSelector } from '@/shared/lib/hooks'
import { CreateBookForm } from '@/features/create-book'
import { BookList } from '@/widgets/book-list'

export function BooksPage() {
  const books = useAppSelector(state => state.books.items)
  const status = useAppSelector(state => state.books.status)

  return (
    <div className="page-shell stack">
      <section className="hero compact-hero">
        <h1>Книги</h1>
        <p className="hero-copy">
          Здесь вы можете управлять своими книгами для чтения.
        </p>
      </section>

      <CreateBookForm />
      
      {status === 'loading' && <div className="panel">Загрузка...</div>}
      
      {status === 'success' && <BookList books={books} />}

      {status === 'error' && <div className="panel">Ошибка загрузки книг.</div>}
    </div>
  )
}
