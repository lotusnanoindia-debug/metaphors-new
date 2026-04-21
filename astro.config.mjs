import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://metaphors.design",
  output: "server",
  adapter: cloudflare({
    imageService: "passthrough",
  }),
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    ssr: {
      noExternal: ["resend", "@sanity/client", "@sanity/image-url"],
    },
  },
  integrations: [sitemap()],
});
