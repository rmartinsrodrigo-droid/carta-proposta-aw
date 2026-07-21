'use client'

import { useEffect, useState } from 'react'

type Config = {
  emailCopiaAceite: string
  remetentePadrao: string
  validadeDias: number
  jornadaPadrao: string
  localPadrao: string
}

const padrao: Config = {
  emailCopiaAceite: 'recursoshumanos.aw@awnet.com.br',
  remetentePadrao: 'Time de Gente & Gestão · a|w',
  validadeDias: 14,
  jornadaPadrao: 'Segunda a sexta · 9h às 18h',
  localPadrao: 'São Paulo · Híbrido (3x presencial)',
}

const CHAVE = 'aw:carta-proposta:config'

function load(): Config {
  if (typeof window === 'undefined') return padrao
  try {
    const raw = localStorage.getItem(CHAVE)
    if (!raw) return padrao
    return { ...padrao, ...JSON.parse(raw) }
  } catch {
    return padrao
  }
}

export function ConfiguracoesForm() {
  const [config, setConfig] = useState<Config>(padrao)
  const [salvo, setSalvo] = useState(false)

  useEffect(() => {
    setConfig(load())
  }, [])

  const set = <K extends keyof Config>(k: K, v: Config[K]) =>
    setConfig((c) => ({ ...c, [k]: v }))

  const salvar = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem(CHAVE, JSON.stringify(config))
    setSalvo(true)
    setTimeout(() => setSalvo(false), 2200)
  }

  return (
    <form onSubmit={salvar} className="space-y-8">
      <Section titulo="Envio do aceite">
        <Campo
          label="Email do RH em cópia (CC)"
          hint="Toda vez que um candidato aceita, esse endereço recebe cópia do PDF junto com o candidato."
        >
          <input
            type="email"
            value={config.emailCopiaAceite}
            onChange={(e) => set('emailCopiaAceite', e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-white border border-aw-prata/40 focus:outline-none focus:border-aw-preto"
          />
        </Campo>
        <Campo
          label="Assinatura padrão (remetente)"
          hint="Aparece na seção de boas-vindas e no rodapé do email."
        >
          <input
            type="text"
            value={config.remetentePadrao}
            onChange={(e) => set('remetentePadrao', e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-white border border-aw-prata/40 focus:outline-none focus:border-aw-preto"
          />
        </Campo>
      </Section>

      <Section titulo="Proposta">
        <Campo
          label="Validade padrão (dias)"
          hint="Quantos dias a proposta fica válida a partir da criação. O RH pode ajustar caso a caso no editor."
        >
          <input
            type="number"
            min={1}
            max={90}
            value={config.validadeDias}
            onChange={(e) => set('validadeDias', Number(e.target.value) || 14)}
            className="w-32 px-3 py-2.5 text-sm bg-white border border-aw-prata/40 focus:outline-none focus:border-aw-preto"
          />
        </Campo>
        <Campo label="Jornada padrão">
          <input
            type="text"
            value={config.jornadaPadrao}
            onChange={(e) => set('jornadaPadrao', e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-white border border-aw-prata/40 focus:outline-none focus:border-aw-preto"
          />
        </Campo>
        <Campo label="Local / modelo padrão">
          <input
            type="text"
            value={config.localPadrao}
            onChange={(e) => set('localPadrao', e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-white border border-aw-prata/40 focus:outline-none focus:border-aw-preto"
          />
        </Campo>
      </Section>

      <div className="flex items-center gap-4 pt-4 border-t border-aw-prata/30">
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-aw-preto text-aw-branco px-5 py-3 text-sm font-semibold hover:bg-aw-grafite transition-colors"
        >
          Salvar preferências
        </button>
        {salvo && (
          <span className="text-sm font-semibold text-aw-tiffany-forte">
            Salvo neste dispositivo.
          </span>
        )}
        <span className="ml-auto text-[12px] text-aw-grafite">
          Nesta fase, preferências ficam salvas só neste navegador.
        </span>
      </div>
    </form>
  )
}

function Section({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-aw-prata/30">
      <div className="px-6 py-4 border-b border-aw-prata/30">
        <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-aw-tiffany-forte">
          {titulo}
        </div>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  )
}

function Campo({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="block text-[11px] tracking-[0.14em] uppercase font-semibold text-aw-grafite mb-1.5">
        {label}
      </span>
      {children}
      {hint && <span className="block text-[12px] text-aw-grafite mt-1.5">{hint}</span>}
    </label>
  )
}
