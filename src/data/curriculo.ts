// Dados do currículo que não são experiências nem cursos.
// Regra: competências são só o que já foi usado em produção, em trabalho real.
// Cursos ficam em src/content/cursos.yaml e nunca entram aqui.

export const resumo = {
  barra: 'ENG. DE SOFTWARE SÊNIOR // 14 ANOS',
  texto:
    'Engenheiro de software sênior com 14 anos em tecnologia, especialista em backend com PHP e Laravel e em arquitetura de software. Atuo do entendimento dos requisitos à produção, passando por integrações, bancos de dados, infraestrutura, cloud, DevOps e SRE. Hoje combino desenvolvimento hands-on com arquitetura de soluções e liderança técnica.',
  principio:
    'Antes de escolher a tecnologia, quero entender o problema. Uma boa solução precisa ser sustentável, confiável e adequada ao contexto em que será usada.',
};

export const formacao = [
  { status: '[~] EM ANDAMENTO', instituicao: 'IMPACTA', curso: 'Pós em Cyber Offensive & Red Team Operations' },
  { status: '[~] EM ANDAMENTO', instituicao: 'FULL CYCLE', curso: 'MBA em Arquitetura de Software, Soluções, DevOps e SRE' },
  { status: '[+] CONCLUÍDO', instituicao: 'IMPACTA', curso: 'Análise e Desenvolvimento de Sistemas' },
];

export const competencias: { grupo: string; itens: string[]; estudo?: boolean }[] = [
  {
    grupo: 'backend',
    itens: ['PHP', 'Laravel', 'APIs REST', 'OAuth 2.0', 'Swagger', 'SOAP', 'RabbitMQ / Filas', 'Redis / Horizon', 'Webhooks', 'FTP/SFTP/SMB', 'PHPUnit', 'Testes unit/integração/E2E'],
  },
  {
    grupo: 'arquitetura',
    itens: ['Arquitetura de software', 'Arquitetura de soluções', 'Clean Architecture', 'Idempotência / concorrência', 'DDD', 'SOLID', 'Design Patterns', 'Microsserviços', 'UML', 'Clean Code'],
  },
  { grupo: 'dados', itens: ['PostgreSQL', 'MySQL', 'SQL Server', 'Oracle', 'IBM Db2', 'Modelagem (DER/MER)'] },
  {
    grupo: 'devops',
    itens: ['Docker', 'Nginx', 'GitHub Actions', 'Runners self-hosted', 'On-premises', 'CI/CD', 'AWS', 'Linux', 'Git / GitHub / Bitbucket'],
  },
  { grupo: 'frontend', itens: ['JavaScript', 'Vue.js', 'Tailwind CSS', 'jQuery', 'HTML5/CSS3', 'Bootstrap'] },
  { grupo: 'security', itens: ['MFA', 'Controle de acesso', 'Auditoria', 'Logs estruturados', 'Rastreabilidade'] },
  { grupo: 'ia', itens: ['Agentes de desenvolvimento', 'Specs no estilo RFC', 'Prompt engineering'] },
  { grupo: 'em estudo', itens: ['Go', 'Red team / segurança ofensiva'], estudo: true },
];

// Áreas dos cursos livres, na ordem em que aparecem nos filtros.
export const areasCursos: Record<string, string> = {
  backend: 'BACKEND',
  ia: 'INTELIGÊNCIA ARTIFICIAL',
  soft: 'SOFT SKILLS',
  frontend: 'FRONTEND',
  arquitetura: 'ARQUITETURA',
  dados: 'DADOS',
  devops: 'CLOUD/DEVOPS',
  outros: 'OUTROS',
};
