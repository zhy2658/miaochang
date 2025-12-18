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

export const fetchPics = async (page: number, limit: number) => {
  const res = await request.get<any, any>('/api/pic', {
    params: { page, limit }
  })

  // Handle array response from https://api.1mcc.top
  if (Array.isArray(res)) {
    return {
      ok: true,
      data: res,
      total: res.length,
      page: 1,
      limit: res.length,
      totalPages: 1
    } as ApiResponse<ApiPicItem[]>
  }

  return res as ApiResponse<ApiPicItem[]>
}

