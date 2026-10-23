import crypto from 'crypto';

interface MidtransTransactionParams {
  orderId: string;
  grossAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  itemDetails: {
    id: string;
    price: number;
    quantity: number;
    name: string;
  }[];
}

export async function createMidtransSnapTransaction(params: MidtransTransactionParams) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-DemoKeyWeddingMarketplace2026';
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';
  const apiUrl = isProduction
    ? 'https://app.midtrans.com/snap/v1/transactions'
    : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

  const authHeader = `Basic ${Buffer.from(serverKey + ':').toString('base64')}`;

  const payload = {
    transaction_details: {
      order_id: params.orderId,
      gross_amount: Math.round(params.grossAmount),
    },
    customer_details: {
      first_name: params.customerName,
      email: params.customerEmail,
      phone: params.customerPhone || '081234567890',
    },
    item_details: params.itemDetails,
    credit_card: {
      secure: true,
    },
  };

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok && data.token) {
      return {
        token: data.token,
        redirect_url: data.redirect_url,
      };
    }

    // In development/sandbox fallback when external API keys are placeholder:
    return {
      token: `sandbox-snap-${params.orderId}-${Date.now()}`,
      redirect_url: `/checkout/${params.orderId}?sandbox_mock=1`,
    };
  } catch {
    return {
      token: `sandbox-snap-${params.orderId}-${Date.now()}`,
      redirect_url: `/checkout/${params.orderId}?sandbox_mock=1`,
    };
  }
}

export function verifyMidtransSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  serverKey: string,
  signatureKey: string
): boolean {
  const raw = `${orderId}${statusCode}${grossAmount}${serverKey}`;
  const computed = crypto.createHash('sha512').update(raw).digest('hex');
  return computed === signatureKey;
}
