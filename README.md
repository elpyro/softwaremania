# SoftwareMania

Landing page para un estudio ficticio de producto e ingeniería especializado en software a
medida, con base en Bogotá. Estética de laboratorio brutalista: fondo casi negro, lima ácido,
tipografía editorial y detalles técnicos.

## Stack

- Vite 8 + React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Motion (Framer Motion) + Lenis para animación y scroll suave
- Fuentes self-hosted con Fontsource: Bricolage Grotesque, Instrument Serif y JetBrains Mono
- Sin backend: la encuesta envía a Formspree

## Desarrollo

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Scripts

| Comando           | Descripción                                          |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo                               |
| `npm run build`   | Comprobación de tipos + build de producción          |
| `npm run preview` | Sirve el build de producción                         |
| `npm run lint`    | Análisis estático con oxlint                         |
| `npm run check`   | Test E2E visual y funcional (requiere Chrome + dev)  |

El test E2E necesita `npm run dev` en marcha y usa el Chrome instalado en el sistema. Se puede
apuntar a otro binario con `CHROME_PATH` y a otra URL con `BASE_URL`.

## Dominio, logo y despliegue

El proyecto no usa dominio propio. La URL de referencia es:

```text
https://softwaremania.netlify.app/
```

`netlify.toml` ya define `npm run build`, la carpeta `dist` y la cabecera
`Referrer-Policy: strict-origin-when-cross-origin`, necesaria para que Formspree pueda validar el
dominio. Si Netlify asigna otro subdominio, actualiza esa URL en `index.html` y en la restricción
de Formspree.

Archivos de marca:

- `public/logo.png` — logo principal (el que pediste usar).
- `public/favicon.png` — icono de pestaña.

## Encuesta

La landing incluye un briefing de tres pasos (proyecto, alcance y contacto) que hace POST a
Formspree con `Accept: application/json`. El endpoint se puede sobreescribir:

```bash
cp .env.example .env
```

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/tu-id
```

El formulario recoge nombre, email del cliente, teléfono (con código de país), tipo de proyecto,
etapa, presupuesto y plazo. Los envíos llegan a través de Formspree. Si el envío falla, la UI
permite copiar el resumen y reintentar. El endpoint de Formspree es público por diseño: al
desplegar en Netlify, activa **Settings → Restrict to Domain** con `softwaremania.netlify.app` (sin
`https://` ni `www`).

Ten en cuenta que los envíos de dominios no autorizados van a spam, no se rechazan, y que en
`localhost` también se marcarían como spam. Actívalo solo cuando la web esté publicada.

## Comportamiento

- Precios y rangos de presupuesto en **US$**.
- Localización en **Bogotá, Colombia** (`America/Bogota`, UTC-5).
- Contacto por formulario y videollamada por **Google Meet**; sin WhatsApp ni correo público visible.
- Sin enlaces a redes sociales.

## Animación y accesibilidad

- Cursor propio y botones magnéticos solo en punteros finos.
- Canvas de partículas que se pausa fuera del viewport y con la pestaña oculta.
- Proceso horizontal pineado en escritorio; timeline vertical en móvil.
- `prefers-reduced-motion` desactiva cursor, marquees, canvas animado y pinning.
- Objetivos: navegación por teclado, focus visible, labels y estados `aria-*` en formulario y FAQ.

## Estructura

```
src/
  components/
    ui/            Cursor, Magnetic, Marquee, Reveal, Clock, Grain...
  data/content.ts  Contenido ficticio (servicios, casos, testimonios, FAQ)
  lib/survey.ts    Tipos, validación y payload del formulario
  hooks/           Media query y reloj de Bogotá
scripts/check.mjs  Test E2E con Playwright Core sobre Chrome local
```
