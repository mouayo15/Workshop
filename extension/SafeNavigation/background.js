chrome.runtime.onInstalled.addListener(() => {
  console.log('SafeNavigation extension installed.');
});

// Listen for messages from content scripts to perform a fetch
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fetchWords") {
    fetchWords(sendResponse);  // Call the function to fetch data
    return true;  // Keeps the messaging channel open for sendResponse
  }
});

// Function to perform cross-origin fetch
function fetchWords(sendResponse) {
  fetch("https://example.com/forbidden-words")  // Replace with actual URL
    .then(response => response.json())
    .then(data => {
      // Send the result back to content.js
      sendResponse({ forbiddenWords: data });
    })
    .catch(error => {
      console.error('Error fetching forbidden words:', error);
      sendResponse({ forbiddenWords: [] });
    });
}
