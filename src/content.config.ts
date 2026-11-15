import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

// Experiências profissionais (currículo). Ordem: a menor "ordem" aparece primeiro.
const experiencias = defineCollection({
  loader: file('src/content/experiencias.yaml'),
  schema: z.object({
    ordem: z.number(),
    cargo: z.string(),
    empresa: z.string(),
    periodo: z.string(),
    duracao: z.string(),
    modelo: z.string(),
    atual: z.boolean().default(false),
    papel: z.string().optional(),
    contexto: z.string(),
    entregas: z.array(z.string()),
    conquista: z.object({ texto: z.string(), status: z.string() }).optional(),
    stack: z.array(z.string()),
  }),
});

// Cursos livres (Training Log). "destaque: true" aparece no currículo.
const cursos = defineCollection({
  loader: file('src/content/cursos.yaml'),
  schema: z.object({
    nome: z.string(),
    instituicao: z.string(),
    data: z.string(), // AAAA-MM
    area: z.enum(['backend', 'ia', 'soft', 'frontend', 'arquitetura', 'dados', 'devops', 'outros']),
    destaque: z.boolean().default(false),
    rotulo: z.string().optional(), // nome alternativo no destaque do currículo
  }),
});

// Artigos em Markdown, um arquivo por artigo.
const artigos = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/artigos' }),
  schema: z.object({
    titulo: z.string(),
    descricao: z.string(),
    data: z.coerce.date(),
    tipo: z.enum(['ADR', 'FIELD NOTES', 'INCIDENT REPORT', 'THREAT MODEL', 'SRE', 'DEBRIEF']).default('FIELD NOTES'),
    tags: z.array(z.string()).default([]),
    video: z.string().optional(), // ID do vídeo no YouTube
    rascunho: z.boolean().default(false),
  }),
});

// Estudos de caso do portfólio, um arquivo por caso.
const casos = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/casos' }),
  schema: z.object({
    titulo: z.string(),
    resumo: z.string(),
    area: z.enum(['ARQUITETURA', 'DEVOPS', 'SRE', 'SECURITY']),
    ordem: z.number().default(99),
    destaque: z.boolean().default(false),
    problema: z.string(),
    restricoes: z.string(),
    decisao: z.string(),
    resultado: z.string(),
    rascunho: z.boolean().default(false),
  }),
});

// Vídeos do YouTube.
const videos = defineCollection({
  loader: file('src/content/videos.yaml'),
  schema: z.object({
    titulo: z.string(),
    youtube: z.string(), // ID do vídeo
    serie: z.enum(['ARQUITETURA AO VIVO', 'INCIDENT REPORT', 'RED TEAM VIEW']),
    episodio: z.number(),
    data: z.coerce.date(),
    duracao: z.string().optional(), // ex.: '18:42'
    artigo: z.string().optional(), // id do artigo relacionado
  }),
});

export const collections = { experiencias, cursos, artigos, casos, videos };
