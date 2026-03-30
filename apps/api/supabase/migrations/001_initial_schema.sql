create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key,
  full_name text not null,
  email text not null unique,
  role text not null check (role in ('rider', 'driver', 'dispatcher', 'admin')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  rider_name text not null,
  pickup text not null,
  destination text not null,
  fare_estimate numeric(10, 2) not null check (fare_estimate >= 0),
  requested_at timestamptz not null default timezone('utc', now()),
  status text not null check (status in ('requested', 'accepted', 'in_progress', 'completed', 'cancelled')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed')),
  assigned_driver_id uuid null references public.profiles(id) on delete set null,
  paypal_order_id text null unique,
  paypal_capture_id text null unique,
  paid_at timestamptz null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid null references public.trips(id) on delete set null,
  provider text not null check (provider in ('paypal')),
  order_id text not null unique,
  capture_id text null unique,
  status text not null check (status in ('created', 'completed', 'failed', 'refunded')),
  amount numeric(10, 2) not null check (amount >= 0),
  currency text not null,
  raw_event jsonb null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists trips_status_requested_at_idx on public.trips (status, requested_at desc);
create index if not exists trips_payment_status_idx on public.trips (payment_status);
create index if not exists payments_trip_id_created_at_idx on public.payments (trip_id, created_at desc);
create index if not exists payments_status_created_at_idx on public.payments (status, created_at desc);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists set_trips_updated_at on public.trips;
create trigger set_trips_updated_at
before update on public.trips
for each row
execute function public.set_updated_at();

drop trigger if exists set_payments_updated_at on public.payments;
create trigger set_payments_updated_at
before update on public.payments
for each row
execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.trips enable row level security;
alter table public.payments enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "trips_select_authenticated" on public.trips;
create policy "trips_select_authenticated"
on public.trips
for select
to authenticated
using (true);

drop policy if exists "payments_select_authenticated" on public.payments;
create policy "payments_select_authenticated"
on public.payments
for select
to authenticated
using (true);
