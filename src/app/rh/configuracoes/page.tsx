import { ConfiguracoesForm } from './ConfiguracoesForm'

export default function ConfiguracoesPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-8">
      <div className="mb-8">
        <div className="text-[11px] tracking-[0.18em] uppercase text-aw-tiffany-forte">
          Preferências
        </div>
        <h1 className="text-3xl font-bold mt-1 tracking-tight">Configurações</h1>
        <p className="text-aw-grafite mt-1 text-sm">
          Padrões que a plataforma usa quando você cria uma proposta nova.
        </p>
      </div>

      <ConfiguracoesForm />
    </div>
  )
}
