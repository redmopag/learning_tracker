import type { Goal } from '../model/types'
import { makeRequest } from '@/shared/api/make-request'

const endpoint = '/api/goals'

type GoalDto = Omit<Goal, 'id'>

export const goalApiService = {
  fetchGoals(): Promise<Goal[]> {
    return makeRequest<Goal[]>({
      url: endpoint,
    })
  },

  createGoal(payload: GoalDto): Promise<Goal> {
    return makeRequest<Goal>({
      url: endpoint,
      method: 'POST',
      data: payload,
    })
  },

  updateGoal(payload: Partial<GoalDto> & { id: string }): Promise<Goal> {
    return makeRequest<Goal>({
      url: `${endpoint}/${payload.id}`,
      method: 'PATCH',
      data: payload,
    })
  },

  async deleteGoal(id: string): Promise<string> {
    await makeRequest<void>({
      url: `${endpoint}/${id}`,
      method: 'DELETE',
    })
    return id
  },
}
