import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { clsx } from 'clsx'
import { FAQS } from '../data/content'
import { scrollToId } from '../lib/lenis'
import { SectionLabel } from './ui/SectionLabel'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="border-b border-line">
      <div className="shell section-pad grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <SectionLabel index="07">Preguntas</SectionLabel>
          <h2 className="mt-6 text-[clamp(2.2rem,4.2vw,3.8rem)] font-extrabold leading-[0.94] tracking-[-0.035em]">
            Lo que suelen{' '}
            <span className="font-serif font-normal italic text-acid">preguntar</span>.
          </h2>
          <p className="mt-5 max-w-sm font-mono text-[11px] leading-relaxed text-muted">
            Si falta algo, escríbenos. Respondemos personas, no autorespondedores.
          </p>

          <button
            type="button"
            onClick={() => scrollToId('contacto')}
            className="group mt-8 inline-flex items-center gap-2 border-b border-line pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-bone transition-colors hover:border-acid hover:text-acid"
          >
            Preguntar otra cosa
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="border-y border-line lg:col-span-8">
          {FAQS.map((item, index) => {
            const expanded = open === index
            return (
              <div key={item.q} className="border-b border-line last:border-b-0">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : index)}
                    aria-expanded={expanded}
                    aria-controls={`faq-panel-${index}`}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="flex gap-4">
                      <span className="mt-1 font-mono text-[10px] text-acid">0{index + 1}</span>
                      <span
                        className={clsx(
                          'font-display text-lg font-semibold leading-snug tracking-[-0.01em] transition-colors md:text-xl',
                          expanded ? 'text-bone' : 'text-bone/80 group-hover:text-bone',
                        )}
                      >
                        {item.q}
                      </span>
                    </span>
                    <span
                      className={clsx(
                        'mt-0.5 grid size-8 shrink-0 place-items-center border transition-all duration-300',
                        expanded
                          ? 'rotate-45 border-acid bg-acid text-ink'
                          : 'border-line text-muted group-hover:border-bone/40 group-hover:text-bone',
                      )}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pl-9 pr-12 text-sm leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
