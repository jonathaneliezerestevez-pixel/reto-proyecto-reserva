# ReservaDB Frontend

Frontend estático construido con Astro y Tailwind CSS para consumir la API de ReservaDB.

## Configuración

```bash
npm install
Copy-Item .env.example .env
```

Configura `PUBLIC_API_URL` con la URL base de la API, incluyendo `/api`.

## Validación

```bash
npm run check
npm run build
```

El proyecto genera archivos estáticos compatibles con Vercel. Las operaciones interactivas se ejecutan en el navegador y consumen el backend mediante `fetch`.

## Vercel

El `vercel.json` de la raíz construye este proyecto desde `frontend/` y publica `frontend/dist`. También redirige `/api/*` al backend desplegado en `https://api.nookis3.infosist.org`. En Vercel configura `PUBLIC_API_URL=/api` para mantener las llamadas del navegador en el mismo dominio.
