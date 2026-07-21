-- Carta Proposta · a|w — schema inicial
-- Rodar no Supabase SQL Editor (Project → SQL → New query → colar → Run)

-- =========================================================================
-- Extensões
-- =========================================================================
create extension if not exists pgcrypto;   -- gen_random_uuid()
create extension if not exists citext;     -- email case-insensitive

-- =========================================================================
-- ENUM de status da proposta
-- =========================================================================
do $$ begin
  create type proposta_status as enum (
    'rascunho', 'pendente', 'aberta', 'aceita', 'recusada', 'expirada'
  );
exception when duplicate_object then null; end $$;

-- =========================================================================
-- usuarios_rh_autorizados
-- Lista fechada de emails do RH que podem fazer login no painel.
-- O magic-link do Supabase Auth só será aceito se o email estiver aqui.
-- =========================================================================
create table if not exists public.usuarios_rh_autorizados (
  email citext primary key,
  nome  text not null,
  ativo boolean not null default true,
  criado_em timestamptz not null default now()
);

comment on table public.usuarios_rh_autorizados
  is 'Lista fechada de emails do RH autorizados a acessar o painel.';

-- =========================================================================
-- propostas
-- =========================================================================
create table if not exists public.propostas (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null,                       -- ex.: 'aliki-alves' (normalizado)
  status        proposta_status not null default 'rascunho',

  -- Dados do candidato
  candidato_nome        text not null,
  candidato_email       citext,
  candidato_telefone    text,

  -- Dados da vaga
  cargo                 text not null,
  area                  text,
  gestor_nome           text,
  modelo_contratacao    text,                        -- CLT, PJ, Estágio, Aprendiz
  salario_centavos      bigint,                      -- guardar em centavos, formatar na UI
  moeda                 text not null default 'BRL',
  jornada               text,
  local_trabalho        text,                        -- Presencial/Híbrido/Remoto + cidade
  inicio_previsto       date,
  validade_em           timestamptz not null,        -- expiração do token

  -- Conteúdo variável extra (benefícios etc.)
  beneficios            jsonb not null default '[]'::jsonb,
  remetente_time        text,
  observacoes           text,

  -- Rastreio
  criada_por            citext not null references public.usuarios_rh_autorizados(email) on update cascade,
  criada_em             timestamptz not null default now(),
  atualizada_em         timestamptz not null default now(),
  abriu_em              timestamptz,
  aceita_em             timestamptz,
  recusada_em           timestamptz,
  recusa_motivo         text,

  -- Metadados da abertura (não-sensíveis)
  primeira_ip           inet,
  primeiro_user_agent   text
);

create index if not exists propostas_status_idx      on public.propostas (status);
create index if not exists propostas_criada_em_idx   on public.propostas (criada_em desc);
create index if not exists propostas_slug_idx        on public.propostas (slug);
create index if not exists propostas_validade_idx    on public.propostas (validade_em);

-- Trigger: mantém atualizada_em
create or replace function public.tg_touch_atualizada_em()
returns trigger language plpgsql as $$
begin
  new.atualizada_em := now();
  return new;
end $$;

drop trigger if exists propostas_touch on public.propostas;
create trigger propostas_touch
  before update on public.propostas
  for each row execute function public.tg_touch_atualizada_em();

-- =========================================================================
-- eventos_proposta
-- Audit trail imutável de toda mudança de estado / interação.
-- =========================================================================
create table if not exists public.eventos_proposta (
  id            bigserial primary key,
  proposta_id   uuid not null references public.propostas(id) on delete cascade,
  tipo          text not null,       -- 'criada', 'link_gerado', 'aberta', 'aceita', 'recusada', 'expirada', 'editada'
  detalhes      jsonb not null default '{}'::jsonb,
  ip            inet,
  user_agent    text,
  ator_email    citext,              -- email do RH que gerou/editou; null se ação do candidato
  criado_em     timestamptz not null default now()
);

create index if not exists eventos_prop_idx     on public.eventos_proposta (proposta_id, criado_em desc);
create index if not exists eventos_tipo_idx     on public.eventos_proposta (tipo);

comment on table public.eventos_proposta
  is 'Audit trail de todas as ações sobre uma proposta. Nunca UPDATE/DELETE — só INSERT.';

-- =========================================================================
-- Row-Level Security
-- =========================================================================
alter table public.usuarios_rh_autorizados enable row level security;
alter table public.propostas               enable row level security;
alter table public.eventos_proposta        enable row level security;

-- usuarios_rh_autorizados: só service_role gerencia (nunca via anon).
-- (não criar policy pra anon/authenticated — negativa por padrão.)

-- propostas:
--   - RH autenticado (auth.jwt() -> email) só vê propostas onde é ele próprio (criada_por)
--     OU está na tabela de autorizados (todos veem todas — decisão de produto).
--   - Anon (candidato) NÃO acessa direto — vai via Route Handler com service_role
--     validando o token HMAC. Nenhuma policy pra anon = negado.
create policy propostas_rh_select on public.propostas
  for select
  to authenticated
  using (
    exists (
      select 1 from public.usuarios_rh_autorizados u
      where u.email = (auth.jwt() ->> 'email')::citext
        and u.ativo = true
    )
  );

create policy propostas_rh_insert on public.propostas
  for insert
  to authenticated
  with check (
    exists (
      select 1 from public.usuarios_rh_autorizados u
      where u.email = (auth.jwt() ->> 'email')::citext
        and u.ativo = true
    )
    and criada_por = (auth.jwt() ->> 'email')::citext
  );

create policy propostas_rh_update on public.propostas
  for update
  to authenticated
  using (
    exists (
      select 1 from public.usuarios_rh_autorizados u
      where u.email = (auth.jwt() ->> 'email')::citext
        and u.ativo = true
    )
  )
  with check (true);

-- eventos: RH vê tudo (leitura). Insert só via service_role.
create policy eventos_rh_select on public.eventos_proposta
  for select
  to authenticated
  using (
    exists (
      select 1 from public.usuarios_rh_autorizados u
      where u.email = (auth.jwt() ->> 'email')::citext
        and u.ativo = true
    )
  );

-- =========================================================================
-- Seed inicial do RH autorizado (troca depois pelos emails reais)
-- =========================================================================
insert into public.usuarios_rh_autorizados (email, nome)
values ('rodrigo.martins@awnet.com.br', 'Rodrigo Martins')
on conflict (email) do nothing;
