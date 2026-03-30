# Zyntrip Core Architecture Blueprint

This document defines the target production stack for the next iteration of Zyntrip Core.

## V1 Scope

- Rider app: map, request trip, tracking, payment, rating
- Driver app: online and offline, accept, navigation, complete
- Automatic matching: proximity plus availability
- Realtime: driver location plus trip status
- Pricing: distance and time
- Push notifications
- Basic admin panel
- Payments: cash first, Stripe or SINPE next

## Enterprise Capabilities To Carry Forward

- balanceo de oferta y demanda
- surge pricing
- antifraude
- optimizacion de rutas
- multi-region
- scoring de conductores
- soporte en vivo

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
  rider-app/
    App.tsx
    app.json
    package.json
  driver-app/
    App.tsx
    app.json
    package.json
  admin/
    src/
    public/
    next.config.ts
    package.json
  api/
    src/
      antifraud/
      auth/
      driver-scoring/
      users/
      drivers/
      live-support/
      market-dynamics/
      regions/
      route-optimization/
      trips/
      dispatch/
      matching/
      payments/
      notifications/
      realtime/
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

### `apps/rider-app`

- Request trip
- Track assigned driver
- Pay and rate
- Push notifications

### `apps/driver-app`

- Toggle online and offline
- Receive and accept ride requests
- Send live location every few seconds
- Complete trip lifecycle

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
- Matching and dispatch workflows
- Cash-first payments plus future Stripe or SINPE
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
- `drivers`: availability, status, onboarding, compliance
- `trips`: trip creation, assignment, state machine, receipts
- `matching`: proximity plus availability assignment with driver scoring
- `market-dynamics`: offer-demand balancing and surge multipliers by region
- `route-optimization`: ETA and route scoring ahead of Google Maps integration
- `antifraud`: velocity checks, payment risk, cash abuse heuristics
- `driver-scoring`: acceptance, completion, rating, incident-adjusted score
- `live-support`: chat and incident intake for rider and driver escalations
- `regions`: multi-region metadata, rollouts, failover routing
- `payments`: orders, captures, refunds, payouts
- `notifications`: app, push, email, Telegram hooks
- `realtime`: Socket.IO gateway and room routing

## Recommended Shared Contracts

- `UserRole`: `rider | driver | dispatcher | admin | finance`
- `TripStatus`: `REQUESTED | SEARCHING_DRIVER | DRIVER_ASSIGNED | DRIVER_EN_ROUTE | ARRIVED | IN_PROGRESS | COMPLETED | CANCELLED | PAYMENT_PENDING | PAID`
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
- `trip.offer`
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
- regional queue isolation
- surge window snapshots
- live support routing queues

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

- monolithic modular backend plus realtime
- rider and driver apps
- admin app
- Drizzle schema and migrations

### Phase 2

- automatic matching
- Redis geo plus queues
- Google Maps routing and ETA
- push notifications
- surge pricing and demand balancing
- antifraud scoring
- live support console

### Phase 3

- production deploy on EC2 + Nginx + Cloudflare
- payments expansion, observability, backups

## Notes

- Use Drizzle unless the team strongly prefers Prisma tooling.
- Use Supabase first if you want Storage and admin tooling bundled.
- Use Neon first if you want a lighter managed Postgres focus.
- Keep critical payment logic server-side only.
- Keep antifraud rules and driver scoring server-side only.
