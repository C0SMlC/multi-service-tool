import React from "react";
import SidebarSection from "./SidebarSection";

const SidebarContent = ({
  items,
  expandedSection,
  selectedTool,
  onToggleSection,
  onToggleTool,
  currentPath,
}) => {
  return (
    <div className="p-4 text-black">
      {items.map((section, index) => (
        <SidebarSection
          key={index}
          section={section}
          isExpanded={expandedSection[section.title]}
          selectedTool={selectedTool}
          onToggleSection={() => onToggleSection(section.title)}
          onToggleTool={onToggleTool}
          currentPath={currentPath}
        />
      ))}
    </div>
  );
};

export default SidebarContent;
