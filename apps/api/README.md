# Zyntrip API

`apps/api` is now the active backend path for the monorepo layout.

It contains the migrated NestJS service that powers:

- auth
- trips
- payments
- notifications
- realtime Socket.IO events
- Supabase-ready persistence

Temporary note:

- `backend/` still exists as a legacy copy for reference during migration
- new work should target `apps/api/`

Recommended next move:

1. move shared DB logic into `packages/db`
2. move shared contracts into `packages/types`
3. point the admin workspace to this API path
4. retire `backend/` once the migration is complete
