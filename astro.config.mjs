// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://feliperigler.dev',
  output: 'static',
  build: {
    format: 'directory',
    // CSS sempre em arquivo: a CSP (public/_headers) não libera <style> inline.
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      // Scripts sempre em arquivo: a CSP não libera <script> inline.
      assetsInlineLimit: 0,
    },
  },
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed' },
  },
});
