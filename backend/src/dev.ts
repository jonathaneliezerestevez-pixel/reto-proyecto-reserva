import { serve } from '@hono/node-server'
import { app } from './app.js'
import { env } from './config/env.js'

serve({ fetch: app.fetch, port: env.PORT }, (info) => {
  const database = new URL(env.DATABASE_URL)
  console.log(`API ejecutándose en http://localhost:${info.port}`)
  console.log(`[database] host=${database.hostname} port=${database.port || 5432} database=${database.pathname.slice(1)} ssl=${env.DATABASE_SSL}`)
})
