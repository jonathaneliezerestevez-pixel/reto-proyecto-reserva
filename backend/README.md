# ReservaDB Backend

API REST para autenticación del administrador y gestión de reservas, utilizando PostgreSQL.

## Instalación

```bash
npm install
Copy-Item .env.example .env
```

Completa `DATABASE_URL`, `DATABASE_SSL` y `JWT_SECRET` en `.env`. Para Supabase usa la cadena de conexión que aparece en **Connect** y configura `DATABASE_SSL=true`. Crea primero la base `reservadb` en PostgreSQL local o utiliza la base `postgres` de Supabase; después ejecuta los scripts SQL de la carpeta `db` en este orden:

1. `1.CreacionDeTablas.sql`
2. `2.Restricciones.sql`
3. `3.InsercionDeDatos.sql`

Para una base ya existente, ejecuta `4.MigracionRestauranteDemo.sql`. Los scripts están escritos para PostgreSQL.

Puedes verificar la conexión sin iniciar sesión mediante:

```text
GET /health/db
```

> El usuario inicial es `sabinofc` y su contraseña de prueba es `123456`. El script SQL ya contiene la contraseña como hash bcrypt con 8 salt rounds.

En producción, configura `ALLOWED_ORIGINS` con los orígenes permitidos separados por comas. No uses `*` cuando se envían credenciales.

Para Vercel, utiliza `.env.vercel.example` como referencia. El proyecto del backend debe tener como Root Directory `backend`, utilizar `src/index.ts` como entrada Hono y configurar el dominio `api.nookis3.infosist.org`.

## Desarrollo

```bash
npm run dev
```

## Verificación

```bash
npm run build
npm test
```

## Endpoints

- `GET /health`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/reservas`
- `PUT /api/reservas/:id`
- `GET /api/reservas`
- `GET /api/reservas?estado=Disponible&mesa=1`
- `GET /api/reservas?numero=5512345678`
- `GET /api/restaurante`
- `PUT /api/restaurante` (requiere autenticación)
