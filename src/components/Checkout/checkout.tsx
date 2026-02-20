"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import CashfreePopup from "@/app/cashfree-popup/components/CashfreePopup";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  qualityType?: "nepali" | "indonesian";
  selectedSize?: string;
}

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  address: z.string().min(10, "Address must be at least 10 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const generateOrderId = () => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const timeStr = now.getTime();
    return `ORD-${dateStr}-${timeStr}`;
  };
const order_id = generateOrderId()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      email: "",
    },
  });

  // Load form data from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("checkoutFormData");
      if (storedData) {
        reset(JSON.parse(storedData));
      }
    }
  }, [reset]);

  // Watch form values and save to localStorage on change
  const formValues = watch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("checkoutFormData", JSON.stringify(formValues));
    }
  }, [formValues]);

  useEffect(() => {
    const updateCart = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const items = JSON.parse(storedCart);
        setCartItems(items);
        setTotal(
          items.reduce(
            (sum: number, item: CartItem) => sum + item.price * item.quantity,
            0,
          ),
        );
      } else {
        setCartItems([]);
        setTotal(0);
      }
      setLoading(false);
    };

    updateCart();
    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  const shipping = cartItems.length > 0 ? 100 : 0;
  const grandTotal = total + shipping;

  const handleProceedToPayment = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    try {
      // Placeholder payment link (replace with actual payment gateway logic)
      const paymentLink = "";
      if (paymentLink) {
        toast.success("Redirecting to payment...");
        // Clear form data from localStorage on successful submission
        localStorage.removeItem("checkoutFormData");
        reset();
        window.location.href = paymentLink;
      } else {
        toast.error("");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-[#800000]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20 bg-[#FDF7F4] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#800000] mb-8 text-center">
          Checkout
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-600 mb-6 text-lg">Your cart is empty</p>
            <Link
              href="/product"
              className="inline-block bg-[#800000] text-white px-6 py-3 rounded-lg hover:bg-[#FF9933] transition-colors font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Shipping Details (Left) */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold text-[#800000] mb-6">
                Shipping Details
              </h2>
              <form
                id="checkout-form"
                onSubmit={handleSubmit(handleProceedToPayment)}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("name")}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000]/50 ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("phone")}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000]/50 ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("address")}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000]/50 ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                    rows={4}
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("city")}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000]/50 ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("state")}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000]/50 ${
                        errors.state ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.state && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("pincode")}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000]/50 ${
                        errors.pincode ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.pincode && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.pincode.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email (optional)
                    </label>
                    <input
                      {...register("email")}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000]/50 ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* Order Summary (Right) */}
            <div className="bg-white p-6 rounded-lg shadow sticky top-4">
              <h2 className="text-xl font-bold text-[#800000] mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-[#800000]">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>₹{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t text-base">
                    <span>Total</span>
                    <span className="text-[#800000]">
                      ₹{grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full bg-[#800000] text-white py-3 rounded-md font-medium hover:bg-[#FF9933] transition-colors flex items-center justify-center mt-6"
                aria-label="Proceed to payment"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin mr-2" size={20} />
                ) : null}
                <CashfreePopup
                  orderId={order_id}
                  amount={grandTotal}
                  customer={{
                    id: "guest",
                    email: formValues.email || "guest@example.com",
                    phone: formValues.phone || "9413466075",
                    name: formValues.name || "Guest",
                  }}
                  products={cartItems.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                  }))}
                  address={{
                    address: formValues.address,
                    city: formValues.city,
                    state: formValues.state,
                    pincode: formValues.pincode,
                  }}
                />
              </motion.button>
              <Link
                href="/cart"
                className="block mt-4 text-center text-[#800000] hover:underline text-sm"
              >
                ← Back to Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
