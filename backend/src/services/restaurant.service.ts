import type { UpdateRestaurantInput } from '../schemas/restaurant.schema.js'
import { AppError } from '../utils/errors.js'
import * as repository from '../repositories/restaurant.repository.js'

export async function getDemo() {
  const restaurant = await repository.findDemo()
  if (!restaurant) throw new AppError(404, 'Restaurante demo no encontrado')
  return restaurant
}

export async function updateDemo(input: UpdateRestaurantInput) {
  const restaurant = await repository.updateDemo(input)
  if (!restaurant) throw new AppError(404, 'Restaurante demo no encontrado')
  return restaurant
}
