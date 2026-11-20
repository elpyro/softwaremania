export const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT ?? 'https://formspree.io/f/mkjrvngz'

export const PROJECT_TYPES = [
  'Web app',
  'App móvil',
  'SaaS / plataforma',
  'IA y automatización',
  'E-commerce',
  'Aún no lo sé',
] as const

export const STAGES = [
  'Tengo una idea',
  'Estoy validando',
  'Ya tengo usuarios',
  'Necesito escalar',
] as const

export const DEADLINES = [
  'Lo antes posible',
  'En 1–3 meses',
  'En 3–6 meses',
  'Aún explorando',
] as const

export const BUDGETS = [
  { label: 'Menos de US$ 1.000', short: '< 1k' },
  { label: 'Entre US$ 1.000 y US$ 2.500', short: '1–2.5k' },
  { label: 'Entre US$ 2.500 y US$ 5.000', short: '2.5–5k' },
  { label: 'Entre US$ 5.000 y US$ 10.000', short: '5–10k' },
  { label: 'Más de US$ 10.000', short: '+10k' },
] as const

export type SurveyData = {
  tipo: string
  etapa: string
  presupuesto: number
  plazo: string
  nombre: string
  email: string
  telefono: string
  detalle: string
}

export const EMPTY_SURVEY: SurveyData = {
  tipo: '',
  etapa: '',
  presupuesto: 2,
  plazo: '',
  nombre: '',
  email: '',
  telefono: '',
  detalle: '',
}

export const MAX_DETAIL = 500

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
}

export function isPhone(value: string) {
  const trimmed = value.trim()
  if (!/^\+?[0-9\s().-]{7,20}$/.test(trimmed)) return false
  return (trimmed.match(/\d/g) ?? []).length >= 7
}

export function buildSummary(data: SurveyData) {
  return [
    `Idea: ${data.tipo}`,
    `Etapa: ${data.etapa}`,
    `Presupuesto: ${BUDGETS[data.presupuesto]?.label ?? 'Sin definir'}`,
    `Plazo: ${data.plazo}`,
    `Nombre: ${data.nombre}`,
    `Email: ${data.email}`,
    `Teléfono: ${data.telefono}`,
    '',
    data.detalle.trim() || 'Sin detalle adicional.',
  ].join('\n')
}

export function makeTicket() {
  const year = new Date().getFullYear()
  const code = Math.floor(1000 + Math.random() * 9000)
  return `SM-${year}-${code}`
}

export function toPayload(data: SurveyData) {
  return {
    nombre: data.nombre.trim(),
    email: data.email.trim(),
    telefono: data.telefono.trim(),
    tipo: data.tipo,
    etapa: data.etapa,
    presupuesto: BUDGETS[data.presupuesto]?.label ?? 'Sin definir',
    plazo: data.plazo,
    detalle: data.detalle.trim(),
    _subject: `Nueva idea desde la web — ${data.tipo || 'Proyecto'}`,
    _gotcha: '',
  }
}
