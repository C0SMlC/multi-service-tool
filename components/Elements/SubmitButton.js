import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

const AnimatedSubmitButton = ({ onSubmit, isProcessing, setIsProcessing }) => {
  const [animationStep, setAnimationStep] = useState("idle");
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  // Recalculate dot position when window resizes
  useEffect(() => {
    const updatePosition = () => {
      if (buttonRef.current) {
        const button = buttonRef.current;
        const buttonRect = button.getBoundingClientRect();
        setDotPosition({
          x: window.innerWidth - buttonRect.left - 40,
          y: 0,
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  const handleSubmit = async () => {
    try {
      // Start the dot movement
      setAnimationStep("moving");

      // Wait for dot animation to complete
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Change to processing state
      setAnimationStep("processing");
      setIsProcessing(true);

      // Wait for the actual submission
      await onSubmit();

      // Show success state
      setAnimationStep("success");

      // Reset after showing success
      setTimeout(() => {
        setAnimationStep("idle");
      }, 3000);
    } catch (error) {
      setAnimationStep("idle");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleSubmit}
        disabled={isProcessing}
        className={`bg-grey text-white px-12 py-2 rounded-3xl hover:bg-primary justify-self-center self-center transition-opacity ${
          isProcessing ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Submit
      </button>

      <AnimatePresence>
        {animationStep !== "idle" && (
          <motion.div
            initial={{
              scale: 0,
              x: 0,
              y: 0,
            }}
            animate={{
              scale: 1,
              x: dotPosition.x,
              y: dotPosition.y,
              transition: { duration: 0.5 },
            }}
            exit={{
              scale: 0,
              transition: { duration: 0.3 },
            }}
            className="absolute top-1/2 left-1/2 -translate-y-1/2 origin-center"
          >
            <AnimatePresence mode="wait">
              {animationStep === "moving" && (
                <motion.div
                  key="dot"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="w-3 h-3 bg-primary rounded-full"
                />
              )}
              {animationStep === "processing" && (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                </motion.div>
              )}
              {animationStep === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <Check className="w-6 h-6 text-green-500" />
                  <span className="text-sm text-gray-600">
                    Reel generated - check history
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedSubmitButton;
