document.addEventListener('DOMContentLoaded', function() {
    var readButton = document.getElementById('readText');
    readButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const tab = tabs[0];
            // Check if the URL starts with http:// or https://
            if (!tab.url.startsWith('http://') && !tab.url.startsWith('https://')) {
                document.getElementById('status').textContent = 'Cannot read text from this page.';
                return; // Stop execution if the URL is not http or https
            }
            // Programmatically inject the content script before sending the message
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                files: ['contentScript.js']
            }).then(() => {
                // After ensuring the script is injected, send the message
                chrome.tabs.sendMessage(tab.id, {action: "speakText"}, function(response) {
                    if (chrome.runtime.lastError) {
                        document.getElementById('status').textContent = "Error: " + chrome.runtime.lastError.message;
                    } else if (response) {
                        document.getElementById('status').textContent = response.message;
                    }
                });
            }).catch((error) => {
                console.error('Error injecting script: ', error);
            });
        });
    }, false);
});
