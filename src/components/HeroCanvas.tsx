import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
}

export function HeroCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    let width = 0
    let height = 0
    let frame = 0
    let running = true
    let particles: Particle[] = []
    const pointer = { x: -9999, y: -9999 }

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2)

    const makeParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 1.3 + 0.6,
      alpha: Math.random() * 0.45 + 0.18,
    })

    const seed = () => {
      const density = Math.max(38, Math.min(170, Math.round((width * height) / 15000)))
      particles = Array.from({ length: density }, makeParticle)
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = dpr()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.fillStyle = '#0b0b0c'
      context.fillRect(0, 0, width, height)
      seed()
    }

    const drawStatic = () => {
      context.fillStyle = '#0b0b0c'
      context.fillRect(0, 0, width, height)
      for (const particle of particles) {
        context.fillStyle = `rgba(200, 247, 81, ${particle.alpha})`
        context.fillRect(particle.x, particle.y, particle.size, particle.size)
      }
    }

    const step = (time: number) => {
      if (!running) return

      context.fillStyle = 'rgba(11, 11, 12, 0.14)'
      context.fillRect(0, 0, width, height)

      for (const particle of particles) {
        const angle =
          Math.sin(particle.x * 0.0017 + time * 0.00022) +
          Math.cos(particle.y * 0.0021 - time * 0.00019)

        particle.vx += Math.cos(angle * 2.2) * 0.055
        particle.vy += Math.sin(angle * 2.2) * 0.055

        const dx = particle.x - pointer.x
        const dy = particle.y - pointer.y
        const distance = Math.hypot(dx, dy)

        if (distance < 170 && distance > 0.01) {
          const force = (1 - distance / 170) * 0.7
          particle.vx += (dx / distance) * force
          particle.vy += (dy / distance) * force
          particle.vx += (-dy / distance) * force * 0.35
          particle.vy += (dx / distance) * force * 0.35
        }

        particle.vx = Math.max(-2.4, Math.min(2.4, particle.vx * 0.955))
        particle.vy = Math.max(-2.4, Math.min(2.4, particle.vy * 0.955))
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < -10) particle.x = width + 10
        if (particle.x > width + 10) particle.x = -10
        if (particle.y < -10) particle.y = height + 10
        if (particle.y > height + 10) particle.y = -10

        const speed = Math.min(1, Math.hypot(particle.vx, particle.vy) / 2)
        context.fillStyle = `rgba(200, 247, 81, ${particle.alpha + speed * 0.4})`
        context.fillRect(particle.x, particle.y, particle.size, particle.size)
      }

      frame = requestAnimationFrame(step)
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }

    const onPointerLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    resize()

    if (reduced) {
      drawStatic()
      window.addEventListener('resize', resize)
      return () => window.removeEventListener('resize', resize)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextRunning = entry.isIntersecting
        if (nextRunning && !running) {
          running = true
          frame = requestAnimationFrame(step)
        } else if (!nextRunning && running) {
          running = false
          cancelAnimationFrame(frame)
        }
      },
      { threshold: 0 },
    )
    observer.observe(canvas)

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(frame)
      } else if (!running) {
        running = true
        frame = requestAnimationFrame(step)
      }
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibility)

    frame = requestAnimationFrame(step)

    return () => {
      running = false
      cancelAnimationFrame(frame)
      observer.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
