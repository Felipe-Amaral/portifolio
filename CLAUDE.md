# feliperigler.dev — instruções para o Claude

Site pessoal de Felipe Rigler (nome completo: Felipe Rigler Perucci Machado do Amaral): currículo, portfólio,
artigos e vídeos sobre arquitetura no dia a dia. Astro, 100% estático, publicado na Cloudflare (Workers Static Assets)
a cada push na `main`. Textos do site em português do Brasil.

## Comandos

- `npm run dev` — servidor local (rascunhos aparecem)
- `npm run build` — build de produção em `dist/`; rode sempre antes de dar a tarefa por concluída
- `npm run deploy` — build + `wrangler deploy` manual (normalmente quem publica é a Cloudflare)

## Onde fica cada dado

| Dado | Arquivo |
| --- | --- |
| Links, PDF do currículo, nome | `src/data/site.ts` |
| Resumo, formação, competências, áreas dos cursos | `src/data/curriculo.ts` |
| Experiências | `src/content/experiencias.yaml` (`ordem: 1` = mais recente; `atual: true` só no emprego atual) |
| Cursos livres (Training Log) | `src/content/cursos.yaml` (`id` sequencial `cNNN`; `destaque: true` aparece no currículo) |
| Artigos | `src/content/artigos/*.md` (modelo: `_modelo-adr.md`) |
| Estudos de caso | `src/content/casos/*.md` (modelo: `_modelo-caso.md`) |
| Vídeos | `src/content/videos.yaml` |
| Estilos, tokens e animações | `src/styles/global.css` |

Arquivos que começam com `_` são ignorados pelas coleções. `rascunho: true` esconde em produção.

## Regras de conteúdo

- **Competências = só o que o Felipe usou em produção, em trabalho real.** Cursos nunca viram competência
  (ex.: Java, C#, React foram só estudados). Itens em estudo ficam no grupo `em estudo` com `[~]`.
- Áreas dos cursos: `Dados` e `Inteligência Artificial` são **separadas**; nunca usar "Dados/IA".
- Não inventar números, resultados, datas ou clientes. O que faltar vira pergunta ao Felipe ou `[placeholder]`.
- Estudos de caso: Problema → Restrições → Decisão → Resultado + lição. Sem dados sensíveis de clientes.
- Tom: primeira pessoa, honesto, sem guru.

## Identidade visual: Red Team Ops

- Só tema escuro. Cores: `--void #05060c`, `--red #ff2640` (assinatura), `--cyan #3ce6ff` (mira/HUD/comandos `$`),
  `--green #5aff8c` (**uma única palavra de sucesso por página**), `--ink #f0f0f5`, `--ink-muted #969fb4`.
  Texto sobre vermelho é `--void`, nunca branco.
- Fonte única: DejaVu Sans Mono (Regular e Bold). Nada de cantos arredondados. Sem emoji; usar glifos `▌ // >> ▸ ◂ ● [+] [~] [!]`.
- Rótulos de HUD, títulos e comandos em inglês CAIXA ALTA (`MISSIONS // EXPERIÊNCIA`); mensagem e metadados em português.
- Título de página: lockup de 2 linhas (≤ 12 caracteres cada), a última em vermelho, seguido da barra vermelha.
- Terminal conta história, nunca ensina ataque: sem comandos de ataque reais, IPs ou dados de pessoas.

## Movimento

- Curto e seco: glitch 280 ms `steps(1)`, digitação 12 ms/caractere, mira 420 ms `cubic-bezier(.2,.8,.2,1)`.
- Animar só `transform`, `opacity` e `clip-path`. Loops só no `● REC`, no cursor e na barra "ao vivo" do Uptime.
- `prefers-reduced-motion: reduce` desliga tudo; sem JavaScript o conteúdo aparece completo.

## Segurança (não quebrar)

- CSP estrita em `public/_headers`: **nada de `<script>` ou `<style>` inline** e nenhum script de terceiros.
  Scripts vão em `src/scripts/*.ts` importados via `<script>` processado pelo Astro; estilos em `global.css`.
  Evite atributos `style=""` no markup (use classes).
- Links externos: `target="_blank"` com `rel="noopener noreferrer"` (com `me` nos perfis do Felipe).
- Vídeos só via `youtube-nocookie.com`. Imagens externas só de `i.ytimg.com` (liberado na CSP).
- Em templates `.astro`, não escreva `/*` em texto (o compilador lê como comentário); use `&#42;`.
