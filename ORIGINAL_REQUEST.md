# Original User Request

## Initial Request — 2026-05-21T20:30:33-05:00

A high-fidelity, bilingual (ES/EN) presentation website for **Casa Mahana Lodge & Restaurant** featuring dedicated product showcase sections and a premium multi-step booking wizard connected directly to the existing **Casa Mahana PMS** SQLite backend.

Working directory: `c:\Users\Usuario\OneDrive\Documentos\WebPage Casa Mahana`
Integrity mode: `development`

## Requirements

### R1. Premium Bilingual Presentation Website (Landing Page)
- Build a stunning, professional landing page for Casa Mahana Lodge & Restaurant that operates flawlessly in both Spanish and English, featuring a clean header language switcher.
- Implement highly polished, responsive design with curated typography (e.g., Google Fonts Outfit/Inter) and a harmonic tropical-coastal palette (warm sand, deep turquoise, gold accents, and clean off-whites). Use rich hover states and subtle micro-animations for premium feeling.
- Incorporate a specialized hero section, an overview of the facilities (pool, rest area, beach access), the restaurant (with wood-fired pizzas, seafood, burgers), and a prominent section displaying the **4.1/5 Google Business rating** from over 590+ reviews with elegant review slides or cards.

### R2. Dedicated Product/Experience Showcase
- Create dedicated sub-landing pages or dynamic product views for each core booking product:
  - **Mahana Experience**: Stay with buffet breakfast, pool access, WiFi, and parking.
  - **Pool Day / Pasadías (Pasadía Entrada & Pasadía Comidas)**: Day passes showing schedules (9 AM - 5 PM), pool/beach access, and included lunch/drinks.
  - **Todo Incluido**: All-inclusive lodging with 3 full meals, pool, drinks, and snacks.
- In both languages, each product page must outline clear inclusions, schedules, pricing details, and feature an instant booking trigger.

### R3. High-Fidelity Booking Wizard (Single & Multi-Room)
- Develop an interactive guest-facing booking widget allowing users to check live availability based on category (Stays vs. Day Passes/Pasadías) and selected dates by querying the PMS public availability API `/api/v1/public/disponibilidad`.
- Provide a multi-step booking checkout flow (Dates & Category → Select Unit & Rate Plan → Guests & Details → Payment Instructions & Confirmation).
- Implement real-time price quotes fetched from the PMS `/api/v1/public/cotizar` endpoint, dynamically reflecting day-type rate rules (weekdays, weekends, and Panamanian holidays).
- Support booking a single unit/package as well as multi-unit group bookings in a single checkout flow.

### R4. Robust PMS Connection & SQLite Sync
- Integrate the booking form with the PMS public API endpoints to submit reservations transactionally:
  - For single bookings: `POST /api/v1/public/reservar`
  - For multi-room/group bookings: `POST /api/v1/public/reservas/multi`
- Sync reservation records directly into the SQLite database (`casa-mahana.db`), ensuring correct database entries in the `reservas_hotel` and `folio_hotel` tables.
- Show an elegant booking confirmation screen that displays the unique booking ID (or group code), a complete summary of selected units/plans, the calculated deposit required (sugerido), and comprehensive payment/transfer instructions (e.g., Bank Transfer, Yappy).

## Acceptance Criteria

### Visual Design & UI/UX (Bilingual)
- [ ] Fully responsive page layouts look premium on mobile, tablet, and desktop viewports, with a prominent language switch toggle that immediately translates 100% of copy and labels (ES/EN) without reload.
- [ ] Premium presentation of the 4.1/5 Google Business rating with realistic guest review testimonials and direct ratings visibility.
- [ ] High-quality design featuring premium styling, modern buttons, cards, hover transitions, and glassmorphism elements.

### Booking Wizard & PMS API Integration
- [ ] Booking wizard dynamically fetches active, web-visible plans (`/api/v1/public/planes`) and room photos/inclusions directly from the PMS public API.
- [ ] Date picker checks real-time room/unit availability using the `/api/v1/public/disponibilidad` endpoint, displaying only units with available capacity.
- [ ] The price summary updates dynamically in real-time as users modify dates or guest counts (adults, children, pets), matching the exact quote from `/api/v1/public/cotizar`.
- [ ] Single and multi-room checkout flows successfully submit payloads to `/api/v1/public/reservar` or `/api/v1/public/reservas/multi`.
- [ ] Successfully submitted bookings generate records in the `reservas_hotel` and `folio_hotel` tables of the SQLite database with correct totals, status set to "Pendiente", and correct room IDs mapped.
- [ ] Shows a beautiful confirmation page with the generated reservation ID/group code, pricing details, and suggested deposit calculation.

## Follow-up — 2026-05-24T18:27:08Z

# Teamwork Project Prompt

An automated mobile visual audit and performance optimization project for the **Casa Mahana** guest website. The goal is to clean up mobile-specific visual alignment issues, particularly on price grids and rates sections, and optimize mobile load times without impacting the desktop design.

Working directory: `c:\Users\Usuario\OneDrive\Documentos\WebPage Casa Mahana`
Integrity mode: `development`

---

## Requirements

### R1. Complete Mobile Visual & Alignment Audit
- Audit and resolve all mobile-specific visual issues across all public-facing pages:
  - Home (`LandingPage.tsx`)
  - Stays Hub (`EstadiasHub.tsx`) & Landing Pages (`MahanaExperienceLanding.tsx`, `EstadiaAllInclusiveLanding.tsx`)
  - Day Passes Hub (`PasadiasHub.tsx`) & Landing Pages (`PoolDayLanding.tsx`, `PasadyaAllInclusiveLanding.tsx`)
  - Restaurant (`RestaurantePublico.tsx`)
  - Tours (`MahanaTours.tsx`)
  - Surf Shack (`SurfShackAcademy.tsx`)
  - Events (`EventosBodas.tsx`)
  - Booking Wizard (`BookingWizard.tsx`)
- **Strict Visual Focus**: Fix the price grids ("cuadros de tarifas" showing adult, child, and weekday/weekend rates) on the landing pages `/pasadias/todo-incluido` (`PasadyaAllInclusiveLanding.tsx`) and `/estadias/mahana-experience` (`MahanaExperienceLanding.tsx`). Ensure they flow naturally, do not wrap text awkwardly, have clean margins, and prevent container clipping on small viewport widths (down to 320px).
- **Strict Desktop Integrity Constraint**: **All modifications must be strictly scoped to mobile screen sizes** (using Tailwind's mobile utility suffixes or responsive breakpoints like `md:`/`max-md:`). Under no circumstances should the layout, alignment, font sizes, or padding of the desktop version (`>= 1024px`) be modified or negatively affected.

### R2. Mobile Load Speed & Performance Optimizations
- Implement modern lazy-loading (`loading="lazy"`) for all images across public-facing components and pages to decrease initial page weight.
- Audit the font imports, asset loading, and bundle-blocking scripts to ensure optimal mobile rendering speeds.
- Verify that the production build remains clean and optimized.

---

## Acceptance Criteria

### Mobile Responsive Layouts
- [ ] No horizontal scrolling on mobile viewports (widths 320px to 480px) on any public pages.
- [ ] Rate tables and pricing grids on the *Pasadía Todo Incluido* and *Mahana Experience* landing pages are fully readable, with zero text overlaps, clean text wrapping, and realistic padding on small phone viewports.
- [ ] Mobile navigation header drawer behaves smoothly, is clean, and collapses correctly without layout shifts.
- [ ] **Desktop Visual Zero-Regression**: The desktop presentation of the rate grids, pricing cards, and general page layouts looks identical to its pre-optimization state with zero regressions.

### Performance & Build Verification
- [ ] All dynamic `<img />` tags for large photos (e.g. heroes, galleries, cards) use native `loading="lazy"` attribute.
- [ ] Running `npm run build` compiles 100% successfully in under 3 seconds with zero TypeScript errors or bundler discrepancies.
