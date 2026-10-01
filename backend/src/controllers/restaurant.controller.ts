import type { Context } from 'hono'
import { updateRestaurantSchema } from '../schemas/restaurant.schema.js'
import * as service from '../services/restaurant.service.js'

export async function getRestaurantController(c: Context) {
  return c.json({ data: await service.getDemo() })
}

export async function updateRestaurantController(c: Context) {
  const parsed = updateRestaurantSchema.safeParse(await c.req.json().catch(() => null))
  if (!parsed.success) return c.json({ error: 'Datos del restaurante inválidos', details: parsed.error.flatten() }, 400)
  return c.json({ data: await service.updateDemo(parsed.data) })
}
