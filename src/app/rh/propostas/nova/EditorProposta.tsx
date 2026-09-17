'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CartaCandidato, type CartaDados } from '@/components/carta/CartaCandidato'
import { acoesPropostas } from '@/lib/mock/propostas-store'

const inicial: CartaDados = {
  nome: '',
  candidato_email: '',
  candidato_telefone: '',
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
  tutor_nome: '',
  tutor_funcao: '',
  tutor_email: '',
  tutor_whatsapp: '',
  tutor_foto: '',
}

export function EditorProposta({
  initial,
  propostaId,
}: {
  initial?: CartaDados
  propostaId?: string
} = {}) {
  const router = useRouter()
  const modo: 'nova' | 'editar' = propostaId ? 'editar' : 'nova'
  const [dados, setDados] = useState<CartaDados>(initial ?? inicial)
  const [salvo, setSalvo] = useState<null | 'rascunho' | 'link'>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [abaMobile, setAbaMobile] = useState<'form' | 'previa'>('form')

  const set = <K extends keyof CartaDados>(k: K, v: CartaDados[K]) => {
    setErro(null)
    setDados((d) => ({ ...d, [k]: v }))
  }

  // Converte o state do formulário no shape do PropostaMock
  const toMock = () => ({
    candidato_nome: dados.nome.trim(),
    candidato_email: dados.candidato_email ?? '',
    cargo: dados.cargo.trim(),
    area: dados.area ?? '',
    gestor: dados.gestor ?? '',
    gestor_email: dados.gestor_email ?? '',
    gestor_telefone: dados.gestor_telefone ?? '',
    modelo: dados.modelo,
    salario_centavos: Math.round((dados.salario || 0) * 100),
    jornada: dados.jornada ?? '',
    local: dados.local ?? '',
    inicio: dados.inicio ?? '',
    validade_em: dados.validade,
    beneficios: dados.beneficios,
    remetente: dados.remetente,
    tutor_nome: dados.tutor_nome ?? '',
    tutor_funcao: dados.tutor_funcao ?? '',
    tutor_email: dados.tutor_email ?? '',
    tutor_whatsapp: dados.tutor_whatsapp ?? '',
    tutor_foto: dados.tutor_foto ?? '',
  })

  // Pega email do RH logado do cookie (mock)
  const emailDoRh = () => {
    if (typeof document === 'undefined') return 'rodrigo.martins@awnet.com.br'
    const m = document.cookie.match(/rh_email=([^;]+)/)
    return m ? decodeURIComponent(m[1]) : 'rodrigo.martins@awnet.com.br'
  }

  const validar = (): string | null => {
    if (!dados.nome.trim()) return 'Preenche o nome do candidato pra continuar.'
    if (!dados.cargo.trim()) return 'Preenche o cargo pra continuar.'
    if (!dados.validade) return 'Define a validade da proposta.'
    if (!dados.salario || dados.salario <= 0) return 'Define um salário mensal maior que zero.'
    return null
  }

  const salvarRascunho = () => {
    setErro(null)
    if (modo === 'editar' && propostaId) {
      acoesPropostas().atualizar(propostaId, toMock())
      setSalvo('rascunho')
      setTimeout(() => {
        setSalvo(null)
        router.push(`/rh/propostas/${propostaId}`)
      }, 900)
      return
    }
    // Rascunho: aceita mesmo com campos faltando
    if (!dados.nome.trim()) {
      setErro('Coloca pelo menos o nome do candidato pra salvar o rascunho.')
      return
    }
    const nova = acoesPropostas().criar({
      ...toMock(),
      candidato_nome: dados.nome.trim() || 'Sem nome',
      cargo: dados.cargo.trim() || 'A definir',
      status: 'rascunho',
      criada_por: emailDoRh(),
    })
    setSalvo('rascunho')
    setTimeout(() => router.push(`/rh/propostas/${nova.id}`), 500)
  }

  const gerarProposta = () => {
    const err = validar()
    if (err) {
      setErro(err)
      return
    }
    setErro(null)
    if (modo === 'editar' && propostaId) {
      // Se editando um rascunho, "gerar" = salvar + promover pra pendente
      acoesPropostas().atualizar(propostaId, { ...toMock(), status: 'pendente' })
      setSalvo('link')
      setTimeout(() => router.push(`/rh/propostas/${propostaId}`), 500)
      return
    }
    const nova = acoesPropostas().criar({
      ...toMock(),
      status: 'pendente',
      criada_por: emailDoRh(),
    })
    setSalvo('link')
    setTimeout(() => router.push(`/rh/propostas/${nova.id}`), 500)
  }

  const setBeneficiosText = (txt: string) => {
    const lista = txt
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
    setDados((d) => ({ ...d, beneficios: lista }))
  }

  return (
    <div className="lg:flex min-h-[calc(100vh-0px)]">
      {/* Tabs Form/Prévia — só mobile/tablet */}
      <div className="lg:hidden sticky top-14 z-20 bg-white border-b border-aw-prata/30 flex">
        <button
          type="button"
          onClick={() => setAbaMobile('form')}
          className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
            abaMobile === 'form'
              ? 'bg-aw-preto text-aw-branco'
              : 'bg-white text-aw-grafite hover:text-aw-preto'
          }`}
        >
          Formulário
        </button>
        <button
          type="button"
          onClick={() => setAbaMobile('previa')}
          className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
            abaMobile === 'previa'
              ? 'bg-aw-preto text-aw-branco'
              : 'bg-white text-aw-grafite hover:text-aw-preto'
          }`}
        >
          Prévia ao vivo
        </button>
      </div>

      {/* Painel de edição */}
      <div
        className={`${
          abaMobile === 'form' ? 'block' : 'hidden'
        } lg:block w-full lg:w-[520px] lg:shrink-0 bg-white lg:border-r border-aw-prata/30 lg:overflow-auto`}
      >
        {/* Header do editor */}
        <div className="lg:sticky lg:top-0 bg-white border-b border-aw-prata/30 px-4 sm:px-6 py-4 z-10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-sm text-aw-grafite min-w-0">
              <Link href="/rh/propostas" className="hover:text-aw-preto shrink-0">Propostas</Link>
              <span className="shrink-0">›</span>
              <span className="text-aw-preto font-medium truncate">
                {modo === 'editar' ? `Editar · ${dados.nome || 'proposta'}` : 'Nova proposta'}
              </span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-neutral-200 text-neutral-700">
              {modo === 'editar' ? 'Editando' : 'Rascunho'}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-aw-preto text-aw-preto px-4 py-2.5 text-sm font-semibold hover:bg-aw-preto hover:text-aw-branco transition-colors"
              onClick={salvarRascunho}
              type="button"
            >
              {modo === 'editar' ? 'Salvar alterações' : 'Salvar rascunho'}
            </button>
            <button
              className="flex-1 inline-flex items-center justify-center gap-2 bg-aw-preto text-aw-branco px-4 py-2.5 text-sm font-semibold hover:bg-aw-grafite transition-colors"
              onClick={gerarProposta}
              type="button"
            >
              {modo === 'editar' ? 'Gerar link do candidato' : 'Gerar proposta'}
            </button>
          </div>
          {erro && (
            <div className="mt-3 text-[12px] text-red-700 bg-red-50 border border-red-200 px-3 py-2 font-medium">
              {erro}
            </div>
          )}
          {salvo && !erro && (
            <div className="mt-3 text-[12px] text-aw-tiffany-forte font-semibold">
              {salvo === 'rascunho'
                ? modo === 'editar'
                  ? 'Alterações salvas. Voltando pro detalhe…'
                  : 'Rascunho salvo. Abrindo o detalhe…'
                : 'Proposta gerada. Abrindo o detalhe pra copiar o link…'}
            </div>
          )}
        </div>

        {/* Blocos do form */}
        <div className="p-4 sm:p-6 space-y-8">
          <Bloco titulo="Candidato">
            <Input label="Nome completo" value={dados.nome} onChange={(v) => set('nome', v)} placeholder="Ex.: Ana Beatriz Moreira" />
            <Input label="Email" type="email" value={dados.candidato_email ?? ''} onChange={(v) => set('candidato_email', v)} placeholder="ana.moreira@gmail.com" />
            <Input label="Celular" value={dados.candidato_telefone ?? ''} onChange={(v) => set('candidato_telefone', v)} placeholder="(11) 98765-4321" />
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

          <Bloco titulo="Tutor">
            <div className="text-[12px] text-aw-grafite -mt-2 mb-3">
              Quem recebe o candidato no primeiro dia e caminha com ele nas primeiras semanas.
            </div>
            <Input label="Nome" value={dados.tutor_nome ?? ''} onChange={(v) => set('tutor_nome', v)} placeholder="Ex.: Bruna Tanaka" />
            <Input label="Função" value={dados.tutor_funcao ?? ''} onChange={(v) => set('tutor_funcao', v)} placeholder="Ex.: Arquiteta Sênior · Projetos Corporativos" />
            <Input label="Email" type="email" value={dados.tutor_email ?? ''} onChange={(v) => set('tutor_email', v)} placeholder="bruna.tanaka@awnet.com.br" />
            <Input label="WhatsApp (com DDD)" value={dados.tutor_whatsapp ?? ''} onChange={(v) => set('tutor_whatsapp', v)} placeholder="(11) 98765-4321" />
            <label className="block">
              <span className="block text-[11px] tracking-[0.14em] uppercase font-semibold text-aw-grafite mb-1.5">
                Foto do tutor (aparece em preto e branco)
              </span>
              <div className="flex items-center gap-3">
                {dados.tutor_foto ? (
                  <img
                    src={dados.tutor_foto}
                    alt="Foto do tutor"
                    className="w-16 h-16 object-cover"
                    style={{ filter: 'grayscale(100%) contrast(1.05)' }}
                  />
                ) : (
                  <div className="w-16 h-16 bg-aw-tiffany-claro text-aw-tiffany-forte flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                )}
                <div className="flex-1 space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      if (file.size > 2 * 1024 * 1024) {
                        alert('Foto muito grande. Use uma imagem até 2 MB.')
                        return
                      }
                      const reader = new FileReader()
                      reader.onload = () => set('tutor_foto', String(reader.result))
                      reader.readAsDataURL(file)
                    }}
                    className="block w-full text-[12px] text-aw-grafite file:mr-3 file:py-1.5 file:px-3 file:border file:border-aw-preto file:bg-white file:text-aw-preto file:text-[11px] file:font-semibold file:cursor-pointer hover:file:bg-aw-preto hover:file:text-aw-branco"
                  />
                  {dados.tutor_foto && (
                    <button
                      type="button"
                      onClick={() => set('tutor_foto', '')}
                      className="text-[11px] text-red-700 hover:underline"
                    >
                      Remover foto
                    </button>
                  )}
                </div>
              </div>
            </label>
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
      <div
        className={`${
          abaMobile === 'previa' ? 'block' : 'hidden'
        } lg:block flex-1 bg-neutral-900 overflow-hidden relative`}
      >
        <div className="hidden lg:block absolute top-4 left-4 z-10 text-[10px] tracking-[0.14em] uppercase font-semibold text-white/50">
          Prévia ao vivo · como o candidato vai ver
        </div>
        <div className="min-h-[60vh] lg:h-screen overflow-auto flex items-start justify-center py-6 lg:py-8">
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
