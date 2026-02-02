# Telegram Bot Setup Guide

This guide explains how to set up Telegram notifications for payment events.

## Prerequisites

1. A Telegram account
2. A Telegram Bot Token (from BotFather)

## Step 1: Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Start a chat and send `/newbot`
3. Follow the instructions to name your bot
4. BotFather will give you a **Bot Token** (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)
5. Save this token securely

## Step 2: Get Your Chat ID

1. Search for `@userinfobot` on Telegram
2. Start a chat - it will show your Chat ID (a number like `123456789`)
3. Alternatively, you can:
   - Create a group and add your bot
   - Send a message in the group
   - Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Look for `"chat":{"id":-123456789}` in the response

## Step 3: Configure Environment Variables

Add these to your `.env.local` file (or your deployment environment):

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here

# Cashfree Configuration (if not already set)
CASHFREE_CLIENT_ID=your_cashfree_client_id
CASHFREE_CLIENT_SECRET=your_cashfree_client_secret

# Base URL for webhooks (required for production)
NEXT_PUBLIC_BASE_URL=https://www.ujjainkalsarp.com
```

## Step 4: Configure Cashfree Webhook

1. Log in to your Cashfree Dashboard
2. Go to **Settings** → **Webhooks**
3. Add a new webhook with the URL:
   ```
   https://www.ujjainkalsarp.com/api/payment-webhook
   ```
4. Select the following events:
   - `PAYMENT_SUCCESS_WEBHOOK`
   - `PAYMENT_FAILED_WEBHOOK`
   - `PAYMENT_USER_DROPPED_WEBHOOK`

## Step 5: Test the Integration

1. Make a test order on your website
2. You should receive a Telegram notification when:
   - Payment is initiated (with order details)
   - Payment succeeds (with payment confirmation)
   - Payment fails (with failure reason)

## Notification Format

### Payment Initiated
```
🛒 New Order Initiated

📋 Order ID: ORD-20240101-1234567890
👤 Customer: John Doe
📞 Phone: 9876543210
📧 Email: john@example.com

📦 Products:
  • Product Name (Qty: 2) - ₹500.00

💰 Total Amount: ₹500.00

📍 Shipping Address:
123 Main Street
Mumbai, Maharashtra - 400001

⏰ Time: 01/01/2024, 12:00:00 PM
```

### Payment Success
```
✅ Payment Successful

📋 Order ID: ORD-20240101-1234567890
👤 Customer: John Doe
💰 Amount: ₹500.00
💳 Payment ID: pay_1234567890

📦 Products:
  • Product Name (Qty: 2) - ₹500.00

⏰ Time: 01/01/2024, 12:05:00 PM
```

### Payment Failed
```
❌ Payment Failed

📋 Order ID: ORD-20240101-1234567890
👤 Customer: John Doe
💰 Amount: ₹500.00

⚠️ Reason: Insufficient funds

📦 Products:
  • Product Name (Qty: 2) - ₹500.00

⏰ Time: 01/01/2024, 12:05:00 PM
```

## Troubleshooting

### Not receiving notifications?

1. **Check environment variables**: Ensure `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are set correctly
2. **Check bot permissions**: Make sure your bot can send messages to your chat
3. **Check webhook URL**: Verify the webhook URL is accessible and returns 200 status
4. **Check logs**: Look for errors in your server logs or console

### Webhook not working?

1. **Verify webhook URL**: Test with `curl` or Postman
2. **Check Cashfree dashboard**: Ensure webhook is configured and active
3. **Check server logs**: Look for webhook processing errors
4. **Test locally**: Use ngrok or similar tool to expose local server for testing

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your bot token secure
- Use environment variables in production
- Consider rate limiting for webhook endpoints
