import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://metaphors.design',
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough',
    mode: 'directory',
  }),
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
  integrations: [sitemap(), icon()],
});
