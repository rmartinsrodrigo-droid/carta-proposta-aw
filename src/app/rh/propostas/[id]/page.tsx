import { DetalhePropostaClient } from './DetalhePropostaClient'

export default async function DetalhePropostaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <DetalhePropostaClient id={id} />
}
