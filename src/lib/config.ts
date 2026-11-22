export function webUrl(value?: string, hosts?: string[]) {
  try {
    const url = new URL(value ?? '')
    if (
      url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      (!hosts || hosts.includes(url.hostname))
    )
      return url
  } catch {}
  return undefined
}

export function solanaMint(value?: string) {
  const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
  if (!value || !/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value)) return undefined
  let decoded = 0n
  for (const symbol of value)
    decoded = decoded * 58n + BigInt(alphabet.indexOf(symbol))
  const bytes = decoded ? Math.ceil(decoded.toString(2).length / 8) : 0
  return bytes + (value.match(/^1*/)?.[0].length ?? 0) === 32
    ? value
    : undefined
}

export const config = {
  site: webUrl(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL
        : undefined),
  ),
  x: webUrl(process.env.NEXT_PUBLIC_X_URL, [
    'x.com',
    'www.x.com',
    'twitter.com',
  ]),
  telegram: webUrl(process.env.NEXT_PUBLIC_TELEGRAM_URL, [
    't.me',
    'telegram.me',
  ]),
  mint: solanaMint(process.env.NEXT_PUBLIC_SOLANA_MINT),
}

export const routes = [
  ['/catverse', 'Catverse'],
  ['/meme-lab', 'Meme Lab'],
  ['/lore', 'Lore'],
  ['/gallery', 'Gallery'],
  ['/token', 'Token'],
  ['/community', 'Community'],
] as const
