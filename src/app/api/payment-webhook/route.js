// app/api/payment-webhook/route.js
// Cashfree webhook endpoint for payment status updates
import { notifyPaymentStatus } from '@/lib/telegram';

export async function POST(req) {
  try {
    const webhookData = await req.json();
    
    console.log('Cashfree Webhook Received:', JSON.stringify(webhookData, null, 2));

    // Cashfree webhook structure can vary, handle both formats
    const eventType = webhookData.type || webhookData.eventType;
    const data = webhookData.data || webhookData;

    // Extract order information
    const order = data.order || data;
    const orderId = order.order_id || order.orderId;
    const amount = order.order_amount || order.orderAmount || 0;
    
    // Extract payment information
    const payment = data.payment || {};
    const paymentId = payment.payment_id || payment.paymentId || payment.cf_payment_id || payment.cfPaymentId;
    const paymentStatus = payment.payment_status || payment.paymentStatus;
    const paymentMessage = payment.payment_message || payment.paymentMessage || payment.failure_reason || payment.failureReason;

    // Extract customer information
    const customerDetails = data.customer_details || data.customerDetails || {};
    const customerName = customerDetails.customer_name || customerDetails.customerName || customerDetails.name || 'Unknown';
    const customerEmail = customerDetails.customer_email || customerDetails.customerEmail || customerDetails.email;
    const customerPhone = customerDetails.customer_phone || customerDetails.customerPhone || customerDetails.phone;

    // Only process payment status events
    if (!eventType || (
      eventType !== 'PAYMENT_SUCCESS_WEBHOOK' && 
      eventType !== 'PAYMENT_FAILED_WEBHOOK' && 
      eventType !== 'PAYMENT_USER_DROPPED_WEBHOOK' &&
      eventType !== 'PAYMENT_SUCCESS' &&
      eventType !== 'PAYMENT_FAILED'
    )) {
      console.log('Event type not processed:', eventType);
      return new Response(JSON.stringify({ message: 'Event type not processed' }), { status: 200 });
    }

    // Determine payment status
    let status = 'failed';
    if (eventType === 'PAYMENT_SUCCESS_WEBHOOK' || eventType === 'PAYMENT_SUCCESS') {
      status = 'success';
    } else if (eventType === 'PAYMENT_FAILED_WEBHOOK' || eventType === 'PAYMENT_FAILED' || eventType === 'PAYMENT_USER_DROPPED_WEBHOOK') {
      status = 'failed';
    }

    // Try to get products from webhook data or use default
    let products = [{ name: 'Order Items', quantity: 1, price: parseFloat(amount) }];
    if (order.order_tags && order.order_tags.products) {
      try {
        const parsedProducts = typeof order.order_tags.products === 'string' 
          ? JSON.parse(order.order_tags.products)
          : order.order_tags.products;
        if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
          products = parsedProducts;
        }
      } catch (e) {
        console.error('Error parsing products from webhook:', e);
      }
    }

    // Send Telegram notification
    try {
      await notifyPaymentStatus({
        orderId: orderId || 'Unknown',
        status,
        customerName,
        amount: parseFloat(amount),
        products,
        paymentId,
        failureReason: status === 'failed' ? paymentMessage : undefined,
      });
    } catch (telegramError) {
      console.error('Telegram notification error:', telegramError);
      // Don't fail the webhook if Telegram notification fails
    }

    // Return success to Cashfree
    return new Response(JSON.stringify({ message: 'Webhook processed successfully' }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    // Still return 200 to Cashfree to prevent retries for malformed requests
    return new Response(JSON.stringify({ error: 'Webhook processing failed' }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Handle GET requests (for webhook verification)
export async function GET(req) {
  return new Response(JSON.stringify({ message: 'Webhook endpoint is active' }), { 
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
