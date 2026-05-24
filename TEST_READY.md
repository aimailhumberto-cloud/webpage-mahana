# E2E Test Suite Ready

## Test Runner
The E2E test suite can be executed using:
```bash
pnpm playwright test
```
*(Expected exit code: 0)*

## Coverage Summary
The test suite consists of **89 tests** distributed across the six primary spec files on disk:
- `landing.spec.ts` (20 tests)
- `booking.spec.ts` (20 tests)
- `boundary.spec.ts` (37 tests)
- `cross-feature.spec.ts` (7 tests)
- `routing.spec.ts` (5 tests)
- `workflows.spec.ts` (5 tests)

| Tier | Count | Description |
|---|---|---|
| **Tier 1 (Feature Coverage)** | 45 | Comprehensive happy-path coverage of Bilingual Landing, Product Showcase, Date Picker & Availability, Live Quotations, Single Room Booking, Multi-Room Booking, Receipts & Confirmations, Multi-Page Routing, and digital menu pricing. |
| **Tier 2 (Boundary & Corner Cases)** | 37 | Extreme dates, occupancy physical limits, empty details, double submissions prevention, file type and size upload constraints, holiday markups, and zero availability states. |
| **Tier 3 (Cross-Feature Combinations)** | 7 | Dynamic language toggles mid-checkout, category switches resetting cart, dynamic cart updates and date shifts recalculation, PayPal availability flags, and payment tab persistence. |
| **Tier 4 (Real-World Application Scenarios)** | 5 | Complex end-to-end multi-night reservations, multi-room group events with distinct plan allocations, Bohío day-passes, robust error recovery, and PayPal simulations. |
| **Total** | **89** | Complete opaque-box verification of guest website integration with PMS backend |

## Feature Checklist
- [x] **Bilingual Landing Page** (ES/EN switching for headers, hero, facilities, restaurant, reviews, and Google ratings)
- [x] **Product Showcase** (Mahana Experience, Pool Day / Pasadías, and Todo Incluido details, inclusions, schedules, and wizard navigation)
- [x] **Date Picker & Availability** (Check-in/visit date defaults, automatic checkout date sync for Pasadía, minimum stays, search boundaries)
- [x] **Live Quotations** (Real-time price calculations based on occupancy, plans, add-ons, weekend markups, and holiday markups)
- [x] **Single Room Booking** (Full wizard checkout flows with offline payment options: Transfer, Yappy, Oferta Simple, PaHoy)
- [x] **Multi-Room Booking** (Suggested room backtracking solver "El Sugerido", multi-room database foil/reservation linkages)
- [x] **Receipts & Confirmations** (Comprobante upload, allowed formats: JPG/PNG/WebP/PDF, file size checks, unique reference generation)
- [x] **Multi-Page Hubs & Routing** (Stays, Pasadías, Restaurante digital menu, Surf Shack Academy, Weddings and Events forms)
- [x] **Database & API Transaction Integrity** (Transactional backend routing via SQLite better-sqlite3 rollback guarantees)
