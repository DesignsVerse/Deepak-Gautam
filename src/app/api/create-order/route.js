export async function POST(req) {
  const body = await req.json(); // ✅ Only do this ONCE
  const {orderId, amount, customer } = body;

  const customerId = customer?.id;
  const customerEmail = customer?.email;
  const customerPhone = customer?.phone;



  try {
    const response = await fetch('https://api.cashfree.com/pg/orders', {
      method: 'POST',
      headers: {
        'x-client-id': process.env.CASHFREE_CLIENT_ID,
        'x-client-secret': process.env.CASHFREE_CLIENT_SECRET,
        'Content-Type': 'application/json',
        'x-api-version': '2022-09-01',
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: amount,
        order_currency: 'INR',
        customer_details: {
          customer_id: customerId,
          customer_email: customerEmail,
          customer_phone: customerPhone,
        },

      }),
    });

    const data = await response.json();
    console.log("Cashfree Response:", data);

    if (!data.payment_session_id) {
      return new Response(JSON.stringify({ error: 'Order token not received', data }), { status: 400 });
    }

    return new Response(JSON.stringify({ payment_session_id: data.payment_session_id }), { status: 200 });

  } catch (error) {
    console.error('Cashfree Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to create order' }), { status: 500 });
  }
}
