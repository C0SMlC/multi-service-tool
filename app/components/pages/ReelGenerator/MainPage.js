import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info, Volume2, InfoIcon } from "lucide-react";
import CustomDropdown from "../../elements/Dropdown";
import { TopicMode } from "./TopicMode";
import { UserScriptMode } from "./UserSciptMode";

export const MainPage = () => {
  const [selectedMode, setSelectedMode] = useState("modeA");
  const [selectedAudio, setSelectedAudio] = useState("");

  const togglePlay = (audio) => {
    if (playingAudio === audio.src) {
      audioRefs.current[audio.src].pause();
      setPlayingAudio(null);
    } else {
      // Pause any currently playing audio
      if (playingAudio) {
        audioRefs.current[playingAudio].pause();
      }

      audioRefs.current[audio.src].play();
      setPlayingAudio(audio.src);
    }
  };

  // Audio Files as Dropdown Items
  const audioFiles = [
    {
      id: "audio1",
      label: "Audio 1",
      value: "/audio1.mp3",
      description: "A sample audio track with interesting content",
      icon: <Volume2 size={16} />,
      actionIcon: <Play size={16} />,
      InfoIcon: <Info size={16} />,
      onActionClick: togglePlay,
    },
    {
      id: "audio2",
      label: "Audio 2",
      value: "/audio2.mp3",
      description: "Another fascinating audio selection",
      icon: <Volume2 size={16} />,
      actionIcon: <Play size={16} />,
      InfoIcon: <Info size={16} />,
      onActionClick: togglePlay,
    },
    {
      id: "audio3",
      label: "Audio 3",
      value: "/audio3.mp3",
      description: "The third audio option with unique characteristics",
      icon: <Volume2 size={16} />,
      actionIcon: <Play size={16} />,
      InfoIcon: <Info size={16} />,
      onActionClick: togglePlay,
    },
  ];

  // Mode Tabs as Dropdown Items
  const modeTabs = [
    { id: "modeA", label: "Mode A", value: "modeA" },
    { id: "modeB", label: "Mode B", value: "modeB" },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 bg-primary shadow-xl rounded-xl py-8">
      <div className="space-y-6">
        {/* Responsive Centered Tabs Container */}
        <div className="flex justify-center mb-6">
          <div
            className="flex bg-gray-100 rounded-full 
            w-full         {/* Full width on small screens */}
            sm:w-3/4       {/* 75% width on small devices */}
            md:w-1/2       {/* 50% width on medium screens */}
            lg:w-1/3       {/* 33% width on large screens */}
            p-1 
            mx-auto 
            space-x-1     {/* Adds small spacing between tabs */}
          "
          >
            {modeTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedMode(tab.value)}
                className={`
                  flex-1 
                  px-2 
                  sm:px-4 
                  py-2 
                  rounded-full 
                  relative 
                  transition-all 
                  duration-300
                  text-xs 
                  sm:text-sm 
                  md:text-base
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

        {/* Audio Selection */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-sm">
            Select Audio
          </label>
          <CustomDropdown
            items={audioFiles}
            selectedItem={selectedAudio}
            onSelect={setSelectedAudio}
            placeholder="Select an Audio File"
          />
        </div>

        {/* Animated Mode Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMode}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
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
