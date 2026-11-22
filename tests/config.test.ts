import { expect, it } from 'vitest'
import { solanaMint, webUrl } from '../src/lib/config'
it('requires a decoded 32-byte Solana address', () => {
  expect(solanaMint('11111111111111111111111111111111')).toBeDefined()
  expect(
    solanaMint('So11111111111111111111111111111111111111112'),
  ).toBeDefined()
  expect(solanaMint('111111111111111111111111111111111')).toBeUndefined()
  expect(solanaMint('z'.repeat(44))).toBeUndefined()
  expect(solanaMint('0OIl')).toBeUndefined()
})
it('accepts HTTPS links only on configured allowed hosts', () => {
  expect(webUrl('https://x.com/bonkless', ['x.com'])?.hostname).toBe('x.com')
  expect(webUrl('https://x.com.evil.test/', ['x.com'])).toBeUndefined()
  expect(webUrl('http://x.com/', ['x.com'])).toBeUndefined()
  expect(webUrl('https://user:pass@x.com/', ['x.com'])).toBeUndefined()
})
