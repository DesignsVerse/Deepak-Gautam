// app/api/payment-webhook/route.js
// Cashfree webhook endpoint for payment status updates
import { notifyPaymentStatus } from '@/lib/telegram';

// Simple in-memory deduplication (use Redis/Vercel KV in production)
const processedWebhooks = new Map();

export async function POST(req) {
  try {
    const webhookData = await req.json();
    
    // Extract unique identifier for deduplication
    const paymentId = webhookData.data?.payment?.cf_payment_id || 
                     webhookData.data?.payment?.payment_id ||
                     webhookData.payment_id;
    const orderId = webhookData.data?.order?.order_id || webhookData.order_id;
    const eventType = webhookData.type || webhookData.eventType;
    
    // Create unique key for this webhook event
    const webhookKey = `${orderId}-${paymentId}-${eventType}`;
    
    // Check if already processed (within last 5 minutes)
    if (processedWebhooks.has(webhookKey)) {
      console.log('Duplicate webhook ignored:', webhookKey);
      return new Response(
        JSON.stringify({ message: 'Already processed' }), 
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Mark as processed (expire after 5 minutes)
    processedWebhooks.set(webhookKey, true);
    setTimeout(() => processedWebhooks.delete(webhookKey), 5 * 60 * 1000);
    
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
// SECURITY: Only allow with secret token to prevent bot crawling
export async function GET(req) {
  const authHeader = req.headers.get('authorization');
  const secretToken = process.env.WEBHOOK_SECRET_TOKEN;
  
  // If secret token is configured, require it
  if (secretToken && authHeader !== `Bearer ${secretToken}`) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }), 
      { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  // Return minimal response
  return new Response(
    JSON.stringify({ status: 'active' }), 
    { 
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      }
    }
  );
}
