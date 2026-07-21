import Link from 'next/link'
import { propostasMock, fmtBRL, fmtRelativo } from '@/lib/mock/propostas'
import { StatusBadge } from '@/components/rh/StatusBadge'
import type { PropostaStatus } from '@/types/proposta'

const filtros: Array<{ label: string; status: PropostaStatus | 'todas' }> = [
  { label: 'Todas', status: 'todas' },
  { label: 'Rascunhos', status: 'rascunho' },
  { label: 'Pendentes', status: 'pendente' },
  { label: 'Abertas', status: 'aberta' },
  { label: 'Aceitas', status: 'aceita' },
  { label: 'Recusadas', status: 'recusada' },
  { label: 'Expiradas', status: 'expirada' },
]

export default async function PropostasPage({
  searchParams,
}: {
  searchParams: Promise<{ filtro?: string; q?: string }>
}) {
  const { filtro = 'todas', q = '' } = await searchParams
  const busca = q.trim().toLowerCase()

  const lista = propostasMock
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
    <div className="max-w-6xl mx-auto px-8 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-[11px] tracking-[0.18em] uppercase text-aw-tiffany-forte">Propostas</div>
          <h1 className="text-3xl font-bold mt-1 tracking-tight">Todas as propostas</h1>
          <p className="text-aw-grafite mt-1 text-sm">
            {lista.length} de {propostasMock.length} propostas
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

      {/* Filtros e busca */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {filtros.map((f) => {
          const active = filtro === f.status
          return (
            <Link
              key={f.status}
              href={{
                pathname: '/rh/propostas',
                query: { ...(f.status !== 'todas' && { filtro: f.status }), ...(busca && { q: busca }) },
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider border transition-colors ${
                active
                  ? 'bg-aw-preto text-aw-branco border-aw-preto'
                  : 'bg-white text-aw-grafite border-aw-prata/40 hover:border-aw-preto hover:text-aw-preto'
              }`}
            >
              {f.label}
            </Link>
          )
        })}
        <form className="ml-auto" method="get">
          {filtro !== 'todas' && <input type="hidden" name="filtro" value={filtro} />}
          <input
            type="text"
            name="q"
            defaultValue={busca}
            placeholder="Buscar por nome, cargo ou email…"
            className="w-72 px-4 py-2 text-sm bg-white border border-aw-prata/40 focus:outline-none focus:border-aw-preto placeholder:text-aw-prata"
          />
        </form>
      </div>

      {/* Tabela */}
      <div className="bg-white border border-aw-prata/30">
        <table className="w-full">
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
                  <Link href={`/rh/propostas/${p.id}`} className="text-aw-grafite hover:text-aw-preto">
                    →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
