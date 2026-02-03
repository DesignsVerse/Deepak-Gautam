# Vercel Edge Requests Explosion Fix (100k+ Requests)

## 🔴 Critical Issues Found

### 1. **Missing `/api/click` Route** ⚠️ CRITICAL
- **Problem**: Components call `/api/click` but route doesn't exist
- **Impact**: Every click generates a 404, which Vercel counts as edge requests
- **Files Affected**: 
  - `src/components/puja/main.tsx` (line 254)
  - `src/components/MangalDosh/main.tsx` (line 254)

### 2. **Webhook GET Endpoint Exposed** ⚠️ CRITICAL
- **Problem**: `/api/payment-webhook` has a GET handler that returns 200
- **Impact**: Bots/crawlers hit this endpoint repeatedly, generating thousands of requests
- **Location**: `src/app/api/payment-webhook/route.js` (line 100-105)

### 3. **No Webhook Deduplication** ⚠️ HIGH
- **Problem**: Same webhook event processed multiple times
- **Impact**: Cashfree retries + duplicate processing = excessive requests

### 4. **No Rate Limiting** ⚠️ HIGH
- **Problem**: No protection against bot traffic or abuse
- **Impact**: Unlimited requests from single IP

## 🛠️ Fixes

### Fix 1: Create Missing `/api/click` Route

Create `src/app/api/click/route.js`:

```javascript
export async function POST(req) {
  try {
    const body = await req.json();
    const { timestamp, button } = body;

    // Log click (optional - you can remove this if not needed)
    console.log('Click tracked:', { timestamp, button });

    // Return success immediately (no processing needed)
    return new Response(
      JSON.stringify({ success: true }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    // Always return 200 to prevent retries
    return new Response(
      JSON.stringify({ success: false }), 
      { status: 200 }
    );
  }
}

// Reject GET requests
export async function GET() {
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }), 
    { status: 405 }
  );
}
```

### Fix 2: Secure Webhook GET Endpoint

Update `src/app/api/payment-webhook/route.js`:

```javascript
// Handle GET requests (for webhook verification)
export async function GET(req) {
  // Only allow from Cashfree IPs or with secret token
  const authHeader = req.headers.get('authorization');
  const secretToken = process.env.WEBHOOK_SECRET_TOKEN;
  
  // If secret token is set, require it
  if (secretToken && authHeader !== `Bearer ${secretToken}`) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }), 
      { status: 401 }
    );
  }

  // Return minimal response for verification only
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
```

**Better Solution**: Remove GET handler entirely if not needed:

```javascript
// Remove the GET handler completely if Cashfree doesn't need it
// export async function GET(req) { ... } // DELETE THIS
```

### Fix 3: Add Webhook Deduplication

Update `src/app/api/payment-webhook/route.js` POST handler:

```javascript
// Add at the top of the file
const processedWebhooks = new Map(); // In-memory cache (use Redis in production)

export async function POST(req) {
  try {
    const webhookData = await req.json();
    
    // Extract unique identifier for deduplication
    const webhookId = webhookData.data?.payment?.cf_payment_id || 
                     webhookData.payment_id || 
                     `${webhookData.data?.order?.order_id}-${Date.now()}`;
    
    // Check if already processed (within last 5 minutes)
    const cacheKey = `webhook-${webhookId}`;
    if (processedWebhooks.has(cacheKey)) {
      console.log('Duplicate webhook ignored:', webhookId);
      return new Response(
        JSON.stringify({ message: 'Already processed' }), 
        { status: 200 }
      );
    }

    // Mark as processed (expire after 5 minutes)
    processedWebhooks.set(cacheKey, true);
    setTimeout(() => processedWebhooks.delete(cacheKey), 5 * 60 * 1000);

    // ... rest of your webhook processing code ...
    
    const eventType = webhookData.type || webhookData.eventType;
    // ... continue with existing code ...
    
  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response(
      JSON.stringify({ error: 'Webhook processing failed' }), 
      { status: 200 }
    );
  }
}
```

### Fix 4: Add Rate Limiting

Create `src/lib/rateLimit.js`:

```javascript
// Simple in-memory rate limiter (use Redis/Vercel KV for production)
const rateLimitMap = new Map();

export function rateLimit(identifier, maxRequests = 100, windowMs = 60000) {
  const now = Date.now();
  const key = identifier;
  
  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  const record = rateLimitMap.get(key);
  
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: maxRequests - record.count };
}
```

Update webhook route:

```javascript
import { rateLimit } from '@/lib/rateLimit';

export async function POST(req) {
  // Rate limit by IP
  const ip = req.headers.get('x-forwarded-for') || 
             req.headers.get('x-real-ip') || 
             'unknown';
  
  const limit = rateLimit(ip, 50, 60000); // 50 requests per minute per IP
  
  if (!limit.allowed) {
    return new Response(
      JSON.stringify({ error: 'Rate limit exceeded' }), 
      { status: 429 }
    );
  }

  // ... rest of webhook code ...
}
```

### Fix 5: Optimize useEffect in Checkout

Update `src/components/Checkout/checkout.tsx`:

```javascript
// Replace the formValues useEffect with debounced version
import { useDebouncedCallback } from 'use-debounce'; // npm install use-debounce

// Replace lines 76-81 with:
const formValues = watch();
const debouncedSave = useDebouncedCallback((values) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("checkoutFormData", JSON.stringify(values));
  }
}, 500); // Only save after 500ms of no changes

useEffect(() => {
  debouncedSave(formValues);
}, [formValues, debouncedSave]);
```

## 🚀 Quick Fix (Immediate Actions)

### Priority 1: Create Missing Route
```bash
# Create the file immediately
touch src/app/api/click/route.js
# Then add the code from Fix 1 above
```

### Priority 2: Remove/Protect Webhook GET
```javascript
// In src/app/api/payment-webhook/route.js
// Either DELETE the GET handler OR add authentication
```

### Priority 3: Add Basic Deduplication
```javascript
// Add simple deduplication to webhook POST handler
```

## 📊 Monitoring

### Check Vercel Analytics
1. Go to Vercel Dashboard → Analytics
2. Check which routes are getting most requests
3. Look for patterns (specific IPs, user agents, etc.)

### Add Logging
```javascript
// Add to webhook route
console.log('Webhook request:', {
  ip: req.headers.get('x-forwarded-for'),
  userAgent: req.headers.get('user-agent'),
  timestamp: new Date().toISOString(),
  eventType: webhookData.type
});
```

## 🔍 Root Cause Analysis

Most likely causes of 100k+ requests:

1. **Bots hitting webhook GET endpoint** (40-50%)
2. **Missing /api/click causing 404s** (30-40%)
3. **Cashfree webhook retries** (10-20%)
4. **No rate limiting** (5-10%)

## ✅ Verification Steps

After applying fixes:

1. ✅ Check Vercel Analytics - requests should drop significantly
2. ✅ Monitor webhook logs - should see deduplication working
3. ✅ Test /api/click route - should return 200, not 404
4. ✅ Check webhook GET - should be protected or removed
5. ✅ Monitor for 24 hours - verify request count normalized

## 🎯 Expected Results

- **Before**: 100k+ edge requests/day
- **After**: Should drop to <10k requests/day (normal traffic)

## 📝 Additional Recommendations

### For Production:

1. **Use Vercel KV or Redis** for rate limiting and deduplication
2. **Add Vercel Edge Middleware** for global rate limiting
3. **Monitor with Sentry** or similar for error tracking
4. **Set up Vercel Analytics** alerts for unusual traffic
5. **Use Cloudflare** in front of Vercel for additional protection

### Vercel Edge Middleware Example:

Create `middleware.js` in root:

```javascript
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Rate limit webhook endpoint
  if (request.nextUrl.pathname === '/api/payment-webhook') {
    // Add rate limiting logic here
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
```

---

**Apply these fixes immediately to stop the request explosion!**
