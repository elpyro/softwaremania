import { motion } from 'motion/react'
import { Asterisk } from 'lucide-react'
import { SectionLabel } from './ui/SectionLabel'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const lineMotion = (delay: number) => ({
  initial: { y: '115%' },
  whileInView: { y: 0 },
  viewport: { once: true, margin: '-12%' },
  transition: { duration: 1.05, delay, ease },
})

export function Manifesto() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <Asterisk
        className="pointer-events-none absolute -right-10 top-1/2 size-64 -translate-y-1/2 text-line/50 md:size-80"
        strokeWidth={0.4}
        aria-hidden="true"
      />
      <div className="shell section-pad relative grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-3">
          <SectionLabel index="01">Manifiesto</SectionLabel>
          <p className="mt-5 max-w-[26ch] font-mono text-[11px] leading-relaxed text-muted">
            Menos intermediarios. Más criterio. Un producto que puedes defender en una reunión y en
            producción.
          </p>

          <div className="mt-10 space-y-4 border-t border-line pt-5">
            {[
              ['Equipo', '6 personas, sin capas'],
              ['Stack', 'TypeScript de punta a punta'],
              ['Entrega', 'Demo cada viernes'],
            ].map(([key, value]) => (
              <div key={key} className="flex items-baseline justify-between gap-4">
                <span className="label">{key}</span>
                <span className="text-right font-mono text-[11px] text-bone">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-9 lg:pl-6">
          <h2 className="font-serif text-[clamp(2rem,4.6vw,4.15rem)] font-normal leading-[1.06] tracking-[-0.02em] text-bone">
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span className="block" {...lineMotion(0)}>
                No vendemos horas.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span className="block" {...lineMotion(0.1)}>
                Diseñamos sistemas que <em className="text-acid">siguen en pie</em>
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span className="block" {...lineMotion(0.2)}>
                cuando el equipo que los creó
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span className="block" {...lineMotion(0.3)}>
                ya no está en la sala.
              </motion.span>
            </span>
          </h2>

          <motion.div
            className="mt-12 flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <p className="max-w-md font-mono text-[11px] leading-relaxed text-muted">
              Cada proyecto se documenta como si el siguiente equipo fuese a auditarlo. Porque a
              veces lo hace.
            </p>
            <p className="label text-bone">Est. 2022 · Bogotá · Remoto</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
