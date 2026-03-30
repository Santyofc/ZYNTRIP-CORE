interface PayPalOrderActions {
  create(data: unknown): Promise<string>;
  capture(): Promise<{
    id: string;
    status: string;
    purchase_units?: Array<{
      payments?: {
        captures?: Array<{
          id: string;
          status: string;
        }>;
      };
    }>;
  }>;
}

interface PayPalButtonsComponent {
  render(container: HTMLElement): Promise<void>;
  close?(): Promise<void>;
}

interface PayPalNamespace {
  Buttons(config: {
    style?: Record<string, string>;
    createOrder: (_data: unknown, actions: { order: PayPalOrderActions }) => Promise<string>;
    onApprove: (
      data: { orderID: string },
      actions: { order: Pick<PayPalOrderActions, 'capture'> },
    ) => Promise<void>;
    onError?: (error: unknown) => void;
  }): PayPalButtonsComponent;
}

declare global {
  interface Window {
    paypal?: PayPalNamespace;
  }

  interface ImportMetaEnv {
    readonly VITE_PAYPAL_CLIENT_ID?: string;
    readonly VITE_PAYPAL_CURRENCY?: string;
    readonly VITE_PAYPAL_INTENT?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
