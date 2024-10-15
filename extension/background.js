chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.comments) {
        chrome.storage.local.set({ comments: message.comments });
    }
});
