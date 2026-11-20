import { motion } from 'motion/react'
import { ArrowDown, ArrowUpRight, Asterisk } from 'lucide-react'
import { CAPABILITIES, HERO_STATS } from '../data/content'
import { HeroCanvas } from './HeroCanvas'
import { Clock } from './ui/Clock'
import { Magnetic } from './ui/Magnetic'
import { Marquee } from './ui/Marquee'
import { btnGhost, btnPrimary } from './ui/buttonStyles'
import { scrollToId } from '../lib/lenis'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease },
  },
}

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden border-b border-line">
      <HeroCanvas className="absolute inset-0 -z-20 h-full w-full" />
      <div className="hero-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-20 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]"
        aria-hidden="true"
      />

      <div className="shell flex min-h-[100svh] flex-col justify-between pt-24">
        <motion.div
          className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="label">[ Estudio de producto — Bogotá ]</p>
          <p className="label flex items-center gap-2 text-bone">
            <span className="size-1.5 animate-blink bg-acid" aria-hidden="true" />
            Aceptando proyectos · Q1 2027
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-1 flex-col justify-center py-10 md:py-14"
        >
          <motion.p variants={item} className="label mb-6 flex items-center gap-3">
            <span className="text-acid">✳</span>
            Software a medida desde 2022
          </motion.p>

          <motion.h1
            variants={item}
            className="max-w-[18ch] text-display font-extrabold uppercase leading-[0.84] tracking-[-0.045em] text-bone"
          >
            <span className="block">La manía</span>
            <span className="block font-serif text-[0.82em] font-normal normal-case italic tracking-[-0.025em] text-bone/90">
              del software
            </span>
            <span className="block">
              rápido y{' '}
              <span className="font-serif font-normal normal-case italic text-acid">rentable.</span>
            </span>
          </motion.h1>

          <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <motion.div variants={item} className="max-w-xl">
              <p className="text-base leading-relaxed text-muted md:text-lg">
                Diseñamos y construimos producto digital a medida: plataformas web, apps móviles,
                IA aplicada y herramientas internas. Equipos pequeños, decisiones rápidas y código
                que puedes auditar.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Magnetic className="w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => scrollToId('contacto')}
                    className={`${btnPrimary} w-full sm:w-auto`}
                  >
                    Cuéntanos tu idea
                    <ArrowUpRight className="size-4" strokeWidth={1.8} />
                  </button>
                </Magnetic>
                <Magnetic className="w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => scrollToId('casos')}
                    className={`${btnGhost} w-full sm:w-auto`}
                  >
                    Ver casos
                    <ArrowDown className="size-4" strokeWidth={1.8} />
                  </button>
                </Magnetic>
              </div>
            </motion.div>

            <motion.div
              variants={item}
              className="hidden w-[290px] border border-line bg-ink/70 p-5 backdrop-blur-sm lg:block"
            >
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="label text-acid">SM_CONSOLE</span>
                <Asterisk className="size-4 animate-spin-slow text-acid" strokeWidth={1.5} />
              </div>
              <dl className="mt-4 space-y-2 font-mono text-[11px]">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">STATUS</dt>
                  <dd className="flex items-center gap-1.5 text-acid">
                    <span className="size-1.5 animate-blink bg-acid" aria-hidden="true" />
                    ONLINE
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">LAT</dt>
                  <dd className="text-bone">4.7110° N</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">LON</dt>
                  <dd className="text-bone">74.0721° W</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">TZ</dt>
                  <dd className="text-bone">America/Bogota</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">LOC</dt>
                  <dd className="text-bone">
                    <Clock />
                  </dd>
                </div>
              </dl>
              <p className="mt-4 border-t border-dashed border-line pt-3 font-mono text-[10px] leading-relaxed text-muted">
                Código abierto para ti. Sin cajas negras.
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-4 border-t border-line pt-5 pb-7 md:gap-8"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {HERO_STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-2xl font-bold tracking-tight text-bone md:text-4xl">
                {stat.value}
              </p>
              <p className="label mt-1 text-[9px] md:text-[10px]">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="border-t border-line bg-ink/60">
        <Marquee className="py-4">
          {CAPABILITIES.map((capability) => (
            <span
              key={capability}
              className="flex items-center gap-6 px-6 font-mono text-[10px] uppercase tracking-[0.24em] text-muted md:text-[11px]"
            >
              <span className="text-acid">✳</span>
              {capability}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
