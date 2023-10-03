document.addEventListener("DOMContentLoaded", () => {
  // get selectors of buttons
  const startVideoBtn = document.querySelector("button#start-recording");
  const stopVideoBtn = document.querySelector("button#stop-recording");

  // add event listeners
  startVideoBtn.addEventListener("click", () => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "request_recording" },
          function (response) {
            if (!chrome.runtime.lastError) {
              console.log(response);
            } else {
              console.log(chrome.runtime.lastError, "error line  19");
            }
          }
        );
      }
    );
  });

  stopVideoBtn.addEventListener("click", () => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "stop_video" },
          function (response) {
            if (!chrome.runtime.lastError) {
              console.log(response);
            } else {
              console.log(chrome.runtime.lastError, "error line  39");
            }
          }
        );
      }
    );
  });
});
