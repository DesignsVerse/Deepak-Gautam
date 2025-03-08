"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const callNumber = "+919876543210";

  // Color scheme
  const colors = {
    primary: "#800000", // Maroon
    secondary: "#FFD700", // Gold
    background: "#FFF8F0", // Light cream
    text: "#4A2C2A", // Dark brown
    overlay: "rgba(74, 44, 42, 0.4)",
  };

  const showPopup = () => {
    // Check if popup has already been shown in this session
    const hasShownPopup = localStorage.getItem("popupShown");
    if (!hasShownPopup) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    // Show popup after 30 seconds (changed from 10s to 30s as per your request)
    const initialTimer = setTimeout(showPopup, 30000);

    return () => clearTimeout(initialTimer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Mark popup as shown in localStorage so it doesn't show again
    localStorage.setItem("popupShown", "true");
  };

  const handleCall = () => {
    // Optional: You can add tracking here if needed
  };

  // Animation variants
  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex justify-center items-center z-50"
          style={{ backgroundColor: colors.overlay }}
        >
          <motion.div
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md mx-4"
          >
            <div
              className="rounded-xl shadow-2xl p-8 relative overflow-hidden"
              style={{ backgroundColor: colors.background }}
            >
              {/* Decorative corner element */}
              <div
                className="absolute top-0 left-0 w-16 h-16 opacity-10"
                style={{ backgroundColor: colors.primary }}
              />

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  color: colors.text,
                  backgroundColor: `${colors.secondary}20`,
                }}
              >
                <span className="text-xl">×</span>
              </button>

              {/* Header */}
              <h2
                className="text-3xl font-bold mb-4 text-center relative"
                style={{ color: colors.primary }}
              >
                Call Karein!
                <span
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1"
                  style={{ backgroundColor: colors.secondary }}
                />
              </h2>

              {/* Message */}
              <p
                className="text-center mb-6 leading-relaxed"
                style={{ color: colors.text }}
              >
                Aap humse turant baat karne ke liye niche "Call Now" button dabayein.
              </p>

              {/* Call Button */}
              <div className="text-center">
                <a
                  href={`tel:${callNumber}`}
                  onClick={handleCall}
                  className="inline-block px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.background,
                  }}
                >
                  Call Now
                </a>
              </div>

              {/* Footer Note */}
              <p
                className="text-center text-sm mt-4 opacity-75"
                style={{ color: colors.text }}
              >
                Hum aapke call ka intezaar kar rahe hain!
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;