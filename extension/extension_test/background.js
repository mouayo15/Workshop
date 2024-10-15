// When the extension icon is clicked, open a new tab with the full page
chrome.action.onClicked.addListener(function () {
    chrome.tabs.create({
        url: chrome.runtime.getURL("popup.html")  // Opens the popup.html page in a new tab
    });
});
