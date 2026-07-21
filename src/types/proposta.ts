export type PropostaStatus =
  | 'rascunho'
  | 'pendente'
  | 'aberta'
  | 'aceita'
  | 'recusada'
  | 'expirada'
  | 'cancelada'

export type Beneficio = {
  titulo: string
  descricao?: string
}

export type Proposta = {
  id: string
  slug: string
  status: PropostaStatus

  candidato_nome: string
  candidato_email: string | null
  candidato_telefone: string | null

  cargo: string
  area: string | null
  gestor_nome: string | null
  modelo_contratacao: string | null
  salario_centavos: number | null
  moeda: string
  jornada: string | null
  local_trabalho: string | null
  inicio_previsto: string | null
  validade_em: string

  beneficios: Beneficio[]
  remetente_time: string | null
  observacoes: string | null

  criada_por: string
  criada_em: string
  atualizada_em: string
  abriu_em: string | null
  aceita_em: string | null
  recusada_em: string | null
  recusa_motivo: string | null
  primeira_ip: string | null
  primeiro_user_agent: string | null
}

export type EventoProposta = {
  id: number
  proposta_id: string
  tipo:
    | 'criada'
    | 'link_gerado'
    | 'aberta'
    | 'aceita'
    | 'recusada'
    | 'expirada'
    | 'editada'
  detalhes: Record<string, unknown>
  ip: string | null
  user_agent: string | null
  ator_email: string | null
  criado_em: string
}
