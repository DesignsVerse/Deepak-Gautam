# Quick Fix Summary: Cashfree Payment Error

## The Error
```
{code: "order_create_failed", message: "invalid request received"}
```

## The Problem
Added invalid fields to Cashfree API request:
- ❌ `customer_name` in `customer_details` (not supported)
- ❌ `order_tags` with undefined values (causes JSON errors)

## The Fix

### Before (❌ Broken)
```javascript
{
  order_id: orderId,
  order_amount: amount,
  customer_details: {
    customer_id: customerId,
    customer_email: customerEmail,
    customer_phone: customerPhone,
    customer_name: customerName,  // ❌ REMOVE THIS
  },
  order_tags: {                    // ❌ REMOVE THIS
    products: "...",
    address: undefined             // ❌ undefined breaks JSON
  }
}
```

### After (✅ Working)
```javascript
{
  order_id: orderId,
  order_amount: amount,
  order_currency: 'INR',
  customer_details: {
    customer_id: customerId,
    customer_email: customerEmail,
    customer_phone: customerPhone,
    // ✅ Only these 3 fields are valid
  },
  notify_url: 'https://yourdomain.com/api/payment-webhook'  // Optional
}
```

## What Changed

1. **Removed `customer_name`** from `customer_details`
2. **Removed `order_tags`** completely
3. **Cleaned request body** - no undefined values
4. **Kept only valid Cashfree fields**

## Valid Cashfree Fields Only

```javascript
{
  order_id: string,        // Required
  order_amount: number,    // Required
  order_currency: string,  // Required (e.g., "INR")
  customer_details: {      // Required
    customer_id: string,   // Required
    customer_email: string,// Required
    customer_phone: string,// Required (10 digits)
  },
  notify_url: string       // Optional
}
```

## Copy-Paste Fix

Replace your order creation code with:

```javascript
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

// Optional: Add webhook URL
if (process.env.NEXT_PUBLIC_BASE_URL) {
  requestBody.notify_url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment-webhook`;
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
```

## That's It!

The payment should work now. For full documentation, see `CASHFREE_PAYMENT_FIX.md`.
