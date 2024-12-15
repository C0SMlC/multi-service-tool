"use client";

import React, { useState, useRef, useEffect } from "react";
import CustomDropdown from "../../elements/Dropdown";
import { VoicePlayer } from "./VoicePlayer";

export const TopicMode = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [textInput, setTextInput] = useState("");
  const [selectedAudio, setSelectedAudio] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic
    console.log({
      option: selectedOption,
      text: textInput,
      audio: selectedAudio,
    });
  };

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

      {/* Audio Dropdown with Player */}
      {/* <div>
        <label className="block mb-2 font-semibold">Select Audio</label>
        <select
          value={selectedAudio}
          onChange={(e) => setSelectedAudio(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="">Select an Audio File</option>
          {audioFiles.map((audio) => (
            <option key={audio.name} value={audio.src}>
              {audio.name}
            </option>
          ))}
        </select>
        {selectedAudio && <VoicePlayer audioSrc={selectedAudio} />}
      </div> */}

      {/* Submit Button */}
      <button
        type="submit"
        className=" bg-grey text-white px-12 py-2 rounded-3xl hover:bg-primary justify-self-center self-center"
      >
        Submit
      </button>
    </form>
  );
};
