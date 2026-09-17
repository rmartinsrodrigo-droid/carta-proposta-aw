'use client'

import Link from 'next/link'
import { use, useEffect, useState } from 'react'
import { usePropostas } from '@/lib/mock/propostas-store'
import { CartaCandidato, type CartaDados } from '@/components/carta/CartaCandidato'

export default function CartaCandidatoPage({
  params,
}: {
  params: Promise<{ slug: string; token: string }>
}) {
  const { token } = use(params)
  const propostas = usePropostas()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Enquanto não hidratou, tela neutra pra não piscar 404 antes de ler o localStorage.
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  // Fase mock: token = id da proposta.
  // Fase backend: token vira JWT assinado (ver src/lib/token.ts) e o slug é só cosmético.
  const p = propostas.find((x) => x.id === token)

  if (!p) return <PropostaIndisponivel />

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
    tutor_email: p.tutor_email ?? null,
    tutor_whatsapp: p.tutor_whatsapp ?? null,
    tutor_foto: p.tutor_foto ?? null,
  }

  return <CartaCandidato dados={dados} mode="candidate" />
}

function PropostaIndisponivel() {
  return (
    <div className="min-h-screen bg-aw-preto text-aw-branco flex items-center justify-center px-6 py-16">
      <div className="max-w-md w-full">
        <div className="text-[11px] tracking-[0.18em] uppercase text-aw-tiffany mb-3">
          Athié Wohnrath
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          Link indisponível
        </h1>
        <p className="text-aw-prata leading-relaxed mb-6">
          Esta proposta não foi encontrada no seu navegador.
        </p>

        <div className="bg-white/5 border border-white/10 p-5 mb-6 text-sm text-aw-prata leading-relaxed">
          <div className="text-[11px] tracking-[0.14em] uppercase text-aw-tiffany font-semibold mb-2">
            Por que isso acontece
          </div>
          Esta plataforma está em modo protótipo — as propostas ficam salvas no
          navegador de quem cria. Para abrir o link, use o mesmo navegador do RH
          que gerou a proposta, ou aguarde a versão com backend real (Supabase)
          para links que funcionam em qualquer aparelho.
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center bg-aw-tiffany text-aw-preto px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-aw-tiffany-forte transition-colors"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}
