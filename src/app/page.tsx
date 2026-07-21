import { LoginForm } from './LoginForm'

export default function Home() {
  return (
    <div className="min-h-screen bg-aw-preto text-aw-branco flex items-stretch">
      {/* Lado esquerdo: identidade */}
      <div className="hidden md:flex flex-col justify-between w-1/2 p-12 bg-aw-preto">
        <div className="text-[11px] tracking-[0.18em] uppercase text-aw-tiffany">
          Athié Wohnrath
        </div>
        <div>
          <div className="w-12 h-[3px] bg-aw-tiffany mb-6" />
          <h1 className="text-5xl font-bold tracking-tight mb-4 leading-[1.05]">
            Carta Proposta.
          </h1>
          <p className="text-lg text-white/70 max-w-md">
            A plataforma que transforma uma proposta em experiência de aceite.
          </p>
        </div>
        <div className="text-[11px] tracking-[0.14em] uppercase text-white/40">
          Acesso restrito à equipe autorizada.
        </div>
      </div>

      {/* Lado direito: login */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 bg-aw-bg text-aw-preto">
        <LoginForm />
      </div>
    </div>
  )
}
