import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const video = formData.get("video");
    const subtitles = formData.get("subtitles");

    const ffmpeg = new FFmpeg();
    await ffmpeg.load();

    const videoBuffer = await video.arrayBuffer();
    const subtitlesBuffer = await subtitles.arrayBuffer();

    await ffmpeg.writeFile("input.mp4", new Uint8Array(videoBuffer));
    await ffmpeg.writeFile("subtitles.srt", new Uint8Array(subtitlesBuffer));

    const styles = {
      fontName: formData.get("fontName") || "Arial",
      fontSize: formData.get("fontSize") || "24",
      fontColor: formData.get("fontColor") || "FFFFFF",
      bold: formData.get("bold") ? "1" : "1",
      italic: formData.get("italic") ? "1" : "0",
      borderWidth: formData.get("borderWidth") || "1",
      borderColor: formData.get("borderColor") || "000000",
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

    return new NextResponse(data, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": "attachment; filename=output.mp4",
      },
    });
  } catch (error) {
    console.error("Processing error:", error);
    return NextResponse.json(
      { error: "Video processing failed", details: error.message },
      { status: 500 }
    );
  }
};
