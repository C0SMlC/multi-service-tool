import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Info, Volume2, InfoIcon } from "lucide-react";
import CustomDropdown from "../../Elements/Dropdown";
import { TopicMode } from "./TopicMode";
import { UserScriptMode } from "./UserSciptMode";

export const MainPage = () => {
  const [selectedMode, setSelectedMode] = useState("modeA");
  const [selectedAudio, setSelectedAudio] = useState("");
  const [playingAudio, setPlayingAudio] = useState(null);
  const audioRefs = useRef({});

  useEffect(() => {
    audioFiles.forEach((audio) => {
      if (!audioRefs.current[audio.value]) {
        const audioElement = new Audio(audio.value);
        audioElement.addEventListener("ended", () => {
          setPlayingAudio(null);
        });
        audioRefs.current[audio.value] = audioElement;
      }
    });

    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
        audio.removeEventListener("ended", () => {
          setPlayingAudio(null);
        });
      });
    };
  }, []);

  const togglePlay = (audio) => {
    if (playingAudio === audio.value) {
      audioRefs.current[audio.value].pause();
      setPlayingAudio(null);
    } else {
      // Pause any currently playing audio
      if (playingAudio) {
        audioRefs.current[playingAudio].pause();
      }
      audioRefs.current[audio.value].play();
      setPlayingAudio(audio.value);
    }
  };

  const audioFiles = [
    {
      id: "audio1",
      label: "Audio 1",
      value: "https://cdn.openai.com/API/docs/audio/alloy.wav",
      description: "A sample audio track with interesting content",
      icon: <Volume2 size={16} className="text-gray-500" />,
      actionIcon: (audio) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay(audio);
          }}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          {playingAudio === audio.value ? (
            <Pause size={16} className="text-blue-600" />
          ) : (
            <Play size={16} className="text-gray-500 hover:text-blue-600" />
          )}
        </button>
      ),
      InfoIcon: <Info size={16} />,
    },
    {
      id: "audio2",
      label: "Audio 2",
      value: "https://cdn.openai.com/API/docs/audio/echo.wav",
      description: "Another fascinating audio selection",
      icon: <Volume2 size={16} className="text-gray-500" />,
      actionIcon: (audio) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay(audio);
          }}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          {playingAudio === audio.value ? (
            <Pause size={16} className="text-blue-600" />
          ) : (
            <Play size={16} className="text-gray-500 hover:text-blue-600" />
          )}
        </button>
      ),
      InfoIcon: <Info size={16} />,
    },
    {
      id: "audio3",
      label: "Audio 3",
      value: "https://cdn.openai.com/API/docs/audio/fable.wav",
      description: "The third audio option with unique characteristics",
      icon: <Volume2 size={16} className="text-gray-500" />,
      actionIcon: (audio) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay(audio);
          }}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          {playingAudio === audio.value ? (
            <Pause size={16} className="text-blue-600" />
          ) : (
            <Play size={16} className="text-gray-500 hover:text-blue-600" />
          )}
        </button>
      ),
      InfoIcon: <Info size={16} />,
    },
  ];

  const modeTabs = [
    { id: "modeA", label: "Mode A", value: "modeA" },
    { id: "modeB", label: "Mode B", value: "modeB" },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 bg-primary shadow-xl rounded-xl py-8">
      <div className="space-y-6">
        <div className="flex justify-center mb-6">
          <div className="flex bg-gray-100 rounded-full w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-1 mx-auto space-x-1">
            {modeTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedMode(tab.value)}
                className={`
                  flex-1 px-2 sm:px-4 py-2 rounded-full relative transition-all duration-300
                  text-xs sm:text-sm md:text-base
                  ${
                    selectedMode === tab.value
                      ? "bg-white shadow-md text-blue-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-200"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-sm">
            Select Audio
          </label>
          <CustomDropdown
            items={audioFiles.map((audio) => ({
              ...audio,
              actionIcon: audio.actionIcon(audio),
            }))}
            selectedItem={selectedAudio}
            onSelect={setSelectedAudio}
            placeholder="Select an Audio File"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            transition={{
              type: "tween",
              duration: 0.3,
            }}
          >
            {selectedMode === "modeA" && <TopicMode />}
            {selectedMode === "modeB" && <UserScriptMode />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MainPage;
