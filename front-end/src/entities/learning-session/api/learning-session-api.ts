import type { LearningSession } from '../model/types'
import { makeRequest } from '@/shared/api/make-request'

const endpoint = '/api/learning-sessions'

type LearningSessionDto = Omit<LearningSession, 'id'>

export const learningSessionApiService = {
  fetchLearningSessions(): Promise<LearningSession[]> {
    return makeRequest<LearningSession[]>({
      url: endpoint,
    })
  },

  createLearningSession(payload: LearningSessionDto): Promise<LearningSession> {
    return makeRequest<LearningSession>({
      url: endpoint,
      method: 'POST',
      data: payload,
    })
  },

  updateLearningSession(
    payload: Partial<LearningSessionDto> & { id: string },
  ): Promise<LearningSession> {
    return makeRequest<LearningSession>({
      url: `${endpoint}/${payload.id}`,
      method: 'PATCH',
      data: payload,
    })
  },

  async deleteLearningSession(id: string): Promise<string> {
    await makeRequest<void>({
      url: `${endpoint}/${id}`,
      method: 'DELETE',
    })
    return id
  },
}
