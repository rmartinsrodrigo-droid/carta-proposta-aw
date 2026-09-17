'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { iniciais, type UsuarioRh } from '@/lib/mock/usuarios'

const items = [
  {
    href: '/rh/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" />
        <rect x="14" y="3" width="7" height="5" />
        <rect x="14" y="12" width="7" height="9" />
        <rect x="3" y="16" width="7" height="5" />
      </svg>
    ),
  },
  {
    href: '/rh/propostas',
    label: 'Propostas',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="13" y2="17" />
      </svg>
    ),
  },
  {
    href: '/rh/equipe',
    label: 'Equipe RH',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: '/rh/configuracoes',
    label: 'Configurações',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
]

export function RhSidebar({ user }: { user: UsuarioRh }) {
  const pathname = usePathname()
  const router = useRouter()
  const [aberto, setAberto] = useState(false)

  // Fecha o drawer quando a rota muda
  useEffect(() => {
    setAberto(false)
  }, [pathname])

  // Bloqueia scroll do body quando drawer aberto (mobile)
  useEffect(() => {
    if (aberto) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [aberto])

  const sair = () => {
    document.cookie = 'rh_email=; path=/; max-age=0'
    document.cookie = 'rh_nome=; path=/; max-age=0'
    router.push('/')
    router.refresh()
  }

  const menu = (
    <nav className="flex-1 py-4">
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== '/rh/dashboard' && pathname?.startsWith(item.href) === true)
        const baseCls =
          'flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors'
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${baseCls} ${
              active
                ? 'bg-aw-tiffany text-aw-preto'
                : 'text-white/75 hover:bg-white/5 hover:text-white'
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        )
      })}
    </nav>
  )

  const rodape = (
    <div className="p-4 border-t border-white/10 space-y-3">
      <div className="flex items-center gap-3 px-2 py-2">
        <div className="w-9 h-9 bg-aw-tiffany text-aw-preto flex items-center justify-center font-bold text-sm shrink-0">
          {iniciais(user.nome)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold truncate">{user.nome}</div>
          <div className="text-[11px] text-aw-prata truncate">{user.email}</div>
        </div>
      </div>
      <button
        onClick={sair}
        type="button"
        className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-white/60 hover:bg-white/5 hover:text-white transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Sair
      </button>
    </div>
  )

  const cabecalho = (
    <div className="px-6 py-7 border-b border-white/10">
      <div className="text-[11px] tracking-[0.18em] uppercase text-aw-prata">Athié Wohnrath</div>
      <div className="text-lg font-bold mt-1">Carta Proposta</div>
    </div>
  )

  return (
    <>
      {/* Topbar mobile — visível abaixo de lg */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-aw-preto text-aw-branco px-4 py-3 border-b border-white/10">
        <div className="min-w-0">
          <div className="text-[9px] tracking-[0.18em] uppercase text-aw-prata leading-tight">
            Athié Wohnrath
          </div>
          <div className="text-sm font-bold leading-tight">Carta Proposta</div>
        </div>
        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          {aberto ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </header>

      {/* Backdrop escuro (mobile, quando drawer aberto) */}
      {aberto && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setAberto(false)}
          aria-hidden
        />
      )}

      {/* Drawer mobile */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-72 bg-aw-preto text-aw-branco flex flex-col transition-transform duration-200 ${
          aberto ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {cabecalho}
        {menu}
        {rodape}
      </aside>

      {/* Sidebar desktop — visível a partir de lg */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-aw-preto text-aw-branco flex-col min-h-screen">
        {cabecalho}
        {menu}
        {rodape}
      </aside>
    </>
  )
}
