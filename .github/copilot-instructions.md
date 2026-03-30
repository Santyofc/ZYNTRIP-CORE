# Copilot Workspace Instructions for ZYNTRIP-CORE

## 1. What this project is
- React + Vite SPA for ride-hailing flows (passenger + driver onboarding, ride booking, tracking, payment, rating).
- Uses React Router v7, MUI, Radix UI, tailwind + custom components.
- Source is in `src/` with pages under `src/app/pages`, app shell in `src/app/App.tsx` and routes in `src/app/routes.tsx`.

## 2. Quick setup commands
1. `npm i`
2. `npm run dev` (local server `http://localhost:5173` by default)
3. `npm run build` (production bundle via Vite)

## 3. Code conventions / style
- Prefer modular components under `src/app/components` and UI abstractions under `src/app/components/ui`.
- Keep component props typed (TypeScript in `.tsx`).
- Use existing design tokens/components, not arbitrary inline CSS.
- Prefer composable hooks (if needed) and minimal local state when shared context exists in `src/app/context/AppContext.tsx`.

## 4. Key architectural points
- Route mapping in `src/app/routes.tsx`.
- Major user flows in `src/app/pages/*`.
- Reusable UI controls in `src/app/components/ui/*`.
- App context is `src/app/context/AppContext.tsx`.

## 5. Where to find guidance
- Project-level suggestions go in existing `guidelines/Guidelines.md`.
- For agent prompts, reference this file and `README.md`.

## 6. Common tasks
- Add a new screen: add a component under `src/app/pages`, add route in `src/app/routes.tsx`.
- Add a shared control: add under `src/app/components/ui`, use from pages.
- Fix runtime bug: run dev server, reproduce path and inspect browser console + React component state.

## 7. Do / don't rules (AI rules)
- Do not rewrite full screen flows unless requested; start with minimal behavior changes.
- Do not introduce new dependencies without explicit ask.
- Keep UI changes aligned with the existing visual pattern (cards, bottom sheets, status indicators).
- For text/localization, use hardcoded English strings unless i18n is requested.

## 8. Troubleshooting
- If stale data persists, clear browser storage and refresh.
- If there is module-resolution failure, verify `vite` config in `vite.config.ts` and `tsconfig` path aliases (none currently in use).

## 9. Suggested prompt patterns
- "In ZYNTRIP-CORE, add a [Passenger|Driver] flow step to [DestinationScreen|DriverHome] and update routing." 
- "Refactor `src/app/components/BottomSheet.tsx` to expose a `onClose` callback and keep current behavior." 
- "Inspect `AppContext.tsx` and return a typed `useAppContext()` hook with default state."

## 10. Future agent customizations (after this bootstrap)
- `create-instruction` for driver/passenger domain modeling.
- `create-hook` for standardizing API call and network error handling.
- `create-prompt` for UI story test scenarios.

---

_Last updated: 2026-03-30_
