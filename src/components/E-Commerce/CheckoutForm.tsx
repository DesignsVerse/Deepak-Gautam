"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Wallet, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
}

interface CheckoutFormProps {
  product: Product;
  quantity: number;
  selectedQuality: string;
  priceAdjustment: number;
  isOpen: boolean;
  onClose: () => void;
}

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  address: z.string().min(10, "Address must be at least 10 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  paymentMethod: z.enum(["cod", "card", "upi", "paypal"], {
    errorMap: () => ({ message: "Please select a payment method" }),
  }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutForm({
  product,
  quantity,
  selectedQuality,
  priceAdjustment,
  isOpen,
  onClose,
}: CheckoutFormProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    trigger,
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
      paymentMethod: undefined,
    },
  });

  const paymentMethod = watch("paymentMethod");
  const adjustedPrice = product.price + priceAdjustment;
  const subtotal = adjustedPrice * quantity;
  const shipping = 100;
  const total = subtotal + shipping;

  useEffect(() => {
    if (!isOpen) {
      reset();
      setStep(1);
      setOrderDetails(null);
    }
  }, [isOpen, reset]);

  const handleNext = useCallback(async () => {
    const isValid = await trigger([
      "name",
      "address",
      "city",
      "state",
      "pincode",
      "phone",
      "email",
    ]);
    if (!isValid) {
      toast.error("Please fill all required fields correctly!");
      return;
    }
    setStep(2);
  }, [trigger]);

  const handleOrderPreview = async (data: CheckoutFormData) => {
    const orderData = {
      ...data,
      productName: product.name,
      productId: product.id,
      quantity,
      selectedQuality,
      adjustedPrice,
      subtotal,
      shipping,
      total,
    };
    setOrderDetails(orderData);
    setStep(3);
  };

  const handleConfirmOrder = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Rudrak's Order Details:", orderDetails);
      toast.success("Order placed successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && !isLoading) onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-60 flex items-start md:items-center justify-center z-50 p-2 sm:p-4 md:p-0 overflow-y-auto"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white rounded-xl w-full max-w-md sm:max-w-lg md:max-w-4xl relative shadow-2xl flex flex-col overflow-hidden max-h-[95vh] my-4 md:my-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Order Summary - Collapsible on Mobile */}
        <div className="w-full bg-gray-50 p-4 sm:p-6 border-b border-gray-200">
          <h2 id="checkout-title" className="text-base sm:text-lg font-semibold text-maroon mb-3">
            Order Summary
          </h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Image
                src={product.image || "/placeholder-image.jpg"}
                alt={product.name}
                width={48}
                height={48}
                className="object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium line-clamp-2 text-xs sm:text-sm">{product.name}</h3>
                <p className="text-xs text-gray-600">Quality: {selectedQuality}</p>
                <p className="text-xs text-gray-600">Qty: {quantity}</p>
              </div>
            </div>
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-1 border-t">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form Area */}
        <div className="w-full p-4 sm:p-6 overflow-y-auto relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-maroon rounded"
            aria-label="Close checkout"
            disabled={isLoading}
          >
            <X size={18} />
          </button>

          {/* Progress Steps */}
          <div className="flex justify-around mb-4 sm:mb-6">
            {[
              { num: 1, label: "Shipping" },
              { num: 2, label: "Payment" },
              { num: 3, label: "Review" },
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm ${
                    step >= s.num ? "bg-maroon text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {s.num}
                </div>
                <span className={`mt-1 text-xs ${step >= s.num ? "text-maroon" : "text-gray-600"}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(handleOrderPreview)} noValidate>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-3 sm:space-y-4"
                >
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-maroon">
                    Shipping Address
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="space-y-1">
                      <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        {...register("name")}
                        placeholder="Full Name"
                        className={`w-full p-2 sm:p-3 border rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-maroon focus:border-maroon ${
                          errors.name ? "border-red-500" : ""
                        }`}
                      />
                      {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        {...register("phone")}
                        placeholder="Phone Number"
                        className={`w-full p-2 sm:p-3 border rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-maroon focus:border-maroon ${
                          errors.phone ? "border-red-500" : ""
                        }`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="address" className="block text-xs sm:text-sm font-medium text-gray-700">
                        Address *
                      </label>
                      <input
                        id="address"
                        {...register("address")}
                        placeholder="Address"
                        className={`w-full p-2 sm:p-3 border rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-maroon focus:border-maroon ${
                          errors.address ? "border-red-500" : ""
                        }`}
                      />
                      {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div className="space-y-1">
                        <label htmlFor="city" className="block text-xs sm:text-sm font-medium text-gray-700">
                          City *
                        </label>
                        <input
                          id="city"
                          {...register("city")}
                          placeholder="City"
                          className={`w-full p-2 sm:p-3 border rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-maroon focus:border-maroon ${
                            errors.city ? "border-red-500" : ""
                          }`}
                        />
                        {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="state" className="block text-xs sm:text-sm font-medium text-gray-700">
                          State *
                        </label>
                        <input
                          id="state"
                          {...register("state")}
                          placeholder="State"
                          className={`w-full p-2 sm:p-3 border rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-maroon focus:border-maroon ${
                            errors.state ? "border-red-500" : ""
                          }`}
                        />
                        {errors.state && <p className="text-red-500 text-xs">{errors.state.message}</p>}
                      </div>
                      <div className="space-y-1 col-span-2">
                        <label htmlFor="pincode" className="block text-xs sm:text-sm font-medium text-gray-700">
                          Pincode *
                        </label>
                        <input
                          id="pincode"
                          {...register("pincode")}
                          placeholder="Pincode"
                          className={`w-full p-2 sm:p-3 border rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-maroon focus:border-maroon ${
                            errors.pincode ? "border-red-500" : ""
                          }`}
                        />
                        {errors.pincode && <p className="text-red-500 text-xs">{errors.pincode.message}</p>}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700">
                        Email (optional)
                      </label>
                      <input
                        id="email"
                        {...register("email")}
                        placeholder="Email"
                        className={`w-full p-2 sm:p-3 border rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-maroon focus:border-maroon ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    type="button"
                    onClick={handleNext}
                    disabled={isLoading}
                    className="w-full bg-[#800000] text-white py-2 sm:py-3 rounded-lg hover:bg-maroon/90 disabled:bg-maroon/50 text-sm sm:text-base"
                  >
                    Proceed to Payment
                  </motion.button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-3 sm:space-y-4"
                >
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-maroon">
                    Payment Method
                  </h3>
                  <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {[
                      { value: "cod", label: "Cash on Delivery", icon: Wallet, desc: "Pay when you receive" },
                      { value: "card", label: "Credit/Debit Card", icon: CreditCard, desc: "Secure card payment" },
                      { value: "upi", label: "UPI", icon: Wallet, desc: "Instant UPI payment" },
                      { value: "paypal", label: "PayPal", icon: Wallet, desc: "Secure PayPal payment" },
                    ].map((method) => (
                      <label
                        key={method.value}
                        className={`flex items-center p-2 sm:p-3 border rounded-lg cursor-pointer hover:border-maroon transition-all ${
                          paymentMethod === method.value ? "border-maroon bg-[#800000] text-white" : ""
                        }`}
                      >
                        <input type="radio" {...register("paymentMethod")} value={method.value} className="hidden" />
                        <method.icon className="mr-2 text-maroon flex-shrink-0" size={18} />
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-xs sm:text-sm">{method.label}</span>
                          <p className="text-xs text-gray-500 truncate">{method.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.paymentMethod && (
                    <p className="text-red-500 text-xs">{errors.paymentMethod.message}</p>
                  )}
                  <div className="flex flex-col space-y-2 sm:space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <motion.button
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                      type="button"
                      onClick={() => setStep(1)}
                      disabled={isLoading}
                      className="w-full bg-gray-100 text-gray-700 py-2 sm:py-3 rounded-lg hover:bg-gray-200 text-xs sm:text-sm"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#800000] text-white py-2 sm:py-3 rounded-lg hover:bg-maroon/90 disabled:bg-maroon/50 text-xs sm:text-sm flex items-center justify-center"
                    >
                      {isLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
                      {isLoading ? "Processing..." : "Place Order"}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 3 && orderDetails && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-3 sm:space-y-4"
                >
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#800000] border-b-2 border-[#800000] pb-1">
                    Order Invoice
                  </h3>
                  <div className="bg-gray-100 p-3 sm:p-4 rounded-lg shadow-md border border-green-200 space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 text-xs sm:text-sm">
                      <div>
                        <p className="font-semibold text-green-700">Order ID: #{orderDetails.productId}</p>
                        <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="font-semibold text-green-700">xAI Store</p>
                        <p className="text-gray-600">support@xai.com</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="bg-white p-2 sm:p-3 rounded-md border border-green-300 text-xs sm:text-sm">
                        <h4 className="font-semibold text-[#800000] mb-1">Shipping To:</h4>
                        <p>{orderDetails.name}</p>
                        <p>
                          {orderDetails.address}, {orderDetails.city}, {orderDetails.state} -{" "}
                          {orderDetails.pincode}
                        </p>
                        <p>Phone: {orderDetails.phone}</p>
                        {orderDetails.email && <p>Email: {orderDetails.email}</p>}
                      </div>
                      <div className="bg-white p-2 sm:p-3 rounded-md border border-green-300 text-xs sm:text-sm">
                        <h4 className="font-semibold text-[#800000] mb-1">Payment Method:</h4>
                        <p>{orderDetails.paymentMethod.toUpperCase()}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-[#800000] mb-1">Order Details:</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm text-gray-800 border-collapse">
                          <thead>
                            <tr className="bg-[#800000] text-white">
                              <th className="py-1 px-2 text-left rounded-tl-lg">Item</th>
                              <th className="py-1 px-2 text-left">Quality</th>
                              <th className="py-1 px-2 text-center">Qty</th>
                              <th className="py-1 px-2 text-right rounded-tr-lg">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-green-200 hover:bg-green-50">
                              <td className="py-2 px-2">{orderDetails.productName}</td>
                              <td className="py-2 px-2">{orderDetails.selectedQuality}</td>
                              <td className="py-2 px-2 text-center">{orderDetails.quantity}</td>
                              <td className="py-2 px-2 text-right font-medium text-green-700">
                                ₹{orderDetails.subtotal.toFixed(2)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm border border-green-300 text-xs sm:text-sm">
                      <div className="flex justify-between py-1">
                        <span>Subtotal:</span>
                        <span>₹{orderDetails.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-1 border-t border-green-200">
                        <span>Shipping:</span>
                        <span>₹{orderDetails.shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-1 text-sm sm:text-base font-semibold text-[#800000] border-t border-green-200">
                        <span>Total:</span>
                        <span className="text-green-700">₹{orderDetails.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 sm:space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <motion.button
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={isLoading}
                      className="w-full bg-gray-200 text-gray-700 py-2 sm:py-3 rounded-lg hover:bg-gray-300 text-xs sm:text-sm"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                      type="button"
                      onClick={handleConfirmOrder}
                      disabled={isLoading}
                      className="w-full bg-[#800000] text-white py-2 sm:py-3 rounded-lg hover:bg-[#600000] disabled:bg-[#800000]/50 text-xs sm:text-sm flex items-center justify-center"
                    >
                      {isLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
                      {isLoading ? "Processing..." : "Confirm & Pay"}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}