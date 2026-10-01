import { AUTH_TOKEN_KEY, request } from './api'
import type { LoginResponse } from '../types/api'

const ADMIN_KEY = 'reservadb_admin'

export async function login(Usuario: string, Contrasena: string) {
  const result = await request<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ Usuario, Contrasena }),
  })
  localStorage.setItem(AUTH_TOKEN_KEY, result.token)
  localStorage.setItem(ADMIN_KEY, JSON.stringify(result.administrador))
  return result
}

export async function logout() {
  try {
    await request('/auth/logout', { method: 'POST' })
  } finally {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(ADMIN_KEY)
  }
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem(AUTH_TOKEN_KEY)?.trim())
}

export function getAdministrator() {
  const value = localStorage.getItem(ADMIN_KEY)
  return value ? JSON.parse(value) as { Identificador: number; Usuario: string } : null
}
