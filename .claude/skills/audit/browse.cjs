// Screenshots and behaviour checks for the audit. Expects `vite preview --port 4173` to be running.
// Usage: NODE_PATH=<dir with playwright>/node_modules node browse.cjs <output dir>
const { chromium } = require('playwright')

const BASE = 'http://localhost:4173'
const out = process.argv[2] ?? '.'

;(async () => {
  const browser = await chromium.launch()
  for (const mode of ['dark', 'light']) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })
    const page = await context.newPage()
    await page.addInitScript((m) => {
      try {
        localStorage.setItem('horari-bus:theme', m)
      } catch {}
    }, mode)

    await page.goto(`${BASE}/`)
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${out}/home-${mode}.png`, fullPage: true })

    for (const line of ['e14', 'n30', 'l72']) {
      await page.goto(`${BASE}/lines/${line}`)
      await page.waitForTimeout(500)
      await page.screenshot({ path: `${out}/lines-${line}-${mode}.png` })
    }

    if (mode === 'dark') {
      await page.goto(`${BASE}/`)
      console.log('h1 on Departures:', await page.locator('h1').count())

      // The stop picker should start with an empty search each time it opens.
      await page.getByRole('button', { name: /^From / }).click()
      await page.getByLabel('Search stops or towns').fill('sitges')
      await page.getByRole('button', { name: /Oasis/ }).click()
      await page.waitForTimeout(600)
      await page.getByRole('button', { name: /^To / }).click()
      await page.waitForTimeout(600)
      console.log(
        'search after reopening the picker:',
        JSON.stringify(await page.getByLabel('Search stops or towns').inputValue()),
      )
      await page.screenshot({ path: `${out}/picker.png` })
    }
    await context.close()
  }
  await browser.close()
  console.log(`screenshots in ${out}`)
})()
