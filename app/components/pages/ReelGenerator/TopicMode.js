"use client";

import React, { useState } from "react";
import CustomDropdown from "../../Elements/Dropdown";
import AnimatedSubmitButton from "../../Elements/SubmitButton";

export const TopicMode = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [textInput, setTextInput] = useState("");
  const [selectedAudio, setSelectedAudio] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // In TopicMode.js
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simply return the promise for the animation component to handle
    return new Promise((resolve) => setTimeout(resolve, 2000));
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
        <label className="block mb-2 font-semibold">Optional Text Input</label>
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
  );
};
