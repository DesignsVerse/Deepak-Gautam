# Cashfree Payment Gateway Setup Guide

Complete step-by-step guide to integrate Cashfree payments in your Next.js project.

## Prerequisites

1. Cashfree merchant account (sign up at https://www.cashfree.com)
2. Next.js project (13+ with App Router)
3. Environment variables configured

## Step 1: Get Cashfree Credentials

1. Log in to [Cashfree Dashboard](https://merchant.cashfree.com)
2. Go to **Settings** → **API Keys**
3. Copy your:
   - **Client ID** (App ID)
   - **Client Secret** (Secret Key)
4. Note: Use **Test** credentials for development, **Production** for live

## Step 2: Install Dependencies

No additional packages needed! Cashfree uses their CDN SDK.

## Step 3: Environment Variables

Create/update `.env.local`:

```env
# Cashfree Credentials (Required)
CASHFREE_CLIENT_ID=your_client_id_here
CASHFREE_CLIENT_SECRET=your_client_secret_here

# Base URL for Webhooks (Optional but recommended)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

## Step 4: Create Cashfree SDK Loader

Create `src/app/cashfree-popup/utils/cashfreeClient.js`:

```javascript
export const loadCashfreeSDK = () => {
  return new Promise((resolve, reject) => {
    // Check if SDK already loaded
    if (window.Cashfree) return resolve(window.Cashfree);
    
    // Load SDK from CDN
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/ui/2.0.0/cashfree.prod.js";
    script.onload = () => resolve(window.Cashfree);
    script.onerror = reject;
    document.body.appendChild(script);
  });
};
```

## Step 5: Create Order API Route

Create `src/app/api/create-order/route.js`:

```javascript
export async function POST(req) {
  const body = await req.json();
  const { orderId, amount, customer } = body;

  try {
    // Build Cashfree order request
    const requestBody = {
      order_id: orderId,           // Unique order ID
      order_amount: amount,        // Order amount (number)
      order_currency: 'INR',       // Currency code
      customer_details: {
        customer_id: customer.id || 'guest',
        customer_email: customer.email,
        customer_phone: customer.phone, // Must be 10 digits
      },
    };

    // Optional: Add webhook URL for payment status
    if (process.env.NEXT_PUBLIC_BASE_URL) {
      requestBody.notify_url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment-webhook`;
    }

    // Create order in Cashfree
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

    if (!data.payment_session_id) {
      return new Response(
        JSON.stringify({ error: 'Order creation failed', data }), 
        { status: 400 }
      );
    }

    // Return payment session ID
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

## Step 6: Create Payment Component

Create `src/app/cashfree-popup/components/CashfreePopup.js`:

```javascript
'use client';
import { useState } from 'react';
import { loadCashfreeSDK } from '../utils/cashfreeClient';
import { toast } from 'react-hot-toast'; // or your toast library

export default function CashfreePopup({ orderId, amount, customer }) {
  const [loading, setLoading] = useState(false);

  const initiatePayment = async () => {
    setLoading(true);
    try {
      // Step 1: Create order in Cashfree
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          orderId, 
          amount, 
          customer 
        }),
      });
      
      const data = await res.json();

      if (!data.payment_session_id) {
        throw new Error(data.error || 'Failed to create order');
      }

      // Step 2: Load Cashfree SDK
      const Cashfree = await loadCashfreeSDK();
      
      // Step 3: Initialize and redirect to payment
      const cashfree = new Cashfree(data.payment_session_id);
      cashfree.redirect();

    } catch (err) {
      console.error('Payment error:', err);
      toast.error(err.message || 'Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={initiatePayment}
      disabled={loading}
      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? 'Processing...' : 'Pay Now'}
    </button>
  );
}
```

## Step 7: Use in Your Checkout Page

Example usage in `src/app/checkout/page.tsx`:

```javascript
'use client';
import { useState } from 'react';
import CashfreePopup from '@/app/cashfree-popup/components/CashfreePopup';

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Generate unique order ID
  const generateOrderId = () => {
    const timestamp = Date.now();
    return `ORD-${timestamp}`;
  };

  const orderId = generateOrderId();
  const amount = 1000; // Your order amount

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          placeholder="Phone (10 digits)"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full p-2 border rounded"
          maxLength={10}
        />
      </form>

      <div className="mt-6">
        <CashfreePopup
          orderId={orderId}
          amount={amount}
          customer={{
            id: 'guest',
            email: formData.email,
            phone: formData.phone,
            name: formData.name,
          }}
        />
      </div>
    </div>
  );
}
```

## Step 8: Webhook Setup (Optional but Recommended)

### Create Webhook Endpoint

Create `src/app/api/payment-webhook/route.js`:

```javascript
export async function POST(req) {
  try {
    const webhookData = await req.json();
    console.log('Cashfree Webhook:', JSON.stringify(webhookData, null, 2));

    const eventType = webhookData.type;
    const data = webhookData.data || webhookData;

    // Extract order and payment info
    const orderId = data.order?.order_id || data.order_id;
    const amount = data.order?.order_amount || data.order_amount;
    const paymentId = data.payment?.cf_payment_id || data.payment_id;
    const paymentStatus = data.payment?.payment_status;

    // Handle different event types
    if (eventType === 'PAYMENT_SUCCESS_WEBHOOK') {
      console.log(`✅ Payment successful for order ${orderId}`);
      // TODO: Update order status in database
      // TODO: Send confirmation email
      // TODO: Clear cart
    } else if (eventType === 'PAYMENT_FAILED_WEBHOOK') {
      console.log(`❌ Payment failed for order ${orderId}`);
      // TODO: Handle failed payment
    }

    // Always return 200 to acknowledge webhook
    return new Response(
      JSON.stringify({ message: 'Webhook processed' }), 
      { status: 200 }
    );

  } catch (error) {
    console.error('Webhook error:', error);
    // Still return 200 to prevent Cashfree retries
    return new Response(
      JSON.stringify({ error: 'Webhook processing failed' }), 
      { status: 200 }
    );
  }
}

// Handle GET for webhook verification
export async function GET(req) {
  return new Response(
    JSON.stringify({ message: 'Webhook endpoint is active' }), 
    { status: 200 }
  );
}
```

### Configure Webhook in Cashfree Dashboard

1. Go to **Cashfree Dashboard** → **Settings** → **Webhooks**
2. Click **Add Webhook**
3. Enter webhook URL: `https://yourdomain.com/api/payment-webhook`
4. Select events:
   - ✅ `PAYMENT_SUCCESS_WEBHOOK`
   - ✅ `PAYMENT_FAILED_WEBHOOK`
   - ✅ `PAYMENT_USER_DROPPED_WEBHOOK`
5. Click **Save**

## Step 9: Testing

### Test Mode

1. Use **Test** credentials from Cashfree dashboard
2. Use test card numbers:
   - **Success**: `4111 1111 1111 1111`
   - **Failure**: `4000 0000 0000 0002`
   - **CVV**: Any 3 digits
   - **Expiry**: Any future date

### Production Mode

1. Switch to **Production** credentials
2. Test with real payment methods
3. Monitor webhook events in Cashfree dashboard

## Important Notes

### Required Fields

- ✅ `order_id`: Must be unique for each order
- ✅ `order_amount`: Must be a number (not string)
- ✅ `customer_email`: Valid email format
- ✅ `customer_phone`: Exactly 10 digits (Indian numbers)

### Invalid Fields (Don't Use)

- ❌ `customer_name` in `customer_details` (not supported)
- ❌ `order_tags` (may cause errors, verify with Cashfree support)
- ❌ `undefined` values in request body

### Order ID Format

Generate unique order IDs:
```javascript
// Method 1: Timestamp
const orderId = `ORD-${Date.now()}`;

// Method 2: UUID
import { v4 as uuidv4 } from 'uuid';
const orderId = `ORD-${uuidv4()}`;

// Method 3: Date + Random
const orderId = `ORD-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.random().toString(36).substr(2, 9)}`;
```

## File Structure

```
your-project/
├── .env.local
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── create-order/
│   │   │   │   └── route.js
│   │   │   └── payment-webhook/
│   │   │       └── route.js
│   │   ├── cashfree-popup/
│   │   │   ├── components/
│   │   │   │   └── CashfreePopup.js
│   │   │   └── utils/
│   │   │       └── cashfreeClient.js
│   │   └── checkout/
│   │       └── page.tsx
```

## Troubleshooting

### Error: "invalid request received"
- ✅ Check all required fields are present
- ✅ Ensure no invalid fields (like `customer_name`)
- ✅ Verify amount is a number, not string
- ✅ Check phone is exactly 10 digits

### Error: "Order token not received"
- ✅ Verify Cashfree credentials are correct
- ✅ Check API version matches (`2022-09-01`)
- ✅ Ensure request body format is correct
- ✅ Check Cashfree dashboard for account status

### Payment page not loading
- ✅ Check browser console for SDK loading errors
- ✅ Verify `payment_session_id` is received
- ✅ Check Cashfree SDK URL is accessible
- ✅ Ensure no CORS issues

### Webhook not receiving events
- ✅ Verify webhook URL is publicly accessible
- ✅ Check webhook is configured in Cashfree dashboard
- ✅ Ensure webhook returns 200 status
- ✅ Test webhook URL manually with GET request

## API Reference

### Cashfree Order Creation Endpoint

**URL**: `https://api.cashfree.com/pg/orders`

**Method**: `POST`

**Headers**:
```
x-client-id: your_client_id
x-client-secret: your_client_secret
Content-Type: application/json
x-api-version: 2022-09-01
```

**Request Body**:
```json
{
  "order_id": "ORD-1234567890",
  "order_amount": 1000,
  "order_currency": "INR",
  "customer_details": {
    "customer_id": "customer_123",
    "customer_email": "customer@example.com",
    "customer_phone": "9876543210"
  },
  "notify_url": "https://yourdomain.com/api/payment-webhook"
}
```

**Response**:
```json
{
  "payment_session_id": "session_abc123xyz",
  "order_id": "ORD-1234567890",
  "order_token": "token_xyz789abc"
}
```

## Support Resources

- **Cashfree Documentation**: https://docs.cashfree.com
- **Cashfree Dashboard**: https://merchant.cashfree.com
- **API Status**: Check Cashfree status page
- **Support**: Contact Cashfree support through dashboard

## Next Steps

1. ✅ Set up environment variables
2. ✅ Create API routes
3. ✅ Create payment component
4. ✅ Test in test mode
5. ✅ Configure webhooks
6. ✅ Switch to production credentials
7. ✅ Test with real payments
8. ✅ Monitor webhook events

---

**Last Updated**: Based on Cashfree API v2022-09-01
**Compatible With**: Next.js 13+ (App Router)
