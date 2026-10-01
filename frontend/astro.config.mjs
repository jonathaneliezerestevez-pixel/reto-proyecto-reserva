import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  output: 'static',
  vite: {
    // @ts-expect-error Tailwind's Vite plugin and Astro's bundled Vite types differ.
    plugins: [tailwindcss()],
  },
})
