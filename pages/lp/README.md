# Landing pages de tráfego pago (`/lp/`)

Silo de páginas de conversão para anúncios (Google Ads, Meta, etc.). Objetivo separado do SEO orgânico (`subs-aparelhos/`).

## Convenção

| Onde | O quê |
|------|--------|
| `pages/lp/<slug>.tsx` | Implementação completa (TSX, seções, CTAs) |
| `components/Landing/` | Shell mínimo (logo + rodapé sem nav institucional) |
| `lib/routes.ts` → `LP_ROUTES` | URLs centralizadas para o time/anúncios |

URL pública: `/lp/<slug>/` (export estático; **não** filtrar no `exportPathMap`).

## Isolamento (obrigatório)

1. Usar `LandingShell` — **não** usar `Header` institucional
2. `getSEOMeta({ noindex: true })` (e/ou `NextSeo` noindex/nofollow)
3. **Não** registrar em `scripts/lib/content-index.mjs` (sitemap / llms.txt)
4. **Não** linkar a partir do Header, Footer ou páginas indexáveis do site
5. `robots.txt` já contém `Disallow: /lp/`

## Páginas

| Slug | URL pública | Status |
|------|-------------|--------|
| `piloto` | `/lp/piloto/` | Placeholder (scaffold) |
| `americana-philips` | `/lp/americana-philips/` | Conversão Americana + Philips HearLink |

### Brief de fotos (Americana) — produção posterior

Pasta sugerida: `public/images/auditik/lp/americana/`.

1. **Fachada / entrada da unidade Americana** — dia claro, placa Auditik legível, ângulo de rua; horizontal 16:9; uso: prova local.
2. **Sala de atendimento Americana** — interior acolhedor, sem rostos identificáveis sem autorização; uso: trocar `sala_atendimento` genérica.
3. **Fono + paciente (com termo)** — conversa/orientação de aparelho, luz natural; uso: seção “como funciona” ou prova social visual.
4. **Close discreto HearLink no uso cotidiano** — pessoa 55–70 em conversa familiar ou TV (bank Philips ok enquanto 1–3 não existirem).
5. **Selo composto “Distribuidor autorizado Philips · Americana”** — arte gráfica (logo Philips + texto); uso: trust strip hero.

Enquanto isso, a LP reutiliza assets Philips/Auditik existentes.

## Adicionar nova LP

1. Criar `pages/lp/<slug>.tsx` com `LandingShell` + `noindex`
2. Registrar em `LP_ROUTES` em `lib/routes.ts`
3. Não adicionar ao sitemap
