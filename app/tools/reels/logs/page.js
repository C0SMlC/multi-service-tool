"use client";

import React, { useState, useRef, useEffect } from "react";

const VideoSubtitleBurner = () => {
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState("");
  const [FFmpeg, setFFmpeg] = useState(null);
  const ffmpegRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    const loadFFmpegModule = async () => {
      try {
        const { FFmpeg } = await import("@ffmpeg/ffmpeg");
        const { fetchFile } = await import("@ffmpeg/util");

        // Only store the necessary functions
        setFFmpeg({
          FFmpeg,
          fetchFile,
        });
      } catch (error) {
        console.error("Error loading FFmpeg module:", error);
        setStatus("Error loading FFmpeg module");
      }
    };

    loadFFmpegModule();
  }, []);

  const load = async () => {
    try {
      if (!FFmpeg) return;

      ffmpegRef.current = new FFmpeg.FFmpeg();

      ffmpegRef.current.on("log", ({ message }) => {
        if (messageRef.current) {
          messageRef.current.innerHTML = message;
        }
        console.log(message);
      });

      // Load the FFmpeg core
      await ffmpegRef.current.load();

      setLoaded(true);
      setStatus("FFmpeg loaded successfully");
    } catch (error) {
      setStatus(`Error loading FFmpeg: ${error.message}`);
      console.error("FFmpeg load error:", error);
    }
  };

  const processVideo = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const video = formData.get("video");
    const subtitles = formData.get("subtitles");

    if (!video || !subtitles) {
      setStatus("Please select both video and subtitle files");
      return;
    }

    try {
      setStatus("Processing...");
      const ffmpeg = ffmpegRef.current;

      await ffmpeg.writeFile("input.mp4", await FFmpeg.fetchFile(video));
      await ffmpeg.writeFile(
        "subtitles.srt",
        await FFmpeg.fetchFile(subtitles)
      );

      const styles = {
        fontName: formData.get("fontName") || "Arial",
        fontSize: formData.get("fontSize") || "24",
        fontColor: formData.get("fontColor")?.replace("#", "") || "FFFFFF",
        bold: formData.get("bold") ? "1" : "0",
        italic: formData.get("italic") ? "1" : "0",
        borderWidth: formData.get("borderWidth") || "1",
        borderColor: formData.get("borderColor")?.replace("#", "") || "000000",
        alignment: formData.get("alignment") || "2",
      };

      const styleString =
        `subtitles=subtitles.srt:force_style='` +
        `FontName=${styles.fontName},` +
        `Fontsize=${styles.fontSize},` +
        `PrimaryColour=&H${styles.fontColor}&,` +
        `Bold=${styles.bold},` +
        `Italic=${styles.italic},` +
        `BorderStyle=1,` +
        `Outline=${styles.borderWidth},` +
        `OutlineColour=&H${styles.borderColor}&,` +
        `Alignment=${styles.alignment}'`;

      await ffmpeg.exec(["-i", "input.mp4", "-vf", styleString, "output.mp4"]);

      const data = await ffmpeg.readFile("output.mp4");
      const blob = new Blob([data.buffer], { type: "video/mp4" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "video-with-subtitles.mp4";
      a.click();

      setStatus("Processing complete!");
    } catch (error) {
      setStatus(`Error processing video: ${error.message}`);
      console.error("Processing error:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Video Subtitle Burner</h2>
      </div>

      <div className="p-4">
        {!FFmpeg ? (
          <p>Loading FFmpeg module...</p>
        ) : !loaded ? (
          <button
            onClick={load}
            className="w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Load FFmpeg Core (~31 MB)
          </button>
        ) : (
          <form onSubmit={processVideo} className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold">Video File</label>
              <input
                type="file"
                id="video"
                name="video"
                accept="video/*"
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Subtitle File (.srt)
              </label>
              <input
                type="file"
                id="subtitles"
                name="subtitles"
                accept=".srt"
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold">Font</label>
                <input
                  type="text"
                  id="fontName"
                  name="fontName"
                  defaultValue="Arial"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Font Size</label>
                <input
                  type="number"
                  id="fontSize"
                  name="fontSize"
                  defaultValue="24"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Font Color</label>
                <input
                  type="color"
                  id="fontColor"
                  name="fontColor"
                  defaultValue="#FFFFFF"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Border Color</label>
                <input
                  type="color"
                  id="borderColor"
                  name="borderColor"
                  defaultValue="#000000"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="bold"
                  name="bold"
                  className="w-4 h-4"
                />
                <label htmlFor="bold">Bold</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="italic"
                  name="italic"
                  className="w-4 h-4"
                />
                <label htmlFor="italic">Italic</label>
              </div>

              <div>
                <label className="block mb-2 font-semibold">Border Width</label>
                <input
                  type="number"
                  id="borderWidth"
                  name="borderWidth"
                  defaultValue="1"
                  min="0"
                  max="10"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Process Video
            </button>
          </form>
        )}

        <p ref={messageRef} className="mt-4 text-sm text-gray-600"></p>

        {status && <p className="mt-4 text-center font-semibold">{status}</p>}
      </div>
    </div>
  );
};

export default VideoSubtitleBurner;
