// app/cart/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  qualityType?: "nepali" | "indonesian";
  selectedSize?: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart items from localStorage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const items = JSON.parse(storedCart);
      setCartItems(items);
      calculateTotal(items);
    }
    setLoading(false);
  }, []);

  const calculateTotal = (items: CartItem[]) => {
    const sum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(sum);
  };

  const removeItem = (itemToRemove: CartItem) => {
    const updatedCart = cartItems.filter(item => 
      !(item.id === itemToRemove.id && 
        item.qualityType === itemToRemove.qualityType &&
        item.selectedSize === itemToRemove.selectedSize)
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
    // Notify other components about cart change
    window.dispatchEvent(new Event("storage"));
  };

  const updateQuantity = (itemToUpdate: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === itemToUpdate.id && 
      item.qualityType === itemToUpdate.qualityType &&
      item.selectedSize === itemToUpdate.selectedSize
        ? { ...item, quantity: newQuantity } 
        : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
    // Notify other components about cart change
    window.dispatchEvent(new Event("storage"));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#800000]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20 bg-[#FDF7F4] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#800000] mb-8 text-center">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
            <Link
              href="/product"
              className="inline-block bg-[#800000] text-white px-6 py-3 rounded-lg hover:bg-[#FF9933] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Cart Items Table */}
            <div className="divide-y divide-gray-200">
              {/* Table Headers (Desktop) */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50">
                <div className="col-span-5 font-medium text-gray-700">Product</div>
                <div className="col-span-2 font-medium text-gray-700 text-center">Price</div>
                <div className="col-span-3 font-medium text-gray-700 text-center">Quantity</div>
                <div className="col-span-2 font-medium text-gray-700 text-right">Subtotal</div>
              </div>

              {/* Cart Items */}
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center">
                  {/* Product Info */}
                  <div className="col-span-5 flex items-center space-x-4">
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      {item.qualityType && (
                        <p className="text-xs text-gray-500 capitalize">
                          Quality: {item.qualityType}
                        </p>
                      )}
                      {item.selectedSize && !item.qualityType && (
                        <p className="text-xs text-gray-500">
                          {item.selectedSize}
                        </p>
                      )}
                      <button 
                        onClick={() => removeItem(item)}
                        className="mt-1 text-sm text-red-500 hover:text-red-700 flex items-center md:hidden"
                      >
                        <X size={16} className="mr-1" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-center">
                    <span className="md:hidden text-sm text-gray-500">Price: </span>
                    <span className="text-[#800000] font-medium">₹{item.price.toFixed(2)}</span>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-3">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="md:hidden text-sm text-gray-500">Qty: </span>
                      <button
                        onClick={() => updateQuantity(item, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal and Remove (Desktop) */}
                  <div className="col-span-2 flex items-center justify-end space-x-4">
                    <div className="text-right">
                      <span className="md:hidden text-sm text-gray-500">Subtotal: </span>
                      <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={() => removeItem(item)}
                      className="hidden md:block text-red-500 hover:text-red-700"
                      title="Remove item"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="p-6 border-t">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Cart Total</h3>
                <span className="text-xl font-bold text-[#800000]">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/product"
                  className="flex-1 text-center bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Continue Shopping
                </Link>
                <Link
                  href="/checkout"
                  className="flex-1 text-center bg-[#800000] text-white px-6 py-3 rounded-lg hover:bg-[#FF9933] transition-colors"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}