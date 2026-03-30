# Zyntrip Core

Zyntrip Core is the frontend foundation of Zyntrip, a ride-hailing SaaS platform for riders, drivers, dispatch teams, finance operations, and administrators.

## Stack

- React 18
- TypeScript
- Vite 6
- React Router DOM
- CSS tokens with modular feature architecture

## Product Modules

- Authentication: login and registration flows with role-based session routing
- Rider Console: ride request flow and personal trip timeline
- Driver Console: request queue with accept/decline/start/complete actions
- Dispatch Board: pending trip visibility for operations coordination
- Payments Console: settlement metrics and integration-ready payment layer
- Admin Dashboard: platform KPIs and operational status

## Project Structure

```text
src/
  app/
    providers/
    App.tsx
    router.tsx
  components/
    layout/
    ui/
  features/
    auth/
    riders/
    drivers/
    trips/
    dispatch/
    payments/
    admin/
  services/
  hooks/
  lib/
  assets/
  styles/
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build production assets:

```bash
npm run build
```

## Backend Readiness and Suggested Architecture

- API Layer: NestJS (or FastAPI) with domain modules: auth, riders, drivers, trips, dispatch, payments, admin
- Database: PostgreSQL with Supabase or Neon
- Messaging: Redis streams or RabbitMQ for dispatch and trip event orchestration
- Auth: JWT + refresh token strategy with RBAC for rider/driver/dispatcher/admin roles
- Payments: Stripe Connect for rider payments and driver payouts
- Deployment: AWS EC2 with Docker + Nginx reverse proxy, or containerized ECS/Fargate as scale grows

## Roadmap

- Real-time trip tracking via WebSockets
- Geospatial search and ETA estimation
- Dynamic pricing and surge zones
- Driver onboarding workflow and compliance checks
- Full payment lifecycle with webhooks and reconciliation
- Observability stack (OpenTelemetry, logs, metrics, tracing)
