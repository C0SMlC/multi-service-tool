import React from "react";
import { useRouter } from "next/navigation";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const ToolItem = ({ tool, isExpanded, onToggle, currentPath }) => {
  const router = useRouter();

  const handleSubToolClick = (subTool) => {
    // Convert subTool to a route-friendly format
    const routePath = `/${tool.name.toLowerCase()}/${subTool
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
    router.push(routePath);
  };

  return (
    <div className="mb-2">
      <div
        className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
        onClick={onToggle}
      >
        <span>{tool.name}</span>
        {isExpanded ? (
          <KeyboardArrowUp className="text-sm text-gray-600" />
        ) : (
          <KeyboardArrowDown className="text-sm text-gray-600" />
        )}
      </div>

      {/* Tool Subtool Expansion */}
      {isExpanded && (
        <div className="pl-4 mt-2 space-y-1 transition-all duration-300 ease-in-out">
          {tool.subTools.map((subTool, subToolIndex) => (
            <div
              key={subToolIndex}
              onClick={() => handleSubToolClick(subTool)}
              className={`text-gray-600 hover:bg-gray-50 p-1 rounded cursor-pointer ${
                currentPath.includes(subTool.toLowerCase().replace(/\s+/g, "-"))
                  ? "bg-blue-100 font-semibold"
                  : ""
              }`}
            >
              {subTool}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolItem;
