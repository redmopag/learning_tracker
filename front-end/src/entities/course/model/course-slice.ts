import type { Course } from './types'
import type { RequestStatus } from '@/shared/model/request-status'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { courseApiService } from '../api/course-api'

interface CoursesState {
  items: Course[]
  status: RequestStatus
  error: string | null
}

const initialState: CoursesState = {
  items: [],
  status: 'idle',
  error: null,
}

export const fetchCourses = createAsyncThunk('courses/fetch', courseApiService.fetchCourses)
export const createCourse = createAsyncThunk('courses/create', courseApiService.createCourse)
export const updateCourse = createAsyncThunk('courses/update', courseApiService.updateCourse)
export const deleteCourse = createAsyncThunk('courses/delete', courseApiService.deleteCourse)

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'success'
        state.items = action.payload
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? 'Failed to load courses'
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload)
      })
  },
})

export const coursesReducer = coursesSlice.reducer
