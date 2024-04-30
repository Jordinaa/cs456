// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "speakText") {
      // Get the highlighted text
      const text = window.getSelection().toString();
      if (text) {
          // Use the Web Speech API to read the text aloud
          const utterance = new SpeechSynthesisUtterance(text);
          speechSynthesis.speak(utterance);
          sendResponse({status: "Success", message: "Text is being read aloud."});
      } else {
          sendResponse({status: "Failure", message: "No text was highlighted."});
      }
  }
  return true; // Indicate that the response is asynchronous
});
