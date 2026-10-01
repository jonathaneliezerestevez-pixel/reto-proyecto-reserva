import type { ApiErrorBody } from '../types/api'

const API_URL = (import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api').replace(/\/$/, '')
export const AUTH_TOKEN_KEY = 'reservadb_token'

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN_KEY) : null
  const headers = new Headers(init.headers)
  headers.set('Content-Type', 'application/json')
  if (token?.trim()) headers.set('Authorization', `Bearer ${token.trim()}`)

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    credentials: 'include',
  })

  const body = (await response.json().catch(() => ({}))) as ApiErrorBody & T
  if (!response.ok) {
    if (response.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_TOKEN_KEY)
      localStorage.removeItem('reservadb_admin')
      if (!path.startsWith('/auth/login')) window.location.assign('/login')
    }
    throw new ApiError(response.status, body.error || 'No fue posible completar la solicitud')
  }
  return body as T
}
