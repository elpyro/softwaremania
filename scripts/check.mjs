import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright-core'

const BASE = process.env.BASE_URL ?? 'http://localhost:5173/'
const OUT = process.env.SHOT_DIR ?? 'C:/Users/eloy_/AppData/Local/Temp/opencode/softwaremania-shots'
const CHROME =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'

await mkdir(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: CHROME, headless: true })
const errors = []

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(`console: ${message.text()}`)
})
page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`))

await page.goto(BASE, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(1200)
await page.screenshot({ path: `${OUT}/01-hero.png` })

assert.equal(await page.title(), 'SoftwareMania — La manía del software rápido y rentable')

const initialText = await page.locator('body').innerText()
assert.match(initialText, /la manía/i)
assert.match(initialText, /del software/i)
assert.match(initialText, /rentable/i)
assert.match(initialText, /software a medida desde 2022/i)
assert.match(initialText, /estudio de producto — bogotá/i)
assert.match(initialText, /America\/Bogota/)
assert.equal(/whatsapp/i.test(initialText), false, 'no debe aparecer WhatsApp')
assert.equal(
  await page.locator('a[href*="github.com"], a[href*="linkedin.com"], a[href*="x.com"]').count(),
  0,
  'no debe haber enlaces a redes sociales',
)

const scrollTo = async (selector, extra = 0) => {
  await page.evaluate(
    ([sel, offset]) => {
      const el = document.querySelector(sel)
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY + offset
      window.scrollTo({ top, behavior: 'instant' })
    },
    [selector, extra],
  )
  await page.waitForTimeout(1200)
}

assert.equal(
  await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
  true,
  'overflow horizontal en desktop',
)

await page.getByRole('navigation', { name: 'Principal' }).getByRole('button', { name: 'Casos' }).click()
await page.waitForTimeout(2200)
const casosTop = await page.evaluate(() => {
  const el = document.querySelector('#casos')
  return el ? Math.round(el.getBoundingClientRect().top) : null
})
assert.ok(casosTop !== null && Math.abs(casosTop - 84) < 40, `nav scroll a casos: ${casosTop}`)
await page.screenshot({ path: `${OUT}/01b-nav-casos.png` })

await scrollTo('#servicios')
await page.screenshot({ path: `${OUT}/02-servicios.png` })

await scrollTo('#proceso', 900)
const firstStepLeft = await page.evaluate(() =>
  Math.round(document.querySelector('#proceso article')?.getBoundingClientRect().left ?? 0),
)
assert.ok(firstStepLeft < 0, `proceso debe haber avanzado en horizontal (left=${firstStepLeft})`)
await page.screenshot({ path: `${OUT}/03-proceso.png` })

await scrollTo('#casos', 200)
await page.screenshot({ path: `${OUT}/04-casos.png` })
await scrollTo('#casos', 760)
await page.screenshot({ path: `${OUT}/04b-casos-stack.png` })

await scrollTo('#contacto')
await page.screenshot({ path: `${OUT}/05-contacto.png` })

await page.getByRole('button', { name: 'Siguiente' }).click()
await page.getByText('Elige el tipo de proyecto.').waitFor()
await page.getByRole('button', { name: 'Web app', exact: true }).click()
await page.getByRole('button', { name: 'Tengo una idea', exact: true }).click()
await page.getByRole('button', { name: 'Siguiente' }).click()

await page.getByRole('button', { name: 'En 1–3 meses', exact: true }).click()
await page.locator('#presupuesto').fill('3')
await page.screenshot({ path: `${OUT}/06-encuesta-paso2.png` })
await page.getByRole('button', { name: 'Siguiente' }).click()

await page.getByRole('button', { name: 'Enviar mi idea' }).click()
await page.getByText('Necesitamos un email válido.').waitFor()

await page.locator('#nombre').fill('Ada Lovelace')
await page.locator('#email').fill('ada@empresa.com')
await page.locator('#telefono').fill('+57 300 123 4567')
await page.locator('#detalle').fill('Un portal para que los clientes sigan sus pedidos en tiempo real.')

let posted = null
await page.route('**/formspree.io/**', async (route) => {
  posted = route.request().postDataJSON()
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ ok: true }),
  })
})

await page.getByRole('button', { name: 'Enviar mi idea' }).click()
await page.getByText('Tu idea ya está en nuestro radar.').waitFor({ timeout: 8000 })
await page.getByText(/Ticket SM-\d{4}-\d{4}/).waitFor()
assert.match(await page.locator('#contacto').innerText(), /Google Meet/)
assert.equal(posted?.tipo, 'Web app', 'payload: tipo')
assert.equal(posted?.presupuesto, 'Entre US$ 5.000 y US$ 10.000', 'payload: presupuesto')
assert.equal(posted?.email, 'ada@empresa.com', 'payload: email')
assert.equal(posted?.telefono, '+57 300 123 4567', 'payload: telefono')
await page.screenshot({ path: `${OUT}/07-encuesta-exito.png` })

await scrollTo('#faq')
await page
  .getByRole('button', { name: /¿Trabajáis con ideas que todavía no existen\?/ })
  .click()
await page.getByText(/De hecho es donde mejor funcionamos/).waitFor()
assert.match(await page.locator('#faq').innerText(), /US\$ 1\.000/)
await page.screenshot({ path: `${OUT}/08-faq.png` })

await scrollTo('#top')
await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
await page.waitForTimeout(1800)
await page.screenshot({ path: `${OUT}/09-footer.png` })

const footerText = await page.locator('footer').innerText()
assert.match(footerText, /Solo Bogotá, Colombia/)
assert.equal(/castellanoseloy/i.test(await page.locator('body').innerText()), false, 'no debe mostrar correo personal')
assert.equal(await page.locator('a[href^="mailto:"]').count(), 0, 'no debe haber enlaces mailto')
assert.equal(/github|linkedin|twitter/i.test(footerText), false, 'el pie no debe tener redes')

const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
})
mobile.on('console', (message) => {
  if (message.type() === 'error') errors.push(`mobile console: ${message.text()}`)
})
mobile.on('pageerror', (error) => errors.push(`mobile pageerror: ${error.message}`))

await mobile.goto(BASE, { waitUntil: 'networkidle' })
await mobile.evaluate(() => document.fonts.ready)
await mobile.waitForTimeout(1000)
await mobile.screenshot({ path: `${OUT}/10-mobile-hero.png` })

assert.equal(
  await mobile.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
  true,
  'overflow horizontal en móvil',
)

assert.equal(
  await mobile.evaluate(() => window.matchMedia('(pointer: coarse)').matches),
  true,
  'el test móvil debe emular puntero grueso',
)

await mobile.getByRole('button', { name: 'Abrir menú' }).click()
await mobile.waitForTimeout(500)
await mobile.screenshot({ path: `${OUT}/11-mobile-menu.png` })
await mobile
  .locator('#menu-movil')
  .getByRole('button', { name: /Tu idea/ })
  .click()
await mobile.waitForTimeout(2000)
await mobile.screenshot({ path: `${OUT}/12-mobile-contacto.png` })

assert.equal(
  await mobile.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
  true,
  'overflow horizontal en contacto móvil',
)

await mobile.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
await mobile.waitForTimeout(1800)
await mobile.screenshot({ path: `${OUT}/13-mobile-footer.png` })

assert.equal(
  await mobile.evaluate(() => {
    const rect = document.querySelector('.wordmark-group')?.getBoundingClientRect()
    return Boolean(rect && rect.bottom <= window.innerHeight + 1)
  }),
  true,
  'el wordmark del pie debe verse completo al final de la página',
)

const reducedPage = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
await reducedPage.goto(BASE, { waitUntil: 'networkidle' })
await reducedPage.waitForTimeout(800)
assert.equal(
  await reducedPage.evaluate(() => Boolean(document.querySelector('.sm-cursor'))),
  false,
  'reduced motion no debe renderizar el cursor custom',
)
assert.equal(
  await reducedPage.evaluate(() => {
    const track = document.querySelector('.animate-marquee')
    return track ? getComputedStyle(track).animationName === 'none' : true
  }),
  true,
  'reduced motion no debe animar los marquees',
)
assert.equal(
  await reducedPage.evaluate(() => {
    const section = document.querySelector('#proceso')
    return section ? section.getBoundingClientRect().height < window.innerHeight * 2 : false
  }),
  true,
  'reduced motion no debe fijar el proceso en horizontal',
)

console.log('SHOTS', OUT)
console.log('ERRORS', JSON.stringify(errors, null, 2))
console.log('OK')

await browser.close()
