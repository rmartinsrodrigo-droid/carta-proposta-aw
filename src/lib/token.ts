import { createHmac, timingSafeEqual } from 'node:crypto'

type Payload = {
  id: string
  exp: number
}

function secret(): string {
  const s = process.env.PROPOSTA_TOKEN_SECRET
  if (!s || s.length < 32) {
    throw new Error(
      'PROPOSTA_TOKEN_SECRET ausente ou curto (mínimo 32 chars). Gera com: openssl rand -hex 32'
    )
  }
  return s
}

function b64url(buf: Buffer): string {
  return buf.toString('base64url')
}

export function signToken(payload: Payload): string {
  const body = b64url(Buffer.from(JSON.stringify(payload)))
  const sig = b64url(createHmac('sha256', secret()).update(body).digest())
  return `${body}.${sig}`
}

export function verifyToken(token: string): Payload | null {
  if (typeof token !== 'string' || !token.includes('.')) return null
  const [body, sig] = token.split('.')
  if (!body || !sig) return null

  const expected = createHmac('sha256', secret()).update(body).digest()
  let received: Buffer
  try {
    received = Buffer.from(sig, 'base64url')
  } catch {
    return null
  }
  if (received.length !== expected.length) return null
  if (!timingSafeEqual(received, expected)) return null

  let payload: Payload
  try {
    payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
  } catch {
    return null
  }
  if (
    typeof payload?.id !== 'string' ||
    typeof payload?.exp !== 'number' ||
    Math.floor(Date.now() / 1000) > payload.exp
  ) {
    return null
  }
  return payload
}
