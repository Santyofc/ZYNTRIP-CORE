export interface PayPalWebhookDto {
  id?: string;
  event_type?: string;
  resource?: {
    id?: string;
    amount?: {
      value?: string;
      currency_code?: string;
    };
    supplementary_data?: {
      related_ids?: {
        order_id?: string;
      };
    };
  };
}
