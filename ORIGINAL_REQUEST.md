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
