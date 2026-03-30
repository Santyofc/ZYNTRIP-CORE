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
      'requested',
      'assigned',
      'driver_en_route',
      'driver_arrived',
      'in_progress',
      'completed',
      'cancelled'
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

CREATE TABLE IF NOT EXISTS riders (
  user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  emergency_contact_name text,
  emergency_contact_phone text,
  default_payment_provider text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  make text NOT NULL,
  model text NOT NULL,
  color text,
  plate_number text NOT NULL UNIQUE,
  capacity smallint NOT NULL DEFAULT 4,
  year integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS drivers (
  user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  vehicle_id uuid REFERENCES vehicles(id) ON DELETE SET NULL,
  license_number text,
  availability driver_availability NOT NULL DEFAULT 'offline',
  current_latitude double precision,
  current_longitude double precision,
  last_location_at timestamptz,
  rating numeric(3,2),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
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
  rider_user_id uuid NOT NULL REFERENCES riders(user_id) ON DELETE RESTRICT,
  driver_user_id uuid REFERENCES drivers(user_id) ON DELETE SET NULL,
  status trip_status NOT NULL DEFAULT 'requested',
  pickup_label text NOT NULL,
  pickup_latitude double precision,
  pickup_longitude double precision,
  destination_label text NOT NULL,
  destination_latitude double precision,
  destination_longitude double precision,
  distance_meters integer,
  duration_seconds integer,
  fare_estimate numeric(12,2) NOT NULL DEFAULT 0,
  fare_final numeric(12,2),
  requested_at timestamptz NOT NULL DEFAULT now(),
  assigned_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  cancelled_at timestamptz,
  cancel_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trip_stops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  stop_order integer NOT NULL,
  label text NOT NULL,
  latitude double precision,
  longitude double precision,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (trip_id, stop_order)
);

CREATE TABLE IF NOT EXISTS trip_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  actor_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS dispatch_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  driver_user_id uuid NOT NULL REFERENCES drivers(user_id) ON DELETE CASCADE,
  assigned_by_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  assignment_source text NOT NULL DEFAULT 'manual',
  assigned_at timestamptz NOT NULL DEFAULT now(),
  accepted_at timestamptz,
  rejected_at timestamptz,
  expires_at timestamptz,
  UNIQUE (trip_id, driver_user_id, assigned_at)
);

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE SET NULL,
  rider_user_id uuid REFERENCES riders(user_id) ON DELETE SET NULL,
  provider text NOT NULL,
  provider_order_id text UNIQUE,
  provider_capture_id text UNIQUE,
  status payment_status NOT NULL DEFAULT 'pending',
  amount numeric(12,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  raw_event jsonb,
  paid_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS refunds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id uuid NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
  amount numeric(12,2) NOT NULL,
  reason text,
  provider_refund_id text UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_user_id uuid NOT NULL REFERENCES drivers(user_id) ON DELETE CASCADE,
  amount numeric(12,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  status text NOT NULL DEFAULT 'pending',
  provider text,
  provider_payout_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz
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
