"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReelModal from "./ReelModel";
import { Play } from "lucide-react"; // Import the Play icon
import { generateThumbnail } from "@/utils/VideoThumbnailGenerator.js";
export default function ReelCard({ reel }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [thumbnail, setThumbnail] = useState(reel.thumbnail || null);
  const [isLoading, setIsLoading] = useState(!reel.thumbnail);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadThumbnail = async () => {
      // if (!reel.videoUrl || reel.thumbnail) {
      //   setIsLoading(false);
      //   return;
      // }

      try {
        setIsLoading(true);
        setLoadError(false);
        console.log("Generating thumbnail for:", reel.videoUrl); // Debug log
        const thumbnailUrl = await generateThumbnail(reel.videoUrl);

        if (isMounted) {
          console.log("Thumbnail generated successfully"); // Debug log
          setThumbnail(thumbnailUrl);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error generating thumbnail:", error);
        if (isMounted) {
          setLoadError(true);
          setIsLoading(false);
        }
      }
    };

    loadThumbnail();

    return () => {
      isMounted = false;
    };
  }, [reel.videoUrl, reel.thumbnail]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderThumbnail = () => {
    if (isLoading) {
      return (
        <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    if (loadError) {
      return (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center flex-col gap-2">
          <Play className="w-12 h-12 text-gray-400" />
          <span className="text-sm text-gray-500">Preview not available</span>
        </div>
      );
    }

    return (
      <img
        src={thumbnail.thumbnail}
        alt={reel.title}
        className={`w-full h-full object-cover transition-all duration-300 ${
          isHovered ? "blur-sm scale-105" : ""
        }`}
        onError={() => setLoadError(true)}
      />
    );
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
        <div className="absolute inset-0">{renderThumbnail()}</div>

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
