import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { clsx } from 'clsx'
import { PROCESS } from '../data/content'
import { useMediaQuery } from '../hooks/useUtils'
import { scrollToId } from '../lib/lenis'
import { SectionLabel } from './ui/SectionLabel'
import { btnPrimary } from './ui/buttonStyles'
import { Magnetic } from './ui/Magnetic'

function ProcessHeader({ progress }: { progress?: ReactNode }) {
  return (
    <div className="shell mb-8 flex flex-wrap items-end justify-between gap-6 md:mb-10">
      <div>
        <SectionLabel index="03">Proceso</SectionLabel>
        <h2 className="mt-5 text-[clamp(2.2rem,4.6vw,4.1rem)] font-extrabold leading-[0.94] tracking-[-0.035em]">
          Cómo se trabaja <span className="font-serif font-normal italic text-acid">aquí</span>.
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <p className="label hidden md:block">5 fases · sin sorpresas</p>
        {progress}
      </div>
    </div>
  )
}

function StepCard({ step }: { step: (typeof PROCESS)[number] }) {
  return (
    <article className="relative flex h-full flex-col justify-between overflow-hidden border border-line bg-panel p-7 transition-colors duration-300 hover:border-acid/40">
      <span
        className="pointer-events-none absolute -bottom-10 right-1 select-none font-display text-[11rem] font-extrabold leading-none text-bone/[0.035]"
        aria-hidden="true"
      >
        {step.n}
      </span>
      <div className="relative">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-[11px] text-acid">{step.n}</span>
          <span className="label text-[10px]">{step.kicker}</span>
        </div>
        <h3 className="mt-8 text-3xl font-bold tracking-[-0.03em] text-bone">{step.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
      </div>

      <ul className="relative mt-10 space-y-2 border-t border-line pt-5">
        {step.bullets.map((bullet) => (
          <li key={bullet} className="flex items-center gap-3 font-mono text-[11px] text-muted">
            <span className="size-1 shrink-0 bg-acid" aria-hidden="true" />
            {bullet}
          </li>
        ))}
      </ul>
    </article>
  )
}

export function Process() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reduced = Boolean(useReducedMotion())
  const pinned = isDesktop && !reduced

  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  useEffect(() => {
    if (!pinned) return

    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 24))
    }

    measure()
    const observer = new ResizeObserver(measure)
    if (trackRef.current) observer.observe(trackRef.current)
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [pinned])

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className={clsx('relative border-b border-line', pinned && 'h-[360vh]')}
    >
      {pinned ? (
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
          <ProcessHeader
            progress={
              <div className="hidden w-40 flex-col gap-2 md:flex">
                <div className="h-px w-full bg-line">
                  <motion.div
                    className="h-px origin-left bg-acid"
                    style={{ scaleX: scrollYProgress }}
                  />
                </div>
                <span className="label text-[9px]">Scroll horizontal</span>
              </div>
            }
          />

          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-4 pl-[clamp(1.25rem,4vw,4.5rem)] will-change-transform"
          >
            {PROCESS.map((step) => (
              <div key={step.n} className="h-[56vh] w-[min(76vw,460px)] shrink-0">
                <StepCard step={step} />
              </div>
            ))}

            <div className="flex h-[56vh] w-[min(76vw,380px)] shrink-0 flex-col justify-between border border-acid/40 bg-acid p-7 text-ink">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em]">Siguiente paso</span>
              <div>
                <h3 className="text-4xl font-extrabold leading-[0.95] tracking-[-0.04em]">
                  ¿Lo aplicamos a tu idea?
                </h3>
                <p className="mt-4 font-mono text-[11px] leading-relaxed text-ink/70">
                  Un briefing de 60 segundos es suficiente para saber si encajamos.
                </p>
              </div>
              <button
                type="button"
                onClick={() => scrollToId('contacto')}
                className="inline-flex items-center justify-between gap-3 border border-ink/25 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-acid"
              >
                Empezar
                <ArrowUpRight className="size-4" />
              </button>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="shell section-pad">
          <ProcessHeader />
          <ol className="border-l border-line">
            {PROCESS.map((step) => (
              <li key={step.n} className="relative pb-8 pl-6 last:pb-0 md:pl-10">
                <span
                  className="absolute -left-[4.5px] top-2 size-2 bg-acid"
                  aria-hidden="true"
                />
                <div className="grid gap-4 md:grid-cols-[160px_1fr]">
                  <div>
                    <p className="font-mono text-[11px] text-acid">{step.n}</p>
                    <p className="label mt-1 text-[10px]">{step.kicker}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-[-0.02em]">{step.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{step.text}</p>
                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                      {step.bullets.map((bullet) => (
                        <li key={bullet} className="font-mono text-[10px] text-muted">
                          — {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <Magnetic className="mt-10 inline-block">
            <button type="button" onClick={() => scrollToId('contacto')} className={btnPrimary}>
              Cuéntanos tu idea
              <ArrowUpRight className="size-4" />
            </button>
          </Magnetic>
        </div>
      )}
    </section>
  )
}
