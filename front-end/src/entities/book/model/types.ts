export type BookStatus = 'planned' | 'in_progress' | 'completed'

export interface Book {
  id: string
  title: string
  author: string
  url: string
  categoryId: string | null
  status: BookStatus
  totalSteps: number
  currentStep: number
}
