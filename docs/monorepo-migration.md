# Monorepo Migration Plan

The repo now has a workspace scaffold under `apps/` and `packages/` without breaking the current root app.

## Current Active Paths

- frontend shell: root `src/`
- active backend: `apps/api/`

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
3. keep migrating remaining backend-adjacent assets from `backend/` into `apps/api/`
4. rebuild the current web shell inside `apps/admin/`
5. retire root-level frontend once `apps/admin` is live

## Notes

- `apps/api/` is now the active backend path used by the root scripts
- `backend/` remains as a legacy mirror until the migration is fully complete
- the workspace layout lets the repo evolve without a destructive big-bang rewrite
