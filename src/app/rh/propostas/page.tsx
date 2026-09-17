'use client'

import Link from 'next/link'
import { useState } from 'react'
import { fmtBRL, fmtRelativo } from '@/lib/mock/propostas'
import { usePropostas, acoesPropostas } from '@/lib/mock/propostas-store'
import { StatusBadge } from '@/components/rh/StatusBadge'
import { AcoesProposta } from '@/components/rh/AcoesProposta'
import type { PropostaStatus } from '@/types/proposta'

const filtros: Array<{ label: string; status: PropostaStatus | 'todas' }> = [
  { label: 'Todas', status: 'todas' },
  { label: 'Rascunhos', status: 'rascunho' },
  { label: 'Pendentes', status: 'pendente' },
  { label: 'Abertas', status: 'aberta' },
  { label: 'Aceitas', status: 'aceita' },
  { label: 'Recusadas', status: 'recusada' },
  { label: 'Expiradas', status: 'expirada' },
  { label: 'Canceladas', status: 'cancelada' },
  { label: 'Email gerado', status: 'email_gerado' },
]

export default function PropostasPage() {
  const propostas = usePropostas()
  const [filtro, setFiltro] = useState<PropostaStatus | 'todas'>('todas')
  const [q, setQ] = useState('')

  const busca = q.trim().toLowerCase()

  const lista = propostas
    .filter((p) => (filtro === 'todas' ? true : p.status === filtro))
    .filter((p) =>
      busca
        ? p.candidato_nome.toLowerCase().includes(busca) ||
          p.cargo.toLowerCase().includes(busca) ||
          p.candidato_email.toLowerCase().includes(busca)
        : true
    )
    .sort((a, b) => new Date(b.atualizada_em).getTime() - new Date(a.atualizada_em).getTime())

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="min-w-0">
          <div className="text-[11px] tracking-[0.18em] uppercase text-aw-tiffany-forte">Propostas</div>
          <h1 className="text-2xl sm:text-3xl font-bold mt-1 tracking-tight">Todas as propostas</h1>
          <p className="text-aw-grafite mt-1 text-sm">
            {lista.length} de {propostas.length} propostas
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          {propostas.length === 0 && (
            <button
              type="button"
              onClick={() => acoesPropostas().reset()}
              className="inline-flex items-center justify-center gap-2 bg-white border border-aw-preto text-aw-preto px-4 py-3 text-sm font-semibold hover:bg-aw-preto hover:text-aw-branco transition-colors flex-1 sm:flex-initial"
            >
              Restaurar exemplos
            </button>
          )}
          <Link
            href="/rh/propostas/nova"
            className="inline-flex items-center justify-center gap-2 bg-aw-preto text-aw-branco px-5 py-3 text-sm font-semibold hover:bg-aw-grafite transition-colors flex-1 sm:flex-initial"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Nova proposta
          </Link>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nome, cargo ou email…"
          className="w-full sm:w-80 px-4 py-2.5 text-sm bg-white border border-aw-prata/40 focus:outline-none focus:border-aw-preto placeholder:text-aw-prata"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
        {filtros.map((f) => {
          const active = filtro === f.status
          return (
            <button
              key={f.status}
              type="button"
              onClick={() => setFiltro(f.status)}
              className={`px-3 sm:px-3.5 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider border transition-colors whitespace-nowrap ${
                active
                  ? 'bg-aw-preto text-aw-branco border-aw-preto'
                  : 'bg-white text-aw-grafite border-aw-prata/40 hover:border-aw-preto hover:text-aw-preto'
              }`}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      <div className="bg-white border border-aw-prata/30">
        {/* Tabela desktop (≥ lg) */}
        <table className="hidden lg:table w-full">
          <thead>
            <tr className="text-[11px] tracking-[0.14em] uppercase text-aw-grafite text-left">
              <th className="px-6 py-3 font-semibold">Candidato</th>
              <th className="px-6 py-3 font-semibold">Cargo / Área</th>
              <th className="px-6 py-3 font-semibold">Salário</th>
              <th className="px-6 py-3 font-semibold">Criada por</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold">Última mexida</th>
              <th className="px-6 py-3 font-semibold w-8"></th>
            </tr>
          </thead>
          <tbody>
            {lista.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-aw-grafite text-sm">
                  Nenhuma proposta encontrada com esses filtros.
                </td>
              </tr>
            )}
            {lista.map((p) => (
              <tr
                key={p.id}
                className="border-t border-aw-prata/20 hover:bg-aw-bg transition-colors"
              >
                <td className="px-6 py-3.5">
                  <Link
                    href={`/rh/propostas/${p.id}`}
                    className="font-semibold hover:text-aw-tiffany-forte"
                  >
                    {p.candidato_nome}
                  </Link>
                  <div className="text-[12px] text-aw-grafite truncate max-w-[220px]">
                    {p.candidato_email}
                  </div>
                </td>
                <td className="px-6 py-3.5 text-sm">
                  <div>{p.cargo}</div>
                  <div className="text-[12px] text-aw-grafite">{p.area}</div>
                </td>
                <td className="px-6 py-3.5 text-sm font-semibold whitespace-nowrap">
                  {fmtBRL(p.salario_centavos)}
                </td>
                <td className="px-6 py-3.5 text-[12px] text-aw-grafite">{p.criada_por}</td>
                <td className="px-6 py-3.5">
                  <StatusBadge status={p.status} />
                </td>
                <td className="px-6 py-3.5 text-sm text-aw-grafite whitespace-nowrap">
                  {fmtRelativo(p.atualizada_em)}
                </td>
                <td className="px-6 py-3.5">
                  <AcoesProposta proposta={p} modo="menu" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Cards mobile/tablet (< lg) */}
        <div className="lg:hidden divide-y divide-aw-prata/20">
          {lista.length === 0 && (
            <div className="px-4 py-12 text-center text-aw-grafite text-sm">
              Nenhuma proposta encontrada com esses filtros.
            </div>
          )}
          {lista.map((p) => (
            <div key={p.id} className="px-4 py-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <Link
                  href={`/rh/propostas/${p.id}`}
                  className="min-w-0 flex-1 group"
                >
                  <div className="font-semibold group-hover:text-aw-tiffany-forte truncate">
                    {p.candidato_nome}
                  </div>
                  <div className="text-[12px] text-aw-grafite truncate">{p.cargo} · {p.area}</div>
                </Link>
                <AcoesProposta proposta={p} modo="menu" />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
                <span className="font-semibold text-sm">{fmtBRL(p.salario_centavos)}</span>
                <StatusBadge status={p.status} />
              </div>
              <div className="flex items-center justify-between text-[11px] text-aw-grafite mt-2 pt-2 border-t border-aw-prata/15">
                <span className="truncate">{p.criada_por}</span>
                <span className="whitespace-nowrap">{fmtRelativo(p.atualizada_em)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
