import React from "react";
import Link from "next/link";
import { Upload, Play } from "lucide-react";

const mockVideos = [
  {
    id: 1,
    title: "How I Would Invest $1000 If I Were In My 20s",
    duration: "12:22",
    thumbnail: "/thumbnail.png",
    type: "Shorts",
  },
];

const VideoUploader = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mb-16">
      <div className="flex items-center gap-2 p-4 rounded-lg border border-dashed bg-white">
        <Upload className="w-5 h-5 text-gray-500 flex-shrink-0" />
        <input
          type="text"
          placeholder="Paste YouTube link or drop a file"
          className="flex-1 bg-transparent outline-none min-w-0"
        />
        <button className="px-6 py-2 bg-black text-white rounded-lg text-sm flex-shrink-0">
          Generate
        </button>
      </div>
    </div>
  );
};

const VideoCard = ({ video }) => {
  return (
    <Link href={`/tools/none1/subtool-2`}>
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden group cursor-pointer hover:shadow-md transition-shadow h-[360px]">
        <div className="relative w-full h-[240px]">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            {video.type}
          </div>
        </div>
        <div className="p-4 text-black">
          <h3 className="font-medium text-lg truncate">{video.title}</h3>
          <p className="text-sm text-gray-500">{video.duration}</p>
        </div>
      </div>
    </Link>
  );
};

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 mt-12">
      <h1 className="text-2xl font-bold mb-8">Your videos</h1>
      <VideoUploader />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
