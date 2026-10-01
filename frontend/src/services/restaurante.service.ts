import { request } from './api'
import type { Restaurante } from '../types/api'

export function getRestaurante() {
  return request<{ data: Restaurante }>('/restaurante')
}

export function updateRestaurante(input: Partial<Restaurante>) {
  return request<{ data: Restaurante }>('/restaurante', {
    method: 'PUT',
    body: JSON.stringify(input),
  })
}
