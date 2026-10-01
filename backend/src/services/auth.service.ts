import { findByUsername } from '../repositories/administrador.repository.js'
import { AppError } from '../utils/errors.js'
import { createToken } from '../utils/jwt.js'
import { comparePassword } from '../utils/password.js'
import type { LoginInput } from '../schemas/auth.schema.js'

export async function login(input: LoginInput) {
  const administrator = await findByUsername(input.Usuario)
  if (!administrator || !(await comparePassword(input.Contrasena, administrator.Contrasena))) {
    throw new AppError(401, 'Usuario o contraseña incorrectos')
  }
  return {
    token: await createToken(administrator.Identificador, administrator.Usuario),
    administrador: { Identificador: administrator.Identificador, Usuario: administrator.Usuario },
  }
}
