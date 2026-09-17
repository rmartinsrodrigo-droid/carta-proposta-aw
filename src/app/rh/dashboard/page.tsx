'use client'

import Link from 'next/link'
import { fmtRelativo, fmtBRL } from '@/lib/mock/propostas'
import { usePropostas } from '@/lib/mock/propostas-store'
import { StatusBadge } from '@/components/rh/StatusBadge'

export default function DashboardPage() {
  const propostas = usePropostas()

  const total = propostas.length
  const aceitas = propostas.filter((p) => p.status === 'aceita').length
  const abertas = propostas.filter((p) => p.status === 'aberta').length
  const pendentes = propostas.filter((p) => p.status === 'pendente').length
  const recusadas = propostas.filter((p) => p.status === 'recusada').length
  const expiradas = propostas.filter((p) => p.status === 'expirada').length
  const canceladas = propostas.filter((p) => p.status === 'cancelada').length

  const decididas = aceitas + recusadas
  const taxaAceite = decididas > 0 ? Math.round((aceitas / decididas) * 100) : 0

  const recentes = [...propostas]
    .sort((a, b) => new Date(b.atualizada_em).getTime() - new Date(a.atualizada_em).getTime())
    .slice(0, 5)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 lg:mb-8">
        <div className="min-w-0">
          <div className="text-[11px] tracking-[0.18em] uppercase text-aw-tiffany-forte">
            Painel RH
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mt-1 tracking-tight">Bom dia.</h1>
          <p className="text-aw-grafite mt-1 text-sm sm:text-base">
            {pendentes > 0 && (
              <>
                {pendentes} proposta{pendentes > 1 ? 's' : ''} aguardando envio ao candidato.{' '}
              </>
            )}
            {abertas > 0 && (
              <>
                {abertas} candidato{abertas > 1 ? 's' : ''} com proposta aberta sem decisão.
              </>
            )}
            {pendentes === 0 && abertas === 0 && 'Sem pendências urgentes agora.'}
          </p>
        </div>
        <Link
          href="/rh/propostas/nova"
          className="inline-flex items-center justify-center gap-2 bg-aw-preto text-aw-branco px-5 py-3 text-sm font-semibold hover:bg-aw-grafite transition-colors shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nova proposta
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 lg:mb-8">
        <KPI label="Total no mês" value={total} sub="propostas emitidas" />
        <KPI label="Aceitas" value={aceitas} sub={`${taxaAceite}% de taxa`} accent />
        <KPI label="Abertas sem decisão" value={abertas} sub="candidato já viu" />
        <KPI
          label="Fora do funil"
          value={recusadas + expiradas + canceladas}
          sub={`${recusadas} recusa · ${expiradas} exp · ${canceladas} canc`}
        />
      </div>

      <div className="bg-white border border-aw-prata/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 sm:px-6 py-4 border-b border-aw-prata/30">
          <div>
            <div className="text-[11px] tracking-[0.18em] uppercase text-aw-tiffany-forte">
              Atualizadas recentemente
            </div>
            <div className="text-base font-semibold mt-0.5">Últimas propostas</div>
          </div>
          <Link href="/rh/propostas" className="text-sm text-aw-grafite hover:text-aw-preto underline underline-offset-4">
            Ver todas
          </Link>
        </div>

        {/* Tabela desktop */}
        <table className="hidden md:table w-full">
          <thead>
            <tr className="text-[11px] tracking-[0.14em] uppercase text-aw-grafite text-left">
              <th className="px-6 py-3 font-semibold">Candidato</th>
              <th className="px-6 py-3 font-semibold">Cargo</th>
              <th className="px-6 py-3 font-semibold">Salário</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold">Última mexida</th>
            </tr>
          </thead>
          <tbody>
            {recentes.map((p) => (
              <tr key={p.id} className="border-t border-aw-prata/20 hover:bg-aw-bg transition-colors">
                <td className="px-6 py-3.5">
                  <Link href={`/rh/propostas/${p.id}`} className="font-semibold hover:text-aw-tiffany-forte">
                    {p.candidato_nome}
                  </Link>
                  <div className="text-[12px] text-aw-grafite">{p.candidato_email}</div>
                </td>
                <td className="px-6 py-3.5 text-sm">
                  {p.cargo}
                  <div className="text-[12px] text-aw-grafite">{p.area}</div>
                </td>
                <td className="px-6 py-3.5 text-sm font-semibold">{fmtBRL(p.salario_centavos)}</td>
                <td className="px-6 py-3.5">
                  <StatusBadge status={p.status} />
                </td>
                <td className="px-6 py-3.5 text-sm text-aw-grafite">{fmtRelativo(p.atualizada_em)}</td>
              </tr>
            ))}
            {recentes.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-aw-grafite text-sm">
                  Nenhuma proposta ainda. Crie a primeira com o botão "Nova proposta".
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Cards mobile */}
        <div className="md:hidden divide-y divide-aw-prata/20">
          {recentes.map((p) => (
            <Link
              key={p.id}
              href={`/rh/propostas/${p.id}`}
              className="block px-4 py-3.5 hover:bg-aw-bg transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <div className="min-w-0 flex-1">
                  <div className="font-semibold truncate">{p.candidato_nome}</div>
                  <div className="text-[12px] text-aw-grafite truncate">{p.cargo}</div>
                </div>
                <StatusBadge status={p.status} />
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="font-semibold text-aw-preto">{fmtBRL(p.salario_centavos)}</span>
                <span className="text-aw-grafite">{fmtRelativo(p.atualizada_em)}</span>
              </div>
            </Link>
          ))}
          {recentes.length === 0 && (
            <div className="px-4 py-8 text-center text-aw-grafite text-sm">
              Nenhuma proposta ainda. Crie a primeira com o botão "Nova proposta".
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function KPI({ label, value, sub, accent }: { label: string; value: number; sub: string; accent?: boolean }) {
  return (
    <div className={`p-4 sm:p-5 border ${accent ? 'bg-aw-tiffany border-aw-tiffany' : 'bg-white border-aw-prata/30'}`}>
      <div className={`text-[10px] sm:text-[11px] tracking-[0.14em] uppercase font-semibold leading-tight ${accent ? 'text-aw-preto/70' : 'text-aw-grafite'}`}>
        {label}
      </div>
      <div className={`text-3xl sm:text-4xl font-bold mt-2 tracking-tight ${accent ? 'text-aw-preto' : ''}`}>{value}</div>
      <div className={`text-[11px] sm:text-[12px] mt-1 leading-tight ${accent ? 'text-aw-preto/70' : 'text-aw-grafite'}`}>{sub}</div>
    </div>
  )
}
