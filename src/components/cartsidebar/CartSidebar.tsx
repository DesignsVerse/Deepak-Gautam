"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "@/lib/CartContext";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  qualityType?: "nepali" | "indonesian";
  selectedSize?: string;
}

const CartSidebar = () => {
  const { isCartOpen, closeCart } = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCart = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const items = JSON.parse(storedCart);
        setCartItems(items);
        calculateTotal(items);
      } else {
        setCartItems([]);
        setTotal(0);
      }
    };

    updateCart();
    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !(event.target instanceof HTMLElement && event.target.closest("button, a"))
      ) {
        closeCart();
      }
    };

    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen, closeCart]);

  const calculateTotal = (items: CartItem[]) => {
    const sum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(sum);
  };

  const removeItem = (itemToRemove: CartItem) => {
    const updatedCart = cartItems.filter((item) => 
      !(item.id === itemToRemove.id && 
        item.qualityType === itemToRemove.qualityType &&
        item.selectedSize === itemToRemove.selectedSize)
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
    window.dispatchEvent(new Event("storage")); // Trigger storage event
  };

  const updateQuantity = (itemToUpdate: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item.id === itemToUpdate.id && 
      item.qualityType === itemToUpdate.qualityType &&
      item.selectedSize === itemToUpdate.selectedSize
        ? { ...item, quantity: newQuantity } 
        : item,
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
    window.dispatchEvent(new Event("storage")); // Trigger storage event
  };

  return (
    <div
      ref={sidebarRef}
      tabIndex={0}
      className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-[#800000]">Your Shopping Cart</h2>
          <button
            onClick={closeCart}
            className="text-gray-500 hover:text-[#800000]"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">Your cart is empty</p>
              <Link
                href="/product"
                onClick={closeCart}
                className="mt-4 inline-block bg-[#800000] text-white px-4 py-2 rounded hover:bg-[#FF9933] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex gap-4 border-b pb-4">
                  <div className="w-20 h-20 relative flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
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
                    <p className="text-[#800000] font-bold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item, item.quantity - 1)}
                        className="px-2 bg-gray-200 rounded-l hover:bg-gray-300 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-4 bg-gray-100">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                        className="px-2 bg-gray-200 rounded-r hover:bg-gray-300 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item)}
                        className="ml-auto text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Remove item"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between mb-4">
              <span className="font-bold">Total:</span>
              <span className="font-bold text-[#800000]">
                ₹{total.toFixed(2)}
              </span>
            </div>
            <div className="flex gap-2">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex-1 bg-[#800000] text-white text-center py-3 rounded hover:bg-[#FF9933] transition-colors"
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="flex-1 bg-gray-200 text-gray-800 text-center py-3 rounded hover:bg-gray-300 transition-colors"
              >
                View Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;