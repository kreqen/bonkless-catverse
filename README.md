# BONKLESS CATVERSE

**NO PLAN. JUST CAT.** An interactive Solana meme-brand site running on Next.js App Router. The Catverse, editor, and gallery are free to use without a wallet.

## Development

Use Node.js 22.12 or later and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

The pages live in `src/app`. The procedural Three.js mascot and client interactions live in `src/components`. Business rules and typed settings live in `src/lib`. Branded artwork and locally hosted fonts are in `public`.

The home illustration can switch to a live procedural scene. The playable room defaults to live 3D on larger screens and to illustration on mobile or when reduced motion is preferred. The scene control lets visitors choose. Cat-room achievements use local storage. Meme compositing and PNG export run in the browser.

## Configuration

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | HTTPS production origin for metadata, previews and sitemap. Vercel's production URL is used when available and this override is unset. |
| `NEXT_PUBLIC_X_URL` | Official HTTPS X profile URL. |
| `NEXT_PUBLIC_TELEGRAM_URL` | Official HTTPS Telegram group or channel. |
| `NEXT_PUBLIC_SOLANA_MINT` | Owner-verified 32-byte Solana mint address encoded in Base58. |

Rebuild after changing these settings. Leave the social or mint values blank until the project owner supplies the official values. Mint-format validation does not establish ownership or on-chain status.

## Checks

```sh
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

By default Playwright starts the production build locally. To exercise a running deployment, use `TEST_BASE_URL=https://your-site npm run test:e2e`.

## Vercel

Import or connect the GitHub repository using the Next.js framework preset, main branch, and project root. Add the public settings above to Production as verified values become available. The build does not require tokens or private keys.

Font license notices are bundled in `public/fonts`.
