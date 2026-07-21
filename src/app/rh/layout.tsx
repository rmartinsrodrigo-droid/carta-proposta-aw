import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { RhSidebar } from '@/components/rh/Sidebar'
import { usuarioLogado } from '@/lib/auth-rh'

export const metadata: Metadata = {
  title: 'Painel RH · Carta Proposta a|w',
}

export default async function RhLayout({ children }: { children: React.ReactNode }) {
  const user = await usuarioLogado()
  if (!user) redirect('/')

  return (
    <div className="flex min-h-screen bg-aw-bg text-aw-preto">
      <RhSidebar user={user} />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  )
}
