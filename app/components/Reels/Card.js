"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import ReelModal from "./ReelModel";

export default function ReelCard({ reel }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <motion.div
        className="relative rounded-xl overflow-hidden cursor-pointer h-[700px]"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setShowModal(true)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0">
          <img
            src={reel.thumbnail}
            alt={reel.title}
            className={`w-full h-full object-cover transition-all duration-300 ${
              isHovered ? "blur-sm scale-105" : ""
            }`}
          />
        </div>

        <div
          className={`absolute inset-0 bg-black/60 p-4 flex flex-col justify-end transform transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <h3 className="text-white text-lg font-semibold mb-2">
            {reel.title}
          </h3>
          <p className="text-gray-300 text-sm">
            Created: {formatDate(reel.createdAt)}
          </p>
        </div>
      </motion.div>

      {showModal && (
        <ReelModal reel={reel} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
