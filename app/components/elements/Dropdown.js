import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Info, Play, Volume2 } from "lucide-react";

export const CustomDropdown = ({
  items,
  selectedItem,
  onSelect,
  placeholder = "Select an item",
  className = "",
  itemClassName = "",
  renderItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeDescription, setActiveDescription] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveDescription(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedItemData = items.find((item) => item.value === selectedItem);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (item) => {
    onSelect(item.value);
    setIsOpen(false);
  };

  const defaultRenderItem = (item) => (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-2">
        {item.icon && <span>{item.icon}</span>}
        <span>{item.label}</span>
      </div>

      <div className="flex items-center space-x-2">
        {item.actionIcon && (
          <span className="text-gray-500 hover:text-blue-600 transition">
            {item.actionIcon}
          </span>
        )}
        {item.description && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveDescription(
                activeDescription === item.value ? null : item.value
              );
            }}
            onMouseEnter={() => setActiveDescription(item.value)}
            onMouseLeave={() => setActiveDescription(null)}
            className="text-gray-500 hover:text-blue-600 transition group relative"
          >
            <Info size={16} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
      <div
        onClick={toggleDropdown}
        className="w-full p-2 border rounded flex justify-between items-center cursor-pointer 
        hover:bg-gray-50 transition"
      >
        <span className="text-gray-700 flex items-center">
          {selectedItemData?.icon || null}
          <span className="ml-2">
            {selectedItemData ? selectedItemData.label : placeholder}
          </span>
        </span>

        <ChevronDown
          className={`w-4 h-4 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg"
          >
            {items.map((item) => (
              <div
                key={item.value}
                className={`
                  relative p-2 cursor-pointer transition 
                  ${
                    selectedItem === item.value
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-100"
                  }
                  ${itemClassName}
                `}
              >
                <div
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setHoveredItem(item.value)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {renderItem ? renderItem(item) : defaultRenderItem(item)}
                </div>

                {activeDescription === item.value && item.description && (
                  <div
                    className="absolute z-20 bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                      bg-black text-white text-xs rounded py-1 px-2 opacity-80"
                  >
                    {item.description}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDropdown;
