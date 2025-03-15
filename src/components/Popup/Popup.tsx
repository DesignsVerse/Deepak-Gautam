"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const callNumber = "+919153164444";

  // Color scheme
  const colors = {
    primary: "#800000", // Maroon
    secondary: "#FFD700", // Gold
    background: "#FFF8F0", // Light cream
    text: "#4A2C2A", // Dark brown
    overlay: "rgba(74, 44, 42, 0.4)",
  };

  useEffect(() => {
    const hasShownPopup = localStorage.getItem("popupShown");
    if (!hasShownPopup) {
      setTimeout(() => setIsOpen(true), 3000); // Show popup after 3 sec
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("popupShown", "true");
  };

  // Combined animation for popup and background
  const popupContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={popupContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 flex justify-center items-center z-50"
          style={{ backgroundColor: colors.overlay }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md mx-4"
          >
            <div
              className="rounded-xl shadow-2xl p-8 relative overflow-hidden"
              style={{ backgroundColor: colors.background }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-[#800000]"
                style={{
                  color: colors.text,
                  backgroundColor: `${colors.secondary}20`,
                }}
                aria-label="Close popup"
              >
                <span className="text-2xl">×</span>
              </button>

              {/* Header */}
              <h2 className="text-3xl font-bold mb-4 text-center" style={{ color: colors.primary }}>
                Call Karein!
                <span className="block w-16 h-1 mx-auto mt-1" style={{ backgroundColor: colors.secondary }} />
              </h2>

              {/* Message */}
              <p className="text-center mb-6 leading-relaxed" style={{ color: colors.text }}>
                Aap humse turant baat karne ke liye niche <span>&quot;Call Now&quot;</span> button dabayein.
              </p>

              {/* Call Button */}
              <div className="text-center">
                <a
                  href={`tel:${callNumber}`}
                  className="inline-block px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-[#800000]"
                  style={{ backgroundColor: colors.primary, color: colors.background }}
                >
                  📞 Call Now: {callNumber}
                </a>
              </div>

              {/* Footer Note */}
              <p className="text-center text-sm mt-6 opacity-75" style={{ color: colors.text }}>
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