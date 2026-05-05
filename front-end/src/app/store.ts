import { configureStore } from '@reduxjs/toolkit'
import { booksReducer } from '@/entities/book'
import { categoriesReducer } from '@/entities/category'
import { coursesReducer } from '@/entities/course'
import { goalsReducer } from '@/entities/goal'
import { learningSessionsReducer } from '@/entities/learning-session'

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    courses: coursesReducer,
    books: booksReducer,
    goals: goalsReducer,
    learningSessions: learningSessionsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
