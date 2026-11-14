---
titulo: "Monólito ou microsserviços: como eu decido no dia a dia"
descricao: "Modelo de artigo no formato ADR. Copie este arquivo, renomeie e troque o conteúdo."
data: 2026-12-01
tipo: ADR
tags: [arquitetura, trade-offs]
# video: ID-do-YouTube
rascunho: true
---

<!--
  MODELO DE ARTIGO
  - Arquivos que começam com "_" são ignorados pelo site. Copie para um nome sem "_",
    por exemplo "monolito-ou-microsservicos.md". O nome do arquivo vira a URL:
    feliperigler.dev/artigos/monolito-ou-microsservicos/
  - "rascunho: true" esconde o artigo em produção (aparece só no `npm run dev`).
  - Cada "## Título" vira um item do índice lateral.
-->

[Lide em duas frases: o problema que motivou a decisão e o que o leitor vai levar daqui.]

## Contexto

[Qual era o sistema, o tamanho do time e o que estava doendo. Concreto: o que acontecia, com que frequência, quem sentia.]

## Forças em jogo

- [Força 1: ex. velocidade de entrega]
- [Força 2: ex. custo de operação]
- [Restrição dura: ex. compliance]

## Opções consideradas

| Opção | Ganha | Perde |
| --- | --- | --- |
| A // [opção] | [benefício] | [custo] |
| B // [opção] | [benefício] | [custo] |
| C // [escolhida] | [benefício] | [custo aceito] |

## Decisão

[Uma frase direta com o que foi decidido. Depois, o raciocínio.]

```php
// trecho de código ou config que ilustra a decisão
```

## Consequências

[O que melhorou, o que piorou e o que vocês passaram a monitorar.]

<aside class="redteam">

## Como um atacante veria isso

[Onde essa arquitetura é mais exposta, o que um atacante tentaria primeiro e qual controle foi colocado no desenho. Sem comandos de ataque: a lição para quem constrói.]

</aside>
