import type { MiddlewareHandler } from 'hono'
import { getCookie } from 'hono/cookie'
import { env } from '../config/env.js'
import { verifyToken } from '../utils/jwt.js'

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const header = c.req.header('Authorization')
  const token = header?.startsWith('Bearer ') ? header.slice(7) : getCookie(c, env.COOKIE_NAME)
  if (!token) return c.json({ error: 'Autenticación requerida' }, 401)
  try {
    c.set('auth', await verifyToken(token))
    await next()
  } catch {
    return c.json({ error: 'Token inválido o expirado' }, 401)
  }
}
