# feliperigler.dev

Site pessoal de Felipe Rigler: currículo, portfólio, artigos e vídeos sobre arquitetura no dia a dia.
Feito com [Astro](https://astro.build) como site 100% estático e publicado na Cloudflare.
Identidade visual: **Red Team Ops** (escuro, vermelho, monoespaçado, HUD e terminal).

```
PENSE COMO O ATACANTE. CONSTRUA COMO QUEM DEFENDE.
```

## Rodar no seu computador

Precisa do **Node.js 22.12 ou mais novo** (`node -v`).

```bash
npm install        # instala as dependências e cria o package-lock.json
npm run dev        # abre em http://localhost:4321
npm run build      # gera o site final em dist/
npm run preview    # serve o dist/ para conferir antes de publicar
```

No `npm run dev`, os rascunhos (`rascunho: true`) aparecem. No site publicado, não.

## Onde fica cada coisa

| Quero mudar... | Arquivo |
| --- | --- |
| Links (GitHub, YouTube, e-mail), PDF do currículo | `src/data/site.ts` |
| Resumo, formação e competências | `src/data/curriculo.ts` |
| Experiências profissionais | `src/content/experiencias.yaml` |
| Cursos livres (Training Log) | `src/content/cursos.yaml` |
| Artigos | `src/content/artigos/*.md` |
| Estudos de caso (portfólio) | `src/content/casos/*.md` |
| Vídeos | `src/content/videos.yaml` |
| Cores, fontes, animações | `src/styles/global.css` |
| Foto | `public/images/felipe-hero.jpg` |
| Cabeçalhos de segurança | `public/_headers` |

Regra do currículo: **competências são só o que foi usado em produção**. Cursos ficam no Training Log e nunca viram competência.

## Publicar conteúdo

Todo conteúdo novo é um commit. Ao dar `git push` na `main`, a Cloudflare faz o build e publica em 1 ou 2 minutos.
Dá para fazer pelo celular, editando os arquivos direto no GitHub.

**Artigo novo:** copie `src/content/artigos/_modelo-adr.md` para um nome sem `_` (ex.: `race-conditions-na-bilhetagem.md`),
preencha e troque `rascunho: true` para `false`. O nome do arquivo vira a URL `/artigos/race-conditions-na-bilhetagem/`.
Cada `## Título` entra no índice lateral. A caixa "Red Team View" é o bloco `<aside class="redteam">`.

**Estudo de caso:** mesmo processo, a partir de `src/content/casos/_modelo-caso.md`. O caso com `destaque: true` aparece grande no topo do portfólio.

**Vídeo:** suba no YouTube e adicione um item em `src/content/videos.yaml` (o arquivo tem um exemplo comentado).
Para mostrar o vídeo dentro de um artigo, coloque `video: ID-do-YouTube` no topo do artigo.

**Curso:** adicione um item em `src/content/cursos.yaml` com `id` novo (ex.: `c116`).
Use `destaque: true` para ele aparecer no currículo.

**Experiência:** adicione um item em `src/content/experiencias.yaml` e ajuste o campo `ordem` (1 = mais recente).
Mova o `atual: true` para o emprego atual.

## Deploy na Cloudflare (primeira vez)

O site é estático: não tem servidor, banco de dados nem código rodando na Cloudflare. Ela só serve a pasta `dist/`.

1. **GitHub:** crie um repositório vazio (ex.: `feliperigler.dev`). Na pasta do projeto, rode `npm install` uma vez
   (gera o `package-lock.json`, que o CI precisa), confira com `npm run build` e faça o primeiro push:
   ```bash
   git init -b main
   git add .
   git commit -m "feat: site v1.0"
   git remote add origin git@github.com:SEU-USUARIO/feliperigler.dev.git
   git push -u origin main
   ```
2. **Cloudflare:** no painel, vá em **Workers & Pages → Create → Import a repository**, conecte o GitHub e escolha o repositório.
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
   - A configuração está em `wrangler.jsonc` (assets em `./dist`, página 404 própria).
3. **Domínio:** com `feliperigler.dev` na Cloudflare (comprado no Cloudflare Registrar ou com os nameservers apontados para ela),
   abra o Worker **feliperigler → Settings → Domains & Routes → Add → Custom domain** e informe `feliperigler.dev`.
   O `.dev` exige HTTPS, e a Cloudflare já entrega o certificado.

A partir daí, cada push na `main` publica sozinho, e cada pull request roda o CI (`.github/workflows/ci.yml`).

Também dá para publicar direto do seu computador: `npx wrangler login` uma vez e depois `npm run deploy`.

## Segurança

- **CSP estrita** em `public/_headers`: só scripts e estilos do próprio domínio. O build nunca gera `<script>` ou `<style>` inline
  (`astro.config.mjs`), e o CI falha se aparecer algum.
- Vídeos usam `youtube-nocookie.com`. Nenhum script de terceiros, nenhum rastreador.
- HSTS com preload, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy` e `Permissions-Policy`.
- O Dependabot abre PRs semanais para atualizar dependências, e o CI roda `npm audit`.

Para conferir os cabeçalhos depois do deploy: `curl -sI https://feliperigler.dev | grep -iE 'content-security|strict-transport'`
ou cole a URL em [securityheaders.com](https://securityheaders.com).

## Animações

Seguem os tokens de movimento do design system Red Team Ops: glitch de 280 ms, digitação de 12 ms por caractere,
mira travando em 420 ms e transição entre páginas com corte de glitch (View Transitions, sem JavaScript).
Animamos só `transform`, `opacity` e `clip-path`. Quem usa "reduzir movimento" no sistema vê tudo estático.

## Atualizar o Astro

```bash
npx @astrojs/upgrade
```

Fontes: DejaVu Sans Mono (licença livre em `public/fonts/LICENSE-DejaVu.txt`).
