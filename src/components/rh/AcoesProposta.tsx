'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { acoesPropostas } from '@/lib/mock/propostas-store'
import type { PropostaMock } from '@/lib/mock/propostas'

type Modo = 'menu' | 'botoes'

export function AcoesProposta({
  proposta,
  modo = 'menu',
}: {
  proposta: PropostaMock
  modo?: Modo
}) {
  const router = useRouter()
  const [aberto, setAberto] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const acoes = acoesPropostas()

  useEffect(() => {
    if (!aberto) return
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setAberto(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [aberto])

  const editar = () => {
    router.push(`/rh/propostas/${proposta.id}/editar`)
    setAberto(false)
  }

  const enviarEmail = () => {
    if (!proposta.candidato_email) {
      alert('O candidato não tem email cadastrado. Edita a proposta e adiciona antes.')
      return
    }
    const dataAceite = new Date().toLocaleDateString('pt-BR')
    const assunto = `Aceite de proposta — ${proposta.candidato_nome}`
    const corpo = [
      `Olá,`,
      ``,
      `Segue registro do aceite de proposta do candidato ${proposta.candidato_nome}.`,
      ``,
      `Dados da proposta:`,
      `• Candidato: ${proposta.candidato_nome} (${proposta.candidato_email})`,
      `• Cargo: ${proposta.cargo} · ${proposta.area}`,
      `• Modelo: ${proposta.modelo}`,
      `• Salário mensal: R$ ${(proposta.salario_centavos / 100).toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`,
      `• Início previsto: ${new Date(proposta.inicio).toLocaleDateString('pt-BR')}`,
      `• Data do aceite: ${dataAceite}`,
      ``,
      `O PDF do aceite segue em anexo (ver anexo do email).`,
      ``,
      `Atenciosamente,`,
      `Time de Gente & Gestão · Athié Wohnrath`,
    ].join('\r\n')
    const cc = 'recursoshumanos.aw@awnet.com.br'
    const href = `mailto:${encodeURIComponent(proposta.candidato_email)}?cc=${encodeURIComponent(cc)}&subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`
    // Atualiza o status ANTES de navegar pro mailto — se setar location.href primeiro,
    // o browser pode abortar o resto do script e o status não persiste no localStorage.
    acoes.atualizar(proposta.id, { status: 'email_gerado' })
    setAberto(false)
    // Nova aba pra não perder o painel — mailto abre o cliente de email do usuário.
    window.open(href, '_blank')
  }

  const renovar = () => {
    const atual = proposta.validade_em.split('T')[0]
    const nova = window.prompt(
      'Nova data de validade (AAAA-MM-DD):',
      atual
    )
    if (!nova) return
    const isoDate = /^\d{4}-\d{2}-\d{2}$/.test(nova) ? nova : null
    if (!isoDate) {
      alert('Formato de data inválido. Use AAAA-MM-DD.')
      return
    }
    acoes.renovarValidade(proposta.id, isoDate)
    setAberto(false)
  }

  const duplicar = () => {
    const nova = acoes.duplicar(proposta.id)
    setAberto(false)
    if (nova) router.push(`/rh/propostas/${nova.id}`)
  }

  const cancelar = () => {
    if (!window.confirm(`Cancelar a proposta de ${proposta.candidato_nome}? O link para de funcionar.`)) return
    acoes.cancelar(proposta.id)
    setAberto(false)
  }

  const deletar = () => {
    if (
      !window.confirm(
        `Apagar a proposta de ${proposta.candidato_nome}? Isso remove todo o histórico e não dá pra desfazer.`
      )
    ) return
    acoes.deletar(proposta.id)
    setAberto(false)
    if (modo === 'botoes') router.push('/rh/propostas')
  }

  if (modo === 'botoes') {
    return (
      <div className="bg-white border border-aw-prata/30 p-5">
        <div className="text-[11px] tracking-[0.18em] uppercase text-aw-grafite mb-3">
          Ações
        </div>
        <div className="space-y-2">
          <button onClick={enviarEmail} className="w-full text-left text-sm py-2 px-3 hover:bg-aw-bg transition-colors font-semibold text-aw-tiffany-forte">
            Enviar e-mail de aceite
          </button>
          <button onClick={editar} className="w-full text-left text-sm py-2 px-3 hover:bg-aw-bg transition-colors">
            Editar proposta
          </button>
          <button onClick={renovar} className="w-full text-left text-sm py-2 px-3 hover:bg-aw-bg transition-colors">
            Renovar validade
          </button>
          <button onClick={duplicar} className="w-full text-left text-sm py-2 px-3 hover:bg-aw-bg transition-colors">
            Duplicar proposta
          </button>
          <button onClick={cancelar} className="w-full text-left text-sm py-2 px-3 hover:bg-aw-bg transition-colors">
            Cancelar proposta
          </button>
          <button onClick={deletar} className="w-full text-left text-sm py-2 px-3 text-red-700 hover:bg-red-50 transition-colors">
            Apagar proposta
          </button>
        </div>
      </div>
    )
  }

  return (
    <div ref={menuRef} className="relative inline-block">
      <button
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          setAberto((v) => !v)
        }}
        className="w-8 h-8 flex items-center justify-center text-aw-grafite hover:text-aw-preto hover:bg-aw-bg transition-colors"
        aria-label="Ações"
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>
      {aberto && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-aw-prata/40 shadow-lg z-30 w-52">
          <button onClick={enviarEmail} className="block w-full text-left text-sm py-2 px-4 hover:bg-aw-bg font-semibold text-aw-tiffany-forte">
            Enviar e-mail
          </button>
          <button onClick={editar} className="block w-full text-left text-sm py-2 px-4 hover:bg-aw-bg">
            Editar
          </button>
          <button onClick={renovar} className="block w-full text-left text-sm py-2 px-4 hover:bg-aw-bg">
            Renovar validade
          </button>
          <button onClick={duplicar} className="block w-full text-left text-sm py-2 px-4 hover:bg-aw-bg">
            Duplicar
          </button>
          <button onClick={cancelar} className="block w-full text-left text-sm py-2 px-4 hover:bg-aw-bg">
            Cancelar
          </button>
          <div className="border-t border-aw-prata/20" />
          <button onClick={deletar} className="block w-full text-left text-sm py-2 px-4 text-red-700 hover:bg-red-50">
            Apagar
          </button>
        </div>
      )}
    </div>
  )
}
