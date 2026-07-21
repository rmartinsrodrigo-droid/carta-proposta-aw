'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { autorizado } from '@/lib/mock/usuarios'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)

  const submeter = (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    const user = autorizado(email)
    if (!user) {
      setErro('Email não autorizado. Fala com o admin do RH pra liberar seu acesso.')
      return
    }
    setCarregando(true)
    // Fase mock — cookie client-side com 7 dias.
    // Quando o Supabase entrar, será magic-link real via supabase.auth.signInWithOtp.
    const seteDias = 60 * 60 * 24 * 7
    document.cookie = `rh_email=${encodeURIComponent(user.email)}; path=/; max-age=${seteDias}; samesite=lax`
    document.cookie = `rh_nome=${encodeURIComponent(user.nome)}; path=/; max-age=${seteDias}; samesite=lax`
    router.push('/rh/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={submeter} className="w-full max-w-sm">
      <div className="text-[11px] tracking-[0.18em] uppercase text-aw-tiffany-forte mb-3">
        Painel RH
      </div>
      <h2 className="text-3xl font-bold tracking-tight mb-2">Entrar.</h2>
      <p className="text-aw-grafite mb-8 text-sm">
        Só emails cadastrados na equipe conseguem entrar.
      </p>

      <label className="block mb-6">
        <span className="block text-[11px] tracking-[0.14em] uppercase font-semibold text-aw-grafite mb-1.5">
          Seu email corporativo
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nome.sobrenome@awnet.com.br"
          required
          autoFocus
          className="w-full px-4 py-3 text-sm bg-white border border-aw-prata/40 focus:outline-none focus:border-aw-preto placeholder:text-aw-prata"
        />
      </label>

      {erro && (
        <div className="mb-4 px-4 py-3 border border-red-300 bg-red-50 text-red-800 text-sm">
          {erro}
        </div>
      )}

      <button
        type="submit"
        disabled={carregando}
        className="w-full bg-aw-preto text-aw-branco py-3.5 text-sm font-semibold hover:bg-aw-grafite transition-colors disabled:opacity-60"
      >
        {carregando ? 'Entrando…' : 'Entrar no painel'}
      </button>

      <div className="mt-8 pt-6 border-t border-aw-prata/30">
        <div className="text-[11px] tracking-[0.14em] uppercase font-semibold text-aw-grafite mb-2">
          Ambiente de protótipo
        </div>
        <p className="text-[12px] text-aw-grafite leading-relaxed">
          Sem senha por enquanto. Assim que ligarmos ao Supabase, o login vira magic-link (chega
          um botão no seu email). A lista de emails autorizados vive em{' '}
          <code className="bg-white px-1 py-0.5 border border-aw-prata/30">
            /rh/equipe
          </code>
          .
        </p>
      </div>
    </form>
  )
}
