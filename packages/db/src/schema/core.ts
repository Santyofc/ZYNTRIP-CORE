import {
  boolean,
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['rider', 'driver', 'dispatcher', 'admin', 'finance']);
export const tripStatusEnum = pgEnum('trip_status', [
  'requested',
  'assigned',
  'driver_en_route',
  'driver_arrived',
  'in_progress',
  'completed',
  'cancelled',
]);
export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'authorized', 'paid', 'failed', 'refunded']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  role: userRoleEnum('role').notNull(),
  phone: text('phone'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const trips = pgTable('trips', {
  id: uuid('id').defaultRandom().primaryKey(),
  riderUserId: uuid('rider_user_id').notNull(),
  driverUserId: uuid('driver_user_id'),
  status: tripStatusEnum('status').notNull().default('requested'),
  pickupLabel: text('pickup_label').notNull(),
  destinationLabel: text('destination_label').notNull(),
  distanceMeters: integer('distance_meters'),
  durationSeconds: integer('duration_seconds'),
  fareEstimate: numeric('fare_estimate', { precision: 12, scale: 2 }).notNull().default('0'),
  fareFinal: numeric('fare_final', { precision: 12, scale: 2 }),
  requestedAt: timestamp('requested_at', { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  tripId: uuid('trip_id'),
  provider: text('provider').notNull(),
  status: paymentStatusEnum('status').notNull().default('pending'),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  currency: text('currency').notNull().default('USD'),
  providerOrderId: text('provider_order_id'),
  providerCaptureId: text('provider_capture_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
