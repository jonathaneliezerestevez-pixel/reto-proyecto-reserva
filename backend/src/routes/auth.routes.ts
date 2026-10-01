import { Hono } from 'hono'
import { loginController, logoutController } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

export const authRoutes = new Hono()
authRoutes.post('/login', loginController)
authRoutes.post('/logout', authMiddleware, logoutController)
