import { z } from 'zod'

const phoneSchema = z.string().regex(/^\+?[0-9 ()-]{7,20}$/, 'Número telefónico inválido')

export const createReservaSchema = z.object({
  RestauranteId: z.number().int().positive().optional(),
  NombreCliente: z.string().trim().min(1).max(255),
  NumeroCliente: phoneSchema,
  EstadoPedido: z.enum(['Disponible', 'Cancelado']),
  NumeroMesa: z.number().int().positive(),
  FechaReserva: z.coerce.date().optional(),
})

export const updateReservaSchema = createReservaSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  'Debe enviar al menos un campo para actualizar',
)

export const reservaFiltersSchema = z.object({
  estado: z.enum(['Disponible', 'Cancelado']).optional(),
  fecha: z.coerce.date().optional(),
  mesa: z.coerce.number().int().positive().optional(),
  nombre: z.string().trim().min(1).optional(),
  numero: phoneSchema.optional(),
})

export type CreateReservaInput = z.infer<typeof createReservaSchema>
export type UpdateReservaInput = z.infer<typeof updateReservaSchema>
export type ReservaFilters = z.infer<typeof reservaFiltersSchema>
