"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, Close } from "@mui/icons-material";
import SidebarContent from "./SidebarContent";
import { sidebarItems } from "./SidebarData";

const Sidebar = () => {
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState({
    Dashboard: true,
    Tools: true,
  });

  const [selectedTool, setSelectedTool] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // Reset expanded sections
    const newExpandedSection = { Dashboard: true, Tools: true };
    let toolToSelect = null;

    // Iterate through sidebar items to find matching route
    sidebarItems.forEach((section) => {
      if (section.title === "Dashboard") {
        section.subItems.forEach((item) => {
          if (pathname.includes(item.toLowerCase().replace(/\s+/g, "-"))) {
            newExpandedSection.Dashboard = true;
          }
        });
      } else if (section.title === "Tools") {
        section.subItems.forEach((tool) => {
          if (tool.subTools) {
            tool.subTools.forEach((subTool) => {
              if (
                pathname.includes(subTool.toLowerCase().replace(/\s+/g, "-"))
              ) {
                newExpandedSection.Tools = true;
                toolToSelect = tool.name;
              }
            });
          }
        });
      }
    });

    setExpandedSection(newExpandedSection);
    setSelectedTool(toolToSelect);
  }, [pathname]);

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
