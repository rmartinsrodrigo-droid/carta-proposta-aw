<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Carta Proposta · a|w — contexto do projeto

Plataforma web onde o **RH da Athié Wohnrath** preenche os dados de um candidato aprovado (nome, cargo, salário, benefícios, datas) e a plataforma gera um **link exclusivo** que abre uma carta proposta bonita, mobile-first, na identidade AW2026. O RH copia o link e manda no braço pro candidato (WhatsApp/email). Substitui o PDF de proposta por uma experiência de aceite.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind 4) — hospedado na **Vercel**.
- **Supabase** — Postgres + Auth (magic-link pro RH) + Row-Level Security.
- **Sem serviço de email.** A plataforma NÃO envia. O RH copia o link.
- **Sem TI da AW.** Autonomia total — nada de Entra ID, domínio corporativo AW ou Azure enterprise.

## Restrições operacionais (inegociáveis)

- **Nada depende do TI da AW.** Não propor Entra ID, SharePoint, Dataverse, Azure enterprise, domínio athie-wohnrath.com.br.
- **Dado é sensível.** Salário e dados do candidato — token opaco, assinado, com expiração. Secrets só no server (Vercel Env). Nunca commitar `.env.local`.
- **Sem enumeração previsível de token.** Slug do nome no path é enfeite legível — a segurança está no token.

## Fluxo do link e estados de proposta

Formato: `/proposta/<slug-do-nome>/<token>`.

Estados rastreados em Postgres:
1. `rascunho` — RH editando.
2. `pendente` — link gerado, ainda não aberto.
3. `aberta` — candidato abriu (grava `abriu_em`, User-Agent).
4. `aceita` — candidato clicou Aceitar (grava `aceita_em`, IP).
5. `recusada` — candidato clicou Recusar (grava `recusada_em`, motivo opcional).
6. `expirada` — passou de `validade_em`.

Toda mudança de estado grava linha em `eventos_proposta` (audit trail).

## Identidade AW2026 (aplicar em tudo)

Fonte: **Gotham** (fallback web **Montserrat** via Google Fonts). Nunca Helvetica.

```css
--aw-preto:#000000; --aw-grafite:#56585A; --aw-prata:#94A3A9; --aw-branco:#FFFFFF;
--aw-tiffany:#A1E0DD;        /* PROTAGONISTA — mira ~40% da composição */
--aw-tiffany-claro:#D7F0EE; --aw-tiffany-medio:#A9DDD9; --aw-tiffany-forte:#79CBC6;
```

Regras: Tiffany domina; **só as 8 cores oficiais** (zero terroso/âmbar/vermelho); **texto preto sobre Tiffany**; fundo escuro = preto/grafite com texto branco; cantos vivos (radius 0); texto alinhado à esquerda; 1 headline por seção. Logo só preto ou branco, nunca colorido/girado/com efeito.

Fonte da verdade visual: `prototipo/index.html` (single-file HTML original, com o design já polido). Portar de lá.

## Campos variáveis (o que o RH preenche)

Nome · Cargo · Área/Diretoria · Gestor(a) · Modelo (CLT/PJ/Estágio/Aprendiz) · Salário mensal · Jornada · Local/modelo de trabalho · Início previsto · Validade da proposta · Benefícios (lista) · Remetente/time responsável.

## Convenções

- **PT-BR** em tudo (UI, mensagens, código de negócio). Comentários só quando o *porquê* não é óbvio.
- Direto, informal, sem verbosidade. Rodrigo revisa por resultado, não linha a linha.
- Commit messages em PT-BR, imperativo curto (`adiciona schema propostas`).

## Comandos

```powershell
npm run dev     # localhost:3000
npm run build   # build produção
npm run lint    # ESLint
```

`.env.local` local; secrets em produção via Vercel Env.
