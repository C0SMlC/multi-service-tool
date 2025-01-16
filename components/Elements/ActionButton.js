import React, { useState } from "react";
import { gapi } from "gapi-script";
import { Upload } from "lucide-react";

const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
const API_KEY = "YOUR_API_KEY";
const SCOPES = "https://www.googleapis.com/auth/youtube.upload";

const AddToYouTubeButton = ({ videoUrl }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleAuth = () => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
        })
        .then(() => {
          const authInstance = gapi.auth2.getAuthInstance();
          if (!authInstance.isSignedIn.get()) {
            authInstance.signIn().then(uploadVideo);
          } else {
            uploadVideo();
          }
        });
    });
  };

  const uploadVideo = async () => {
    setIsUploading(true);
    try {
      const response1 = await fetch(videoUrl);
      const blob = await response1.blob();

      const metadata = {
        snippet: {
          title: "Uploaded Video",
          description: "Uploaded via my app",
          tags: ["tag1", "tag2"],
          categoryId: "22",
        },
        status: {
          privacyStatus: "public",
        },
      };

      const form = new FormData();
      form.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" })
      );
      form.append("file", blob);

      const response = await gapi.client.request({
        path: "https://www.googleapis.com/upload/youtube/v3/videos",
        method: "POST",
        params: {
          part: "snippet,status",
          uploadType: "multipart",
        },
        body: form,
      });

      console.log("Video uploaded successfully:", response);
      alert("Video uploaded successfully!");
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload the video.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <button
      className={`w-full py-3 ${
        isUploading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
      } text-white rounded-lg flex items-center justify-center gap-2`}
      onClick={handleAuth}
      disabled={isUploading}
    >
      {isUploading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
          Uploading...
        </>
      ) : (
        <>
          <Upload className="w-5 h-5" />
          Add to YouTube
        </>
      )}
    </button>
  );
};

export default AddToYouTubeButton;
