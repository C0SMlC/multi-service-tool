import React, { useState } from "react";
import CustomDropdown from "../../Elements/Dropdown";
import AnimatedSubmitButton from "../../Elements/SubmitButton";
import TopicModeModal from "@/components/Reels/TopicModel";

export const TopicMode = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [textInput, setTextInput] = useState("");
  const [selectedAudio, setSelectedAudio] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(true);
    setIsProcessing(true);

    try {
      // Simulate server request - replace with your actual API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ videoUrl: "./processed-video.mp4" });
        }, 300000); // 5 minutes
      });

      setVideoUrl(response.videoUrl);
    } catch (error) {
      console.error("Error processing video:", error);
      // Handle error appropriately
    } finally {
      setIsProcessing(false);
    }
  };

  const options = [
    {
      id: "option1",
      label: "Option 1",
      value: "Option 1",
    },
    {
      id: "option2",
      label: "Option 2",
      value: "Option 2",
    },
    {
      id: "option3",
      label: "Option 3",
      value: "Option 3",
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Option Dropdown */}
        <div>
          <label className="block mb-2 font-semibold">Select Option</label>
          <CustomDropdown
            items={options}
            selectedItem={selectedOption}
            onSelect={setSelectedOption}
            placeholder="Select an Option"
          />
        </div>

        {/* Optional Text Input */}
        <div>
          <label className="block mb-2 font-semibold">
            Optional Text Input
          </label>
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter optional text"
            className="w-full p-2 border bg-lightGrey"
          />
        </div>
        <AnimatedSubmitButton
          onSubmit={handleSubmit}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      </form>

      {showModal && (
        <TopicModeModal
          onClose={() => setShowModal(false)}
          isLoading={!videoUrl}
          videoUrl={videoUrl}
        />
      )}
    </>
  );
};
