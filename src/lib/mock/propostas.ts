import type { PropostaStatus } from '@/types/proposta'

export type PropostaMock = {
  id: string
  slug: string
  status: PropostaStatus
  candidato_nome: string
  candidato_email: string
  cargo: string
  area: string
  gestor: string
  gestor_email: string
  gestor_telefone: string
  modelo: string
  salario_centavos: number
  jornada: string
  local: string
  inicio: string
  validade_em: string
  beneficios: string[]
  remetente: string
  tutor_nome?: string
  tutor_funcao?: string
  tutor_whatsapp?: string
  tutor_foto?: string
  criada_em: string
  criada_por: string
  atualizada_em: string
  abriu_em: string | null
  aceita_em: string | null
  recusada_em: string | null
  recusa_motivo: string | null
}

const benBase = [
  'Plano de saúde SulAmérica',
  'Plano odontológico',
  'Vale-refeição R$ 45/dia',
  'Vale-transporte',
  'Gympass',
  'Seguro de vida',
]

export const propostasMock: PropostaMock[] = [
  {
    id: 'p-001',
    slug: 'rodrigo-martins',
    status: 'aberta',
    candidato_nome: 'Rodrigo Martins',
    candidato_email: 'rodrigo.martins@awnet.com.br',
    cargo: 'Arquiteto Sênior',
    area: 'Projetos Corporativos',
    gestor: 'Ricardo Prado',
    gestor_email: 'ricardo.prado@awnet.com.br',
    gestor_telefone: '(11) 98765-4321',
    modelo: 'CLT',
    salario_centavos: 1450000,
    jornada: 'Segunda a sexta · 9h às 18h',
    local: 'São Paulo · Híbrido (3x presencial)',
    inicio: '2026-08-18',
    validade_em: '2026-08-01',
    beneficios: benBase,
    remetente: 'Time de Gente & Gestão · a|w',
    tutor_nome: 'Bruna Tanaka',
    tutor_funcao: 'Arquiteta Sênior · time de Projetos Corporativos',
    tutor_whatsapp: '(11) 99621-4488',
    criada_em: '2026-07-19T10:23:00-03:00',
    criada_por: 'rodrigo.martins@awnet.com.br',
    atualizada_em: '2026-07-19T14:12:00-03:00',
    abriu_em: '2026-07-19T18:47:00-03:00',
    aceita_em: null,
    recusada_em: null,
    recusa_motivo: null,
  },
  {
    id: 'p-002',
    slug: 'juliana-farias',
    status: 'aceita',
    candidato_nome: 'Juliana Farias',
    candidato_email: 'juliana.farias@gmail.com',
    cargo: 'Coordenadora de Obras',
    area: 'Construção',
    gestor: 'Marcelo Reis',
    gestor_email: 'marcelo.reis@awnet.com.br',
    gestor_telefone: '(11) 99872-1140',
    modelo: 'CLT',
    salario_centavos: 1820000,
    jornada: 'Segunda a sexta · 8h às 17h',
    local: 'São Paulo · Presencial',
    inicio: '2026-08-05',
    validade_em: '2026-07-25',
    beneficios: benBase,
    remetente: 'Time de Gente & Gestão · a|w',
    tutor_nome: 'Fabiana Costa',
    tutor_funcao: 'Engenheira Sênior · time de Construção',
    tutor_whatsapp: '(11) 98432-7715',
    criada_em: '2026-07-15T09:10:00-03:00',
    criada_por: 'analice.trevilato@awnet.com.br',
    atualizada_em: '2026-07-17T11:03:00-03:00',
    abriu_em: '2026-07-15T20:41:00-03:00',
    aceita_em: '2026-07-17T11:03:00-03:00',
    recusada_em: null,
    recusa_motivo: null,
  },
  {
    id: 'p-003',
    slug: 'pedro-ono',
    status: 'pendente',
    candidato_nome: 'Pedro Ono',
    candidato_email: 'pedro.ono@outlook.com',
    cargo: 'Estagiário de Arquitetura',
    area: 'Projetos Corporativos',
    gestor: 'Ricardo Prado',
    gestor_email: 'ricardo.prado@awnet.com.br',
    gestor_telefone: '(11) 98765-4321',
    modelo: 'Estágio',
    salario_centavos: 250000,
    jornada: 'Segunda a sexta · 6h/dia',
    local: 'São Paulo · Híbrido (2x presencial)',
    inicio: '2026-08-04',
    validade_em: '2026-07-30',
    beneficios: ['Vale-refeição R$ 35/dia', 'Vale-transporte', 'Seguro de vida'],
    remetente: 'Time de Gente & Gestão · a|w',
    tutor_nome: 'Camila Torres',
    tutor_funcao: 'Arquiteta Pleno · time de Projetos Corporativos',
    tutor_whatsapp: '(11) 97621-3390',
    criada_em: '2026-07-21T08:55:00-03:00',
    criada_por: 'recursoshumanos.aw@awnet.com.br',
    atualizada_em: '2026-07-21T08:55:00-03:00',
    abriu_em: null,
    aceita_em: null,
    recusada_em: null,
    recusa_motivo: null,
  },
  {
    id: 'p-004',
    slug: 'camila-lozano',
    status: 'aberta',
    candidato_nome: 'Camila Lozano',
    candidato_email: 'camila.lozano@gmail.com',
    cargo: 'Engenheira Civil Pleno',
    area: 'Construção',
    gestor: 'Marcelo Reis',
    gestor_email: 'marcelo.reis@awnet.com.br',
    gestor_telefone: '(11) 99872-1140',
    modelo: 'CLT',
    salario_centavos: 1360000,
    jornada: 'Segunda a sexta · 8h às 17h',
    local: 'Rio de Janeiro · Presencial (obra)',
    inicio: '2026-08-11',
    validade_em: '2026-07-28',
    beneficios: benBase,
    remetente: 'Time de Gente & Gestão · a|w',
    tutor_nome: 'Renato Vasconcelos',
    tutor_funcao: 'Engenheiro Sênior · time de Construção',
    tutor_whatsapp: '(21) 99312-8845',
    criada_em: '2026-07-20T15:32:00-03:00',
    criada_por: 'rodrigo.martins@awnet.com.br',
    atualizada_em: '2026-07-20T15:32:00-03:00',
    abriu_em: '2026-07-21T07:14:00-03:00',
    aceita_em: null,
    recusada_em: null,
    recusa_motivo: null,
  },
  {
    id: 'p-005',
    slug: 'thiago-abreu',
    status: 'recusada',
    candidato_nome: 'Thiago Abreu',
    candidato_email: 'thiago.abreu@gmail.com',
    cargo: 'Arquiteto Pleno',
    area: 'Projetos Corporativos',
    gestor: 'Ricardo Prado',
    gestor_email: 'ricardo.prado@awnet.com.br',
    gestor_telefone: '(11) 98765-4321',
    modelo: 'CLT',
    salario_centavos: 1100000,
    jornada: 'Segunda a sexta · 9h às 18h',
    local: 'São Paulo · Híbrido (3x presencial)',
    inicio: '2026-08-04',
    validade_em: '2026-07-22',
    beneficios: benBase,
    remetente: 'Time de Gente & Gestão · a|w',
    tutor_nome: 'Diego Sampaio',
    tutor_funcao: 'Arquiteto Sênior · time de Projetos Corporativos',
    tutor_whatsapp: '(11) 98120-4472',
    criada_em: '2026-07-14T13:11:00-03:00',
    criada_por: 'analice.trevilato@awnet.com.br',
    atualizada_em: '2026-07-16T09:22:00-03:00',
    abriu_em: '2026-07-14T22:03:00-03:00',
    aceita_em: null,
    recusada_em: '2026-07-16T09:22:00-03:00',
    recusa_motivo: 'Aceitou outra oferta com salário 20% acima.',
  },
  {
    id: 'p-006',
    slug: 'marina-cavalcante',
    status: 'aceita',
    candidato_nome: 'Marina Cavalcante',
    candidato_email: 'marina.cavalcante@gmail.com',
    cargo: 'Designer de Interiores',
    area: 'Projetos Corporativos',
    gestor: 'Fernanda Toledo',
    gestor_email: 'fernanda.toledo@awnet.com.br',
    gestor_telefone: '(11) 98214-7788',
    modelo: 'CLT',
    salario_centavos: 980000,
    jornada: 'Segunda a sexta · 9h às 18h',
    local: 'São Paulo · Híbrido (3x presencial)',
    inicio: '2026-07-28',
    validade_em: '2026-07-20',
    beneficios: benBase,
    remetente: 'Time de Gente & Gestão · a|w',
    tutor_nome: 'Vanessa Prado',
    tutor_funcao: 'Designer Sênior · time de Projetos Corporativos',
    tutor_whatsapp: '(11) 99045-1183',
    criada_em: '2026-07-10T11:45:00-03:00',
    criada_por: 'recursoshumanos.aw@awnet.com.br',
    atualizada_em: '2026-07-12T16:30:00-03:00',
    abriu_em: '2026-07-10T19:12:00-03:00',
    aceita_em: '2026-07-12T16:30:00-03:00',
    recusada_em: null,
    recusa_motivo: null,
  },
  {
    id: 'p-007',
    slug: 'bruno-tanaka',
    status: 'pendente',
    candidato_nome: 'Bruno Tanaka',
    candidato_email: 'bruno.tanaka@outlook.com',
    cargo: 'Coordenador de Projetos',
    area: 'Projetos Corporativos',
    gestor: 'Fernanda Toledo',
    gestor_email: 'fernanda.toledo@awnet.com.br',
    gestor_telefone: '(11) 98214-7788',
    modelo: 'CLT',
    salario_centavos: 2100000,
    jornada: 'Segunda a sexta · 9h às 18h',
    local: 'São Paulo · Híbrido (3x presencial)',
    inicio: '2026-09-01',
    validade_em: '2026-08-05',
    beneficios: [...benBase, 'Celular corporativo'],
    remetente: 'Time de Gente & Gestão · a|w',
    tutor_nome: 'Ana Beatriz Lima',
    tutor_funcao: 'Coordenadora Sênior · time de Projetos Corporativos',
    tutor_whatsapp: '(11) 98776-2210',
    criada_em: '2026-07-21T11:02:00-03:00',
    criada_por: 'rodrigo.martins@awnet.com.br',
    atualizada_em: '2026-07-21T11:02:00-03:00',
    abriu_em: null,
    aceita_em: null,
    recusada_em: null,
    recusa_motivo: null,
  },
  {
    id: 'p-008',
    slug: 'renata-veloso',
    status: 'rascunho',
    candidato_nome: 'Renata Veloso',
    candidato_email: 'renata.veloso@gmail.com',
    cargo: 'Compradora Sênior',
    area: 'Suprimentos',
    gestor: 'Paulo Nakamura',
    gestor_email: 'paulo.nakamura@awnet.com.br',
    gestor_telefone: '(11) 97321-5522',
    modelo: 'CLT',
    salario_centavos: 1520000,
    jornada: 'Segunda a sexta · 9h às 18h',
    local: 'São Paulo · Presencial',
    inicio: '2026-08-25',
    validade_em: '2026-08-08',
    beneficios: benBase,
    remetente: 'Time de Gente & Gestão · a|w',
    tutor_nome: 'Karina Ferreira',
    tutor_funcao: 'Compradora Master · time de Suprimentos',
    tutor_whatsapp: '(11) 97188-5539',
    criada_em: '2026-07-21T14:30:00-03:00',
    criada_por: 'analice.trevilato@awnet.com.br',
    atualizada_em: '2026-07-21T14:30:00-03:00',
    abriu_em: null,
    aceita_em: null,
    recusada_em: null,
    recusa_motivo: null,
  },
  {
    id: 'p-009',
    slug: 'gabriel-hessel',
    status: 'expirada',
    candidato_nome: 'Gabriel Hessel',
    candidato_email: 'gabriel.hessel@outlook.com',
    cargo: 'Engenheiro Civil Sênior',
    area: 'Construção',
    gestor: 'Marcelo Reis',
    gestor_email: 'marcelo.reis@awnet.com.br',
    gestor_telefone: '(11) 99872-1140',
    modelo: 'CLT',
    salario_centavos: 1780000,
    jornada: 'Segunda a sexta · 8h às 17h',
    local: 'São Paulo · Presencial (obra)',
    inicio: '2026-08-04',
    validade_em: '2026-07-10',
    beneficios: benBase,
    remetente: 'Time de Gente & Gestão · a|w',
    tutor_nome: 'Sergio Ramos',
    tutor_funcao: 'Engenheiro Master · time de Construção',
    tutor_whatsapp: '(11) 96322-4478',
    criada_em: '2026-07-01T10:00:00-03:00',
    criada_por: 'recursoshumanos.aw@awnet.com.br',
    atualizada_em: '2026-07-01T10:00:00-03:00',
    abriu_em: '2026-07-02T15:32:00-03:00',
    aceita_em: null,
    recusada_em: null,
    recusa_motivo: null,
  },
  {
    id: 'p-010',
    slug: 'larissa-mendes',
    status: 'aberta',
    candidato_nome: 'Larissa Mendes',
    candidato_email: 'larissa.mendes@gmail.com',
    cargo: 'Analista de Sustentabilidade',
    area: 'ESG',
    gestor: 'Ivo Wohnrath',
    gestor_email: 'ivo@awnet.com.br',
    gestor_telefone: '(11) 98000-0001',
    modelo: 'CLT',
    salario_centavos: 890000,
    jornada: 'Segunda a sexta · 9h às 18h',
    local: 'São Paulo · Remoto',
    inicio: '2026-08-18',
    validade_em: '2026-08-01',
    beneficios: benBase,
    remetente: 'Time de Gente & Gestão · a|w',
    tutor_nome: 'Beatriz Almeida',
    tutor_funcao: 'Analista Sênior · time de ESG',
    tutor_whatsapp: '(11) 98454-1029',
    criada_em: '2026-07-20T09:45:00-03:00',
    criada_por: 'rodrigo.martins@awnet.com.br',
    atualizada_em: '2026-07-20T09:45:00-03:00',
    abriu_em: '2026-07-20T21:11:00-03:00',
    aceita_em: null,
    recusada_em: null,
    recusa_motivo: null,
  },
]

export function getPropostaById(id: string): PropostaMock | undefined {
  return propostasMock.find((p) => p.id === id)
}

export function fmtBRL(centavos: number): string {
  return (centavos / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  })
}

export function fmtData(iso: string | null): string {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString('pt-BR')
  } catch {
    return '—'
  }
}

export function fmtDataHora(iso: string | null): string {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return '—'
  }
}

export function fmtRelativo(iso: string | null): string {
  if (!iso) return '—'
  const d = new Date(iso).getTime()
  const now = Date.now()
  const diff = now - d
  const min = Math.floor(diff / 60000)
  if (min < 1) return 'agora'
  if (min < 60) return `${min} min atrás`
  const h = Math.floor(min / 60)
  if (h < 24) return `${h}h atrás`
  const dias = Math.floor(h / 24)
  if (dias < 30) return `${dias} dia${dias > 1 ? 's' : ''} atrás`
  return new Date(iso).toLocaleDateString('pt-BR')
}
