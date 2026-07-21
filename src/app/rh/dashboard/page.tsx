import Link from 'next/link'
import { propostasMock, fmtRelativo, fmtBRL } from '@/lib/mock/propostas'
import { StatusBadge } from '@/components/rh/StatusBadge'

export default function DashboardPage() {
  const total = propostasMock.length
  const aceitas = propostasMock.filter((p) => p.status === 'aceita').length
  const abertas = propostasMock.filter((p) => p.status === 'aberta').length
  const pendentes = propostasMock.filter((p) => p.status === 'pendente').length
  const recusadas = propostasMock.filter((p) => p.status === 'recusada').length
  const expiradas = propostasMock.filter((p) => p.status === 'expirada').length

  const decididas = aceitas + recusadas
  const taxaAceite = decididas > 0 ? Math.round((aceitas / decididas) * 100) : 0

  const recentes = [...propostasMock]
    .sort((a, b) => new Date(b.atualizada_em).getTime() - new Date(a.atualizada_em).getTime())
    .slice(0, 5)

  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="text-[11px] tracking-[0.18em] uppercase text-aw-tiffany-forte">
            Painel RH
          </div>
          <h1 className="text-3xl font-bold mt-1 tracking-tight">Bom dia, Ana.</h1>
          <p className="text-aw-grafite mt-1">
            {pendentes > 0 && (
              <>
                {pendentes} proposta{pendentes > 1 ? 's' : ''} aguardando serem enviadas ao
                candidato.{' '}
              </>
            )}
            {abertas > 0 && (
              <>
                {abertas} candidato{abertas > 1 ? 's' : ''} com proposta aberta sem decisão.
              </>
            )}
          </p>
        </div>
        <Link
          href="/rh/propostas/nova"
          className="inline-flex items-center gap-2 bg-aw-preto text-aw-branco px-5 py-3 text-sm font-semibold hover:bg-aw-grafite transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nova proposta
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <KPI label="Total no mês" value={total} sub="propostas emitidas" />
        <KPI label="Aceitas" value={aceitas} sub={`${taxaAceite}% de taxa`} accent />
        <KPI label="Abertas sem decisão" value={abertas} sub="candidato já viu" />
        <KPI label="Recusadas" value={recusadas + expiradas} sub={`${recusadas} recusa · ${expiradas} expiradas`} />
      </div>

      {/* Recentes */}
      <div className="bg-white border border-aw-prata/30">
        <div className="flex items-center justify-between px-6 py-4 border-b border-aw-prata/30">
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
        <table className="w-full">
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
          </tbody>
        </table>
      </div>
    </div>
  )
}

function KPI({ label, value, sub, accent }: { label: string; value: number; sub: string; accent?: boolean }) {
  return (
    <div className={`p-5 border ${accent ? 'bg-aw-tiffany border-aw-tiffany' : 'bg-white border-aw-prata/30'}`}>
      <div className={`text-[11px] tracking-[0.14em] uppercase font-semibold ${accent ? 'text-aw-preto/70' : 'text-aw-grafite'}`}>
        {label}
      </div>
      <div className={`text-4xl font-bold mt-2 tracking-tight ${accent ? 'text-aw-preto' : ''}`}>{value}</div>
      <div className={`text-[12px] mt-1 ${accent ? 'text-aw-preto/70' : 'text-aw-grafite'}`}>{sub}</div>
    </div>
  )
}
