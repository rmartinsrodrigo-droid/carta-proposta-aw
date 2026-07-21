import type { Metadata } from 'next'
import { RhSidebar } from '@/components/rh/Sidebar'

export const metadata: Metadata = {
  title: 'Painel RH · Carta Proposta a|w',
}

export default function RhLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-aw-bg text-aw-preto">
      <RhSidebar />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  )
}
