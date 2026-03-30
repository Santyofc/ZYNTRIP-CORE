-- Zyntrip Core v2 schema
-- Target: PostgreSQL 15+

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'user_role'
  ) THEN
    CREATE TYPE user_role AS ENUM ('rider', 'driver', 'dispatcher', 'admin', 'finance');
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'trip_status'
  ) THEN
    CREATE TYPE trip_status AS ENUM (
      'REQUESTED',
      'SEARCHING_DRIVER',
      'DRIVER_ASSIGNED',
      'DRIVER_EN_ROUTE',
      'ARRIVED',
      'IN_PROGRESS',
      'COMPLETED',
      'CANCELLED',
      'PAYMENT_PENDING',
      'PAID'
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'payment_status'
  ) THEN
    CREATE TYPE payment_status AS ENUM ('pending', 'authorized', 'paid', 'failed', 'refunded');
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'driver_availability'
  ) THEN
    CREATE TYPE driver_availability AS ENUM ('offline', 'online', 'busy', 'paused');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password_hash text,
  role user_role NOT NULL,
  phone text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS profiles (
  user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  avatar_url text,
  locale text NOT NULL DEFAULT 'es-CR',
  timezone text NOT NULL DEFAULT 'America/Costa_Rica',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id uuid,
  make text,
  model text NOT NULL,
  color text,
  plate_number text NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS drivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'OFFLINE',
  lat double precision,
  lng double precision
);

CREATE TABLE IF NOT EXISTS driver_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_user_id uuid NOT NULL REFERENCES drivers(user_id) ON DELETE CASCADE,
  document_type text NOT NULL,
  file_url text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rider_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  driver_id uuid REFERENCES drivers(id) ON DELETE SET NULL,
  status trip_status NOT NULL DEFAULT 'REQUESTED',
  origin_lat double precision,
  origin_lng double precision,
  dest_lat double precision,
  dest_lng double precision,
  fare numeric(12,2) NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trip_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  event text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE SET NULL,
  provider text NOT NULL,
  status payment_status NOT NULL DEFAULT 'pending',
  amount numeric(12,2) NOT NULL,
  currency text NOT NULL DEFAULT 'CRC',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS push_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  platform text NOT NULL,
  token text NOT NULL UNIQUE,
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE SET NULL,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  subject text NOT NULL,
  status text NOT NULL DEFAULT 'open',
  priority text NOT NULL DEFAULT 'normal',
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_drivers_availability ON drivers(availability);
CREATE INDEX IF NOT EXISTS idx_trips_status_requested_at ON trips(status, requested_at DESC);
CREATE INDEX IF NOT EXISTS idx_trips_rider_user_id ON trips(rider_user_id);
CREATE INDEX IF NOT EXISTS idx_trips_driver_user_id ON trips(driver_user_id);
CREATE INDEX IF NOT EXISTS idx_trip_events_trip_id_created_at ON trip_events(trip_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payments_trip_id ON payments(trip_id);
CREATE INDEX IF NOT EXISTS idx_payments_status_paid_at ON payments(status, paid_at DESC);
CREATE INDEX IF NOT EXISTS idx_dispatch_assignments_trip_id ON dispatch_assignments(trip_id);
CREATE INDEX IF NOT EXISTS idx_push_tokens_user_id ON push_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status_created_at ON support_tickets(status, created_at DESC);
