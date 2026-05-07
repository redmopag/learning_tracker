import { useCallback, useEffect } from 'react'
import { createGoal, deleteGoal, fetchGoals, updateGoal } from '@/entities/goal/model/goal-slice'
import type { Goal } from '@/entities/goal/model/types'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'

export function useGoals() {
  const dispatch = useAppDispatch()

  const goals = useAppSelector((state) => state.goals.items)
  const status = useAppSelector((state) => state.goals.status)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGoals())
    }
  }, [status, dispatch])

  const handleCreateGoal = useCallback(
    (goal: Omit<Goal, 'id'>) => {
      return dispatch(createGoal(goal)).unwrap()
    },
    [dispatch],
  )

  const handleUpdateGoal = useCallback(
    (goal: Partial<Goal> & { id: string }) => {
      return dispatch(updateGoal(goal)).unwrap()
    },
    [dispatch],
  )

  const handleDeleteGoal = useCallback(
    (id: string) => {
      return dispatch(deleteGoal(id)).unwrap()
    },
    [dispatch],
  )

  return {
    goals,
    status,
    createGoal: handleCreateGoal,
    updateGoal: handleUpdateGoal,
    deleteGoal: handleDeleteGoal,
  }
}
