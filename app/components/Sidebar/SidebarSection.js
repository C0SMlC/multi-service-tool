import React from "react";
import { useRouter } from "next/navigation";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import ToolItem from "./ToolItem";

const SidebarSection = ({
  section,
  isExpanded,
  selectedTool,
  onToggleSection,
  onToggleTool,
  currentPath,
}) => {
  const router = useRouter();

  const handleDashboardItemClick = (item) => {
    // Convert item to a route-friendly format
    const routePath = `/${item.toLowerCase().replace(/\s+/g, "-")}`;
    router.push(routePath);
  };

  return (
    <div className="mb-4 mt-12">
      {/* Section Header */}
      <div
        className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-300 rounded transition-colors"
        onClick={onToggleSection}
      >
        <h3 className="font-medium text-lg">{section.title}</h3>
        {isExpanded ? (
          <KeyboardArrowUp className="text-gray-600" />
        ) : (
          <KeyboardArrowDown className="text-gray-600" />
        )}
      </div>

      {/* Section Content */}
      {isExpanded && (
        <div className="pl-4 mt-2 space-y-2">
          {section.title === "Dashboard"
            ? // Dashboard Items
              section.subItems.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  onClick={() => handleDashboardItemClick(item)}
                  className={`text-gray-700 hover:bg-gray-100 p-2 rounded transition-colors cursor-pointer ${
                    currentPath.includes(
                      item.toLowerCase().replace(/\s+/g, "-")
                    )
                      ? "bg-blue-100 font-semibold"
                      : ""
                  }`}
                >
                  {item}
                </div>
              ))
            : // Tools Section with Nested Expansion
              section.subItems.map((tool, toolIndex) => (
                <ToolItem
                  key={toolIndex}
                  tool={tool}
                  isExpanded={selectedTool === tool.name}
                  onToggle={() => onToggleTool(tool.name)}
                  currentPath={currentPath}
                />
              ))}
        </div>
      )}
    </div>
  );
};

export default SidebarSection;
