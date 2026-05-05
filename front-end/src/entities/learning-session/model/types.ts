export type LearningSessionType = 'course' | 'book'

export interface LearningSession {
  id: string
  date: string
  duration: number
  relatedItemId: string
  type: LearningSessionType
}
