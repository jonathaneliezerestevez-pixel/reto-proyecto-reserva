import { Hono } from 'hono'
import { getRestaurantController, updateRestaurantController } from '../controllers/restaurant.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

export const restaurantRoutes = new Hono()
restaurantRoutes.get('/', getRestaurantController)
restaurantRoutes.put('/', authMiddleware, updateRestaurantController)
