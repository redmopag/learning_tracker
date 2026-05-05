import type { Category } from './types'
import type { RequestStatus } from '@/shared/model/request-status'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { categoryApiService } from '../api/category-api'

interface CategoriesState {
  items: Category[]
  status: RequestStatus
  error: string | null
}

const initialState: CategoriesState = {
  items: [],
  status: 'idle',
  error: null,
}

export const fetchCategories = createAsyncThunk('categories/fetch', categoryApiService.fetchCategories)
export const createCategory = createAsyncThunk('categories/create', categoryApiService.createCategory)
export const updateCategory = createAsyncThunk('categories/update', categoryApiService.updateCategory)
export const deleteCategory = createAsyncThunk('categories/delete', categoryApiService.deleteCategory)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'success'
        state.items = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? 'Failed to load categories'
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload)
      })
  },
})

export const categoriesReducer = categoriesSlice.reducer
