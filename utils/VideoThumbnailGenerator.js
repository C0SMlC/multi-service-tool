// utils/videoThumbnail.js
import { VideoThumbnailGenerator } from "browser-video-thumbnail-generator";

export const generateThumbnail = async (videoSrc) => {
  try {
    // Initialize the generator with the video source
    const generator = new VideoThumbnailGenerator(videoSrc);

    // Generate a single thumbnail
    const thumbnail = await generator.getThumbnail();

    console.log(thumbnail);

    // Revoke the URL after use to free memory
    // generator.revokeUrls();

    return thumbnail;
  } catch (error) {
    // Handle errors
    throw new Error(`Failed to generate thumbnail: ${error.message}`);
  }
};
