const PAYPAL_SDK_URL = 'https://www.paypal.com/sdk/js';

export const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID?.trim() ?? '';
export const PAYPAL_CURRENCY = import.meta.env.VITE_PAYPAL_CURRENCY?.trim() || 'USD';
export const PAYPAL_INTENT = import.meta.env.VITE_PAYPAL_INTENT?.trim() || 'capture';

let sdkPromise: Promise<PayPalNamespace> | null = null;

function buildSdkUrl() {
  const params = new URLSearchParams({
    'client-id': PAYPAL_CLIENT_ID,
    currency: PAYPAL_CURRENCY,
    intent: PAYPAL_INTENT,
    components: 'buttons',
  });

  return `${PAYPAL_SDK_URL}?${params.toString()}`;
}

export async function loadPayPalSdk(): Promise<PayPalNamespace> {
  if (!PAYPAL_CLIENT_ID) {
    throw new Error('Missing VITE_PAYPAL_CLIENT_ID');
  }

  if (window.paypal) {
    return window.paypal;
  }

  if (!sdkPromise) {
    sdkPromise = new Promise<PayPalNamespace>((resolve, reject) => {
      const existingScript = document.querySelector<HTMLScriptElement>('script[data-paypal-sdk="true"]');
      if (existingScript) {
        existingScript.addEventListener('load', () => {
          if (window.paypal) {
            resolve(window.paypal);
            return;
          }

          reject(new Error('PayPal SDK loaded without window.paypal'));
        });
        existingScript.addEventListener('error', () => reject(new Error('Failed to load PayPal SDK')));
        return;
      }

      const script = document.createElement('script');
      script.src = buildSdkUrl();
      script.async = true;
      script.dataset.paypalSdk = 'true';
      script.onload = () => {
        if (window.paypal) {
          resolve(window.paypal);
          return;
        }

        reject(new Error('PayPal SDK loaded without window.paypal'));
      };
      script.onerror = () => reject(new Error('Failed to load PayPal SDK'));
      document.head.appendChild(script);
    });
  }

  return sdkPromise;
}
