import { useCallback, useEffect } from 'react'
import { createBook, deleteBook, fetchBooks, updateBook } from '@/entities/book/model/book-slice'
import type { Book } from '@/entities/book/model/types'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'

export function useBooks() {
  const dispatch = useAppDispatch()

  const books = useAppSelector((state) => state.books.items)
  const status = useAppSelector((state) => state.books.status)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks())
    }
  }, [status, dispatch])

  const handleCreateBook = useCallback(
    (book: Omit<Book, 'id'>) => {
      return dispatch(createBook(book)).unwrap()
    },
    [dispatch],
  )

  const handleUpdateBook = useCallback(
    (book: Partial<Book> & { id: string }) => {
      return dispatch(updateBook(book)).unwrap()
    },
    [dispatch],
  )

  const handleDeleteBook = useCallback(
    (id: string) => {
      return dispatch(deleteBook(id)).unwrap()
    },
    [dispatch],
  )

  return {
    books,
    status,
    createBook: handleCreateBook,
    updateBook: handleUpdateBook,
    deleteBook: handleDeleteBook,
  }
}
