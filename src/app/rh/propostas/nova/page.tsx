import { EditorProposta } from './EditorProposta'

// O editor tem sua própria estrutura full-height (form à esquerda, prévia à direita).
// Não usa o padding padrão das outras páginas do painel.
export default function NovaPropostaPage() {
  return <EditorProposta />
}
