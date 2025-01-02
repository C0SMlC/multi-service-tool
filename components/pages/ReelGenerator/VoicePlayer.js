"use client";

import React, { useState, useRef, useEffect } from "react";

// Audio Player Component
export const VoicePlayer = ({ audioSrc }) => {
  const audioRef = useRef(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <audio ref={audioRef} src={audioSrc} />
      <button
        onClick={handlePlay}
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Play Audio
      </button>
    </div>
  );
};
