"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    },
  });

  const adjustedPrice = product.price + priceAdjustment;
  const subtotal = adjustedPrice * quantity;
  const shipping = 100;
  const total = subtotal + shipping;

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const handleProceedToPayment = async (data: CheckoutFormData) => {
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

    if (product.paymentLink) {
      setIsLoading(true);
      window.location.href = product.paymentLink;
    } else {
      toast.error("No payment link available. Please try again later.");
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
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl md:max-w-4xl max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Desktop Order Summary */}
        <div className="hidden md:flex md:w-2/5 bg-gradient-to-b from-maroon/10 to-white p-6 flex-col">
          <h2 className="text-xl font-bold text-maroon mb-6">Order Summary</h2>
          <div className="flex items-start gap-4 mb-6">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden border">
              <Image
                src={product.image || "/placeholder-image.jpg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Quality: <span className="text-gray-800">{selectedQuality}</span>
              </p>
              <p className="text-sm text-gray-600">
                Qty: <span className="text-gray-800">{quantity}</span>
              </p>
            </div>
          </div>
          
          <div className="mt-auto space-y-3 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">₹{shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t text-base">
              <span>Total</span>
              <span className="text-maroon">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/5 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isLoading}
          >
            <X size={20} />
          </button>

          {/* Mobile Header */}
          <div className="md:hidden border-b pb-4 mb-6">
            <h2 className="text-lg font-bold text-maroon">Shipping Details</h2>
            <div className="flex items-center gap-3 mt-3">
              <div className="relative w-12 h-12 rounded-md overflow-hidden border">
                <Image
                  src={product.image || "/placeholder-image.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                <p className="text-xs text-gray-600">Qty: {quantity}</p>
              </div>
              <p className="font-semibold text-sm">₹{total.toFixed(2)}</p>
            </div>
          </div>

          {/* Desktop Stepper */}
          <div className="hidden md:flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-maroon text-white font-medium">
                1
              </div>
              <span className="ml-2 text-maroon font-medium">Shipping Details</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleProceedToPayment)}>
            <AnimatePresence mode="wait">
              <motion.div
                key="step1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                <h3 className="text-lg font-semibold text-gray-900 md:block hidden">
                  Shipping Address
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("name")}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-maroon/50 ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("phone")}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-maroon/50 ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("address")}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-maroon/50 ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("city")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-maroon/50 ${
                          errors.city ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.city && (
                        <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("state")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-maroon/50 ${
                          errors.state ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.state && (
                        <p className="mt-1 text-xs text-red-500">{errors.state.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pincode <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("pincode")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-maroon/50 ${
                          errors.pincode ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.pincode && (
                        <p className="mt-1 text-xs text-red-500">{errors.pincode.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email (optional)
                      </label>
                      <input
                        {...register("email")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-maroon/50 ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-maroon hover:bg-maroon/90 text-white bg-[#800000] py-3 rounded-md font-medium transition-colors flex items-center justify-center mt-6"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin mr-2" size={20} />
                  ) : null}
                  Proceed to Payment
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}