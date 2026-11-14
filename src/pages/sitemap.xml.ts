import type { APIRoute } from 'astro';
import { artigos, casos } from '../lib/colecoes';

export const GET: APIRoute = async ({ site }) => {
  const base = site?.toString().replace(/\/$/, '') ?? '';
  const fixas = ['/', '/curriculo/', '/cursos/', '/portfolio/', '/artigos/', '/videos/'];
  const dinamicas = [
    ...(await artigos()).filter((a) => !a.data.rascunho).map((a) => `/artigos/${a.id}/`),
    ...(await casos()).filter((c) => !c.data.rascunho).map((c) => `/portfolio/${c.id}/`),
  ];
  const urls = [...fixas, ...dinamicas].map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
