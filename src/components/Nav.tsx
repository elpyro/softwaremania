import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { clsx } from 'clsx'
import { NAV_LINKS } from '../data/content'
import { scrollToId, scrollToTop } from '../lib/lenis'
import { Magnetic } from './ui/Magnetic'
import { btnPrimary } from './ui/buttonStyles'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return

    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const goTo = (id: string) => {
    setOpen(false)
    window.setTimeout(() => scrollToId(id), 80)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <motion.div
          className="absolute inset-x-0 top-0 z-10 h-px origin-left bg-acid"
          style={{ scaleX: progress }}
        />
        <div
          className={clsx(
            'transition-colors duration-300',
            scrolled ? 'border-b border-line bg-ink/85 backdrop-blur-xl' : 'bg-transparent',
          )}
        >
          <div className="shell flex h-[72px] items-center justify-between gap-6">
            <button
              type="button"
              onClick={scrollToTop}
              className="group flex items-center gap-3"
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

            <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => goTo(link.id)}
                  className="label relative py-2 transition-colors hover:text-bone"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Magnetic className="hidden sm:block">
                <button type="button" onClick={() => goTo('contacto')} className={btnPrimary}>
                  Hablemos
                  <ArrowUpRight className="size-4" strokeWidth={1.8} />
                </button>
              </Magnetic>

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="grid size-11 place-items-center border border-line text-bone transition-colors hover:border-acid hover:text-acid lg:hidden"
                aria-expanded={open}
                aria-controls="menu-movil"
                aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            className="fixed inset-0 z-40 flex flex-col bg-ink lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <div className="shell flex flex-1 flex-col justify-center gap-2 py-20">
              {NAV_LINKS.map((link, index) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => goTo(link.id)}
                  className="group flex items-baseline gap-4 border-b border-line py-4 text-left"
                >
                  <span className="font-mono text-[10px] text-acid">0{index + 1}</span>
                  <span className="font-serif text-4xl font-normal text-bone transition-colors group-hover:text-acid">
                    {link.label}
                  </span>
                  <ArrowUpRight className="ml-auto size-5 text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-acid" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
