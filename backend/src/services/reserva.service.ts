import { AppError } from '../utils/errors.js'
import * as repository from '../repositories/reserva.repository.js'
import type { CreateReservaInput, ReservaFilters, UpdateReservaInput } from '../schemas/reserva.schema.js'

export async function create(input: CreateReservaInput) {
  return repository.create(input)
}

export async function update(id: number, input: UpdateReservaInput) {
  const reserva = await repository.update(id, input)
  if (!reserva) throw new AppError(404, 'Reserva no encontrada')
  return reserva
}

export function list(filters: ReservaFilters) {
  return repository.findMany(filters)
}
