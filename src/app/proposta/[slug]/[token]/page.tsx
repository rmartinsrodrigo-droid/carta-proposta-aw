import { notFound } from 'next/navigation'
import { getPropostaById } from '@/lib/mock/propostas'
import { CartaCandidato, type CartaDados } from '@/components/carta/CartaCandidato'

export const dynamic = 'force-dynamic'

export default async function CartaCandidatoPage({
  params,
}: {
  params: Promise<{ slug: string; token: string }>
}) {
  const { token } = await params
  // Fase mock: token = id da proposta.
  // Fase backend: token vira JWT assinado (ver src/lib/token.ts) e o slug é só cosmético.
  const p = getPropostaById(token)
  if (!p) notFound()

  const dados: CartaDados = {
    nome: p.candidato_nome,
    candidato_email: p.candidato_email,
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

  return <CartaCandidato dados={dados} mode="candidate" />
}
