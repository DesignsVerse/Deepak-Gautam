'use client';
import { useEffect, useState } from 'react';
import { loadCashfreeSDK } from '../utils/cashfreeClient';

export default function CashfreePopup({ orderId, amount, customer }) {
  const [loading, setLoading] = useState(false);

  const initiatePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, amount, customer }),
      });
      const data = await res.json();

      if (!data.payment_session_id) throw new Error('Order Token not received');

      const Cashfree = await loadCashfreeSDK();
      const cashfree = new Cashfree(data.payment_session_id);

      cashfree.redirect(); // launches popup
    } catch (err) {
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={initiatePayment}
      className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
      disabled={loading}
    >
      {loading ? 'Processing...' : 'Pay with Cashfree'}
    </button>
  );
}
