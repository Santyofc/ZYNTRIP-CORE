export type TripStatus = 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface SupabaseProfileRow {
  id: string;
  full_name: string;
  email: string;
  role: 'rider' | 'driver' | 'dispatcher' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface SupabaseTripRow {
  id: string;
  rider_name: string;
  pickup: string;
  destination: string;
  fare_estimate: number;
  requested_at: string;
  status: TripStatus;
  payment_status: PaymentStatus;
  assigned_driver_id: string | null;
  paypal_order_id: string | null;
  paypal_capture_id: string | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SupabasePaymentRow {
  id: string;
  trip_id: string | null;
  provider: 'paypal';
  order_id: string;
  capture_id: string | null;
  status: 'created' | 'completed' | 'failed' | 'refunded';
  amount: number;
  currency: string;
  raw_event: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: SupabaseProfileRow;
        Insert: Omit<SupabaseProfileRow, 'created_at' | 'updated_at'> & Partial<Pick<SupabaseProfileRow, 'created_at' | 'updated_at'>>;
        Update: Partial<Omit<SupabaseProfileRow, 'id'>>;
        Relationships: [];
      };
      trips: {
        Row: SupabaseTripRow;
        Insert: Omit<SupabaseTripRow, 'created_at' | 'updated_at'> & Partial<Pick<SupabaseTripRow, 'created_at' | 'updated_at'>>;
        Update: Partial<Omit<SupabaseTripRow, 'id'>>;
        Relationships: [
          {
            foreignKeyName: 'trips_assigned_driver_id_fkey';
            columns: ['assigned_driver_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      payments: {
        Row: SupabasePaymentRow;
        Insert: Omit<SupabasePaymentRow, 'created_at' | 'updated_at'> & Partial<Pick<SupabasePaymentRow, 'created_at' | 'updated_at'>>;
        Update: Partial<Omit<SupabasePaymentRow, 'id'>>;
        Relationships: [
          {
            foreignKeyName: 'payments_trip_id_fkey';
            columns: ['trip_id'];
            isOneToOne: false;
            referencedRelation: 'trips';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
