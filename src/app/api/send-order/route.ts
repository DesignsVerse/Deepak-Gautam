import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

// Define the shape of the orderDetails object
interface OrderDetails {
  productId: string; // Keep this as string to match CheckoutForm.tsx
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email?: string;
  productName: string;
  selectedQuality: string;
  quantity: number;
  adjustedPrice: number;
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
}

// Define the shape of the request body
interface RequestBody {
  orderDetails: OrderDetails;
  emailTo: string;
}

export async function POST(req: NextRequest) {
  try {
    const { orderDetails, emailTo }: RequestBody = await req.json();

    // Format order details
    const orderMessage = `
      New Order Confirmation
      Order ID: #${orderDetails.productId}
      Date: ${new Date().toLocaleDateString()}
      ------------------------
      Customer: ${orderDetails.name}
      Address: ${orderDetails.address}, ${orderDetails.city}, ${orderDetails.state} - ${orderDetails.pincode}
      Phone: ${orderDetails.phone}
      ${orderDetails.email ? `Email: ${orderDetails.email}` : ''}
      ------------------------
      Item: ${orderDetails.productName}
      Quality: ${orderDetails.selectedQuality}
      Quantity: ${orderDetails.quantity}
      Price: ₹${orderDetails.adjustedPrice.toFixed(2)}
      ------------------------
      Subtotal: ₹${orderDetails.subtotal.toFixed(2)}
      Shipping: ₹${orderDetails.shipping.toFixed(2)}
      Total: ₹${orderDetails.total.toFixed(2)}
      Payment Method: ${orderDetails.paymentMethod.toUpperCase()}
      ------------------------
      From: xAI Store
      Support: support@xai.com
    `;

    // Send Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: emailTo,
      subject: `New Order Confirmation #${orderDetails.productId}`,
      text: orderMessage,
    });

    return NextResponse.json({ message: 'Order details sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending order details:', error);
    return NextResponse.json({ message: 'Failed to send order details' }, { status: 500 });
  }
}