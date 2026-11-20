import { useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowUpRight, Check, Copy, Loader2, RotateCcw } from 'lucide-react'
import { clsx } from 'clsx'
import { NEXT_STEPS } from '../data/content'
import {
  BUDGETS,
  DEADLINES,
  EMPTY_SURVEY,
  FORMSPREE_ENDPOINT,
  MAX_DETAIL,
  PROJECT_TYPES,
  STAGES,
  buildSummary,
  isEmail,
  isPhone,
  makeTicket,
  toPayload,
  type SurveyData,
} from '../lib/survey'
import { SectionLabel } from './ui/SectionLabel'
import { btnGhost, btnPrimary } from './ui/buttonStyles'

type Status = 'idle' | 'sending' | 'success' | 'error'

const STEP_LABELS = ['Proyecto', 'Alcance', 'Contacto']

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={clsx(
        'border px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-200',
        active
          ? 'border-acid bg-acid text-ink'
          : 'border-line text-muted hover:border-bone/40 hover:text-bone',
      )}
    >
      {children}
    </button>
  )
}

function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-2 font-mono text-[10px] text-[#ff8a7a]">
      {message}
    </p>
  )
}

export function Survey() {
  const [data, setData] = useState<SurveyData>(EMPTY_SURVEY)
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [ticket, setTicket] = useState('')
  const [copied, setCopied] = useState(false)

  const update = <K extends keyof SurveyData>(key: K, value: SurveyData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const validate = (current: number) => {
    const next: Record<string, string> = {}

    if (current === 0) {
      if (!data.tipo) next.tipo = 'Elige el tipo de proyecto.'
      if (!data.etapa) next.etapa = 'Dinos en qué etapa estás.'
    }

    if (current === 1 && !data.plazo) {
      next.plazo = 'Elige un plazo aproximado.'
    }

    if (current === 2) {
      if (!data.nombre.trim()) next.nombre = '¿Cómo te llamas?'
      if (!isEmail(data.email)) next.email = 'Necesitamos un email válido.'
      if (!isPhone(data.telefono)) {
        next.telefono = 'Incluye tu teléfono con código de país (ej. +57 300 123 4567).'
      }
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const goNext = () => {
    if (validate(step)) setStep((value) => Math.min(2, value + 1))
  }

  const goBack = () => {
    setErrors({})
    setStep((value) => Math.max(0, value - 1))
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate(2) || status === 'sending') return

    setStatus('sending')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(toPayload(data)),
      })

      if (!response.ok) throw new Error(`Formspree respondió ${response.status}`)

      setTicket(makeTicket())
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildSummary(data))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2400)
    } catch {
      setCopied(false)
    }
  }

  const reset = () => {
    setData(EMPTY_SURVEY)
    setStep(0)
    setErrors({})
    setStatus('idle')
    setTicket('')
    setCopied(false)
  }

  const progress = ((step + 1) / 3) * 100

  return (
    <section id="contacto" className="relative overflow-hidden border-b border-line">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_10%,rgba(200,247,81,0.07),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="shell section-pad relative grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
        <div className="min-w-0">
          <SectionLabel index="06">Briefing</SectionLabel>
          <h2 className="mt-6 text-[clamp(2.6rem,5.4vw,4.9rem)] font-extrabold leading-[0.92] tracking-[-0.04em]">
            Tu idea, en{' '}
            <span className="font-serif font-normal italic text-acid">60 segundos</span>.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            Sin formularios eternos ni videollamadas de descubrimiento de una hora. Cuéntanos lo
            esencial y te respondemos con un siguiente paso concreto.
          </p>

          <ol className="mt-10 space-y-4 border-t border-line pt-6">
            {NEXT_STEPS.map((next, index) => (
              <li key={next} className="flex gap-4">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center border border-line font-mono text-[10px] text-acid">
                  0{index + 1}
                </span>
                <p className="font-mono text-[11px] leading-relaxed text-muted">{next}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col gap-2 border border-line bg-panel/60 p-5">
            <span className="label text-[9px]">Respuesta en menos de 24 h laborables</span>
            <p className="font-mono text-[10px] leading-relaxed text-muted">
              Revisamos tu briefing y te escribimos para agendar una videollamada de 25 minutos por
              Google Meet.
            </p>
          </div>
        </div>

        <div className="min-w-0 border border-line bg-panel lg:self-start">
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5 md:px-6">
            <div className="flex items-center gap-2.5">
              <span className="size-2 animate-blink bg-acid" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone">
                SM_BRIEFING
              </span>
              <span className="hidden font-mono text-[10px] text-muted sm:inline">v2.4</span>
            </div>
            <span className="font-mono text-[10px] text-muted">
              {status === 'success' ? 'COMPLETADO' : `PASO 0${step + 1} / 03`}
            </span>
          </div>

          {status === 'success' ? (
            <motion.div
              className="p-5 md:p-8"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center border border-acid bg-acid/10 text-acid">
                  <Check className="size-5" />
                </span>
                <div>
                  <p className="label text-acid">Briefing recibido</p>
                  <p className="font-mono text-[11px] text-muted">Ticket {ticket}</p>
                </div>
              </div>

              <h3 className="mt-7 font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-bone">
                Tu idea ya está en nuestro radar.
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                Te escribimos a <span className="text-bone">{data.email}</span> en menos de 24 horas
                laborables para agendar una videollamada de 25 minutos por Google Meet.
              </p>

              <dl className="mt-7 grid grid-cols-2 gap-3 border-y border-line py-5">
                <div>
                  <dt className="label text-[9px]">Proyecto</dt>
                  <dd className="mt-1 font-mono text-[11px] text-bone">{data.tipo}</dd>
                </div>
                <div>
                  <dt className="label text-[9px]">Plazo</dt>
                  <dd className="mt-1 font-mono text-[11px] text-bone">{data.plazo}</dd>
                </div>
                <div>
                  <dt className="label text-[9px]">Etapa</dt>
                  <dd className="mt-1 font-mono text-[11px] text-bone">{data.etapa}</dd>
                </div>
                <div>
                  <dt className="label text-[9px]">Presupuesto</dt>
                  <dd className="mt-1 font-mono text-[11px] text-bone">
                    {BUDGETS[data.presupuesto]?.short}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="label text-[9px]">Teléfono</dt>
                  <dd className="mt-1 font-mono text-[11px] text-bone">{data.telefono}</dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={copySummary} className={btnPrimary}>
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  {copied ? 'Copiado' : 'Copiar resumen'}
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-2 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-bone"
                >
                  <RotateCcw className="size-3.5" />
                  Otra idea
                </button>
              </div>
            </motion.div>
          ) : status === 'error' ? (
            <div className="p-5 md:p-8" role="alert">
              <p className="label text-[#ff8a7a]">Fallo de envío</p>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-[-0.02em] text-bone">
                No hemos podido enviar el briefing.
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                Puede ser la conexión o el servicio de formularios. Tu idea no se ha perdido:
                puedes copiar el resumen y reintentarlo más tarde.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={() => setStatus('idle')} className={btnPrimary}>
                  <RotateCcw className="size-4" />
                  Reintentar
                </button>
                <button type="button" onClick={copySummary} className={btnGhost}>
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  {copied ? 'Copiado' : 'Copiar resumen'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="h-px w-full bg-line">
                <motion.div
                  className="h-px bg-acid"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <div className="p-5 md:min-h-[340px] md:p-8">
                <div className="mb-6 flex items-center gap-2">
                  {STEP_LABELS.map((label, index) => (
                    <span
                      key={label}
                      className={clsx(
                        'font-mono text-[9px] uppercase tracking-[0.16em]',
                        index === step
                          ? 'text-acid'
                          : index < step
                            ? 'text-bone'
                            : 'text-muted/60',
                      )}
                    >
                      {label}
                      {index < STEP_LABELS.length - 1 && (
                        <span className="ml-2 text-line">/</span>
                      )}
                    </span>
                  ))}
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25 }}
                  >
                    {step === 0 && (
                      <div className="space-y-7">
                        <fieldset>
                          <legend className="label mb-3 text-[10px]">
                            01 — ¿Qué quieres construir?
                          </legend>
                          <div className="flex flex-wrap gap-2">
                            {PROJECT_TYPES.map((type) => (
                              <Chip
                                key={type}
                                active={data.tipo === type}
                                onClick={() => update('tipo', type)}
                              >
                                {type}
                              </Chip>
                            ))}
                          </div>
                          <FieldError message={errors.tipo} />
                        </fieldset>

                        <fieldset>
                          <legend className="label mb-3 text-[10px]">
                            02 — ¿En qué etapa estás?
                          </legend>
                          <div className="flex flex-wrap gap-2">
                            {STAGES.map((stage) => (
                              <Chip
                                key={stage}
                                active={data.etapa === stage}
                                onClick={() => update('etapa', stage)}
                              >
                                {stage}
                              </Chip>
                            ))}
                          </div>
                          <FieldError message={errors.etapa} />
                        </fieldset>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="space-y-7">
                        <div>
                          <div className="flex items-baseline justify-between gap-4">
                            <label htmlFor="presupuesto" className="label text-[10px]">
                              01 — Presupuesto orientativo
                            </label>
                            <span className="font-mono text-[11px] text-acid">
                              {BUDGETS[data.presupuesto]?.short}
                            </span>
                          </div>
                          <input
                            id="presupuesto"
                            type="range"
                            min={0}
                            max={BUDGETS.length - 1}
                            step={1}
                            value={data.presupuesto}
                            onChange={(event) => update('presupuesto', Number(event.target.value))}
                            className="range mt-6"
                            style={
                              {
                                '--fill': `${(data.presupuesto / (BUDGETS.length - 1)) * 100}%`,
                              } as CSSProperties
                            }
                            aria-valuetext={BUDGETS[data.presupuesto]?.label}
                          />
                          <div className="mt-3 flex justify-between font-mono text-[9px] text-muted">
                            {BUDGETS.map((budget, index) => (
                              <span
                                key={budget.short}
                                className={clsx(index === data.presupuesto && 'text-acid')}
                              >
                                {budget.short}
                              </span>
                            ))}
                          </div>
                          <p className="mt-5 border border-line bg-ink/40 px-4 py-3 font-mono text-[10px] leading-relaxed text-muted">
                            Rango seleccionado:{' '}
                            <span className="text-bone">{BUDGETS[data.presupuesto]?.label}</span>. Es
                            orientativo; lo ajustamos juntos en la videollamada.
                          </p>
                        </div>

                        <fieldset>
                          <legend className="label mb-3 text-[10px]">
                            02 — ¿Para cuándo lo necesitas?
                          </legend>
                          <div className="flex flex-wrap gap-2">
                            {DEADLINES.map((deadline) => (
                              <Chip
                                key={deadline}
                                active={data.plazo === deadline}
                                onClick={() => update('plazo', deadline)}
                              >
                                {deadline}
                              </Chip>
                            ))}
                          </div>
                          <FieldError message={errors.plazo} />
                        </fieldset>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label htmlFor="nombre" className="label text-[10px]">
                              01 — Tu nombre
                            </label>
                            <input
                              id="nombre"
                              name="nombre"
                              type="text"
                              autoComplete="name"
                              value={data.nombre}
                              onChange={(event) => update('nombre', event.target.value)}
                              placeholder="Ada Lovelace"
                              aria-invalid={Boolean(errors.nombre)}
                              aria-describedby={errors.nombre ? 'nombre-error' : undefined}
                              className="mt-2 w-full border-b border-line bg-transparent py-3 text-base text-bone placeholder:text-muted/50 focus:border-acid focus:outline-none"
                            />
                            <FieldError id="nombre-error" message={errors.nombre} />
                          </div>
                          <div>
                            <label htmlFor="email" className="label text-[10px]">
                              02 — Tu email
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              inputMode="email"
                              autoComplete="email"
                              value={data.email}
                              onChange={(event) => update('email', event.target.value)}
                              placeholder="ada@empresa.com"
                              aria-invalid={Boolean(errors.email)}
                              aria-describedby={errors.email ? 'email-error' : undefined}
                              className="mt-2 w-full border-b border-line bg-transparent py-3 text-base text-bone placeholder:text-muted/50 focus:border-acid focus:outline-none"
                            />
                            <FieldError id="email-error" message={errors.email} />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="telefono" className="label text-[10px]">
                            03 — Tu teléfono (con código de país)
                          </label>
                          <input
                            id="telefono"
                            name="telefono"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            value={data.telefono}
                            onChange={(event) => update('telefono', event.target.value)}
                            placeholder="+57 300 123 4567"
                            aria-invalid={Boolean(errors.telefono)}
                            aria-describedby={errors.telefono ? 'telefono-error' : undefined}
                            className="mt-2 w-full border-b border-line bg-transparent py-3 text-base text-bone placeholder:text-muted/50 focus:border-acid focus:outline-none"
                          />
                          <FieldError id="telefono-error" message={errors.telefono} />
                        </div>

                        <div>
                          <div className="flex items-baseline justify-between gap-4">
                            <label htmlFor="detalle" className="label text-[10px]">
                              04 — La idea en una línea
                            </label>
                            <span className="font-mono text-[9px] text-muted">
                              {data.detalle.length}/{MAX_DETAIL}
                            </span>
                          </div>
                          <textarea
                            id="detalle"
                            name="detalle"
                            rows={4}
                            maxLength={MAX_DETAIL}
                            value={data.detalle}
                            onChange={(event) => update('detalle', event.target.value)}
                            placeholder="Queremos un portal donde nuestros clientes gestionen pedidos y vean el estado en tiempo real."
                            className="mt-2 w-full resize-none border border-line bg-ink/40 p-4 text-sm leading-relaxed text-bone placeholder:text-muted/50 focus:border-acid focus:outline-none"
                          />
                        </div>

                        <div className="border border-line bg-ink/40 px-4 py-3">
                          <p className="font-mono text-[10px] leading-relaxed text-muted">
                            Sin newsletters. Sin llamadas frías. Solo usamos tus datos para
                            responderte sobre este proyecto.
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-4 md:px-8">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-bone"
                  >
                    <ArrowLeft className="size-3.5" />
                    Atrás
                  </button>
                ) : (
                  <span className="font-mono text-[9px] text-muted">* campos obligatorios</span>
                )}

                {step < 2 ? (
                  <button type="button" onClick={goNext} className={btnPrimary}>
                    Siguiente
                    <ArrowUpRight className="size-4" />
                  </button>
                ) : (
                  <button type="submit" disabled={status === 'sending'} className={btnPrimary}>
                    {status === 'sending' ? (
                      <>
                        Enviando
                        <Loader2 className="size-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        Enviar mi idea
                        <ArrowUpRight className="size-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
