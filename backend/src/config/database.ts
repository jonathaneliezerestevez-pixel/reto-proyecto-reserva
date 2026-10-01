import pg from 'pg'
import { env } from './env.js'

const { Pool } = pg

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  ssl: env.DATABASE_SSL ? { rejectUnauthorized: false } : undefined,
})

pool.on('error', (error) => {
  console.error('[database] Error inesperado del pool:', error.message)
})
