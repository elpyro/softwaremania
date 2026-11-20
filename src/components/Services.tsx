import type { MouseEvent } from 'react'
import { ArrowUpRight, Cloud, Code2, PenTool, Plug, Smartphone, Sparkles } from 'lucide-react'
import { clsx } from 'clsx'
import { SERVICES } from '../data/content'
import { SectionLabel } from './ui/SectionLabel'
import { Reveal } from './ui/Reveal'

const ICONS = {
  code: Code2,
  mobile: Smartphone,
  sparkles: Sparkles,
  plug: Plug,
  cloud: Cloud,
  pen: PenTool,
} as const

export function Services() {
  const spotlight = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <section id="servicios" className="border-b border-line">
      <div className="shell section-pad">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="02">Servicios</SectionLabel>
            <h2 className="mt-6 text-[clamp(2.4rem,5vw,4.6rem)] font-extrabold leading-[0.94] tracking-[-0.035em]">
              Lo que construimos{' '}
              <span className="font-serif font-normal italic text-acid">contigo</span>.
            </h2>
          </div>
          <p className="max-w-md font-mono text-[11px] leading-relaxed text-muted lg:col-span-5 lg:justify-self-end">
            No ensamblamos plantillas. Elegimos la tecnología después de entender el problema, y
            dejamos el código en un estado del que no haya que avergonzarse.
          </p>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.icon]
            return (
              <Reveal
                key={service.title}
                delay={Math.min(index * 0.05, 0.25)}
                className={clsx(service.featured && 'md:col-span-2')}
              >
                <article
                  onMouseMove={spotlight}
                  className={clsx(
                    'spotlight group flex h-full flex-col border border-line p-6 transition-colors duration-300 hover:border-acid/40 lg:p-8',
                    service.featured && 'md:min-h-[300px]',
                  )}
                >
                  <Icon
                    className="pointer-events-none absolute -bottom-6 -right-4 size-36 text-bone/[0.04] transition-colors duration-500 group-hover:text-acid/10"
                    strokeWidth={0.7}
                    aria-hidden="true"
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="grid size-10 place-items-center border border-line text-acid transition-colors group-hover:border-acid/50">
                      <Icon className="size-5" strokeWidth={1.4} />
                    </span>
                    <span className="font-mono text-[10px] text-muted">
                      0{index + 1}
                    </span>
                  </div>

                  <h3
                    className={clsx(
                      'mt-8 font-display font-bold tracking-[-0.02em] text-bone',
                      service.featured ? 'text-3xl md:text-4xl' : 'text-2xl',
                    )}
                  >
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                    {service.text}
                  </p>

                  {service.featured && (
                    <pre className="mt-6 max-w-md overflow-hidden border border-line bg-ink/60 p-4 font-mono text-[11px] leading-relaxed text-muted">
                      <code>
                        <span className="text-acid">const</span> prod = build({'{'}
                        {'\n'} scope: <span className="text-bone">'real'</span>,
                        {'\n'} templates: <span className="text-acid">false</span>,
                        {'\n'} owner: <span className="text-bone">'tú'</span>
                        {'\n'}
                        {'}'})<span className="animate-blink text-acid">▌</span>
                      </code>
                    </pre>
                  )}

                  <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-line pt-5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-line px-2.5 py-1 font-mono text-[10px] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                    <ArrowUpRight className="ml-auto size-4 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acid" />
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
