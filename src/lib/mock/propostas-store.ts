'use client'

import { useSyncExternalStore } from 'react'
import { propostasMock, type PropostaMock } from '@/lib/mock/propostas'
import { slugify } from '@/lib/slug'
import type { PropostaStatus } from '@/types/proposta'

const CHAVE = 'aw:carta-proposta:propostas'

let state: PropostaMock[] | null = null
const listeners = new Set<() => void>()

function readLS(): PropostaMock[] | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CHAVE)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null
    return parsed as PropostaMock[]
  } catch {
    return null
  }
}

function writeLS(propostas: PropostaMock[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(propostas))
  } catch {
    // ignora quota/private mode
  }
}

function ensureState(): PropostaMock[] {
  if (state !== null) return state
  const persisted = readLS()
  // Se o usuário nunca populou OU zerou tudo, repopula com o mock.
  // Protótipo — nunca deixa em zero, o painel precisa ter dados pra demonstração.
  if (persisted && persisted.length > 0) {
    state = persisted
  } else {
    state = [...propostasMock]
    writeLS(state)
  }
  return state
}

function setState(next: PropostaMock[]) {
  state = next
  writeLS(next)
  listeners.forEach((l) => l())
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

function getSnapshot(): PropostaMock[] {
  return ensureState()
}

function getServerSnapshot(): PropostaMock[] {
  return propostasMock
}

function novoId(): string {
  return 'p-' + Math.random().toString(36).slice(2, 8)
}

export function usePropostas() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function acoesPropostas() {
  const atual = () => ensureState()

  return {
    renovarValidade(id: string, novaValidadeISO: string) {
      setState(
        atual().map((p) =>
          p.id === id
            ? {
                ...p,
                validade_em: novaValidadeISO,
                atualizada_em: new Date().toISOString(),
                status: p.status === 'expirada' ? 'pendente' : p.status,
              }
            : p
        )
      )
    },
    criar(
      dados: Omit<
        PropostaMock,
        'id' | 'slug' | 'status' | 'criada_em' | 'atualizada_em' | 'abriu_em' | 'aceita_em' | 'recusada_em' | 'recusa_motivo'
      > & { status?: PropostaStatus; criada_por: string }
    ): PropostaMock {
      const now = new Date().toISOString()
      const baseSlug = slugify(dados.candidato_nome) || 'proposta'
      // Garante slug único
      let slug = baseSlug
      let n = 2
      while (atual().some((p) => p.slug === slug)) {
        slug = `${baseSlug}-${n++}`
      }
      const nova: PropostaMock = {
        ...dados,
        id: novoId(),
        slug,
        status: dados.status ?? 'pendente',
        criada_em: now,
        atualizada_em: now,
        abriu_em: null,
        aceita_em: null,
        recusada_em: null,
        recusa_motivo: null,
      }
      setState([nova, ...atual()])
      return nova
    },
    duplicar(id: string): PropostaMock | null {
      const original = atual().find((p) => p.id === id)
      if (!original) return null
      const now = new Date().toISOString()
      const nova: PropostaMock = {
        ...original,
        id: novoId(),
        slug: original.slug + '-copia',
        status: 'rascunho',
        criada_em: now,
        atualizada_em: now,
        abriu_em: null,
        aceita_em: null,
        recusada_em: null,
        recusa_motivo: null,
      }
      setState([nova, ...atual()])
      return nova
    },
    atualizar(id: string, patch: Partial<PropostaMock>) {
      setState(
        atual().map((p) =>
          p.id === id
            ? {
                ...p,
                ...patch,
                id: p.id,
                atualizada_em: new Date().toISOString(),
              }
            : p
        )
      )
    },
    cancelar(id: string) {
      setState(
        atual().map((p) =>
          p.id === id
            ? { ...p, status: 'cancelada', atualizada_em: new Date().toISOString() }
            : p
        )
      )
    },
    deletar(id: string) {
      setState(atual().filter((p) => p.id !== id))
    },
    reset() {
      setState([...propostasMock])
    },
  }
}
