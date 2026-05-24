# E2E Test Infra: Casa Mahana Guest Website

## Test Philosophy
- Opaque-box, requirement-driven E2E testing using Playwright (TypeScript).
- No direct dependency on implementation details: tests run against the guest-facing website and communicate with the live PMS backend.
- Validates bilingual text changes (ES/EN), availability queries, price quote updates, checkout flows, file uploads, and SQLite database state changes.

## Feature Inventory
| # | Feature | Requirement | Tier 1 (Coverage) | Tier 2 (Boundary) | Tier 3 (Cross) |
|---|---------|-------------|:----------------:|:----------------:|:--------------:|
| 1 | Bilingual Landing Page | R1 - ES/EN switches | 5 cases | 5 cases | ✓ |
| 2 | Product Showcase | R2 - Inclusions & schedules | 5 cases | 5 cases | ✓ |
| 3 | Date Picker & Availability | R3 - `/disponibilidad` checks | 5 cases | 5 cases | ✓ |
| 4 | Live Quotations | R3 - `/cotizar` updates | 5 cases | 5 cases | ✓ |
| 5 | Single Room Booking | R4 - `/reservar` submission | 5 cases | 5 cases | ✓ |
| 6 | Multi-Room Booking | R4 - `/reservas/multi` | 5 cases | 5 cases | ✓ |
| 7 | Receipts & Confirmations | R4 - Comprobante & summary | 5 cases | 5 cases | ✓ |
| **Total** | | | **35 cases** | **35 cases** | **7 cases** |

## Test Architecture
- **Test Runner**: Playwright (TS) configured to launch Google Chrome headless.
- **Base URL**: Vite dev server URL (e.g. `http://localhost:5173`) or Express server static routing.
- **PMS Backend**: PMS backend server runs in background on port `3201`.
- **Database Validation**: SQLite validator script checks database table records in `reservas_hotel` and `folio_hotel` after reservation submissions.

## E2E Test Tiers

### Tier 1 - Feature Coverage (35 test cases)
- Verify English landing page header, hero, facilities, restaurant, reviews.
- Verify Spanish landing page header, hero, facilities, restaurant, reviews.
- Verify language switcher changes text on-the-fly for landing page cards and reviews.
- Verify dynamic details and inclusions for "Mahana Experience" product.
- Verify schedules and inclusions for "Pool Day / Pasadías".
- Verify inclusions and conditions for "Todo Incluido".
- Verify check availability button disables if check-in date is in the past.
- Verify single room type selection and rate plan select.
- Verify exact quote matches backend response for stay.
- Verify successful single-room checkout submission with Yappy transfer.
- Verify successful multi-room group checkout submission with credit card.
- Verify receipt comprobante uploads cleanly.
- Verify confirmation screen displays correct reservation ID.
- (And other happy-path cases for all 7 features, totaling 35).

### Tier 2 - Boundary & Corner Cases (35 test cases)
- Date picker check-in date set to today, yesterday, and future.
- Date picker check-out date set to check-in date (for stays - should fail/prevent; for day-passes - should pass).
- Guest count boundary conditions (e.g., maximum capacity of standard room exceeded).
- Pet selection boundary check (e.g., standard room does not allow pets in certain plans, or limit of 2 pets).
- Empty/blank guest details (email without "@", empty names) should show native validation errors.
- Double-submission checks: verify booking button is disabled once clicked to prevent duplicate transactions.
- File upload boundaries: verify PDF/JPEG size limits (up to 10MB) and non-allowed file types (e.g., `.exe` or `.txt` should be rejected).
- Availability checks when room capacity is 0 (fully booked).
- Holiday pricing rate check: verify weekend/holiday markup is correctly calculated and matches quote.

### Tier 3 - Cross-Feature Combinations (7 test cases)
- **i18n + Checkout**: Verify that switching language in Step 4 of checkout instantly updates all prices, titles, and payment instructions without losing input fields.
- **Category Switch mid-wizard**: Verify that searching stays, moving to Step 2, then clicking back and switching category to "Pasadía" resets the checkout cart and shows day-pass room types.
- **Cart update + Dynamic Quote**: Verify that adding 3 Double Rooms, changing guest count of room 2, and then deleting room 1 dynamically recalculates total prices, tax, and required deposit instantly.
- **Multiple Rooms with mixed guest configs**: Multi-room checkout with 1 Standard Room (2 adults, 0 kids) and 1 Familiar Room (4 adults, 2 kids) with distinct rate plans.
- **Holiday pricing + Multi-Room**: Verify that weekend holiday rate rules are applied to all rooms in a group booking.
- **Receipt upload on failed API**: Verify error handling if API submit fails but receipt was selected.
- **Single vs Multi checkout payloads**: Verify correct payload format routing to `/reservar` vs `/reservas/multi`.

### Tier 4 - Real-World Application Scenarios (5 scenarios)
1. **The Family Vacation**: Spanish-speaking guest searches for a 5-night stay in a Familiar Room for 4 adults, 2 children, and 1 pet with the "Todo Incluido" plan. Switches language to English, reviews inclusions, goes to checkout, enters guest information, uploads bank transfer comprobante image, submits, and verifies the SQLite database has a new "Pendiente" status reservation with matching folio logs.
2. **The Corporate Event (Group Booking)**: Guest creates a group booking of 3 Doble Rooms + 1 Familiar Room for a 2-night weekend stay. Configures different guest counts for each room, selects "Mahana Experience" for Doble rooms and "Todo Incluido" for the Familiar room. Completes checkout and validates SQLite creates a lead reservation (`es_maestra = 1`) and 3 child reservations linked by a unique `grupo_codigo`.
3. **The Pool Day Pass**: Customer books 5 "Pasadía Comidas + Semi Open Bar" day passes for a specific weekend date. Selects Bohío type, inputs guest details, proceeds with Yappy payment reference, submits, and verifies a "Pasadía" category booking is successfully entered into SQLite database with matching pricing.
4. **The Last-Minute Getaway (Language Switch)**: Customer views product details, clicks instant book, fills wizard in English, changes mind and switches to Spanish, fills check-in/out dates, selects "Mahana Experience" for an Estándar Room, reviews price quote, completes booking, and gets a beautiful confirmation page.
5. **Robust Error Recovery**: Customer tries to book an Estándar Room on dates where availability is zero, gets a friendly error message, uses "El Sugerido" button to let the system automatically distribute their guests into available Double/Familiar rooms, proceeds to checkout, and completes the reservation successfully.
