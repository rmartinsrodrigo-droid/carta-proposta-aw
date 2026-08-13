'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { EditorProposta } from '@/app/rh/propostas/nova/EditorProposta'
import { usePropostas } from '@/lib/mock/propostas-store'
import type { CartaDados } from '@/components/carta/CartaCandidato'

export function EditarPropostaClient({ id }: { id: string }) {
  const router = useRouter()
  const propostas = usePropostas()
  const p = propostas.find((x) => x.id === id)

  useEffect(() => {
    if (!p) router.replace('/rh/propostas')
  }, [p, router])

  if (!p) {
    return (
      <div className="max-w-3xl mx-auto px-8 py-16 text-center">
        <div className="text-aw-grafite">Proposta não encontrada.</div>
      </div>
    )
  }

  const initial: CartaDados = {
    nome: p.candidato_nome,
    candidato_email: p.candidato_email,
    candidato_telefone: null,
    cargo: p.cargo,
    area: p.area,
    gestor: p.gestor,
    gestor_email: p.gestor_email,
    gestor_telefone: p.gestor_telefone,
    modelo: p.modelo,
    salario: p.salario_centavos / 100,
    jornada: p.jornada,
    local: p.local,
    inicio: p.inicio,
    validade: p.validade_em,
    beneficios: p.beneficios,
    remetente: p.remetente,
    tutor_nome: p.tutor_nome ?? null,
    tutor_funcao: p.tutor_funcao ?? null,
    tutor_whatsapp: p.tutor_whatsapp ?? null,
    tutor_foto: p.tutor_foto ?? null,
  }

  return <EditorProposta initial={initial} propostaId={p.id} />
}
