'use client';
import { useEffect, useState } from 'react';
import { loadCashfreeSDK } from '../utils/cashfreeClient';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function CashfreePopup({ orderId, amount, customer, products = [], address = null }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Handle payment callback from Cashfree
    const handlePaymentCallback = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const orderId = urlParams.get('order_id');
      const orderToken = urlParams.get('order_token');
      const paymentStatus = urlParams.get('payment_status');

      if (orderId && orderToken) {
        if (paymentStatus === 'SUCCESS') {
          toast.success('Payment successful! Your order has been placed.');
          // Clear cart after successful payment
          if (typeof window !== 'undefined') {
            localStorage.removeItem('cart');
            localStorage.removeItem('checkoutFormData');
            window.dispatchEvent(new Event('storage'));
          }
          // Redirect to success page or home
          setTimeout(() => {
            router.push('/?payment=success');
          }, 2000);
        } else if (paymentStatus === 'FAILED') {
          toast.error('Payment failed. Please try again.');
        } else if (paymentStatus === 'USER_DROPPED') {
          toast.error('Payment was cancelled.');
        }
      }
    };

    // Check if we're returning from payment
    if (typeof window !== 'undefined') {
      handlePaymentCallback();
    }
  }, [router]);

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
          products,
          address,
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
