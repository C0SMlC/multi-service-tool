"use client";

import React from "react";
import MainPage from "./MainPage";
const ReelGenerator = () => {
  return (
    <div className="flex-1 h-full min-h-screen p-4 md:p-6 bg-primary overflow-y-auto text-black">
      <h2 className="text-xl md:text-2xl font-bold mb-4 ">
        The Reel Generator.
      </h2>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-4xl py-16">
          <MainPage />
        </div>
      </div>
    </div>
  );
};

export default ReelGenerator;
