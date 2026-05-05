import type { Book } from '../model/types'
import { makeRequest } from '@/shared/api/make-request'

const endpoint = '/api/books'

type BookDto = Omit<Book, 'id'>

export const bookApiService = {
  fetchBooks(): Promise<Book[]> {
    return makeRequest<Book[]>({
      url: endpoint,
    })
  },

  createBook(payload: BookDto): Promise<Book> {
    return makeRequest<Book>({
      url: endpoint,
      method: 'POST',
      data: payload,
    })
  },

  updateBook(payload: Partial<BookDto> & { id: string }): Promise<Book> {
    return makeRequest<Book>({
      url: `${endpoint}/${payload.id}`,
      method: 'PATCH',
      data: payload,
    })
  },

  async deleteBook(id: string): Promise<string> {
    await makeRequest<void>({
      url: `${endpoint}/${id}`,
      method: 'DELETE',
    })
    return id
  },
}
