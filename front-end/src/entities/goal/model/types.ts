export interface Goal {
  id: string
  title: string
  description: string
  deadline: string | null
  relatedItems: string[]
}
