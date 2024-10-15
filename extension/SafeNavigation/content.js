// Send a message to background.js to fetch forbidden words
chrome.runtime.sendMessage({ action: "fetchWords" }, function(response) {
    const forbiddenWords = response.forbiddenWords || [];

    // Function to replace words
    function censorText(text) {
        forbiddenWords.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            text = text.replace(regex, "****");
        });
        return text;
    }

    // Function to censor the page
    function censorPage() {
        const elements = document.querySelectorAll('body, body *');
        elements.forEach(el => {
            if (el.children.length === 0 && el.textContent) {
                el.textContent = censorText(el.textContent);
            }
        });
    }

    // Run censoring on the current page
    censorPage();

    // Observe the DOM for mutations and reapply censoring
    const observer = new MutationObserver(() => {
        censorPage();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Listen for messages to reapply censoring
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === "censor") {
            censorPage();
        }
    });

    // Reapply censoring when the window is resized
    window.addEventListener('resize', () => {
        censorPage();
    });
});
