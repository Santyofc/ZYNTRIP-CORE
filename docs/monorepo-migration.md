# Monorepo Migration Plan

The repo now has a workspace scaffold under `apps/` and `packages/` without breaking the current root app.

## Current Active Paths

- frontend shell: root `src/`
- active backend: `backend/`

## Target Paths

- mobile app: `apps/mobile`
- admin web: `apps/admin`
- production API: `apps/api`
- database package: `packages/db`
- shared types: `packages/types`
- shared config: `packages/config`

## Migration Order

1. move shared TypeScript contracts into `packages/types`
2. move SQL and Drizzle schema into `packages/db`
3. migrate NestJS modules from `backend/` into `apps/api/`
4. rebuild the current web shell inside `apps/admin/`
5. retire root-level frontend once `apps/admin` is live

## Notes

- `backend/` remains the current API so development is not blocked
- the new workspace gives you a clean place to grow without doing a risky big-bang rewrite
