import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Download,
  Settings,
  Pause,
  Play,
} from "lucide-react";
import { CustomDropdown } from "../Elements/Dropdown";
import { SubtitleControls } from "../Elements/SubtitleController";
import { VideoPlayer } from "../Elements/VideoPlayer";
import { WebAudioVideoProcessor } from "@/utils/VideoAudioProcessor";

const ReelModal = ({ reel, onClose }) => {
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [subtitleStyle, setSubtitleStyle] = useState("Default");
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const processorRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    processorRef.current = new WebAudioVideoProcessor();

    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, []);

  const handleDownload = async () => {
    if (!currentAudio) {
      // If no audio selected, download original video
      const link = document.createElement("a");
      link.href = reel.videoUrl;
      link.download = `${reel.title || "video"}.mp4`;
      link.click();
      return;
    }

    try {
      setIsProcessing(true);

      const processedVideoUrl =
        await processorRef.current.combineVideoWithAudio(
          reel.videoUrl,
          currentAudio
        );

      setDownloadUrl(processedVideoUrl);

      // Create and trigger download
      const link = document.createElement("a");
      link.href = processedVideoUrl;
      link.download = `${reel.title || "video"}_with_music.webm`;
      link.click();
    } catch (error) {
      console.error("Error processing video:", error);
      // Handle error appropriately
    } finally {
      setIsProcessing(false);
    }
  };

  // Replace the existing download button with this JSX
  const DownloadButton = (
    <button
      className={`w-full py-3 ${
        isProcessing ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
      } text-white rounded-lg flex items-center justify-center gap-2`}
      onClick={handleDownload}
      disabled={isProcessing}
    >
      {isProcessing ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
          Processing...
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          Download {currentAudio ? "with Music" : ""}
        </>
      )}
    </button>
  );

  // Sample background music options
  const backgroundMusic = [
    {
      value: "happy",
      label: "Happy Vibes",
      icon: <Volume2 className="w-4 h-4" />,
      audioUrl: "https://cdn.openai.com/API/docs/audio/alloy.wav",
      description: "Upbeat and cheerful background music",
    },
    {
      value: "calm",
      label: "Calm Melody",
      icon: <Volume2 className="w-4 h-4" />,
      audioUrl: "https://cdn.openai.com/API/docs/audio/alloy.wav",
      description: "Soft and peaceful background music",
    },
  ];

  const handleAudioPreview = (audioUrl) => {
    if (currentAudio === audioUrl) {
      audioRef.current?.pause();
      setCurrentAudio(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        setCurrentAudio(audioUrl);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm text-black"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-5xl h-[85vh] overflow-hidden shadow-2xl relative"
      >
        <div className="h-full md:grid md:grid-cols-5 md:gap-4">
          <div className="h-full md:col-span-3 bg-black relative">
            <VideoPlayer
              videoUrl={reel.videoUrl}
              isMuted={isMuted}
              showSubtitles={showSubtitles}
            />

            <button
              onClick={() => setShowControls(true)}
              className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white md:hidden"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>

          <div className="hidden md:block md:col-span-2 p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">{reel.title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-sm font-medium">Background Music</span>
                <CustomDropdown
                  items={backgroundMusic}
                  selectedItem={currentAudio}
                  onSelect={(value) => {
                    const selected = backgroundMusic.find(
                      (item) => item.value === value
                    );
                    handleAudioPreview(selected.audioUrl);
                  }}
                  placeholder="Select background music"
                  renderItem={(item) => (
                    <div className="flex items-center justify-between w-full p-2">
                      <div className="flex items-center space-x-2">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAudioPreview(item.audioUrl);
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {currentAudio === item.audioUrl ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  )}
                />
              </div>
              <SubtitleControls
                showSubtitles={showSubtitles}
                onToggleSubtitles={() => setShowSubtitles(!showSubtitles)}
                subtitleStyle={subtitleStyle}
                onStyleChange={setSubtitleStyle}
              />
              {DownloadButton}
            </div>
          </div>

          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "100%" }}
                className="fixed inset-0 bg-white z-50 md:hidden"
              >
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">{reel.title}</h2>
                    <button
                      onClick={() => setShowControls(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <span className="text-sm font-medium">
                        Background Music
                      </span>
                      <CustomDropdown
                        items={backgroundMusic}
                        selectedItem={currentAudio}
                        onSelect={(value) => {
                          const selected = backgroundMusic.find(
                            (item) => item.value === value
                          );
                          handleAudioPreview(selected.audioUrl);
                        }}
                        placeholder="Select background music"
                        renderItem={(item) => (
                          <div className="flex items-center justify-between w-full p-2">
                            <div className="flex items-center space-x-2">
                              {item.icon}
                              <span>{item.label}</span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAudioPreview(item.audioUrl);
                              }}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              {currentAudio === item.audioUrl ? (
                                <VolumeX className="w-4 h-4" />
                              ) : (
                                <Volume2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        )}
                      />
                    </div>

                    <SubtitleControls
                      showSubtitles={showSubtitles}
                      onToggleSubtitles={() => setShowSubtitles(!showSubtitles)}
                      subtitleStyle={subtitleStyle}
                      onStyleChange={setSubtitleStyle}
                    />

                    {DownloadButton}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <audio ref={audioRef} />
        </div>
      </motion.div>
    </div>
  );
};

export default ReelModal;
