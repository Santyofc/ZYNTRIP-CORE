# Zyntrip Core Architecture Blueprint

This document defines the target production stack for the next iteration of Zyntrip Core.

## Closed Stack

- Mobile: React Native + Expo
- Web admin: Next.js + Tailwind
- Backend: NestJS
- Database: PostgreSQL via Supabase or Neon
- ORM: Drizzle
- Realtime: Socket.IO
- Geo and queues: Redis
- Maps: Google Maps Platform
- Push: Firebase Cloud Messaging
- Infra: EC2 + Nginx + Docker
- CDN and SSL: Cloudflare

## Monorepo Layout

```text
apps/
  mobile/
    app/
    src/
    app.json
    package.json
  admin/
    src/
    public/
    next.config.ts
    package.json
  api/
    src/
      auth/
      users/
      riders/
      drivers/
      vehicles/
      trips/
      dispatch/
      payments/
      notifications/
      maps/
      realtime/
      queue/
      health/
    test/
    package.json
packages/
  db/
    src/
      schema/
      relations/
      migrations/
      index.ts
    drizzle.config.ts
    package.json
  types/
    src/
      auth.ts
      trips.ts
      payments.ts
      users.ts
    package.json
  config/
    eslint/
    tsconfig/
    env/
    package.json
  ui/
    src/
    package.json
infra/
  docker/
  nginx/
  cloudflare/
  scripts/
  compose/
docs/
  architecture-blueprint.md
  db-schema-v2.sql
```

## Responsibilities By App

### `apps/mobile`

- Rider app
- Driver app
- Authentication
- Ride creation and trip tracking
- Push notification registration
- Live trip state via Socket.IO

### `apps/admin`

- Dispatch board
- Payments console
- Admin analytics
- Driver onboarding review
- Support and incident management

### `apps/api`

- Business logic
- Auth and RBAC
- Trip lifecycle orchestration
- Dispatch workflows
- PayPal integration and webhooks
- Socket.IO realtime events
- Redis-backed queues and geo helpers
- FCM push fan-out

### `packages/db`

- Drizzle schema
- DB client
- Migrations
- Shared SQL helpers

## Backend Domain Modules

- `auth`: login, refresh token, sessions, RBAC
- `users`: platform users and profiles
- `riders`: rider-specific preferences and history
- `drivers`: availability, status, onboarding, compliance
- `vehicles`: vehicle records and verification
- `trips`: trip creation, assignment, state machine, receipts
- `dispatch`: queueing, assignment logic, escalation
- `payments`: orders, captures, refunds, payouts
- `notifications`: app, push, email, Telegram hooks
- `maps`: geocoding, route estimates, ETAs
- `realtime`: Socket.IO gateway and room routing
- `queue`: Redis jobs, retries, delayed work

## Recommended Shared Contracts

- `UserRole`: `rider | driver | dispatcher | admin | finance`
- `TripStatus`: `requested | assigned | driver_en_route | driver_arrived | in_progress | completed | cancelled`
- `PaymentStatus`: `pending | authorized | paid | failed | refunded`
- `DriverAvailability`: `offline | online | busy | paused`

## Core Realtime Rooms

- `admin`
- `dispatch`
- `finance`
- `rider:{userId}`
- `driver:{userId}`
- `trip:{tripId}`

## Event Set

- `trip.created`
- `trip.updated`
- `trip.assigned`
- `trip.cancelled`
- `driver.location.updated`
- `driver.availability.updated`
- `payment.updated`
- `notification.created`

## Redis Use Cases

- dispatch queues
- retryable background jobs
- rate limits
- driver presence cache
- temporary geospatial indexing
- webhook deduplication

## Infra Baseline

### EC2

- one app VM for early staging and production
- Docker Compose for admin, api, Redis, and reverse proxy
- managed Postgres via Supabase or Neon

### Nginx

- reverse proxy
- path routing for admin and API
- websocket upgrade support for Socket.IO

### Cloudflare

- DNS
- SSL termination
- CDN for static assets
- WAF and bot protection later

## Phase Plan

### Phase 1

- set up `pnpm` workspaces
- create `apps/admin`, `apps/api`, `packages/db`, `packages/types`
- move current NestJS scaffold into `apps/api`
- move current frontend into `apps/admin` or replace with Next.js shell

### Phase 2

- Drizzle schema and migrations
- JWT auth
- users, profiles, riders, drivers, vehicles

### Phase 3

- trip creation and dispatch
- Socket.IO rooms and events
- Redis queue integration

### Phase 4

- Google Maps routing and ETA
- FCM push notifications
- PayPal webhook hardening

### Phase 5

- production deploy on EC2 + Nginx + Cloudflare
- logging, tracing, alerts, backups

## Notes

- Use Drizzle unless the team strongly prefers Prisma tooling.
- Use Supabase first if you want Storage and admin tooling bundled.
- Use Neon first if you want a lighter managed Postgres focus.
- Keep critical payment logic server-side only.
