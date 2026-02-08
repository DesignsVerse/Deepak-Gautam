# Cashfree Payment Integration Fix & Implementation Guide

## Problem Summary

The error `{code: "order_create_failed", message: "invalid request received"}` occurs when the Cashfree API request contains invalid or unsupported fields.

## Root Causes

1. **Invalid field in `customer_details`**: Added `customer_name` which Cashfree doesn't accept
2. **Invalid `order_tags` format**: Included `undefined` values and unsupported structure
3. **Missing proper error handling**: Request body wasn't validated before sending

## Solution

### ✅ Correct Cashfree Order Creation Request

The **ONLY** valid fields for Cashfree order creation are:

```javascript
{
  order_id: string,           // Required: Unique order ID
  order_amount: number,       // Required: Order amount
  order_currency: string,      // Required: Currency code (e.g., "INR")
  customer_details: {         // Required: Customer information
    customer_id: string,       // Required: Unique customer ID
    customer_email: string,    // Required: Customer email
    customer_phone: string,     // Required: Customer phone (10 digits)
  },
  notify_url: string,         // Optional: Webhook URL for payment status
}
```

### ❌ Common Mistakes to Avoid

1. **Don't add `customer_name` to `customer_details`**
   ```javascript
   // ❌ WRONG
   customer_details: {
     customer_id: "...",
     customer_email: "...",
     customer_phone: "...",
     customer_name: "..."  // ❌ NOT SUPPORTED
   }
   ```

2. **Don't use `order_tags` unless you know it's supported**
   ```javascript
   // ❌ WRONG - May cause errors
   order_tags: {
     products: "...",
     customer_name: "...",
     address: undefined  // ❌ undefined values break JSON
   }
   ```

3. **Don't include undefined values in request body**
   ```javascript
   // ❌ WRONG
   {
     order_id: "...",
     order_amount: 100,
     order_tags: undefined  // ❌ Remove undefined fields
   }
   ```

## Complete Implementation

### 1. API Route: `/api/create-order/route.js`

```javascript
export async function POST(req) {
  const body = await req.json();
  const { orderId, amount, customer, products, address } = body;

  const customerId = customer?.id;
  const customerEmail = customer?.email;
  const customerPhone = customer?.phone;
  const customerName = customer?.name || 'Guest';

  try {
    // Build request body with ONLY valid Cashfree fields
    const requestBody = {
      order_id: orderId,
      order_amount: amount,
      order_currency: 'INR',
      customer_details: {
        customer_id: customerId,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        // ❌ DO NOT add customer_name here
      },
    };

    // Add notify_url ONLY if base URL is configured (optional)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (baseUrl) {
      requestBody.notify_url = `${baseUrl}/api/payment-webhook`;
    }

    // ❌ DO NOT add order_tags unless you verify it's supported in your Cashfree plan

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
      return new Response(
        JSON.stringify({ error: 'Order token not received', data }), 
        { status: 400 }
      );
    }

    // ✅ Send Telegram notification AFTER successful order creation
    // (This uses your own data, not Cashfree response)
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
        // Don't fail the request if Telegram fails
      }
    }

    return new Response(
      JSON.stringify({ payment_session_id: data.payment_session_id }), 
      { status: 200 }
    );

  } catch (error) {
    console.error('Cashfree Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create order' }), 
      { status: 500 }
    );
  }
}
```

### 2. Frontend: Payment Component

```javascript
'use client';
import { useState } from 'react';
import { loadCashfreeSDK } from '../utils/cashfreeClient';
import { toast } from 'react-hot-toast';

export default function CashfreePopup({ 
  orderId, 
  amount, 
  customer, 
  products = [], 
  address = null 
}) {
  const [loading, setLoading] = useState(false);

  const initiatePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          orderId, 
          amount, 
          customer,
          products,  // Pass products for Telegram notification
          address,   // Pass address for Telegram notification
        }),
      });
      
      const data = await res.json();

      if (!data.payment_session_id) {
        throw new Error(data.error || 'Order Token not received');
      }

      const Cashfree = await loadCashfreeSDK();
      const cashfree = new Cashfree(data.payment_session_id);

      // Redirect to Cashfree payment page
      cashfree.redirect();
      
    } catch (err) {
      console.error('Payment error:', err);
      toast.error(err.message || 'Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={initiatePayment}
      className="px-6 py-2 bg-[#800000] text-white rounded hover:bg-[#FF9933] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={loading}
    >
      {loading ? 'Processing...' : 'Pay Now'}
    </button>
  );
}
```

### 3. Cashfree SDK Loader: `utils/cashfreeClient.js`

```javascript
export const loadCashfreeSDK = () => {
  return new Promise((resolve, reject) => {
    if (window.Cashfree) return resolve(window.Cashfree);
    
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/ui/2.0.0/cashfree.prod.js";
    script.onload = () => resolve(window.Cashfree);
    script.onerror = reject;
    document.body.appendChild(script);
  });
};
```

## Environment Variables

Add these to your `.env.local`:

```env
# Cashfree Credentials (Required)
CASHFREE_CLIENT_ID=your_client_id_here
CASHFREE_CLIENT_SECRET=your_client_secret_here

# Base URL for Webhooks (Optional but recommended)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# Telegram Bot (Optional - for notifications)
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

## Testing Checklist

- [ ] Verify `CASHFREE_CLIENT_ID` and `CASHFREE_CLIENT_SECRET` are correct
- [ ] Ensure order amount is a valid number (not string)
- [ ] Customer email is in valid format
- [ ] Customer phone is exactly 10 digits
- [ ] Order ID is unique for each request
- [ ] No undefined values in request body
- [ ] No unsupported fields in `customer_details`
- [ ] Webhook URL is accessible (if using webhooks)

## Common Errors & Solutions

### Error: "invalid request received"
**Solution**: Remove all unsupported fields, especially `customer_name` in `customer_details`

### Error: "Order token not received"
**Solution**: 
- Check Cashfree credentials
- Verify request body format matches documentation
- Check Cashfree dashboard for API status

### Error: "Invalid customer details"
**Solution**:
- Ensure `customer_email` is valid email format
- Ensure `customer_phone` is exactly 10 digits
- Ensure `customer_id` is provided

## Webhook Implementation (Optional)

If you want to receive payment status updates:

### Webhook Endpoint: `/api/payment-webhook/route.js`

```javascript
export async function POST(req) {
  try {
    const webhookData = await req.json();
    console.log('Cashfree Webhook:', JSON.stringify(webhookData, null, 2));

    const eventType = webhookData.type;
    const data = webhookData.data || webhookData;

    // Process payment status
    if (eventType === 'PAYMENT_SUCCESS_WEBHOOK') {
      // Handle successful payment
      const orderId = data.order?.order_id;
      const paymentId = data.payment?.cf_payment_id;
      console.log(`Payment successful for order ${orderId}`);
    } else if (eventType === 'PAYMENT_FAILED_WEBHOOK') {
      // Handle failed payment
      console.log('Payment failed');
    }

    return new Response(
      JSON.stringify({ message: 'Webhook processed' }), 
      { status: 200 }
    );
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: 'Webhook processing failed' }), 
      { status: 200 } // Return 200 to prevent Cashfree retries
    );
  }
}
```

### Configure Webhook in Cashfree Dashboard

1. Go to Cashfree Dashboard → Settings → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/payment-webhook`
3. Select events: `PAYMENT_SUCCESS_WEBHOOK`, `PAYMENT_FAILED_WEBHOOK`

## Key Takeaways

1. ✅ **Only use supported fields** - Don't add extra fields to Cashfree API
2. ✅ **Remove undefined values** - Clean your request body before sending
3. ✅ **Validate data** - Ensure email, phone, amount are in correct format
4. ✅ **Handle errors** - Always check for `payment_session_id` in response
5. ✅ **Store metadata separately** - Use your own database/notifications for extra data

## Migration Steps for Existing Projects

1. **Remove invalid fields** from `customer_details`
2. **Remove `order_tags`** if causing issues
3. **Clean request body** - remove all undefined values
4. **Test with minimal request** first, then add optional fields
5. **Verify Cashfree API version** matches your implementation

## Support

If issues persist:
1. Check Cashfree API documentation for your specific API version
2. Verify your Cashfree account plan supports the features you're using
3. Test with Cashfree's API testing tools
4. Check Cashfree dashboard for any account restrictions

---

**Last Updated**: Based on Cashfree API v2022-09-01
**Tested On**: Next.js 15.1.11
