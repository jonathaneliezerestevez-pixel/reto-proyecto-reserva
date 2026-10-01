import { z } from 'zod'

export const loginSchema = z.object({
  Usuario: z.string().min(1).max(15),
  Contrasena: z.string().min(1).max(60),
})

export type LoginInput = z.infer<typeof loginSchema>
