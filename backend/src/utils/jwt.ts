import { SignJWT, jwtVerify } from 'jose'
import { env } from '../config/env.js'

const secret = new TextEncoder().encode(env.JWT_SECRET)

export async function createToken(administratorId: number, username: string) {
  return new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(String(administratorId))
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRES_IN)
    .sign(secret)
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret)
  if (!payload.sub) throw new Error('Token sin sujeto')
  return { administratorId: Number(payload.sub), username: String(payload.username ?? '') }
}
