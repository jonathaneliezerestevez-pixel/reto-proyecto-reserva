import type { Context } from 'hono'
import { createReservaSchema, reservaFiltersSchema, updateReservaSchema } from '../schemas/reserva.schema.js'
import * as service from '../services/reserva.service.js'
import { AppError } from '../utils/errors.js'

function parseId(value: string) {
  const id = Number(value)
  if (!Number.isInteger(id) || id <= 0) throw new AppError(400, 'Identificador inválido')
  return id
}

export async function createController(c: Context) {
  const parsed = createReservaSchema.safeParse(await c.req.json().catch(() => null))
  if (!parsed.success) return c.json({ error: 'Datos de reserva inválidos', details: parsed.error.flatten() }, 400)
  return c.json({ data: await service.create(parsed.data) }, 201)
}

export async function updateController(c: Context) {
  const parsed = updateReservaSchema.safeParse(await c.req.json().catch(() => null))
  if (!parsed.success) return c.json({ error: 'Datos de actualización inválidos', details: parsed.error.flatten() }, 400)
  return c.json({ data: await service.update(parseId(c.req.param('id') ?? ''), parsed.data) })
}

export async function listController(c: Context) {
  const raw = c.req.query()
  const parsed = reservaFiltersSchema.safeParse(raw)
  if (!parsed.success) return c.json({ error: 'Filtros inválidos', details: parsed.error.flatten() }, 400)
  return c.json({ data: await service.list(parsed.data) })
}
