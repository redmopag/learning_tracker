import type { Category } from '../model/types'
import { makeRequest } from '@/shared/api/make-request'

const endpoint = '/api/categories'

export const categoryApiService = {
  fetchCategories(): Promise<Category[]> {
    return makeRequest<Category[]>({
      url: endpoint,
    })
  },

  createCategory(payload: { name: string }): Promise<Category> {
    return makeRequest<Category>({
      url: endpoint,
      method: 'POST',
      data: payload,
    })
  },

  updateCategory(payload: { id: string; name: string }): Promise<Category> {
    return makeRequest<Category>({
      url: `${endpoint}/${payload.id}`,
      method: 'PATCH',
      data: { name: payload.name },
    })
  },

  async deleteCategory(id: string): Promise<string> {
    await makeRequest<void>({
      url: `${endpoint}/${id}`,
      method: 'DELETE',
    })
    return id
  },
}
