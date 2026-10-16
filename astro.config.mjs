import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Sitio estático: cada idioma se prerenderiza a su propio HTML (/ y /en/).
export default defineConfig({
  site: 'https://terostec.netlify.app',
  integrations: [react()],
  build: {
    format: 'directory',
  },
});
