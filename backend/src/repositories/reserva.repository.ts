import { pool } from '../config/database.js'
import type { Reserva } from '../types/domain.js'
import type { CreateReservaInput, ReservaFilters, UpdateReservaInput } from '../schemas/reserva.schema.js'

export async function create(input: CreateReservaInput) {
  const result = await pool.query<Reserva>(
    `INSERT INTO Reserva
      (RestauranteId, NombreCliente, NumeroCliente, EstadoPedido, NumeroMesa, FechaReserva)
     VALUES (COALESCE($1, (SELECT identificador FROM restaurante WHERE esdemo = TRUE LIMIT 1)), $2, $3, $4, $5, COALESCE($6, CURRENT_TIMESTAMP))
     RETURNING identificador AS "Identificador", restauranteid AS "RestauranteId", nombrecliente AS "NombreCliente", numerocliente AS "NumeroCliente", estadopedido AS "EstadoPedido", numeromesa AS "NumeroMesa", fechareserva AS "FechaReserva"`,
    [input.RestauranteId ?? null, input.NombreCliente, input.NumeroCliente, input.EstadoPedido, input.NumeroMesa, input.FechaReserva ?? null],
  )
  return result.rows[0]
}

export async function findById(id: number) {
  const result = await pool.query<Reserva>(
    'SELECT identificador AS "Identificador", restauranteid AS "RestauranteId", nombrecliente AS "NombreCliente", numerocliente AS "NumeroCliente", estadopedido AS "EstadoPedido", numeromesa AS "NumeroMesa", fechareserva AS "FechaReserva" FROM reserva WHERE identificador = $1',
    [id],
  )
  return result.rows[0]
}

export async function update(id: number, input: UpdateReservaInput) {
  const existing = await findById(id)
  if (!existing) return undefined

  const fields: Record<string, any> = {
    NombreCliente: input.NombreCliente,
    NumeroCliente: input.NumeroCliente,
    EstadoPedido: input.EstadoPedido,
    NumeroMesa: input.NumeroMesa,
    FechaReserva: input.FechaReserva,
  }
  const entries = Object.entries(fields).filter(([, value]) => value !== undefined)
  const assignments = entries.map(([field], index) => `${field.toLowerCase()} = $${index + 1}`).join(', ')
  await pool.query(
    `UPDATE reserva SET ${assignments} WHERE identificador = $${entries.length + 1}`,
    [...entries.map(([, value]) => value), id],
  )
  return findById(id)
}

export async function findMany(filters: ReservaFilters) {
  const conditions: string[] = []
  const values: any[] = []
  if (filters.estado) { values.push(filters.estado); conditions.push(`estadopedido = $${values.length}`) }
  if (filters.fecha) { values.push(filters.fecha); conditions.push(`DATE(fechareserva) = DATE($${values.length})`) }
  if (filters.mesa) { values.push(filters.mesa); conditions.push(`numeromesa = $${values.length}`) }
  if (filters.nombre) { values.push(`%${filters.nombre}%`); conditions.push(`nombrecliente ILIKE $${values.length}`) }
  if (filters.numero) { values.push(filters.numero); conditions.push(`numerocliente = $${values.length}`) }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  const result = await pool.query<Reserva>(
    `SELECT identificador AS "Identificador", restauranteid AS "RestauranteId", nombrecliente AS "NombreCliente", numerocliente AS "NumeroCliente", estadopedido AS "EstadoPedido", numeromesa AS "NumeroMesa", fechareserva AS "FechaReserva"
     FROM reserva ${where} ORDER BY fechareserva ASC`,
    values,
  )
  return result.rows
}
