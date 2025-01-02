"use client";

import React from "react";
import MainPage from "./MainPage";
const ReelGenerator = () => {
  return (
    <div className="flex-1 h-full min-h-screen p-4 md:p-6 bg-midGrey overflow-y-auto text-black">
      <div className="w-full max-w-8xl mx-auto py-16 px-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4 ">
          The Reel Generator.
        </h2>
        <div>
          Sit esse veniam tempor reprehenderit deserunt cillum id dolore veniam
          voluptate aute enim. Nulla commodo quis veniam non qui nostrud labore
          exercitation eiusmod culpa duis. Eu mollit excepteur irure culpa
          aliqua consequat quis irure tempor elit. Ea incididunt irure nulla
          dolore do. Anim consequat aliqua sit magna occaecat sint amet fugiat.
          Culpa deserunt duis sint laborum mollit. Proident ipsum dolor ipsum
          amet sint occaecat. Nulla laborum amet esse nulla magna sit in dolore
          pariatur officia. Officia qui adipisicing amet nisi velit cillum
          cillum tempor veniam. Eiusmod irure exercitation ad magna labore
          cupidatat labore cillum enim amet nostrud sint exercitation. Minim
          aute occaecat deserunt dolor.
        </div>
      </div>
      <div className="flex items-center justify-center mb-16">
        <div className="w-full max-w-4xl mb-16">
          <MainPage />
        </div>
      </div>
    </div>
  );
};

export default ReelGenerator;
