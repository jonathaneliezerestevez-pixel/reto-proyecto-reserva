import bcrypt from 'bcryptjs'

export const BCRYPT_SALT_ROUNDS = 8

export function hashPassword(password: string) {
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}
