import request from '@/utils/request'

export interface ApiPicItem {
  id: number
  title: string
  description: string
  url: string
  category: string
  category_id: number
  artist: string
  createdAt: string
}

export interface ApiResponse<T> {
  ok: boolean
  data: T
  total: number
  page: number
  limit: number
  totalPages: number
}

export const fetchPics = (page: number, limit: number) => {
  return request.get<any, ApiResponse<ApiPicItem[]>>('/api/pic', {
    params: { page, limit }
  })
}

