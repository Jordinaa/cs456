console.log("Background script loaded.");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "speakText" && request.text) {
      chrome.tts.speak(request.text, { rate: 1.0 });
    }
  });
  