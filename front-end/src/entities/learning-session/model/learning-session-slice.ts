import type { LearningSession } from './types'
import type { RequestStatus } from '@/shared/model/request-status'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { learningSessionApiService } from '../api/learning-session-api'

interface LearningSessionsState {
  items: LearningSession[]
  status: RequestStatus
  error: string | null
}

const initialState: LearningSessionsState = {
  items: [],
  status: 'idle',
  error: null,
}

export const fetchLearningSessions = createAsyncThunk(
  'learning-sessions/fetch',
  learningSessionApiService.fetchLearningSessions,
)
export const createLearningSession = createAsyncThunk(
  'learning-sessions/create',
  learningSessionApiService.createLearningSession,
)
export const updateLearningSession = createAsyncThunk(
  'learning-sessions/update',
  learningSessionApiService.updateLearningSession,
)
export const deleteLearningSession = createAsyncThunk(
  'learning-sessions/delete',
  learningSessionApiService.deleteLearningSession,
)

const learningSessionsSlice = createSlice({
  name: 'learningSessions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLearningSessions.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchLearningSessions.fulfilled, (state, action) => {
        state.status = 'success'
        state.items = action.payload
      })
      .addCase(fetchLearningSessions.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? 'Failed to load learning sessions'
      })
      .addCase(createLearningSession.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      .addCase(updateLearningSession.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(deleteLearningSession.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload)
      })
  },
})

export const learningSessionsReducer = learningSessionsSlice.reducer
