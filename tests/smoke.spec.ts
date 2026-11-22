import { expect, test } from '@playwright/test'
import { readFile } from 'node:fs/promises'

test('public routes and custom 404 render', async ({ page }) => {
  const routes = [
    ['/', /NO PLAN.*JUST CAT/s],
    ['/catverse', 'THE CATVERSE'],
    ['/meme-lab', 'MEME LAB'],
    ['/lore', 'THE LORE'],
    ['/gallery', 'GALLERY'],
    ['/token', 'TOKEN INFO'],
    ['/community', 'JOIN THE CHAOS'],
  ] as const
  for (const [route, heading] of routes) {
    expect((await page.goto(route))?.status()).toBe(200)
    await expect(
      page.getByRole('heading', { level: 1, name: heading }),
    ).toBeVisible()
  }
  expect((await page.goto('/missing-test-page'))?.status()).toBe(404)
  await expect(
    page.getByRole('heading', { name: 'CAT NOT FOUND.' }),
  ).toBeVisible()
})

test('care unlocks achievements and survives reload', async ({ page }) => {
  await page.goto('/catverse')
  await page.getByRole('button', { name: 'Feed tuna' }).click()
  await expect(page.getByRole('status')).toHaveText('A whole can? For me?')
  await expect(page.getByText('Unlocked')).toBeVisible()
  await page.reload()
  await expect(page.getByText('Unlocked')).toBeVisible()
})

test('Meme Lab exports a PNG with the expected dimensions', async ({
  page,
}) => {
  await page.goto('/meme-lab')
  await page.getByRole('button', { name: 'Nap Mode' }).click()
  await page.getByLabel('Top text').fill('NAPS FIRST')
  await expect(
    page.getByRole('img', { name: /Nap Mode.*NAPS FIRST/ }),
  ).toBeVisible()
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Download PNG' }).click(),
  ])
  expect(download.suggestedFilename()).toBe('bonkless-nap-mode.png')
  const png = await readFile((await download.path())!)
  expect(png.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a')
  expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([680, 680])
})

test('gallery filters, comic pages and mobile navigation work', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Gallery' })
    .click()
  await page.getByRole('button', { name: 'Naps', exact: true }).click()
  await expect(
    page.getByRole('button', { name: 'Open The Tuna Signal' }),
  ).toHaveCount(0)
  await page.getByRole('button', { name: 'Open Nap Mode' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await page.goto('/lore')
  await page.getByRole('button', { name: 'Next panel' }).click()
  await expect(
    page.getByRole('heading', { name: 'A brief intermission' }),
  ).toBeVisible()
})

test('the home hero opens the live cat and returns to the illustration', async ({
  page,
}) => {
  await page.goto('/')
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.getByRole('button', { name: 'Explore in 3D' }).click()
  await expect(page.locator('.canvas-wrap canvas')).toBeVisible()
  const canvas = page.locator('.canvas-wrap canvas')
  await expect
    .poll(() =>
      canvas.evaluate((element) =>
        Boolean((element as HTMLCanvasElement).getContext('webgl2')),
      ),
    )
    .toBe(true)
  await expect(page.locator('.scene-message')).toHaveCount(0)
  await page.getByRole('button', { name: 'Illustrated view' }).click()
  await expect(page.locator('.canvas-wrap canvas')).toHaveCount(0)
  expect(errors).toEqual([])
})

test('gallery and community download files are available', async ({
  page,
  request,
}) => {
  for (const route of ['/gallery', '/community']) {
    await page.goto(route)
    const urls = await page
      .locator('a[download]')
      .evaluateAll((links) =>
        links.map((link) => (link as HTMLAnchorElement).href),
      )
    expect(urls.length).toBeGreaterThan(0)
    for (const url of urls) {
      const response = await request.get(url)
      expect(response.ok()).toBe(true)
      expect(response.headers()['content-type']).toContain('image/png')
    }
  }
})
