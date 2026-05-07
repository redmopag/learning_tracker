import { useBooks } from '@/entities/book'
import { CreateBookForm } from '@/features/create-book'
import { BookList } from '@/widgets/book-list'
import styles from './books-page.module.css'

export function BooksPage() {
  const { books, status } = useBooks()

  return (
    <div className={`${styles.pageShell} ${styles.stack}`}>
      <section className={`${styles.hero} ${styles.compactHero}`}>
        <h1>Книги</h1>
        <p className={styles.heroCopy}>Здесь вы можете управлять своими книгами для чтения.</p>
      </section>

      <CreateBookForm />

      {status === 'loading' && <div className={styles.panel}>Загрузка...</div>}

      {status === 'success' && <BookList books={books} />}

      {status === 'error' && <div className={styles.panel}>Ошибка загрузки книг.</div>}
    </div>
  )
}
