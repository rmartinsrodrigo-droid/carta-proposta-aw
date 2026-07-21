import { usuariosRh, iniciais } from '@/lib/mock/usuarios'
import { propostasMock } from '@/lib/mock/propostas'

export default function EquipePage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="text-[11px] tracking-[0.18em] uppercase text-aw-tiffany-forte">
            Equipe
          </div>
          <h1 className="text-3xl font-bold mt-1 tracking-tight">Quem tem acesso ao painel</h1>
          <p className="text-aw-grafite mt-1 text-sm">
            {usuariosRh.length} pessoas autorizadas. Só emails desta lista conseguem entrar na
            plataforma.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 bg-aw-preto text-aw-branco px-5 py-3 text-sm font-semibold hover:bg-aw-grafite transition-colors"
          onClick={undefined}
          disabled
          title="Disponível quando plugarmos o Supabase"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="17" y1="11" x2="23" y2="11" />
          </svg>
          Convidar (em breve)
        </button>
      </div>

      <div className="bg-white border border-aw-prata/30">
        <table className="w-full">
          <thead>
            <tr className="text-[11px] tracking-[0.14em] uppercase text-aw-grafite text-left">
              <th className="px-6 py-3 font-semibold">Nome</th>
              <th className="px-6 py-3 font-semibold">Email</th>
              <th className="px-6 py-3 font-semibold">Perfil</th>
              <th className="px-6 py-3 font-semibold">Propostas criadas</th>
              <th className="px-6 py-3 font-semibold w-8"></th>
            </tr>
          </thead>
          <tbody>
            {usuariosRh.map((u) => {
              const criadas = propostasMock.filter(
                (p) => p.criada_por.toLowerCase() === u.email.toLowerCase()
              ).length
              return (
                <tr key={u.email} className="border-t border-aw-prata/20 hover:bg-aw-bg transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-aw-preto text-aw-tiffany flex items-center justify-center font-bold text-sm shrink-0">
                        {iniciais(u.nome)}
                      </div>
                      <div className="font-semibold">{u.nome}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-aw-grafite">
                    <a href={`mailto:${u.email}`} className="hover:text-aw-preto">
                      {u.email}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                      u.role === 'admin' ? 'bg-aw-tiffany text-aw-preto' : 'bg-neutral-200 text-neutral-700'
                    }`}>
                      {u.role === 'admin' ? 'Admin' : 'Operacional'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">{criadas}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      className="text-aw-grafite hover:text-red-700 disabled:opacity-30"
                      disabled
                      title="Disponível quando plugarmos o Supabase"
                      aria-label="Remover"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-[12px] text-aw-grafite max-w-2xl">
        Nesta fase de protótipo, a lista de emails autorizados vive em código
        (<code className="bg-white px-1 py-0.5 border border-aw-prata/30 text-[11px]">src/lib/mock/usuarios.ts</code>).
        Quando o Supabase entrar, essa mesma tela vai gerenciar a tabela{' '}
        <code className="bg-white px-1 py-0.5 border border-aw-prata/30 text-[11px]">usuarios_rh_autorizados</code>{' '}
        no banco.
      </div>
    </div>
  )
}
