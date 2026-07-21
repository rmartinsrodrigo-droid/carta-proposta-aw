import { EditarPropostaClient } from './EditarPropostaClient'

export default async function EditarPropostaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <EditarPropostaClient id={id} />
}
