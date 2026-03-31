import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://metaphors.design',
  vite: {
    plugins: [tailwind()],
  },
  integrations: [react(), sitemap(), icon()],
});
