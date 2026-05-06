import { useCallback, useEffect } from 'react'
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from '@/entities/category/model/category-slice'
import type { Category } from '@/entities/category/model/types'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'

export function useCategories() {
  const dispatch = useAppDispatch()

  const categories = useAppSelector(state => state.categories.items)
  const status = useAppSelector(state => state.categories.status)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories())
    }
  }, [status, dispatch])

  const handleCreateCategory = useCallback(
    (category: Omit<Category, 'id'>) => {
      return dispatch(createCategory(category)).unwrap()
    },
    [dispatch],
  )

  const handleUpdateCategory = useCallback(
    (category: Category) => {
      return dispatch(updateCategory(category)).unwrap()
    },
    [dispatch],
  )

  const handleDeleteCategory = useCallback(
    (id: string) => {
      return dispatch(deleteCategory(id)).unwrap()
    },
    [dispatch],
  )

  return {
    categories,
    status,
    createCategory: handleCreateCategory,
    updateCategory: handleUpdateCategory,
    deleteCategory: handleDeleteCategory,
  }
}
