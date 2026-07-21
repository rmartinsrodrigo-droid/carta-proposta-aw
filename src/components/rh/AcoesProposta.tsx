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
