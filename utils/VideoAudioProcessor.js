export class WebAudioVideoProcessor {
  constructor() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
  }

  async fetchAndDecodeAudio(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  async combineVideoWithAudio(videoUrl, audioUrl) {
    // Create a MediaRecorder to capture the combined stream
    const videoElement = document.createElement("video");
    videoElement.src = videoUrl;
    await new Promise((resolve) => {
      videoElement.addEventListener("loadedmetadata", resolve);
    });

    const videoDuration = videoElement.duration;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const audioBuffer = await this.fetchAndDecodeAudio(audioUrl);
    const audioSource = this.audioContext.createBufferSource();
    audioSource.buffer = audioBuffer;
    audioSource.loop = true;
    audioSource.connect(this.audioContext.destination);

    const canvasStream = canvas.captureStream();
    const audioStream = this.audioContext.createMediaStreamDestination().stream;
    const combinedStream = new MediaStream([
      ...canvasStream.getVideoTracks(),
      ...audioStream.getTracks(),
    ]);

    const chunks = [];
    const mediaRecorder = new MediaRecorder(combinedStream, {
      mimeType: "video/webm;codecs=vp8,opus",
    });

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

    return new Promise((resolve) => {
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        resolve(URL.createObjectURL(blob));
      };

      mediaRecorder.start();
      videoElement.play();
      audioSource.start();

      const drawFrame = () => {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        if (!videoElement.ended) {
          requestAnimationFrame(drawFrame);
        } else {
          mediaRecorder.stop();
          audioSource.stop();
          videoElement.remove();
          canvas.remove();
        }
      };

      drawFrame();
    });
  }
}
