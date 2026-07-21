import type { PropostaStatus } from '@/types/proposta'

const style: Record<PropostaStatus, { bg: string; text: string; label: string }> = {
  rascunho: { bg: 'bg-neutral-200', text: 'text-neutral-700', label: 'Rascunho' },
  pendente: { bg: 'bg-amber-100', text: 'text-amber-900', label: 'Pendente' },
  aberta: { bg: 'bg-aw-tiffany-claro', text: 'text-neutral-900', label: 'Aberta' },
  aceita: { bg: 'bg-aw-tiffany', text: 'text-aw-preto', label: 'Aceita' },
  recusada: { bg: 'bg-red-100', text: 'text-red-900', label: 'Recusada' },
  expirada: { bg: 'bg-neutral-800', text: 'text-neutral-200', label: 'Expirada' },
  cancelada: { bg: 'bg-neutral-300', text: 'text-neutral-800', label: 'Cancelada' },
}

export function StatusBadge({ status }: { status: PropostaStatus }) {
  const s = style[status]
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${s.bg} ${s.text}`}
    >
      {s.label}
    </span>
  )
}
