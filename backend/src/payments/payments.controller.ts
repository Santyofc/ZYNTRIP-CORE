import { Body, Controller, Headers, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PayPalWebhookDto } from './dto/paypal-webhook.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('paypal/orders')
  createOrder(@Body() payload: CreateOrderDto) {
    return this.paymentsService.createOrder(payload);
  }

  @Post('paypal/webhook')
  handleWebhook(
    @Body() payload: PayPalWebhookDto,
    @Headers('paypal-transmission-id') transmissionId?: string,
  ) {
    return {
      transmissionId: transmissionId ?? null,
      ...this.paymentsService.handleWebhook(payload),
      nextStep: 'Verify the PayPal webhook signature before trusting this event in production.',
    };
  }
}
