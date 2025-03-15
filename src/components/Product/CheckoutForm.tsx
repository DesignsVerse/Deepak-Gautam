"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Wallet, Loader2 } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types/product";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
      console.log("Rudrak\'s Order Details:", orderDetails);
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
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl w-full max-w-lg md:max-w-4xl max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Desktop Order Summary */}
        <div className="hidden md:block md:w-1/3 bg-gray-50 p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold text-maroon mb-4">
            Rudrak&apos;s Order Summary
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Image
                src={product.image || "/placeholder-image.jpg"}
                alt={product.name}
                width={64}
                height={64}
                className="object-cover rounded-md"
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

        {/* Main Content */}
        <div className="w-full md:w-2/3 p-4 md:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            <X size={24} />
          </button>

          {/* Mobile Header */}
          <div className="md:hidden border-b pb-2 mb-4">
            <h2 className="text-lg font-bold text-maroon">
              {step === 1 ? "Shipping" : step === 2 ? "Payment" : "Review"}
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <Image
                src={product.image || "/placeholder-image.jpg"}
                alt={product.name}
                width={40}
                height={40}
                className="rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-xs text-gray-600">Qty: {quantity}</p>
              </div>
              <p className="font-semibold text-sm">₹{total.toFixed(2)}</p>
            </div>
          </div>

          {/* Desktop Stepper */}
          <div className="hidden md:flex items-center justify-center mb-6">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-[#800000] text-white" : "bg-gray-200 text-gray-600"}`}>1</div>
              <span className={`ml-2 ${step >= 1 ? "text-maroon" : "text-gray-600"}`}>Shipping</span>
            </div>
            <div className="w-16 h-1 bg-gray-200 mx-4">
              <div className={`h-full ${step >= 2 ? "bg-maroon" : "bg-gray-200"}`} />
            </div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-[#800000] text-white" : "bg-gray-200 text-gray-600"}`}>2</div>
              <span className={`ml-2 ${step >= 2 ? "text-maroon" : "text-gray-600"}`}>Payment</span>
            </div>
            <div className="w-16 h-1 bg-gray-200 mx-4">
              <div className={`h-full ${step === 3 ? "bg-maroon" : "bg-gray-200"}`} />
            </div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 3 ? "bg-[#800000] text-white" : "bg-gray-200 text-gray-600"}`}>3</div>
              <span className={`ml-2 ${step === 3 ? "text-maroon" : "text-gray-600"}`}>Review</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleOrderPreview)}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-maroon md:block hidden">
                    Rudrak&apos;s Shipping Address
                  </h3>
                  <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <input
                        {...register("name")}
                        placeholder="Full Name *"
                        className={`w-full p-2 md:p-3 border rounded-md ${errors.name ? "border-red-500" : ""}`}
                      />
                      {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>
                    <div>
                      <input
                        {...register("phone")}
                        placeholder="Phone Number *"
                        className={`w-full p-2 md:p-3 border rounded-md ${errors.phone ? "border-red-500" : ""}`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <input
                        {...register("address")}
                        placeholder="Address *"
                        className={`w-full p-2 md:p-3 border rounded-md ${errors.address ? "border-red-500" : ""}`}
                      />
                      {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
                    </div>
                    <div>
                      <input
                        {...register("city")}
                        placeholder="City *"
                        className={`w-full p-2 md:p-3 border rounded-md ${errors.city ? "border-red-500" : ""}`}
                      />
                      {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
                    </div>
                    <div>
                      <input
                        {...register("state")}
                        placeholder="State *"
                        className={`w-full p-2 md:p-3 border rounded-md ${errors.state ? "border-red-500" : ""}`}
                      />
                      {errors.state && <p className="text-red-500 text-xs">{errors.state.message}</p>}
                    </div>
                    <div>
                      <input
                        {...register("pincode")}
                        placeholder="Pincode *"
                        className={`w-full p-2 md:p-3 border rounded-md ${errors.pincode ? "border-red-500" : ""}`}
                      />
                      {errors.pincode && <p className="text-red-500 text-xs">{errors.pincode.message}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <input
                        {...register("email")}
                        placeholder="Email (optional)"
                        className={`w-full p-2 md:p-3 border rounded-md ${errors.email ? "border-red-500" : ""}`}
                      />
                      {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleNext}
                    disabled={isLoading}
                    className="w-full bg-green-700 text-white py-3 rounded-md"
                  >
                    Proceed to Payment
                  </motion.button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-maroon md:block hidden">
                    Rudrak&apos;s Payment Method
                  </h3>
                  <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4">
                    {[
                      { value: "cod", label: "Cash on Delivery", icon: Wallet, desc: "Pay when you receive" },
                      { value: "card", label: "Credit/Debit Card", icon: CreditCard, desc: "Secure card payment" },
                      { value: "upi", label: "UPI", icon: Wallet, desc: "Instant UPI payment" },
                      { value: "paypal", label: "PayPal", icon: Wallet, desc: "Secure PayPal payment" },
                    ].map((method) => (
                      <label
                        key={method.value}
                        className={`flex items-center p-3 border rounded-md cursor-pointer ${
                          paymentMethod === method.value ? "border-maroon bg-maroon/10" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          {...register("paymentMethod")}
                          value={method.value}
                          className="mr-2 md:hidden"
                        />
                        <method.icon size={20} className="mr-2 text-maroon" />
                        <div>
                          <span className="font-medium">{method.label}</span>
                          <p className="text-xs text-gray-500 md:block hidden">{method.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.paymentMethod && <p className="text-red-500 text-xs">{errors.paymentMethod.message}</p>}
                  <div className="flex gap-3">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setStep(1)}
                      disabled={isLoading}
                      className="flex-1 bg-gray-200 py-3 rounded-md"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-green-700 text-white py-3 rounded-md flex items-center justify-center"
                    >
                      {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Review Order"}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 3 && orderDetails && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold text-maroon border-b-2 border-maroon pb-2 md:block hidden">
                    Rudrak&apos;s Order Invoice
                  </h3>
                  <div className="space-y-4 md:bg-gray-100 md:p-6 md:rounded-lg md:border md:border-green-200">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                      <div>
                        <p className="text-sm font-semibold text-green-700">Order ID: #{orderDetails.productId}</p>
                        <p className="text-xs text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                      </div>
                      <div className="text-left md:text-right mt-2 md:mt-0">
                        <p className="text-sm font-semibold text-green-700">xAI Store</p>
                        <p className="text-xs text-gray-600">support@xai.com</p>
                      </div>
                    </div>
                    <div className="space-y-3 md:grid md:grid-cols-2 md:gap-6">
                      <div className="md:bg-white md:p-4 md:rounded-md md:border md:border-green-300">
                        <p className="font-semibold text-maroon">Shipping To:</p>
                        <p>{orderDetails.name}</p>
                        <p>
                          {orderDetails.address}, {orderDetails.city}, {orderDetails.state} -{" "}
                          {orderDetails.pincode}
                        </p>
                        <p>Phone: {orderDetails.phone}</p>
                        {orderDetails.email && <p>Email: {orderDetails.email}</p>}
                      </div>
                      <div className="md:bg-white md:p-4 md:rounded-md md:border md:border-green-300">
                        <p className="font-semibold text-maroon">Payment Method:</p>
                        <p>{orderDetails.paymentMethod.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="md:mb-6">
                      <p className="font-semibold text-maroon md:mb-2">Order Details:</p>
                      <div className="overflow-x-auto md:block hidden">
                        <table className="w-full text-sm text-gray-800 border-collapse">
                          <thead>
                            <tr className="bg-maroon text-white">
                              <th className="py-2 px-4 text-left rounded-tl-lg">Item</th>
                              <th className="py-2 px-4 text-left">Quality</th>
                              <th className="py-2 px-4 text-center">Qty</th>
                              <th className="py-2 px-4 text-right">Price</th>
                              <th className="py-2 px-4 text-right rounded-tr-lg">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-green-200 hover:bg-green-50">
                              <td className="py-3 px-4">{orderDetails.productName}</td>
                              <td className="py-3 px-4">{orderDetails.selectedQuality}</td>
                              <td className="py-3 px-4 text-center">{orderDetails.quantity}</td>
                              <td className="py-3 px-4 text-right">₹{orderDetails.adjustedPrice.toFixed(2)}</td>
                              <td className="py-3 px-4 text-right font-medium text-green-700">
                                ₹{orderDetails.subtotal.toFixed(2)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="md:hidden">
                        <p>{orderDetails.productName}</p>
                        <p>Quality: {orderDetails.selectedQuality}</p>
                        <p>Qty: {orderDetails.quantity}</p>
                      </div>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>₹{orderDetails.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>₹{orderDetails.shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-maroon">
                        <span>Total:</span>
                        <span>₹{orderDetails.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={isLoading}
                      className="flex-1 bg-gray-200 py-3 rounded-md"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={handleConfirmOrder}
                      disabled={isLoading}
                      className="flex-1 bg-green-700 text-white py-3 rounded-md flex items-center justify-center"
                    >
                      {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Confirm Order"}
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