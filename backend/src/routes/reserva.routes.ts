import { Hono } from 'hono'
import { createController, listController, updateController } from '../controllers/reserva.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

export const reservaRoutes = new Hono()
reservaRoutes.use('*', authMiddleware)
reservaRoutes.get('/', listController)
reservaRoutes.post('/', createController)
reservaRoutes.put('/:id', updateController)
