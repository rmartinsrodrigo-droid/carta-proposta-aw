import { cookies } from 'next/headers'
import { autorizado, type UsuarioRh } from '@/lib/mock/usuarios'

export async function usuarioLogado(): Promise<UsuarioRh | null> {
  const jar = await cookies()
  const email = jar.get('rh_email')?.value
  if (!email) return null
  return autorizado(decodeURIComponent(email))
}
