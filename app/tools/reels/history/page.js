import ReelsHistoryGrid from "@/components/pages/ReelHistory";
import React from "react";
export default function HistoryPage() {
  const sampleReels = [
    {
      id: 1,
      title: "Ocean is beautiful",
      thumbnail:
        "https://images.pexels.com/photos/29699865/pexels-photo-29699865/free-photo-of-surfer-headed-to-ocean-at-santa-barbara-beach.jpeg",
      createdAt: "2024-03-20",
    },
    {
      id: 2,
      title: "Ocean is beautiful",
      thumbnail:
        "https://images.pexels.com/photos/29699865/pexels-photo-29699865/free-photo-of-surfer-headed-to-ocean-at-santa-barbara-beach.jpeg",
      createdAt: "2024-03-19",
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-[1920px] mx-auto py-8">
        <h1 className="text-2xl font-semibold px-6 mb-6 text-black	">
          Your Reels
        </h1>
        <ReelsHistoryGrid reels={sampleReels} />
      </div>
    </div>
  );
}
