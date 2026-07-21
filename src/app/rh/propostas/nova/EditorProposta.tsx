'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CartaCandidato, type CartaDados } from '@/components/carta/CartaCandidato'

const inicial: CartaDados = {
  nome: '',
  candidato_email: '',
  cargo: '',
  area: '',
  gestor: '',
  gestor_email: '',
  gestor_telefone: '',
  modelo: 'CLT',
  salario: 0,
  jornada: 'Segunda a sexta · 9h às 18h',
  local: 'São Paulo · Híbrido (3x presencial)',
  inicio: '',
  validade: '',
  beneficios: [
    'Plano de saúde SulAmérica',
    'Plano odontológico',
    'Vale-refeição R$ 45/dia',
    'Vale-transporte',
    'Gympass',
    'Seguro de vida',
  ],
  remetente: 'Time de Gente & Gestão · a|w',
}

export function EditorProposta() {
  const [dados, setDados] = useState<CartaDados>(inicial)
  const [salvo, setSalvo] = useState<null | 'rascunho' | 'link'>(null)

  const set = <K extends keyof CartaDados>(k: K, v: CartaDados[K]) =>
    setDados((d) => ({ ...d, [k]: v }))

  const setBeneficiosText = (txt: string) => {
    const lista = txt
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
    setDados((d) => ({ ...d, beneficios: lista }))
  }

  return (
    <div className="flex min-h-[calc(100vh-0px)]">
      {/* Painel de edição */}
      <div className="w-[520px] shrink-0 bg-white border-r border-aw-prata/30 overflow-auto">
        {/* Header do editor */}
        <div className="sticky top-0 bg-white border-b border-aw-prata/30 px-6 py-4 z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm text-aw-grafite">
              <Link href="/rh/propostas" className="hover:text-aw-preto">Propostas</Link>
              <span>›</span>
              <span className="text-aw-preto font-medium">Nova proposta</span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-neutral-200 text-neutral-700">
              Rascunho
            </span>
          </div>
          <div className="flex gap-2">
            <button
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-aw-preto text-aw-preto px-4 py-2.5 text-sm font-semibold hover:bg-aw-preto hover:text-aw-branco transition-colors"
              onClick={() => {
                setSalvo('rascunho')
                setTimeout(() => setSalvo(null), 2500)
              }}
              type="button"
            >
              Salvar rascunho
            </button>
            <button
              className="flex-1 inline-flex items-center justify-center gap-2 bg-aw-preto text-aw-branco px-4 py-2.5 text-sm font-semibold hover:bg-aw-grafite transition-colors"
              onClick={() => {
                setSalvo('link')
                setTimeout(() => setSalvo(null), 2500)
              }}
              type="button"
            >
              Gerar link do candidato
            </button>
          </div>
          {salvo && (
            <div className="mt-3 text-[12px] text-aw-tiffany-forte font-semibold">
              {salvo === 'rascunho'
                ? 'Rascunho salvo. (mock — sem backend ainda)'
                : 'Link gerado. (mock — no fluxo real, aparece o botão Copiar aqui)'}
            </div>
          )}
        </div>

        {/* Blocos do form */}
        <div className="p-6 space-y-8">
          <Bloco titulo="Candidato">
            <Input label="Nome completo" value={dados.nome} onChange={(v) => set('nome', v)} placeholder="Ex.: Ana Beatriz Moreira" />
            <Input label="Email" type="email" value={dados.candidato_email ?? ''} onChange={(v) => set('candidato_email', v)} placeholder="ana.moreira@gmail.com" />
          </Bloco>

          <Bloco titulo="Vaga">
            <Input label="Cargo" value={dados.cargo} onChange={(v) => set('cargo', v)} placeholder="Ex.: Arquiteta Sênior" />
            <Input label="Área / Diretoria" value={dados.area ?? ''} onChange={(v) => set('area', v)} placeholder="Ex.: Projetos Corporativos" />
            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Modelo"
                value={dados.modelo}
                onChange={(v) => set('modelo', v)}
                options={['CLT', 'PJ', 'Estágio', 'Aprendiz']}
              />
              <Input
                label="Salário mensal (R$)"
                value={dados.salario ? String(dados.salario) : ''}
                onChange={(v) => set('salario', Number(v.replace(/\D/g, '')) || 0)}
                placeholder="14500"
              />
            </div>
            <Input label="Jornada" value={dados.jornada ?? ''} onChange={(v) => set('jornada', v)} />
            <Input label="Local / modelo de trabalho" value={dados.local ?? ''} onChange={(v) => set('local', v)} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Início previsto" type="date" value={dados.inicio ?? ''} onChange={(v) => set('inicio', v)} />
              <Input label="Validade da proposta" type="date" value={dados.validade} onChange={(v) => set('validade', v)} />
            </div>
          </Bloco>

          <Bloco titulo="Gestor">
            <Input label="Nome" value={dados.gestor ?? ''} onChange={(v) => set('gestor', v)} placeholder="Ex.: Ricardo Prado" />
            <Input label="Email" type="email" value={dados.gestor_email ?? ''} onChange={(v) => set('gestor_email', v)} placeholder="ricardo.prado@awnet.com.br" />
            <Input label="Celular (com DDD)" value={dados.gestor_telefone ?? ''} onChange={(v) => set('gestor_telefone', v)} placeholder="(11) 98765-4321" />
          </Bloco>

          <Bloco titulo="Benefícios">
            <label className="block">
              <span className="block text-[11px] tracking-[0.14em] uppercase font-semibold text-aw-grafite mb-1.5">
                Um por linha
              </span>
              <textarea
                value={dados.beneficios.join('\n')}
                onChange={(e) => setBeneficiosText(e.target.value)}
                rows={7}
                className="w-full px-3 py-2.5 text-sm bg-white border border-aw-prata/40 focus:outline-none focus:border-aw-preto"
              />
            </label>
          </Bloco>

          <Bloco titulo="Remetente">
            <Input label="Assinatura (time responsável)" value={dados.remetente} onChange={(v) => set('remetente', v)} />
          </Bloco>
        </div>
      </div>

      {/* Prévia ao vivo */}
      <div className="flex-1 bg-neutral-900 overflow-hidden relative">
        <div className="absolute top-4 left-4 z-10 text-[10px] tracking-[0.14em] uppercase font-semibold text-white/50">
          Prévia ao vivo · como o candidato vai ver
        </div>
        <div className="h-screen overflow-auto flex items-start justify-center py-8">
          <CartaCandidato dados={dados.nome || dados.cargo ? dados : {
            ...dados,
            nome: dados.nome || 'Nome do candidato',
            cargo: dados.cargo || 'Cargo',
            validade: dados.validade || '2026-12-31',
          }} mode="stage" />
        </div>
      </div>
    </div>
  )
}

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-aw-tiffany-forte mb-3">
        {titulo}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="block text-[11px] tracking-[0.14em] uppercase font-semibold text-aw-grafite mb-1.5">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 text-sm bg-white border border-aw-prata/40 focus:outline-none focus:border-aw-preto placeholder:text-aw-prata"
      />
    </label>
  )
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  return (
    <label className="block">
      <span className="block text-[11px] tracking-[0.14em] uppercase font-semibold text-aw-grafite mb-1.5">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 text-sm bg-white border border-aw-prata/40 focus:outline-none focus:border-aw-preto"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}
