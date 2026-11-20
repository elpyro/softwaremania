import { ArrowUpRight, Asterisk } from 'lucide-react'
import { CASES } from '../data/content'
import { scrollToId } from '../lib/lenis'
import { SectionLabel } from './ui/SectionLabel'
import { Reveal } from './ui/Reveal'
import { Magnetic } from './ui/Magnetic'
import { btnPrimary } from './ui/buttonStyles'

export function Work() {
  return (
    <section id="casos" className="relative border-b border-line">
      <div className="shell section-pad">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="04">Casos</SectionLabel>
            <h2 className="mt-6 text-[clamp(2.4rem,5vw,4.6rem)] font-extrabold leading-[0.94] tracking-[-0.035em]">
              Manía por medir{' '}
              <span className="font-serif font-normal italic text-acid">lo que importa</span>.
            </h2>
          </div>
          <p className="max-w-md font-mono text-[11px] leading-relaxed text-muted lg:col-span-5 lg:justify-self-end">
            Tres proyectos, tres sectores y una misma regla: si no mejora una métrica del negocio,
            no cuenta como éxito.
          </p>
        </div>

        <div className="relative mt-12">
          {CASES.map((project, index) => (
            <div
              key={project.client}
              className="md:sticky"
              style={{ top: `${88 + index * 20}px`, zIndex: index + 1 }}
            >
              <Reveal delay={0.05}>
                <article className="group mb-5 grid overflow-hidden border border-line bg-panel transition-colors duration-300 hover:border-line/80 lg:min-h-[470px] lg:grid-cols-[1.08fr_0.92fr]">
                  <div className="flex flex-col p-7 md:p-10">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                      <span className="font-display text-sm font-bold tracking-tight text-bone">
                        {project.client}
                      </span>
                      <span className="label text-[9px]">
                        {project.sector} · {project.year}
                      </span>
                    </div>

                    <h3 className="mt-7 max-w-[24ch] font-display text-3xl font-bold leading-[1.02] tracking-[-0.03em] text-bone md:text-[2.6rem]">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{project.text}</p>

                    <div className="mt-7 grid grid-cols-3 gap-3 border-y border-line py-5">
                      {project.metrics.map((metric) => (
                        <div key={metric.label}>
                          <p className="font-display text-xl font-bold tracking-tight text-acid md:text-2xl">
                            {metric.value}
                          </p>
                          <p className="label mt-1 text-[8px] leading-relaxed md:text-[9px]">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-line px-2.5 py-1 font-mono text-[10px] text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                      <button
                        type="button"
                        onClick={() => scrollToId('contacto')}
                        className="ml-auto inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-bone transition-colors hover:text-acid"
                      >
                        Quiero algo así
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>

                  <div
                    className="relative hidden overflow-hidden border-l border-line lg:flex lg:items-center lg:justify-center"
                    style={{
                      background: `radial-gradient(70% 60% at 60% 40%, ${project.accent}22, transparent 70%), #0d0d0f`,
                    }}
                  >
                    <div className="dot-grid absolute inset-0 opacity-30" aria-hidden="true" />
                    <span
                      className="pointer-events-none relative font-serif text-[15rem] italic leading-none"
                      style={{ color: project.accent, opacity: 0.22 }}
                      aria-hidden="true"
                    >
                      {project.glyph}
                    </span>
                    <div className="absolute inset-x-6 bottom-6 flex items-center justify-between border-t border-line pt-4">
                      <span className="label text-[9px]">Estudio de caso</span>
                      <Asterisk
                        className="size-5 animate-spin-slow"
                        style={{ color: project.accent }}
                        strokeWidth={1.2}
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="max-w-md font-mono text-[11px] leading-relaxed text-muted">
            El siguiente caso puede ser el tuyo. Sin presentaciones de 40 diapositivas.
          </p>
          <Magnetic>
            <button type="button" onClick={() => scrollToId('contacto')} className={btnPrimary}>
              Cuéntanos tu idea
              <ArrowUpRight className="size-4" />
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
