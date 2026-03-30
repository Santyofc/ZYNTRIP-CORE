# Workspace API Scaffold

This folder is the target home for the production NestJS API once the current `backend/` service is migrated into the monorepo layout.

Current state:

- `backend/` remains the active API used by the current app
- `apps/api/` is the workspace-ready destination for the next migration step

Recommended next move:

1. migrate the existing backend modules into `apps/api/src`
2. move DB code into `packages/db`
3. move shared types into `packages/types`
4. switch root scripts to `pnpm` workspace commands
