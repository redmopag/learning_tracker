export type CourseStatus = 'planned' | 'in_progress' | 'completed'

export interface Course {
  id: string
  title: string
  description: string
  url: string
  categoryId: string | null
  status: CourseStatus
  totalSteps: number
  currentStep: number
}
