console.log("Content script works, injected");

var recorder = null;
function onAccessApproved(stream) {
  recorder = new MediaRecorder(stream);
  recorder.start();

  recorder.onstop = function () {
    stream.getTracks().forEach(function (track) {
      if (track.readyState === "live") {
        track.stop();
      }
    });
  };

  recorder.ondataavailable = function (event) {
    let recordedBlob = event.data;
    let url = URL.createObjectURL(recordedBlob);

    let a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "screen-recording.webm"; //mp4 format won't work

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "request_recording") {
    console.log("requesting recording");

    sendResponse(`Processed: ${message.action}`);

    navigator.mediaDevices
      .getDisplayMedia({
        audio: true,
        video: {
          width: 9999999999,
          height: 9999999999,
        },
      })
      .then((stream) => {
        onAccessApproved(stream);
      });
  }

  if (message.action === "stop_video") {
    console.log("stopping video");
    sendResponse(`Processed: ${message.action}`);
    if (!recorder) {
      console.log("no recorder");
    }
    recorder.stop();
  }
});
