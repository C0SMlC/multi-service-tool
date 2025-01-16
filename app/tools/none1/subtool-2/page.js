"use client";
import TopicModeModal from "@/components/Reels/TopicModel";
import { useState } from "react";

export default function VideoDetail({ videoId }) {
  const [showTopicModal, setShowTopicModal] = useState(false);

  const mockVideoDetail = {
    id: videoId,
    title: "Offensive Investing: How to Make Money Fast with Self-Education",
    duration: "01:50",
    viralityScore: 85,
    analysis:
      "The video has a strong potential for virality due to the engaging and motivational content about offensive investing through self-education. The speaker's passionate delivery and the promise of significant financial gains can resonate with a wide audience interested in personal development and wealth-building. However, the length of the video may slightly hinder its virality as shorter videos tend to perform better on platforms like TikTok.",
    transcript:
      "which leads us to the main point of this video, which is offensive investing. So listen, offense investing, much like the word suggests requires action...",
  };

  const handleOpenTopicModal = () => {
    setShowTopicModal(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 text-black mt-12">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your shorts (1)</h1>
          <button className="px-6 py-2.5 bg-grey rounded-lg text-sm font-medium">
            Generate New
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mt-16">
        <div className="flex flex-col items-center">
          <div className="w-[300px] mb-4">
            {" "}
            <img
              src="/test.png"
              alt={mockVideoDetail.title}
              className="w-full rounded-lg"
            />
          </div>
          <div className="w-[300px] flex gap-4">
            {" "}
            <button className="flex-1 bg-black text-white py-2.5 rounded-lg font-medium">
              Download HD
            </button>
            <button
              className="px-8 py-2.5 border rounded-lg bg-gray-50 font-medium"
              onClick={handleOpenTopicModal}
            >
              Edit
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6">
            {mockVideoDetail.title} ({mockVideoDetail.duration})
          </h2>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-medium mb-3">
              #1 Virality score ({mockVideoDetail.viralityScore}/100)
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {mockVideoDetail.analysis}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-medium mb-3">Transcript</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {mockVideoDetail.transcript}
            </p>
          </div>
        </div>
      </div>
      {showTopicModal && (
        <TopicModeModal
          isOpen={showTopicModal}
          onClose={() => setShowTopicModal(false)}
        />
      )}
    </div>
  );
}
