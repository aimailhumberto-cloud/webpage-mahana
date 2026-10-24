# Casa Mahana Webpage — E2E Test Infrastructure Documentation

## Overview
This document specifies the architecture, execution instructions, mock strategies, and tier distribution for the Playwright End-to-End (E2E) test suite of the Casa Mahana visual overhaul and booking portal (`webpage-mahana`).

---

## 4-Tier Test Architecture

The test suite strictly adheres to the 4-tier testing methodology, providing exhaustive, opaque-box functional verification without relying on implementation facades:

### Tier 1: Feature Coverage (Page & Hub Rendering)
Verifies that all primary hubs, landing pages, menus, catalog entries, and localized strings render accurately and match the authoritative copy in `src/translations.ts`.
- **`tests/e2e/routing.spec.ts`** (5 tests):
  - R1: `/estadias` hub with room categories, capacities, and comparison matrix.
  - R2: `/pasadias` hub with Day Pass tiers (Pool Day $5.50, Todo Incluido $38.50).
  - R3: `/restaurante` open-to-public restaurant menu pricing and dish specs.
  - R4: `/surf-shack` ISA surf academy options and rental equipment quiver.
  - R5: `/eventos` destination weddings, venue inquiries, and confirmation feedback.
- **`tests/e2e/landing.spec.ts`** (20 tests):
  - Full dictionary matching for Spanish (default) and English across Header, Hero, Facilities, Restaurant, Reviews, and Experiences showcase cards.
  - Interactive language switcher dynamics.
  - Product showcase cards and booking triggers.

### Tier 2: Boundary & Corner Cases
Verifies extreme screen dimensions, responsive layout integrity, edge parameter handling, and form validation boundaries.
- **`tests/e2e/boundary.spec.ts`** (13 tests):
  - Viewports: Mobile Compact (375x667), iPhone Standard (390x844), Large Mobile (430x932), Desktop Widescreen (1440x900, 1920x1080).
  - Verification that hero titles, CTAs, and multi-column grids adapt without horizontal overflow or clip.
  - Mobile hamburger navigation drawer, sub-accordions (Estadías, Pasadías), and backdrop dismissal.
  - Empty `/reservar` navigation defaulting safely to base PMS URL.
  - Arbitrary plan codes, extreme guest counts (`999 guests`), non-standard dates (`2020-01-01`), and URI special characters.
  - HTML5 required field enforcement on Wedding & Event inquiry forms.

### Tier 3: Cross-Feature Interactions
Tests systemic interactions across distinct modules and browser subsystems.
- **`tests/e2e/cross-feature.spec.ts`** (8 tests):
  - Language persistence across multi-page client-side navigation (`/` -> `/pasadias` -> `/estadias`).
  - Language persistence across hard page reloads (verifying `localStorage` / `LanguageContext`).
  - Reactive document title and meta tag updates (`SEO.tsx`) synchronized with route transitions and language toggles.
  - Marketing attribution continuity: Capture of incoming UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) and click IDs (`gclid`, `fbclid`) into `sessionStorage` and automatic forwarding into PMS target URLs.
  - Omnichannel booking trigger integration: Floating Booking Capsule on homepage, Header Desktop CTA, Mobile Drawer CTA, and Hub Package CTAs.

### Tier 4: Real-World Workflows (Guest Journeys) & Booking Engine
Executes complete end-to-end guest journeys simulating actual visitor personas and verifying the core booking funnel.
- **`tests/e2e/workflows.spec.ts`** (5 tests):
  - Workflow 1: Guest enters Pasadías Hub, filters for Day Passes, selects "Pool Day Acceso", and transitions smoothly into the external PMS booking funnel.
  - Workflow 2: Culinary visitor explores `/restaurante`, inspects schedules, opens high-res menu sheet lightbox modal, checks artisan pizzas/ceviches, and engages Day Pass cross-sell.
  - Workflow 3: Wedding organizer navigates to `/eventos`, views ceremony gallery modal, fills out personalized wedding package inquiry, and receives real-time confirmation.
  - Workflow 4: Eco-tourist explores `/mahana-tours`, toggles interactive filters (Islands, Extreme Adventure, Private Charters), and inspects direct WhatsApp inquiry concierge.
  - Workflow 5: Surfer visits `/surf-shack`, inspects gear rental quiver ($20) and ISA certified lessons ($35), and triggers lesson booking.
- **`tests/e2e/booking.spec.ts`** (9 tests):
  - B1: Default plan and guest selection forwarding (`todo_incluido`, 2 guests).
  - B2: Restaurant selection in booking bar routing internally to `/restaurante`.
  - B3-B4: Forwarding of varied plans (`escape_mahana`, `pasadia_entrada`), dates, and guest counts (up to 5+).
  - B5-B6: Query string and React Router state parameter handling on `/reservar`.
  - B7: Marketing attribution funnel forwarding.
  - B8: Real-time bilingual label and dropdown option localization.
  - B9: Header CTA booking intent tracking and redirection.

---

## PMS Route Interception & Mock Strategy

Because `webpage-mahana` redirects booking requests to the external Casa Mahana PMS on Render (`https://casa-mahana-pms.onrender.com/reservar`), the Playwright suite uses Playwright route interception (`page.route`):
```typescript
let capturedPmsUrl = '';
await page.route('https://casa-mahana-pms.onrender.com/**', route => {
  capturedPmsUrl = route.request().url();
  return route.fulfill({
    status: 200,
    contentType: 'text/html',
    body: '<!DOCTYPE html><html><body>Mock PMS Portal</body></html>'
  });
});
```

### Benefits:
1. **Zero External Flakiness**: Tests do not depend on external network stability or Render cold-starts.
2. **Deterministic Assertions**: The full query string (`plan`, `guests`, `date`, `category`, `utm_*`) can be inspected using `new URL(capturedPmsUrl).searchParams`.
3. **Instant Execution**: Redirects resolve immediately without latency.

---

## Execution Commands

### Run Full Test Suite
```bash
npx playwright test
```

### Run Specific Test Tier
```bash
# Tier 1: Feature Coverage & Routing
npx playwright test tests/e2e/routing.spec.ts tests/e2e/landing.spec.ts

# Tier 2: Boundary & Viewports
npx playwright test tests/e2e/boundary.spec.ts

# Tier 3: Cross-Feature Interactions
npx playwright test tests/e2e/cross-feature.spec.ts

# Tier 4: Real-World Workflows & Booking
npx playwright test tests/e2e/workflows.spec.ts tests/e2e/booking.spec.ts
```

### Run with Visual UI / Debugger
```bash
npx playwright test --ui
npx playwright test --debug
```

### View HTML Test Report
```bash
npx playwright show-report
```
