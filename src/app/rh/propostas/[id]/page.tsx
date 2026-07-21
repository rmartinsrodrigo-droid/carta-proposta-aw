import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPropostaById, fmtBRL, fmtData, fmtDataHora } from '@/lib/mock/propostas'
import { StatusBadge } from '@/components/rh/StatusBadge'
import { CopiarLinkBtn } from './CopiarLinkBtn'

export default async function DetalheProposta({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const p = getPropostaById(id)
  if (!p) notFound()

  const linkPathRelativo = `/proposta/${p.slug}/${p.id}`
  const linkCandidato = `https://carta-proposta-aw.vercel.app${linkPathRelativo}`
  const rascunho = p.status === 'rascunho'

  const eventos = [
    { tipo: 'criada', quando: p.criada_em, ator: p.criada_por, detalhe: 'Proposta rascunhada.' },
    ...(p.status !== 'rascunho'
      ? [{ tipo: 'link_gerado', quando: p.criada_em, ator: p.criada_por, detalhe: 'Link único gerado.' }]
      : []),
    ...(p.abriu_em
      ? [{ tipo: 'aberta', quando: p.abriu_em, ator: null, detalhe: 'Candidato abriu o link.' }]
      : []),
    ...(p.aceita_em
      ? [{ tipo: 'aceita', quando: p.aceita_em, ator: null, detalhe: 'Candidato clicou em Aceitar. Email enviado.' }]
      : []),
    ...(p.recusada_em
      ? [
          {
            tipo: 'recusada',
            quando: p.recusada_em,
            ator: null,
            detalhe: p.recusa_motivo || 'Candidato recusou a proposta.',
          },
        ]
      : []),
  ].sort((a, b) => new Date(b.quando).getTime() - new Date(a.quando).getTime())

  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-aw-grafite mb-4">
        <Link href="/rh/propostas" className="hover:text-aw-preto">Propostas</Link>
        <span>›</span>
        <span className="text-aw-preto font-medium">{p.candidato_nome}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <StatusBadge status={p.status} />
            <span className="text-[12px] text-aw-grafite">ID {p.id}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{p.candidato_nome}</h1>
          <p className="text-aw-grafite mt-1">
            {p.cargo} · {p.area}
          </p>
        </div>
        <div className="flex gap-2">
          {(p.status === 'rascunho' || p.status === 'pendente') && (
            <button className="inline-flex items-center gap-2 bg-white border border-aw-preto text-aw-preto px-4 py-2.5 text-sm font-semibold hover:bg-aw-preto hover:text-aw-branco transition-colors">
              Editar
            </button>
          )}
          <Link
            href={linkPathRelativo}
            target="_blank"
            className="inline-flex items-center gap-2 bg-aw-preto text-aw-branco px-4 py-2.5 text-sm font-semibold hover:bg-aw-grafite transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Ver como candidato
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Coluna esquerda — dados */}
        <div className="col-span-2 space-y-6">
          {/* Link do candidato — sempre visível */}
          <div className="bg-aw-preto text-aw-branco p-6">
            <div className="flex items-center justify-between gap-4 mb-2">
              <div className="text-[11px] tracking-[0.18em] uppercase text-aw-tiffany">
                Link do candidato
              </div>
              {rascunho && (
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-white/10 text-aw-prata">
                  Só prévia — ainda não enviado
                </span>
              )}
            </div>
            <div className="text-sm font-mono break-all mb-4 text-white/85">{linkCandidato}</div>
            <div className="flex flex-wrap gap-2 items-center">
              <CopiarLinkBtn link={linkCandidato} />
              <Link
                href={linkPathRelativo}
                target="_blank"
                className="inline-flex items-center gap-2 bg-transparent border border-white/25 text-aw-branco px-4 py-2.5 text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Abrir no browser
              </Link>
            </div>
            <div className="text-[12px] text-aw-prata mt-4">
              {rascunho
                ? 'Este link é apenas pra você conferir como a carta vai ficar antes de enviar. Quando você Gerar link, um token oficial com validade é emitido.'
                : `Válido até ${fmtData(p.validade_em)}. Copia e manda por WhatsApp ou email pro candidato.`}
            </div>
          </div>

          {/* Dados da proposta */}
          <div className="bg-white border border-aw-prata/30">
            <div className="px-6 py-4 border-b border-aw-prata/30">
              <div className="text-[11px] tracking-[0.18em] uppercase text-aw-tiffany-forte">
                Dados da proposta
              </div>
              <div className="text-base font-semibold mt-0.5">O que o candidato vai ver</div>
            </div>
            <dl className="divide-y divide-aw-prata/20">
              <Row label="Modelo" value={p.modelo} />
              <Row label="Cargo" value={p.cargo} />
              <Row label="Área" value={p.area} />
              <Row label="Gestor" value={p.gestor} />
              <Row label="Email do gestor" value={p.gestor_email} />
              <Row label="Celular do gestor" value={p.gestor_telefone} />
              <Row label="Salário mensal" value={fmtBRL(p.salario_centavos)} bold />
              <Row label="Jornada" value={p.jornada} />
              <Row label="Local / modelo" value={p.local} />
              <Row label="Início previsto" value={fmtData(p.inicio)} />
              <Row label="Validade da proposta" value={fmtData(p.validade_em)} />
              <Row label="Benefícios" value={p.beneficios.join(' · ')} />
            </dl>
          </div>
        </div>

        {/* Coluna direita — audit trail */}
        <div className="space-y-6">
          <div className="bg-white border border-aw-prata/30">
            <div className="px-5 py-4 border-b border-aw-prata/30">
              <div className="text-[11px] tracking-[0.18em] uppercase text-aw-tiffany-forte">
                Histórico
              </div>
              <div className="text-base font-semibold mt-0.5">Linha do tempo</div>
            </div>
            <ol className="p-5 space-y-4">
              {eventos.map((e, i) => (
                <li key={i} className="relative pl-6">
                  <span
                    className={`absolute left-0 top-1.5 w-3 h-3 border-2 border-white ring-2 ${
                      e.tipo === 'aceita'
                        ? 'bg-aw-tiffany ring-aw-tiffany'
                        : e.tipo === 'recusada'
                        ? 'bg-red-500 ring-red-500'
                        : e.tipo === 'aberta'
                        ? 'bg-amber-400 ring-amber-400'
                        : 'bg-aw-prata ring-aw-prata'
                    }`}
                  />
                  <div className="text-[11px] tracking-[0.14em] uppercase font-semibold text-aw-grafite">
                    {e.tipo.replace('_', ' ')}
                  </div>
                  <div className="text-sm mt-0.5">{e.detalhe}</div>
                  <div className="text-[11px] text-aw-grafite mt-1">
                    {fmtDataHora(e.quando)}
                    {e.ator && ` · ${e.ator}`}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Ações destrutivas */}
          <div className="bg-white border border-aw-prata/30 p-5">
            <div className="text-[11px] tracking-[0.18em] uppercase text-aw-grafite mb-3">
              Ações
            </div>
            <div className="space-y-2">
              <button className="w-full text-left text-sm py-2 px-3 hover:bg-aw-bg transition-colors">
                Renovar validade
              </button>
              <button className="w-full text-left text-sm py-2 px-3 hover:bg-aw-bg transition-colors">
                Duplicar proposta
              </button>
              <button className="w-full text-left text-sm py-2 px-3 text-red-700 hover:bg-red-50 transition-colors">
                Cancelar proposta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex px-6 py-3 gap-6">
      <dt className="text-[11px] tracking-[0.14em] uppercase text-aw-grafite w-40 shrink-0 pt-0.5">
        {label}
      </dt>
      <dd className={`flex-1 text-sm ${bold ? 'font-bold text-base' : ''}`}>{value}</dd>
    </div>
  )
}
