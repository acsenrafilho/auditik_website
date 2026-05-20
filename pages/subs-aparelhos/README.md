# Páginas satélite do silo Aparelhos Auditivos

Implementações das landing pages SEO ligadas à página pilar [`/aparelhos/`](../aparelhos.tsx).

## Convenção

| Onde | O quê |
|------|--------|
| `pages/subs-aparelhos/<slug>.tsx` | Implementação (copy, seções, schema) |
| `pages/<slug>.tsx` | Stub de re-export (1 linha) para URL flat em produção |
| `lib/routes.ts` → `SUBS_APARELHOS_ROUTES` | URLs públicas centralizadas |

O `exportPathMap` em `next.config.js` **não exporta** rotas `/subs-aparelhos/*` — apenas os stubs na raiz de `pages/` geram HTML estático.

## Satélites publicadas

| Slug | URL pública |
|------|-------------|
| `aparelhos-auditivos-em-piracicaba` | `/aparelhos-auditivos-em-piracicaba/` |
| `preco-aparelho-auditivo` | `/preco-aparelho-auditivo/` |
| `financiamento-aparelho-auditivo` | `/financiamento-aparelho-auditivo/` |
| `aparelho-auditivo-invisivel` | `/aparelho-auditivo-invisivel/` |
| `aparelho-auditivo-recarregavel` | `/aparelho-auditivo-recarregavel/` |
| `aparelho-auditivo-com-bluetooth` | `/aparelho-auditivo-com-bluetooth/` |

## Adicionar nova satélite

1. Criar `pages/subs-aparelhos/<slug>.tsx`
2. Criar `pages/<slug>.tsx` com `export { default } from "./subs-aparelhos/<slug>";`
3. Registrar em `SUBS_APARELHOS_ROUTES` e em `scripts/generate-sitemap.mjs` (`staticPaths`)
