import type { ReactNode } from 'react'

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="label flex items-center gap-3">
      <span className="text-acid">[ {index} ]</span>
      <span className="h-px w-10 bg-line" />
      <span>{children}</span>
    </div>
  )
}
