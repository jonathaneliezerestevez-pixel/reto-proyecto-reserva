import { request } from './api'
import type { Reserva, ReservaInput, EstadoPedido } from '../types/api'

interface ListResponse {
  data: Reserva[]
}

interface SingleResponse {
  data: Reserva
}

export interface ReservaFilters {
  estado?: EstadoPedido
  fecha?: string
  mesa?: string
  nombre?: string
  numero?: string
}

export function listReservas(filters: ReservaFilters = {}) {
  ensureAuthenticated()
  const params = new URLSearchParams()
  if (filters.estado) params.set('estado', filters.estado)
  if (filters.fecha) params.set('fecha', filters.fecha)
  if (filters.mesa) params.set('mesa', filters.mesa)
  if (filters.nombre) params.set('nombre', filters.nombre)
  if (filters.numero) params.set('numero', filters.numero)
  const query = params.toString()
  return request<ListResponse>(`/reservas${query ? `?${query}` : ''}`)
}

export function createReserva(input: ReservaInput) {
  ensureAuthenticated()
  return request<SingleResponse>('/reservas', { method: 'POST', body: JSON.stringify(input) })
}

export function updateReserva(id: number, input: Partial<ReservaInput>) {
  ensureAuthenticated()
  return request<SingleResponse>(`/reservas/${id}`, { method: 'PUT', body: JSON.stringify(input) })
}

function ensureAuthenticated() {
  if (typeof window !== 'undefined' && !localStorage.getItem('reservadb_token')?.trim()) {
    window.location.assign('/login')
    throw new Error('La sesión ha expirado. Inicia sesión nuevamente.')
  }
}
