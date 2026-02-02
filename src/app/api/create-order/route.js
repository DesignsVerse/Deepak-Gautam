import { notifyPaymentInitiated } from '@/lib/telegram';

export async function POST(req) {
  const body = await req.json(); // ✅ Only do this ONCE
  const {orderId, amount, customer, products, address } = body;

  const customerId = customer?.id;
  const customerEmail = customer?.email;
  const customerPhone = customer?.phone;
  const customerName = customer?.name || 'Guest';

  try {
    // Build request body with only valid Cashfree fields (minimal required fields)
    const requestBody = {
      order_id: orderId,
      order_amount: amount,
      order_currency: 'INR',
      customer_details: {
        customer_id: customerId,
        customer_email: customerEmail,
        customer_phone: customerPhone,
      },
    };

    // Add notify_url if base URL is configured (optional but recommended for webhooks)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (baseUrl) {
      requestBody.notify_url = `${baseUrl}/api/payment-webhook`;
    }

    const response = await fetch('https://api.cashfree.com/pg/orders', {
      method: 'POST',
      headers: {
        'x-client-id': process.env.CASHFREE_CLIENT_ID,
        'x-client-secret': process.env.CASHFREE_CLIENT_SECRET,
        'Content-Type': 'application/json',
        'x-api-version': '2022-09-01',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log("Cashfree Response:", data);

    if (!data.payment_session_id) {
      return new Response(JSON.stringify({ error: 'Order token not received', data }), { status: 400 });
    }

    // Send Telegram notification when payment is initiated
    if (products && Array.isArray(products) && products.length > 0) {
      try {
        await notifyPaymentInitiated({
          orderId,
          customerName,
          customerEmail,
          customerPhone,
          amount,
          products: products.map(p => ({
            name: p.name,
            quantity: p.quantity || 1,
            price: p.price,
          })),
          address: address ? {
            address: address.address,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
          } : undefined,
        });
      } catch (telegramError) {
        console.error('Telegram notification error:', telegramError);
        // Don't fail the request if Telegram notification fails
      }
    }

    return new Response(JSON.stringify({ payment_session_id: data.payment_session_id }), { status: 200 });

  } catch (error) {
    console.error('Cashfree Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to create order' }), { status: 500 });
  }
}
