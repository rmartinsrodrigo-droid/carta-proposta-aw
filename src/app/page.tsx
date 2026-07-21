import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-aw-bg flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <div className="text-[11px] tracking-[0.18em] uppercase text-aw-tiffany-forte mb-3">
          Athié Wohnrath
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-4">Carta Proposta</h1>
        <p className="text-aw-grafite text-lg mb-10 max-w-lg">
          Ambiente de desenvolvimento. Escolhe por onde entrar.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/rh/dashboard"
            className="group block p-6 bg-white border border-aw-prata/30 hover:border-aw-preto transition-colors"
          >
            <div className="text-[11px] tracking-[0.18em] uppercase text-aw-tiffany-forte mb-2">
              Interno
            </div>
            <div className="text-xl font-bold mb-1">Painel RH</div>
            <div className="text-sm text-aw-grafite mb-4">
              Dashboard, lista de propostas, editor com prévia ao vivo, histórico.
            </div>
            <div className="text-sm font-semibold text-aw-preto flex items-center gap-2">
              Abrir painel
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>

          <Link
            href="/preview"
            className="group block p-6 bg-aw-preto text-aw-branco hover:bg-aw-grafite transition-colors"
          >
            <div className="text-[11px] tracking-[0.18em] uppercase text-aw-tiffany mb-2">
              Candidato
            </div>
            <div className="text-xl font-bold mb-1">Prévia da carta</div>
            <div className="text-sm text-white/70 mb-4">
              Como o candidato vê a proposta quando abre o link único.
            </div>
            <div className="text-sm font-semibold flex items-center gap-2">
              Ver prévia
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
