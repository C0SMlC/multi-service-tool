"use client";

import React, { useState, useRef, useEffect } from "react";
import { VoicePlayer } from "./VoicePlayer";

export const UserScriptMode = () => {
  const [textArea, setTextArea] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const voiceOptions = ["Voice 1", "Voice 2", "Voice 3"];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/plain") {
      setUploadedFile(file);
      // Read file content
      const reader = new FileReader();
      reader.onload = (event) => {
        setTextArea(event.target.result);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload only .txt files");
      e.target.value = null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic
    console.log({
      text: textArea,
      voice: selectedVoice,
      file: uploadedFile,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mb-10">
      {/* Large Text Area */}
      <div>
        <label className="block mb-2 font-semibold">Enter or Paste Text</label>
        <textarea
          value={textArea}
          onChange={(e) => setTextArea(e.target.value)}
          placeholder="Enter or paste your text here"
          className="w-full p-2 border rounded min-h-[200px]"
          required
        />
      </div>

      {/* File Upload */}
      <div>
        <label className="block mb-2 font-semibold">Upload .txt File</label>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Voice Dropdown */}
      {/* <div>
        <label className="block mb-2 font-semibold">Select Voice</label>
        <select
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select a Voice</option>
          {voiceOptions.map((voice) => (
            <option key={voice} value={voice}>
              {voice}
            </option>
          ))}
        </select>
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
