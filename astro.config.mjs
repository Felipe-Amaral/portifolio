// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import rehypeMermaid from 'rehype-mermaid';
import rehypeTableWrap from './src/lib/rehype-table-wrap.mjs';
import rehypeDiagramWrap from './src/lib/rehype-diagram-wrap.mjs';

export default defineConfig({
  site: 'https://feliperigler.dev',
  output: 'static',
  // MDX para os artigos que precisam de componentes (ex.: demo de clickjacking).
  integrations: [mdx()],
  // Astro 7 passou a remover espaços entre elementos (regra JSX). Mantém o comportamento do v6.
  compressHTML: true,
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
    // "mermaid" fica sem realce do Shiki para o rehype-mermaid conseguir ler o bloco.
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    // Blocos ```mermaid viram SVG no build (como <img> com data: URI). Sem JavaScript no navegador
    // e sem <style>/<script> inline no HTML, o que mantém a CSP do public/_headers.
    processor: unified({
      rehypePlugins: [
        [
          rehypeMermaid,
          {
            strategy: 'img-svg',
            launchOptions: { args: ['--no-sandbox'] },
            mermaidConfig: {
              theme: 'base',
              fontFamily: 'monospace',
              // Largura natural do SVG (sem max-width: 100%): o diagrama rola no wrapper em vez de encolher.
              flowchart: { useMaxWidth: false },
              sequence: { useMaxWidth: false },
              state: { useMaxWidth: false },
              class: { useMaxWidth: false },
              er: { useMaxWidth: false },
              themeVariables: {
                background: '#05060c',
                primaryColor: '#0b0d18',
                primaryBorderColor: '#ff2640',
                primaryTextColor: '#f0f0f5',
                secondaryColor: '#0b0d18',
                tertiaryColor: '#0b0d18',
                lineColor: '#3ce6ff',
                textColor: '#f0f0f5',
                clusterBkg: '#05060c',
                clusterBorder: '#ff2640',
                edgeLabelBackground: '#05060c',
                noteBkgColor: '#0b0d18',
                noteBorderColor: '#3ce6ff',
                noteTextColor: '#f0f0f5',
              },
            },
          },
        ],
        // Diagramas (SVG) ficam dentro de .diagram, que rola na horizontal.
        rehypeDiagramWrap,
        // Tabelas do Markdown ficam dentro de .table-wrap (rolagem horizontal no celular).
        rehypeTableWrap,
      ],
    }),
  },
});
