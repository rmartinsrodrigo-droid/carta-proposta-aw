export type UsuarioRh = {
  nome: string
  email: string
  role: 'admin' | 'operacional'
}

// Fase mock — quando o Supabase entrar, vem da tabela usuarios_rh_autorizados.
export const usuariosRh: UsuarioRh[] = [
  { nome: 'Rodrigo Martins', email: 'rodrigo.martins@awnet.com.br', role: 'admin' },
  { nome: 'Analice Trevilato', email: 'analice.trevilato@awnet.com.br', role: 'operacional' },
  { nome: 'Recursos Humanos AW', email: 'recursoshumanos.aw@awnet.com.br', role: 'admin' },
]

export function autorizado(email: string): UsuarioRh | null {
  const norm = email.trim().toLowerCase()
  return usuariosRh.find((u) => u.email.toLowerCase() === norm) ?? null
}

export function iniciais(nome: string): string {
  return nome
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}
