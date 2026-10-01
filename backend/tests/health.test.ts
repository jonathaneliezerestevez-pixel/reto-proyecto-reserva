import { beforeAll, describe, expect, it } from 'vitest'

describe('API', () => {
  let app: typeof import('../src/app.js').app

  beforeAll(async () => {
    process.env.DATABASE_URL ??= 'postgresql://test:test@localhost:5432/reservadb'
    process.env.JWT_SECRET ??= '12345678901234567890123456789012'
    process.env.NODE_ENV ??= 'test'
    app = (await import('../src/app.js')).app
  })

  it('responde el health check', async () => {
    const response = await app.request('/health')
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ status: 'ok' })
  })
})
