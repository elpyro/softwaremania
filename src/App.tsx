import { useEffect } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from 'motion/react'
import { setLenis } from './lib/lenis'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Manifesto } from './components/Manifesto'
import { Services } from './components/Services'
import { Process } from './components/Process'
import { Work } from './components/Work'
import { Testimonials } from './components/Testimonials'
import { Survey } from './components/Survey'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import { Cursor } from './components/ui/Cursor'
import { Grain } from './components/ui/Grain'

export default function App() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      smoothWheel: true,
    })

    setLenis(lenis)

    let frame = 0
    const loop = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      setLenis(null)
    }
  }, [reduced])

  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-[200] bg-acid px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>

      <Grain />
      <Cursor />
      <Nav />

      <main id="contenido">
        <Hero />
        <Manifesto />
        <Services />
        <Process />
        <Work />
        <Testimonials />
        <Survey />
        <FAQ />
      </main>

      <Footer />
    </>
  )
}
