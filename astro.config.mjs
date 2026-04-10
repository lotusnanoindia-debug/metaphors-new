import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://metaphors.design',
  vite: {
    plugins: [tailwind()],
  },
  integrations: [sitemap(), icon()],
});
