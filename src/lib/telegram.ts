// lib/telegram.ts
// Telegram Bot utility for sending notifications

interface OrderDetails {
  orderId: string;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  amount: number;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  address?: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
}

interface PaymentNotification {
  orderId: string;
  status: 'initiated' | 'success' | 'failed';
  customerName: string;
  amount: number;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  paymentId?: string;
  failureReason?: string;
}

/**
 * Send a message to Telegram
 */
async function sendTelegramMessage(message: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn('Telegram bot token or chat ID not configured');
    return false;
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    const data = await response.json();
    return data.ok === true;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return false;
  }
}

/**
 * Format order details for Telegram notification
 */
function formatOrderDetails(order: OrderDetails): string {
  const productsList = order.products
    .map(
      (p) =>
        `  • ${p.name} (Qty: ${p.quantity}) - ₹${(p.price * p.quantity).toFixed(2)}`
    )
    .join('\n');

  const totalAmount = order.products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  let message = `🛒 <b>New Order Initiated on Ujjain Kalsarp</b>\n\n`;
  message += `📋 <b>Order ID:</b> ${order.orderId}\n`;
  message += `👤 <b>Customer:</b> ${order.customerName}\n`;
  message += `📞 <b>Phone:</b> ${order.customerPhone}\n`;
  if (order.customerEmail) {
    message += `📧 <b>Email:</b> ${order.customerEmail}\n`;
  }
  message += `\n📦 <b>Products:</b>\n${productsList}\n`;
  message += `\n💰 <b>Total Amount:</b> ₹${totalAmount.toFixed(2)}\n`;

  if (order.address) {
    message += `\n📍 <b>Shipping Address:</b>\n`;
    message += `${order.address.address}\n`;
    message += `${order.address.city}, ${order.address.state} - ${order.address.pincode}\n`;
  }

  message += `\n⏰ <b>Time:</b> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  return message;
}

/**
 * Format payment status notification
 */
function formatPaymentNotification(payment: PaymentNotification): string {
  let emoji = '🔄';
  let statusText = 'Payment Initiated';
  
  if (payment.status === 'success') {
    emoji = '✅';
    statusText = 'Payment Successful';
  } else if (payment.status === 'failed') {
    emoji = '❌';
    statusText = 'Payment Failed';
  }

  const productsList = payment.products
    .map(
      (p) =>
        `  • ${p.name} (Qty: ${p.quantity}) - ₹${(p.price * p.quantity).toFixed(2)}`
    )
    .join('\n');

  let message = `${emoji} <b>${statusText}</b>\n\n`;
  message += `📋 <b>Order ID:</b> ${payment.orderId}\n`;
  message += `👤 <b>Customer:</b> ${payment.customerName}\n`;
  message += `💰 <b>Amount:</b> ₹${payment.amount.toFixed(2)}\n`;
  
  if (payment.paymentId) {
    message += `💳 <b>Payment ID:</b> ${payment.paymentId}\n`;
  }
  
  if (payment.status === 'failed' && payment.failureReason) {
    message += `\n⚠️ <b>Reason:</b> ${payment.failureReason}\n`;
  }
  
  message += `\n📦 <b>Products:</b>\n${productsList}\n`;
  message += `\n⏰ <b>Time:</b> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  return message;
}

/**
 * Send notification when payment is initiated
 */
export async function notifyPaymentInitiated(
  order: OrderDetails
): Promise<boolean> {
  const message = formatOrderDetails(order);
  return await sendTelegramMessage(message);
}

/**
 * Send notification when payment status changes
 */
export async function notifyPaymentStatus(
  payment: PaymentNotification
): Promise<boolean> {
  const message = formatPaymentNotification(payment);
  return await sendTelegramMessage(message);
}
