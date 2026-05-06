import { useCallback, useEffect } from 'react'
import {
  createLearningSession,
  deleteLearningSession,
  fetchLearningSessions,
  updateLearningSession,
} from '@/entities/learning-session/model/learning-session-slice'
import type { LearningSession } from '@/entities/learning-session/model/types'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'

export function useLearningSessions() {
  const dispatch = useAppDispatch()

  const learningSessions = useAppSelector(state => state.learningSessions.items)
  const status = useAppSelector(state => state.learningSessions.status)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLearningSessions())
    }
  }, [status, dispatch])

  const handleCreateLearningSession = useCallback(
    (session: Omit<LearningSession, 'id'>) => {
      return dispatch(createLearningSession(session)).unwrap()
    },
    [dispatch],
  )

  const handleUpdateLearningSession = useCallback(
    (session: Partial<LearningSession> & { id: string }) => {
      return dispatch(updateLearningSession(session)).unwrap()
    },
    [dispatch],
  )

  const handleDeleteLearningSession = useCallback(
    (id: string) => {
      return dispatch(deleteLearningSession(id)).unwrap()
    },
    [dispatch],
  )

  return {
    learningSessions,
    status,
    createLearningSession: handleCreateLearningSession,
    updateLearningSession: handleUpdateLearningSession,
    deleteLearningSession: handleDeleteLearningSession,
  }
}
