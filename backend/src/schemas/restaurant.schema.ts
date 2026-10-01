import { z } from 'zod'

const urlSchema = z.string().url()

export const updateRestaurantSchema = z.object({
  Nombre: z.string().trim().min(1).max(150).optional(),
  Descripcion: z.string().max(5000).nullable().optional(),
  TipoComida: z.string().max(255).nullable().optional(),
  Direccion: z.string().max(255).nullable().optional(),
  Zona: z.string().max(150).nullable().optional(),
  Telefono: z.string().max(25).nullable().optional(),
  TelefonoReservas: z.string().max(25).nullable().optional(),
  Correo: z.string().email().max(150).nullable().optional(),
  HorarioAtencion: z.string().max(255).nullable().optional(),
  RedesSociales: z.record(urlSchema).optional(),
  SitioWeb: urlSchema.nullable().optional(),
  LogoUrl: urlSchema.nullable().optional(),
  FotografiasReferencia: z.array(urlSchema).max(10).optional(),
  RangoPrecios: z.string().max(100).nullable().optional(),
  PlatosPrincipales: z.string().max(5000).nullable().optional(),
}).refine((value) => Object.keys(value).length > 0, 'Debe enviar al menos un campo')

export type UpdateRestaurantInput = z.infer<typeof updateRestaurantSchema>
