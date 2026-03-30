import { useEffect, useRef, useState } from 'react';
import { PAYPAL_CLIENT_ID, PAYPAL_CURRENCY, loadPayPalSdk } from '@/services/paypal-service';

interface PayPalCheckoutButtonProps {
  amount: number;
  description: string;
  disabled?: boolean;
  onApproved: (result: { orderId: string; captureId?: string }) => void;
}

export function PayPalCheckoutButton({
  amount,
  description,
  disabled = false,
  onApproved,
}: PayPalCheckoutButtonProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!containerRef.current || disabled || !PAYPAL_CLIENT_ID) {
      return;
    }

    let cancelled = false;
    let buttons: PayPalButtonsComponent | null = null;

    setStatus('loading');
    setErrorMessage('');
    containerRef.current.innerHTML = '';

    loadPayPalSdk()
      .then((paypal) => {
        if (cancelled || !containerRef.current) {
          return;
        }

        buttons = paypal.Buttons({
          style: {
            layout: 'vertical',
            shape: 'rect',
            label: 'pay',
          },
          createOrder: async (_data, actions) =>
            actions.order.create({
              purchase_units: [
                {
                  description,
                  amount: {
                    currency_code: PAYPAL_CURRENCY,
                    value: amount.toFixed(2),
                  },
                },
              ],
            }),
          onApprove: async (data, actions) => {
            const capture = await actions.order.capture();
            const captureId = capture.purchase_units?.[0]?.payments?.captures?.[0]?.id;

            onApproved({
              orderId: data.orderID,
              captureId,
            });
          },
          onError: (error) => {
            console.error('PayPal checkout error', error);
            setStatus('error');
            setErrorMessage('PayPal could not start the checkout flow. Verify your client ID and app settings.');
          },
        });

        return buttons.render(containerRef.current).then(() => {
          if (!cancelled) {
            setStatus('ready');
          }
        });
      })
      .catch((error: Error) => {
        console.error(error);
        setStatus('error');
        setErrorMessage(error.message);
      });

    return () => {
      cancelled = true;
      buttons?.close?.();
    };
  }, [amount, description, disabled, onApproved]);

  if (!PAYPAL_CLIENT_ID) {
    return (
      <div className="paypal-state paypal-state-warning">
        Add <code>VITE_PAYPAL_CLIENT_ID</code> to enable PayPal checkout.
      </div>
    );
  }

  return (
    <div className="paypal-checkout">
      {status === 'loading' ? <p className="muted-small">Loading PayPal checkout...</p> : null}
      {status === 'error' ? <p className="paypal-state paypal-state-error">{errorMessage}</p> : null}
      <div ref={containerRef} />
    </div>
  );
}
