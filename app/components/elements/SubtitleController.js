import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const SubtitleControls = ({
  showSubtitles,
  onToggleSubtitles,
  subtitleStyle,
  onStyleChange,
}) => {
  const styles = ["Default", "Large", "Small", "Fancy"];
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);

  return (
    <div className="space-y-4 text-black">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-black">Add Subtitles</span>
        <button
          onClick={onToggleSubtitles}
          className={`w-12 h-6 rounded-full transition-colors duration-200 ${
            showSubtitles ? "bg-green-500" : "bg-gray-200"
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white transform transition-transform duration-200 ${
              showSubtitles ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
      {showSubtitles && (
        <div className="relative">
          <button
            onClick={() => setShowStyleDropdown(!showStyleDropdown)}
            className="w-full px-4 py-2 text-sm text-left border rounded-lg flex items-center justify-between "
          >
            <span>Subs Style: {subtitleStyle}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {showStyleDropdown && (
            <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
              {styles.map((style) => (
                <button
                  key={style}
                  onClick={() => {
                    onStyleChange(style);
                    setShowStyleDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                >
                  {style}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
