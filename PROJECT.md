# Project: Casa Mahana Lodge & Restaurant Guest Website

## Architecture
This is a high-fidelity, bilingual guest-facing presentation website and interactive booking wizard built using React, TypeScript, Vite, and Tailwind CSS.
- **Frontend SPA**: React 18 SPA serving dynamic pages, language translations, and a multi-step checkout wizard.
- **PMS API Connection**: Client-side requests connect to the existing Express PMS server (`http://localhost:3201`) to fetch room availability, rate plan details, dynamic pricing quotes, and submit transactional reservations.
- **Database Synchronization**: Submitted reservations sync transactionally into SQLite (`casa-mahana.db`) via the PMS Express server, inserting records into `reservas_hotel` and `folio_hotel` tables.

```
       GUEST BROWSER
             │
             ▼
┌──────────────────────────────┐
│  React (TS) + Vite Frontend  │  <-- Elegant, bilingual ES/EN landing page,
└────────────┬─────────────────┘      product views, & multi-step booking wizard
             │
             │ HTTP API Client-Side Requests
             ▼
┌──────────────────────────────┐
│     Express PMS Backend      │  <-- Runs on Node (v24.13.1), exposes `/api/v1/public/*`
└────────────┬─────────────────┘      for plans, availability, quotes, and checkouts
             │
             │ direct native SQL execution
             ▼
┌──────────────────────────────┐
│   SQLite Database (pms.db)   │  <-- Transactions write directly to `reservas_hotel`
└──────────────────────────────┘      and `folio_hotel`
```

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Scaffolding & Setup | Initialize React + TS + Vite + Tailwind project in workspace, setup ES/EN translation context. | None | PLANNED |
| 2 | Landing Page (R1) | Build high-fidelity bilingual landing page with header language switcher, facilities, restaurant, and Google reviews. | M1 | PLANNED |
| 3 | Product Showcase (R2) | Implement dedicated sub-pages or dynamic product views for Mahana Experience, Pool Day, and Todo Incluido. | M2 | PLANNED |
| 4 | Booking Wizard (R3) | Implement multi-step interactive booking widget (Dates → Room types → Guest allocation & quotes). | M3 | PLANNED |
| 5 | PMS Sync & Receipts (R4) | Connect wizard to single/multi submit API endpoints, implement comprobante receipt upload, and show booking confirmation. | M4 | PLANNED |
| 6 | E2E Testing Tiers 1-4 | Design and execute Playwright test suite covering all features, boundary cases, combinations, and workload scenarios. | M5 | PLANNED |
| 7 | Adversarial Hardening | Run Challenger-led white-box adversarial testing (Tier 5) to audit coverage gaps and resolve edge cases. | M6 | PLANNED |

## Interface Contracts

### 1. Active Rate Plans
- `GET /api/v1/public/planes?tipo=:tipo`
- **Response**: Array of active, web-visible plans (`mahana_exp`, `todo_incluido`) with inclusions, pricing, schedules, and images.

### 2. Live Availability
- `GET /api/v1/public/disponibilidad?check_in=:ci&check_out=:co&categoria=:cat`
- **Response**: List of room types with available capacity for selected dates and category.

### 3. Dynamic Quote Calculation
- `GET /api/v1/public/cotizar?plan=:plan&adultos=:a&menores=:m&mascotas=:p&check_in=:ci&check_out=:co`
- **Response**: Subtotal, tax, total, recommended deposit, and nightly rate breakdown with day-aware pricing.

### 4. Single Room Booking
- `POST /api/v1/public/reservar`
- **Payload**: `{ cliente, apellido, email, whatsapp, check_in, check_out, tipo_habitacion, plan_codigo, adultos, menores, mascotas, monto_pagado, paypal_order_id, pago_tipo, metodo_pago, referencia }`

### 5. Multi-Room / Group Booking
- `POST /api/v1/public/reservas/multi`
- **Payload (multipart/form-data or JSON)**: `{ cliente, apellido, email, whatsapp, nacionalidad, metodo_pago, referencia, check_in, check_out, rooms: [...] }` plus optional file field `comprobante`.

## Code Layout
- `package.json` - Frontend dependencies and scripts.
- `vite.config.ts` - Vite configuration with proxy rules.
- `tailwind.config.js` - Tropical harmonic color configuration and typography.
- `src/main.tsx` - App entry point.
- `src/App.tsx` - Router and main page layout.
- `src/context/LanguageContext.tsx` - Bilingual translation context (ES/EN).
- `src/components/LanguageSwitcher.tsx` - Language switcher component in header.
- `src/components/BookingWizard.tsx` - Interactive checkout form.
- `src/pages/LandingPage.tsx` - Main presentation section with reviews, facilities, and food.
- `src/pages/ProductShowcase.tsx` - Product showcase cards and details.
- `tests/e2e/` - Playwright test specifications (Tiers 1-4).
