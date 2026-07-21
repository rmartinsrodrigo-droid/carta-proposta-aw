'use client'

import { useState } from 'react'

export function CopiarLinkBtn({ link }: { link: string }) {
  const [copiado, setCopiado] = useState(false)

  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(link)
          setCopiado(true)
          setTimeout(() => setCopiado(false), 2200)
        } catch {
          window.prompt('Copia o link abaixo:', link)
        }
      }}
      className="inline-flex items-center gap-2 bg-aw-tiffany text-aw-preto px-4 py-2.5 text-sm font-bold hover:bg-aw-tiffany-forte transition-colors"
      type="button"
    >
      {copiado ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copiado!
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="0" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copiar link
        </>
      )}
    </button>
  )
}
