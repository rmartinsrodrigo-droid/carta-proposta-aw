import { CartaCandidato, type CartaDados } from '@/components/carta/CartaCandidato'

const mock: CartaDados = {
  nome: 'Rodrigo Martins',
  candidato_email: 'rodrigo.martins@awnet.com.br',
  cargo: 'Arquiteto Sênior',
  area: 'Projetos Corporativos',
  gestor: 'Ricardo Prado',
  gestor_email: 'ricardo.prado@awnet.com.br',
  gestor_telefone: '(11) 98765-4321',
  modelo: 'CLT',
  salario: 14500,
  jornada: 'Segunda a sexta · 9h às 18h',
  local: 'São Paulo · Híbrido (3x presencial)',
  inicio: '2026-08-18',
  validade: '2026-07-31',
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

export default function PreviewPage() {
  return <CartaCandidato dados={mock} mode="candidate" />
}
