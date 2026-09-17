import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { RhSidebar } from '@/components/rh/Sidebar'
import { usuarioLogado } from '@/lib/auth-rh'
import { APP_VERSION, APP_BUILD_DATE } from '@/lib/version'

export const metadata: Metadata = {
  title: 'Painel RH · Carta Proposta a|w',
}

export default async function RhLayout({ children }: { children: React.ReactNode }) {
  const user = await usuarioLogado()
  if (!user) redirect('/')

  return (
    <div className="lg:flex min-h-screen bg-aw-bg text-aw-preto">
      <RhSidebar user={user} />
      <div className="flex-1 min-w-0 flex flex-col min-h-[calc(100vh-56px)] lg:min-h-screen">
        <main className="flex-1">{children}</main>
        <footer className="border-t border-aw-prata/30 bg-white px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11px] text-aw-grafite">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="font-semibold tracking-wider uppercase text-[10px]">
              Carta Proposta · a|w
            </span>
            <span className="text-aw-prata">·</span>
            <span>{APP_VERSION}</span>
            <span className="text-aw-prata">·</span>
            <span>{APP_BUILD_DATE}</span>
          </div>
          <div className="text-aw-prata">Protótipo em evolução</div>
        </footer>
      </div>
    </div>
  )
}
