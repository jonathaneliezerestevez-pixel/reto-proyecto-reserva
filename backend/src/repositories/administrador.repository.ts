import { pool } from '../config/database.js'
import type { Administrador } from '../types/domain.js'

export async function findByUsername(username: string) {
  const result = await pool.query<Administrador>(
    'SELECT identificador AS "Identificador", usuario AS "Usuario", contrasena AS "Contrasena" FROM administrador WHERE usuario = $1 LIMIT 1',
    [username],
  )
  return result.rows[0]
}
