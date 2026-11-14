// Configurações gerais do site. Links vazios ('') não aparecem no site.
export const site = {
  nome: 'Felipe Rigler',
  nomeCompleto: 'Felipe Rigler Perucci Machado do Amaral',
  titulo: 'Felipe Rigler // Arquiteto de Software',
  descricao:
    'Engenheiro de software sênior e arquiteto. Currículo, portfólio, artigos e vídeos sobre como resolvo problemas de arquitetura do dia a dia.',
  url: 'https://feliperigler.dev',
  slogan: 'PENSE COMO O ATACANTE. CONSTRUA COMO QUEM DEFENDE.',
  links: {
    linkedin: 'https://www.linkedin.com/in/felipe-perucci-machado-do-amaral',
    github: '', // ex.: 'https://github.com/feliperigler'
    youtube: '', // ex.: 'https://www.youtube.com/@feliperigler'
    email: '', // ex.: 'contato@feliperigler.dev'
  },
  // Caminho de um PDF do currículo dentro de public/ (ex.: '/curriculo-felipe-rigler.pdf').
  curriculoPdf: '',
};

export const nav = [
  { href: '/', label: 'HOME' },
  { href: '/curriculo/', label: 'CURRÍCULO' },
  { href: '/portfolio/', label: 'PORTFÓLIO' },
  { href: '/artigos/', label: 'ARTIGOS' },
  { href: '/videos/', label: 'VÍDEOS' },
];
