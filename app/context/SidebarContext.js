"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { sidebarItems } from "../components/Sidebar/SidebarData";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
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
    <SidebarContext.Provider
      value={{
        expandedSection,
        selectedTool,
        isMobileSidebarOpen,
        toggleSection,
        toggleToolExpansion,
        toggleMobileSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);
