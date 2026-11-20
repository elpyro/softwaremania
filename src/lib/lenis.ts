import type Lenis from 'lenis'

let instance: Lenis | null = null

export function setLenis(lenis: Lenis | null) {
  instance = lenis
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  if (instance) {
    instance.scrollTo(el, { offset: -84, duration: 1.4 })
    return
  }

  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function scrollToTop() {
  if (instance) {
    instance.scrollTo(0, { duration: 1.2 })
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
