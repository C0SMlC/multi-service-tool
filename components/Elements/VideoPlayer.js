// components/Elements/VideoPlayer.js
"use client";
import { useEffect, useState, useRef } from "react";

export const VideoPlayer = ({ videoUrl, isMuted, showSubtitles }) => {
  const videoRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [subtitles, setSubtitles] = useState([]);
  const [currentSubtitle, setCurrentSubtitle] = useState("");
  const timeUpdateRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function loadSubtitles() {
      try {
        const response = await fetch("/captions.json");
        if (!response.ok) {
          throw new Error(`Failed to load subtitles: ${response.status}`);
        }
        const jsonSubtitles = await response.json();
        setSubtitles(jsonSubtitles);
      } catch (error) {
        console.error("Error loading subtitles:", error);
      }
    }

    if (showSubtitles && isClient) {
      loadSubtitles();
    }
  }, [showSubtitles, isClient]);

  const getRollingWords = (subtitle, currentTime) => {
    const words = subtitle.words;
    const totalWords = words.length;

    let currentWordIndex = 0;
    for (let i = 0; i < totalWords; i++) {
      if (currentTime >= words[i].start && currentTime <= words[i].end) {
        currentWordIndex = i;
        break;
      }
    }

    const windowWords = words.slice(currentWordIndex, currentWordIndex + 4);
    return windowWords
      .map((w) => w.word)
      .join(" ")
      .trim()
      .toUpperCase();
  };

  useEffect(() => {
    if (!showSubtitles || !videoRef.current || !isClient) return;

    const handleTimeUpdate = () => {
      if (!videoRef.current) return;

      const currentTime = videoRef.current.currentTime;
      const currentSub = subtitles.find(
        (sub) => currentTime >= sub.start && currentTime <= sub.end
      );

      if (currentSub) {
        const rollingText = getRollingWords(currentSub, currentTime);
        setCurrentSubtitle(rollingText);
      } else {
        setCurrentSubtitle("");
      }
    };

    timeUpdateRef.current = handleTimeUpdate;
    videoRef.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      if (videoRef.current && timeUpdateRef.current) {
        videoRef.current.removeEventListener(
          "timeupdate",
          timeUpdateRef.current
        );
      }
    };
  }, [subtitles, showSubtitles, isClient]);

  if (!isClient) {
    return null;
  }

  videoUrl = "./public/Before.mp4";

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div
        ref={containerRef}
        className="relative w-auto h-full"
        style={{ aspectRatio: "9/16" }}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          className="h-full w-auto"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          controls={false}
        />
        {showSubtitles && (
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-16 w-full px-4">
            <div className="relative flex justify-center">
              <div
                className="text-center transition-all duration-300 ease-in-out"
                style={{
                  opacity: currentSubtitle ? 1 : 0,
                  transform: `translateY(${currentSubtitle ? "0" : "20px"})`,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Arial Black', 'Helvetica Black', sans-serif",
                    fontSize: "28px",
                    fontWeight: "900",
                    lineHeight: "1.1",
                    letterSpacing: "1px",
                    color: "white",
                    textShadow:
                      "3px 3px 0 #000, -3px 3px 0 #000, 3px -3px 0 #000, -3px -3px 0 #000",
                    WebkitTextStroke: "1px black",
                    display: "inline-block",
                    padding: "2px 8px",
                    maxWidth: "100%",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {currentSubtitle}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
