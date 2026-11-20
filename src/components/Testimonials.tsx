import { TESTIMONIALS } from '../data/content'
import { Marquee } from './ui/Marquee'
import { SectionLabel } from './ui/SectionLabel'

function QuoteCard({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <figure className="mx-1.5 flex w-[310px] shrink-0 flex-col justify-between border border-line bg-panel p-6 md:w-[390px]">
      <blockquote className="font-serif text-lg leading-snug text-bone/90">“{quote}”</blockquote>
      <figcaption className="mt-6 border-t border-line pt-4">
        <p className="text-sm font-semibold text-bone">{name}</p>
        <p className="label mt-1 text-[9px]">{role}</p>
      </figcaption>
    </figure>
  )
}

const STATS = [
  { value: '120+', label: 'productos entregados' },
  { value: '4', label: 'años construyendo' },
  { value: '98%', label: 'clientes que repiten' },
  { value: '6', label: 'países' },
]

export function Testimonials() {
  const first = TESTIMONIALS.slice(0, 3)
  const second = TESTIMONIALS.slice(3)

  return (
    <section className="border-b border-line">
      <div className="shell section-pad pb-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="05">Confianza</SectionLabel>
            <h2 className="mt-6 text-[clamp(2.2rem,4.4vw,4rem)] font-extrabold leading-[0.94] tracking-[-0.035em]">
              Gente que ya{' '}
              <span className="font-serif font-normal italic text-acid">lo vivió</span>.
            </h2>
          </div>
          <p className="max-w-sm font-mono text-[11px] leading-relaxed text-muted lg:col-span-5 lg:justify-self-end">
            Sin logos de relleno. Estas son las personas que tomaron la decisión y vieron el
            resultado.
          </p>
        </div>
      </div>

      <div className="sr-only">
        {TESTIMONIALS.map((testimonial) => (
          <blockquote key={testimonial.name}>
            {testimonial.quote} — {testimonial.name}, {testimonial.role}
          </blockquote>
        ))}
      </div>

      <div className="space-y-3 pb-12">
        <Marquee>
          {first.map((testimonial) => (
            <QuoteCard key={testimonial.name} {...testimonial} />
          ))}
        </Marquee>
        <Marquee reverse>
          {second.map((testimonial) => (
            <QuoteCard key={testimonial.name} {...testimonial} />
          ))}
        </Marquee>
      </div>

      <div className="shell grid grid-cols-2 gap-6 border-t border-line py-8 md:grid-cols-4 md:py-10">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-3xl font-bold tracking-tight text-bone md:text-4xl">
              {stat.value}
            </p>
            <p className="label mt-2 text-[9px] md:text-[10px]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
