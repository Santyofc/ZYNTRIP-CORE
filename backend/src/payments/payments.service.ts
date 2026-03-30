import { Injectable } from '@nestjs/common';
import { NotificationsService } from '../notifications/notifications.service';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { PayPalWebhookDto } from './dto/paypal-webhook.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async createOrder(payload: CreateOrderDto) {
    const order = {
      orderId: `sandbox-order-${crypto.randomUUID()}`,
      status: 'CREATED',
      amount: payload.amount,
      currency: payload.currency,
      description: payload.description ?? 'Zyntrip ride payment',
      nextStep: 'Replace this stub with a real PayPal Orders API call from the backend.',
    };

    const client = this.supabaseService.getAdminClient() as any;

    if (client) {
      const { error } = await client.from('payments').insert({
        provider: 'paypal',
        order_id: order.orderId,
        capture_id: null,
        status: 'created',
        amount: order.amount,
        currency: order.currency,
        trip_id: null,
        raw_event: null,
      });

      if (error) {
        throw new Error(`Supabase insert failed while creating a payment order: ${error.message}`);
      }
    }

    return order;
  }

  async handleWebhook(payload: PayPalWebhookDto) {
    const orderId = payload.resource?.supplementary_data?.related_ids?.order_id ?? payload.resource?.id ?? 'unknown-order';
    const amount = Number(payload.resource?.amount?.value ?? 0);
    const client = this.supabaseService.getAdminClient() as any;

    if (payload.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
      if (client) {
        const { error } = await client
          .from('payments')
          .update({
            capture_id: payload.resource?.id ?? null,
            status: 'completed',
            amount,
            currency: payload.resource?.amount?.currency_code ?? 'USD',
            raw_event: payload as Record<string, unknown>,
          })
          .eq('order_id', orderId);

        if (error) {
          throw new Error(`Supabase update failed while processing PayPal webhook: ${error.message}`);
        }
      }

      this.notificationsService.notifyPaymentCaptured({
        orderId,
        amount,
        channelHint: 'telegram',
      });
    }

    return {
      received: true,
      eventType: payload.event_type ?? 'unknown',
      orderId,
    };
  }
}
