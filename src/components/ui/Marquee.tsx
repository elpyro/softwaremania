import type { ReactNode } from 'react'
import { clsx } from 'clsx'

type MarqueeProps = {
  children: ReactNode
  reverse?: boolean
  className?: string
  trackClassName?: string
}

export function Marquee({ children, reverse = false, className, trackClassName }: MarqueeProps) {
  return (
    <div className={clsx('group flex overflow-hidden', className)} aria-hidden="true">
      <div
        className={clsx(
          'flex w-max shrink-0',
          reverse ? 'animate-marquee-rev' : 'animate-marquee',
          'group-hover:[animation-play-state:paused]',
          trackClassName,
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
    </div>
  )
}
