import { useState, useRef, useEffect } from "react";

export const VideoPlayer = ({ videoUrl, isMuted, showSubtitles }) => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = (e) => {
      console.error("Video error:", e);
      setError("Error loading video");
    };

    video.addEventListener("error", handleError);
    return () => video.removeEventListener("error", handleError);
  }, []);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
        {error}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        controls
        muted={isMuted}
        preload="metadata"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {showSubtitles && (
        <div className="absolute bottom-16 left-0 right-0 text-center">
          <div className="inline-block bg-black/75 text-white px-4 py-2 rounded-lg">
            Sample subtitle text
          </div>
        </div>
      )}
    </div>
  );
};
