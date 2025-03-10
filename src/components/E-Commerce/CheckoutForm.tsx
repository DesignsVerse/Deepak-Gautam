"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Wallet, Loader2 } from "lucide-react";
import { Product } from "@/types/product";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define form schema using Zod
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

interface CheckoutFormProps {
  product: Product;
  quantity: number;
  selectedQuality: string;
  priceAdjustment: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutForm({ 
  product, 
  quantity, 
  selectedQuality,
  priceAdjustment,
  isOpen, 
  onClose 
}: CheckoutFormProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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

  // Calculate adjusted price
  const adjustedPrice = product.price + priceAdjustment;
  const subtotal = adjustedPrice * quantity;
  const shipping = 100;
  const total = subtotal + shipping;

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      reset();
      setStep(1);
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

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      setIsLoading(true);
      // Simulate API call with adjusted price
      const orderData = {
        ...data,
        productId: product.id,
        quantity,
        selectedQuality,
        adjustedPrice,
        subtotal,
        shipping,
        total,
      };
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Order placed successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && !isLoading) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
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
        className="bg-white rounded-2xl w-full max-w-4xl relative shadow-2xl flex overflow-hidden max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Panel - Order Summary */}
        <div className="w-1/3 bg-gray-50 p-6 hidden md:block overflow-y-auto">
          <h2 id="checkout-title" className="text-lg font-semibold text-maroon mb-4">
            Order Summary
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={product.image || "/placeholder-image.jpg"}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-md"
                loading="lazy"
              />
              <div>
                <h3 className="font-medium line-clamp-2">{product.name}</h3>
                <p className="text-sm text-gray-600">Quality: {selectedQuality}</p>
                <p className="text-sm text-gray-600">Qty: {quantity}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-full md:w-2/3 p-6 overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-maroon rounded"
            aria-label="Close checkout"
            disabled={isLoading}
          >
            <X size={24} />
          </button>

          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-gray-200 text-gray-600" : "bg-gray-200 text-gray-600"
                }`}
                aria-current={step === 1 ? "step" : undefined}
              >
                1
              </div>
              <span className={`ml-2 ${step >= 1 ? "text-gray-600" : "text-gray-600"}`}>
                Shipping
              </span>
            </div>
            <div className="w-16 h-1 bg-gray-200 mx-4">
              <div className={`h-full ${step === 2 ? "bg-maroon" : "bg-gray-200"}`} />
            </div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 2 ? "bg-gray-200 text-grap-600" : "bg-gray-200 text-gray-600"
                }`}
                aria-current={step === 2 ? "step" : undefined}
              >
                2
              </div>
              <span className={`ml-2 ${step === 2 ? "text-gray-500" : "text-gray-500"}`}>
                Payment
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <AnimatePresence mode="wait">
              {/* Step 1: Shipping Details */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-maroon">Shipping Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Full Name *
                        </label>
                        <input
                          id="name"
                          {...register("name")}
                          placeholder="Full Name"
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-maroon focus:border-maroon transition-all ${
                            errors.name ? "border-red-500" : ""
                          }`}
                          aria-invalid={errors.name ? "true" : "false"}
                          aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && (
                          <p id="name-error" className="text-red-500 text-xs" role="alert">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone Number *
                        </label>
                        <input
                          id="phone"
                          {...register("phone")}
                          placeholder="Phone Number"
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-maroon focus:border-maroon transition-all ${
                            errors.phone ? "border-red-500" : ""
                          }`}
                          aria-invalid={errors.phone ? "true" : "false"}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                        />
                        {errors.phone && (
                          <p id="phone-error" className="text-red-500 text-xs" role="alert">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address *
                      </label>
                      <input
                        id="address"
                        {...register("address")}
                        placeholder="Address"
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-maroon focus:border-maroon transition-all ${
                          errors.address ? "border-red-500" : ""
                        }`}
                        aria-invalid={errors.address ? "true" : "false"}
                        aria-describedby={errors.address ? "address-error" : undefined}
                      />
                      {errors.address && (
                        <p id="address-error" className="text-red-500 text-xs" role="alert">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          City *
                        </label>
                        <input
                          id="city"
                          {...register("city")}
                          placeholder="City"
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-maroon focus:border-maroon transition-all ${
                            errors.city ? "border-red-500" : ""
                          }`}
                          aria-invalid={errors.city ? "true" : "false"}
                          aria-describedby={errors.city ? "city-error" : undefined}
                        />
                        {errors.city && (
                          <p id="city-error" className="text-red-500 text-xs" role="alert">
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                          State *
                        </label>
                        <input
                          id="state"
                          {...register("state")}
                          placeholder="State"
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-maroon focus:border-maroon transition-all ${
                            errors.state ? "border-red-500" : ""
                          }`}
                          aria-invalid={errors.state ? "true" : "false"}
                          aria-describedby={errors.state ? "state-error" : undefined}
                        />
                        {errors.state && (
                          <p id="state-error" className="text-red-500 text-xs" role="alert">
                            {errors.state.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                          Pincode *
                        </label>
                        <input
                          id="pincode"
                          {...register("pincode")}
                          placeholder="Pincode"
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-maroon focus:border-maroon transition-all ${
                            errors.pincode ? "border-red-500" : ""
                          }`}
                          aria-invalid={errors.pincode ? "true" : "false"}
                          aria-describedby={errors.pincode ? "pincode-error" : undefined}
                        />
                        {errors.pincode && (
                          <p id="pincode-error" className="text-red-500 text-xs" role="alert">
                            {errors.pincode.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email (optional)
                      </label>
                      <input
                        id="email"
                        {...register("email")}
                        placeholder="Email"
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-maroon focus:border-maroon transition-all ${
                          errors.email ? "border-red-500" : ""
                        }`}
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-red-500 text-xs" role="alert">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    type="button"
                    onClick={handleNext}
                    disabled={isLoading}
                    className="w-full bg-[#800000] text-white py-3 rounded-lg hover:bg-maroon/90 disabled:bg-maroon/50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2"
                  >
                    Proceed to Payment
                  </motion.button>
                </motion.div>
              )}

              {/* Step 2: Payment Options */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold text-maroon">Select Payment Method</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { value: "cod", label: "Cash on Delivery", icon: Wallet, desc: "Pay when you receive" },
                      { value: "card", label: "Credit/Debit Card", icon: CreditCard, desc: "Secure card payment" },
                      { value: "upi", label: "UPI", icon: Wallet, desc: "Instant UPI payment" },
                      { value: "paypal", label: "PayPal", icon: Wallet, desc: "Secure PayPal payment" },
                    ].map((method) => (
                      <label
                        key={method.value}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer hover:border-maroon transition-all focus-within:ring-2 focus-within:ring-maroon ${
                          paymentMethod === method.value ? "border-maroon bg-maroon/5" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          {...register("paymentMethod")}
                          value={method.value}
                          className="hidden"
                          aria-checked={paymentMethod === method.value}
                        />
                        <method.icon className="mr-3 text-maroon" size={24} />
                        <div>
                          <span className="font-medium">{method.label}</span>
                          <p className="text-xs text-gray-500">{method.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.paymentMethod && (
                    <p className="text-red-500 text-xs" role="alert">
                      {errors.paymentMethod.message}
                    </p>
                  )}

                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                      type="button"
                      onClick={() => setStep(1)}
                      disabled={isLoading}
                      className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#800000] text-black py-3 rounded-lg hover:bg-maroon/90 disabled:bg-maroon/50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2 flex items-center justify-center"
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin mr-2" size={20} />
                      ) : null}
                      {isLoading ? "Processing..." : "Place Order"}
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