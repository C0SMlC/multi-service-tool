"use client";

import Navbar from "../../components/reels/Navbar";
import Sidebar from "../../components/Sidebar";
import { SidebarProvider } from "../../context/SidebarContext";

export default function ReelsLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <div className="md:w-[15%] md:min-w-[250px]">
            <Sidebar />
          </div>
          <div className="md:w-[85%] flex-1 z-60  bg-midGrey">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
