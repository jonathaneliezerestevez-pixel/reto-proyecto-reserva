import { pool } from '../config/database.js'
import type { Restaurante } from '../types/restaurant.js'
import type { UpdateRestaurantInput } from '../schemas/restaurant.schema.js'

type RestaurantRow = Omit<Restaurante, 'RedesSociales' | 'FotografiasReferencia'> & {
  RedesSociales: string | Record<string, string> | null
  FotografiasReferencia: string | string[] | null
}

function parseJson<T>(value: T | string | null, fallback: T): T {
  if (value === null || value === undefined) return fallback
  if (typeof value !== 'string') return value
  try { return JSON.parse(value) as T } catch { return fallback }
}

function mapRow(row: RestaurantRow | undefined): Restaurante | undefined {
  if (!row) return undefined
  return {
    ...row,
    RedesSociales: parseJson(row.RedesSociales, {}),
    FotografiasReferencia: parseJson(row.FotografiasReferencia, []),
  }
}

export async function findDemo() {
  const result = await pool.query<RestaurantRow>(
    `SELECT identificador AS "Identificador", nombre AS "Nombre", descripcion AS "Descripcion", tipocomida AS "TipoComida", direccion AS "Direccion", zona AS "Zona",
      telefono AS "Telefono", telefonoreservas AS "TelefonoReservas", correo AS "Correo", horarioatencion AS "HorarioAtencion", redessociales AS "RedesSociales",
      sitioweb AS "SitioWeb", logourl AS "LogoUrl", fotografiasreferencia AS "FotografiasReferencia", rangoprecios AS "RangoPrecios",
      platosprincipales AS "PlatosPrincipales", esdemo AS "EsDemo"
     FROM restaurante WHERE esdemo = TRUE ORDER BY identificador ASC LIMIT 1`,
  )
  return mapRow(result.rows[0])
}

export async function updateDemo(input: UpdateRestaurantInput) {
  const existing = await findDemo()
  if (!existing) return undefined

  const fields: Record<string, unknown> = { ...input }
  const entries = Object.entries(fields)
  const assignments = entries.map(([field], index) => `${field.toLowerCase()} = $${index + 1}`).join(', ')
  const values: any[] = entries.map(([field, value]) => ['RedesSociales', 'FotografiasReferencia'].includes(field) ? JSON.stringify(value) : value)
  await pool.query(
    `UPDATE restaurante SET ${assignments} WHERE identificador = (SELECT identificador FROM restaurante WHERE esdemo = TRUE ORDER BY identificador ASC LIMIT 1)`,
    values,
  )
  return findDemo()
}
