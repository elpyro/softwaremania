import { ArrowUpRight } from 'lucide-react'
import { NAV_LINKS } from '../data/content'
import { scrollToId, scrollToTop } from '../lib/lenis'
import { Clock } from './ui/Clock'
import { Magnetic } from './ui/Magnetic'
import { btnPrimary } from './ui/buttonStyles'

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="shell pt-16 md:pt-24">
        <div className="grid gap-10 border-b border-line pb-14 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="label">¿Empezamos?</p>
            <h2 className="mt-5 max-w-[15ch] text-[clamp(2.4rem,5.6vw,5.2rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
              Hablemos de tu{' '}
              <span className="font-serif font-normal italic text-acid">próximo producto</span>.
            </h2>
          </div>
          <Magnetic>
            <button type="button" onClick={() => scrollToId('contacto')} className={btnPrimary}>
              Cuéntanos tu idea
              <ArrowUpRight className="size-4" />
            </button>
          </Magnetic>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-3"
              aria-label="SoftwareMania, volver arriba"
            >
              <img
                src="/logo.png"
                alt=""
                aria-hidden="true"
                className="size-9 object-contain"
                draggable={false}
              />
              <span className="font-mono text-[11px] tracking-[0.26em] text-bone">
                SOFTWARE<span className="text-acid">/</span>MANIA
              </span>
            </button>
            <p className="mt-5 max-w-xs font-mono text-[11px] leading-relaxed text-muted">
              Estudio de producto e ingeniería. Software a medida para equipos que no quieren otro
              WordPress con salpicaduras.
            </p>
            <p className="mt-5 flex items-center gap-2 font-mono text-[10px] text-muted">
              <span className="size-1.5 animate-blink bg-acid" aria-hidden="true" />
              BOGOTÁ · <Clock />
            </p>
          </div>

          <nav aria-label="Navegación del pie">
            <p className="label text-[9px]">Navegación</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(link.id)}
                    className="font-mono text-[11px] text-muted transition-colors hover:text-acid"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label text-[9px]">Ubicación</p>
            <ul className="mt-4 space-y-2.5">
              <li className="font-mono text-[11px] text-muted">Solo Bogotá, Colombia</li>
              <li className="font-mono text-[11px] text-muted">Lun–Vie · 8:00–18:00 COT</li>
              <li className="font-mono text-[11px] text-muted">Remoto en toda LATAM</li>
            </ul>
          </div>

        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-[9px]">© 2026 SoftwareMania. Todos los derechos reservados.</p>
          <p className="label text-[9px]">Diseñado y construido en Bogotá · sin plantillas</p>
        </div>
      </div>

      <div className="shell overflow-hidden pb-4">
        <svg
          viewBox="0 0 1000 150"
          className="wordmark-group block w-full"
          role="presentation"
          aria-hidden="true"
        >
          <text x="0" y="132" textLength="980" lengthAdjust="spacingAndGlyphs" className="wordmark-svg">
            SOFTWARE MANIA
          </text>
        </svg>
      </div>
    </footer>
  )
}
