import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { env } from './config/env.js'
import { authRoutes } from './routes/auth.routes.js'
import { reservaRoutes } from './routes/reserva.routes.js'
import { restaurantRoutes } from './routes/restaurant.routes.js'
import { AppError } from './utils/errors.js'
import { pool } from './config/database.js'

export const app = new Hono()
const allowedOrigins = env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)

app.use('*', cors({
  origin: (origin) => allowedOrigins.includes(origin) ? origin : '',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'OPTIONS'],
  credentials: true,
}))
app.get('/health', (c) => c.json({ status: 'ok' }))
app.get('/health/db', async (c) => {
  try {
    const result = await pool.query<{ database: string; schema: string }>(
      'SELECT current_database() AS database, current_schema() AS schema',
    )
    return c.json({ status: 'ok', database: result.rows[0] })
  } catch (error) {
    console.error('[health/db] No fue posible conectar con PostgreSQL:', error instanceof Error ? error.message : error)
    return c.json({ status: 'error', error: 'Base de datos no disponible' }, 503)
  }
})
app.route('/api/auth', authRoutes)
app.route('/api/reservas', reservaRoutes)
app.route('/api/restaurante', restaurantRoutes)

app.notFound((c) => c.json({ error: 'Ruta no encontrada' }, 404))
app.onError((error, c) => {
  console.error(error)
  if (error instanceof AppError) return c.json({ error: error.message }, error.status)
  return c.json({ error: 'Error interno del servidor' }, 500)
})
