import { getCollection } from 'astro:content';

// Rascunhos aparecem no `npm run dev` e ficam fora do site publicado.
const publicado = (entry: { data: { rascunho?: boolean } }) => import.meta.env.DEV || !entry.data.rascunho;

export async function artigos() {
  return (await getCollection('artigos', publicado)).sort((a, b) => b.data.data.valueOf() - a.data.data.valueOf());
}

export async function casos() {
  return (await getCollection('casos', publicado)).sort((a, b) => a.data.ordem - b.data.ordem);
}

export async function videos() {
  return (await getCollection('videos')).sort((a, b) => b.data.data.valueOf() - a.data.data.valueOf());
}

export async function experiencias() {
  return (await getCollection('experiencias')).sort((a, b) => a.data.ordem - b.data.ordem);
}

export async function cursos() {
  return (await getCollection('cursos')).sort((a, b) => b.data.data.localeCompare(a.data.data));
}

export const formatarData = (d: Date) =>
  d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).toUpperCase();

export const minutosDeLeitura = (texto = '') => Math.max(1, Math.round(texto.split(/\s+/).length / 200));
