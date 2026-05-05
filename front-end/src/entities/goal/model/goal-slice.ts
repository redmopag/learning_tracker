import type { Goal } from './types'
import type { RequestStatus } from '@/shared/model/request-status'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { goalApiService } from '../api/goal-api'

interface GoalsState {
  items: Goal[]
  status: RequestStatus
  error: string | null
}

const initialState: GoalsState = {
  items: [],
  status: 'idle',
  error: null,
}

export const fetchGoals = createAsyncThunk('goals/fetch', goalApiService.fetchGoals)
export const createGoal = createAsyncThunk('goals/create', goalApiService.createGoal)
export const updateGoal = createAsyncThunk('goals/update', goalApiService.updateGoal)
export const deleteGoal = createAsyncThunk('goals/delete', goalApiService.deleteGoal)

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.status = 'success'
        state.items = action.payload
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? 'Failed to load goals'
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload)
      })
  },
})

export const goalsReducer = goalsSlice.reducer
