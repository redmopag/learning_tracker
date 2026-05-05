import type { Book } from './types'
import type { RequestStatus } from '@/shared/model/request-status'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { bookApiService } from '../api/book-api'

interface BooksState {
  items: Book[]
  status: RequestStatus
  error: string | null
}

const initialState: BooksState = {
  items: [],
  status: 'idle',
  error: null,
}

export const fetchBooks = createAsyncThunk('books/fetch', bookApiService.fetchBooks)
export const createBook = createAsyncThunk('books/create', bookApiService.createBook)
export const updateBook = createAsyncThunk('books/update', bookApiService.updateBook)
export const deleteBook = createAsyncThunk('books/delete', bookApiService.deleteBook)

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'success'
        state.items = action.payload
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? 'Failed to load books'
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload)
      })
  },
})

export const booksReducer = booksSlice.reducer
