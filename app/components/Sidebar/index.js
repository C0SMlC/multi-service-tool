"use client";
import React from "react";
import { Menu, Close } from "@mui/icons-material";
import SidebarContent from "./SidebarContent";
import { sidebarItems } from "./SidebarData";
import { useSidebar } from "../../context/SidebarContext";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const {
    expandedSection,
    selectedTool,
    isMobileSidebarOpen,
    toggleSection,
    toggleToolExpansion,
    toggleMobileSidebar,
  } = useSidebar();
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={toggleMobileSidebar}
        className="md:hidden fixed bottom-4 left-4 z-50 text-black focus:outline-none rounded p-2"
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
              currentPath={pathname}
            />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block bg-primary h-screen z-10 w-full overflow-y-auto">
        <SidebarContent
          items={sidebarItems}
          expandedSection={expandedSection}
          selectedTool={selectedTool}
          onToggleSection={toggleSection}
          onToggleTool={toggleToolExpansion}
          currentPath={pathname}
        />
      </div>
    </>
  );
};

export default Sidebar;
