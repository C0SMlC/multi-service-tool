"use client";
import React, { useState } from "react";
import { Menu, Close } from "@mui/icons-material";
import SidebarContent from "./SidebarContent";
import { sidebarItems } from "./SidebarData";

const Sidebar = () => {
  const [expandedSection, setExpandedSection] = useState({
    Dashboard: true,
    Tools: true,
  });

  const [selectedTool, setSelectedTool] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSection = (title) => {
    setExpandedSection((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const toggleToolExpansion = (toolName) => {
    setSelectedTool(selectedTool === toolName ? null : toolName);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={toggleMobileSidebar}
        className="md:hidden fixed bottom-4 left-4 z-50 bg-black rounded p-2"
      >
        {isMobileSidebarOpen ? <Close color="white" /> : <Menu color="white" />}
      </button>

      {/* Mobile Sidebar - Full Screen */}
      {isMobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-200 z-100 overflow-y-auto">
          <div className="p-4">
            <button
              onClick={toggleMobileSidebar}
              className="absolute top-4 right-4 bg-gray-300 p-2 rounded"
            >
              <Close />
            </button>

            <SidebarContent
              items={sidebarItems}
              expandedSection={expandedSection}
              selectedTool={selectedTool}
              onToggleSection={toggleSection}
              onToggleTool={toggleToolExpansion}
            />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block bg-gray-200 h-screen z-10 w-full overflow-y-auto">
        <SidebarContent
          items={sidebarItems}
          expandedSection={expandedSection}
          selectedTool={selectedTool}
          onToggleSection={toggleSection}
          onToggleTool={toggleToolExpansion}
        />
      </div>
    </>
  );
};

export default Sidebar;
