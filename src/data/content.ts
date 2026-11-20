export const NAV_LINKS = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'casos', label: 'Casos' },
  { id: 'contacto', label: 'Tu idea' },
  { id: 'faq', label: 'FAQ' },
] as const

export const HERO_STATS = [
  { value: '120+', label: 'productos lanzados' },
  { value: '4', label: 'años en producción' },
  { value: '98%', label: 'clientes que repiten' },
] as const

export const CAPABILITIES = [
  'Producto digital',
  'React',
  'TypeScript',
  'Node.js',
  'iOS',
  'Android',
  'IA aplicada',
  'AWS',
  'Diseño de sistemas',
  'Integraciones',
  'Observabilidad',
  'Automatización',
] as const

export type Service = {
  icon: 'code' | 'mobile' | 'sparkles' | 'plug' | 'cloud' | 'pen'
  title: string
  text: string
  tags: string[]
  featured?: boolean
}

export const SERVICES: Service[] = [
  {
    icon: 'code',
    title: 'Plataformas web',
    text: 'Aplicaciones que sostienen operaciones reales: paneles, portales de cliente y herramientas internas. Rápidas, auditables y sin deuda escondida.',
    tags: ['React', 'Node', 'PostgreSQL'],
    featured: true,
  },
  {
    icon: 'mobile',
    title: 'Apps móviles',
    text: 'iOS y Android desde una sola base de código, con rendimiento nativo y releases que no dan miedo.',
    tags: ['React Native', 'Expo', 'Swift'],
  },
  {
    icon: 'sparkles',
    title: 'IA aplicada',
    text: 'Agentes, RAG y automatizaciones que quitan trabajo manual de verdad, no demos bonitas.',
    tags: ['LLMs', 'RAG', 'Python'],
  },
  {
    icon: 'plug',
    title: 'Integraciones',
    text: 'Conectamos tu ERP, CRM, pagos y logística sin romper lo que ya funciona.',
    tags: ['APIs', 'Webhooks', 'Stripe'],
  },
  {
    icon: 'cloud',
    title: 'Cloud & DevOps',
    text: 'Infraestructura reproducible, CI/CD y observabilidad desde el primer commit.',
    tags: ['AWS', 'Docker', 'CI/CD'],
  },
  {
    icon: 'pen',
    title: 'Diseño de producto',
    text: 'Research, prototipos y design systems que hacen que el software se entienda sin manual.',
    tags: ['UX', 'UI', 'Design system'],
  },
]

export type ProcessStep = {
  n: string
  title: string
  kicker: string
  text: string
  bullets: string[]
}

export const PROCESS: ProcessStep[] = [
  {
    n: '01',
    title: 'Descubrir',
    kicker: 'Semana 1',
    text: 'Antes de escribir código entendemos el negocio, los usuarios y lo que puede salir mal.',
    bullets: ['Workshop de alcance', 'Mapa de riesgos', 'Métricas de éxito'],
  },
  {
    n: '02',
    title: 'Diseñar',
    kicker: 'Semanas 2–3',
    text: 'Flujos, prototipos navegables y un design system mínimo para validar antes de construir.',
    bullets: ['Prototipo clickable', 'Design system', 'Test con usuarios'],
  },
  {
    n: '03',
    title: 'Construir',
    kicker: 'Sprints de 2 semanas',
    text: 'Entregas cada viernes, demo contigo y un tablero que puedes mirar cuando quieras.',
    bullets: ['Demo semanal', 'Código en tu repo', 'QA continuo'],
  },
  {
    n: '04',
    title: 'Lanzar',
    kicker: 'Semana de release',
    text: 'Despliegue gradual, observabilidad y un plan de vuelta atrás que nadie espera usar.',
    bullets: ['CI/CD', 'Monitoreo', 'Plan de rollback'],
  },
  {
    n: '05',
    title: 'Escalar',
    kicker: 'Continuo',
    text: 'Medimos, iteramos y dejamos un equipo capaz de seguir sin nosotros. O nos quedamos.',
    bullets: ['Analítica de producto', 'Squad dedicado', 'Documentación'],
  },
]

export type CaseStudy = {
  client: string
  sector: string
  year: string
  title: string
  text: string
  metrics: { value: string; label: string }[]
  tags: string[]
  accent: string
  glyph: string
}

export const CASES: CaseStudy[] = [
  {
    client: 'Nexo Pay',
    sector: 'Fintech',
    year: '2025',
    title: 'Onboarding que dejó de asustar a los usuarios',
    text: 'Rediseñamos el alta de cuentas y la verificación de identidad de una fintech con 400.000 usuarios. Menos pasos, más contexto y un motor de reglas que el equipo de compliance puede editar sin tocar código.',
    metrics: [
      { value: '-38%', label: 'tiempo de alta' },
      { value: '+21%', label: 'activación' },
      { value: '12', label: 'semanas' },
    ],
    tags: ['React', 'Node', 'KYC'],
    accent: '#c8f751',
    glyph: 'N',
  },
  {
    client: 'Ruta Norte',
    sector: 'Logística',
    year: '2024',
    title: 'Toda la flota en una sola pantalla',
    text: 'Sustituimos siete hojas de cálculo y tres sistemas desconectados por un panel operativo en tiempo real. Conductores, almacén y atención al cliente dejaron de llamarse para saber dónde estaba cada pedido.',
    metrics: [
      { value: '+22%', label: 'entregas a tiempo' },
      { value: '-9 h', label: 'por semana en reporting' },
      { value: '7', label: 'sistemas unificados' },
    ],
    tags: ['React', 'Mapbox', 'PostGIS'],
    accent: '#f2c56b',
    glyph: 'R',
  },
  {
    client: 'Cardia',
    sector: 'Salud',
    year: '2026',
    title: 'Historia clínica sin fricción entre plantas',
    text: 'Construimos una plataforma clínica que sincroniza consultas, pruebas y prescripciones entre tres hospitales, con trazabilidad completa y cumplimiento de GDPR desde el diseño.',
    metrics: [
      { value: '4.9/5', label: 'satisfacción clínica' },
      { value: '-31%', label: 'tiempo de admisión' },
      { value: '3', label: 'hospitales conectados' },
    ],
    tags: ['React', 'FHIR', 'AWS'],
    accent: '#9fc2ff',
    glyph: 'C',
  },
]

export const TESTIMONIALS = [
  {
    quote:
      'Nos entregaron un producto que parece nuestro, no una plantilla. En la primera demo ya había decisiones que nosotros no habíamos sabido tomar.',
    name: 'Marta Ferrer',
    role: 'COO · Nexo Pay',
  },
  {
    quote:
      'El equipo entendió nuestra operación en dos workshops. Lo que otros estimaban en un año, aquí fue un trimestre con menos drama.',
    name: 'Diego Salas',
    role: 'Director de operaciones · Ruta Norte',
  },
  {
    quote:
      'Documentación, tests y traspaso real. Cuando terminó el proyecto nuestro equipo pudo seguir sin depender de nadie.',
    name: 'Alicia Mena',
    role: 'CTO · Cardia',
  },
  {
    quote:
      'La comunicación fue absurdamente clara. Cada viernes sabíamos qué se había construido y qué venía después.',
    name: 'Iván Robles',
    role: 'Fundador · Taller 9',
  },
  {
    quote:
      'Hicieron que una integración que llevaba años atascada pareciera simple. Ahora facturamos sin tocar Excel.',
    name: 'Laura Pineda',
    role: 'CFO · Óptica Sur',
  },
  {
    quote:
      'No venden horas: resuelven problemas. Se nota en el código y en cómo plantean las preguntas.',
    name: 'Andrés Vidal',
    role: 'VP Product · Fábrica',
  },
] as const

export const FAQS = [
  {
    q: '¿Cuánto cuesta un proyecto a medida?',
    a: 'Depende del alcance, pero nuestros proyectos suelen empezar en US$ 1.000. En la primera videollamada te damos un rango honesto y un desglose por fases antes de que firmes nada.',
  },
  {
    q: '¿Trabajáis con ideas que todavía no existen?',
    a: 'Sí. De hecho es donde mejor funcionamos. Hacemos un workshop de descubrimiento, definimos el MVP y lo construimos en sprints de dos semanas con demos cada viernes.',
  },
  {
    q: '¿Quién es dueño del código?',
    a: 'Tú, desde el primer commit. Trabajamos en tu repositorio, con tu cuenta de cloud y documentación incluida. No hay dependencia artificial.',
  },
  {
    q: '¿Y después del lanzamiento?',
    a: 'Ofrecemos soporte y evolución mensual, pero también traspasamos el producto a tu equipo si lo prefieres. La documentación y las sesiones de handover están incluidas.',
  },
  {
    q: '¿En qué industrias habéis trabajado?',
    a: 'Fintech, salud, logística, retail y marketplaces. Más que el sector, nos importa que el problema sea real y que haya alguien dispuesto a tomar decisiones rápido.',
  },
  {
    q: '¿Cuánto tardáis en responder?',
    a: 'Menos de 24 horas laborables. Si la idea encaja, te proponemos una videollamada de 25 minutos por Google Meet en la que sales con un siguiente paso concreto, encaje o no.',
  },
] as const

export const NEXT_STEPS = [
  'Leemos tu briefing y revisamos el encaje.',
  'Te escribimos con preguntas concretas en menos de 24 h.',
  'Videollamada de 25 min por Google Meet: alcance, rango y siguiente paso.',
] as const
