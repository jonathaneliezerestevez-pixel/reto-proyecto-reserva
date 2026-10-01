import { deleteCookie, setCookie } from 'hono/cookie'
import type { Context } from 'hono'
import { env } from '../config/env.js'
import { login } from '../services/auth.service.js'
import { AppError } from '../utils/errors.js'
import { loginSchema } from '../schemas/auth.schema.js'

export async function loginController(c: Context) {
  const parsed = loginSchema.safeParse(await c.req.json().catch(() => null))
  if (!parsed.success) return c.json({ error: 'Datos de acceso inválidos', details: parsed.error.flatten() }, 400)
  const result = await login(parsed.data)
  setCookie(c, env.COOKIE_NAME, result.token, { httpOnly: true, secure: env.NODE_ENV === 'production', sameSite: 'Lax', maxAge: 900, path: '/' })
  return c.json(result)
}

export function logoutController(c: Context) {
  deleteCookie(c, env.COOKIE_NAME, { path: '/' })
  return c.json({ message: 'Sesión cerrada correctamente' })
}

export function handleAuthError(error: unknown) {
  if (error instanceof AppError) return error
  return new AppError(500, 'No fue posible procesar la autenticación')
}
