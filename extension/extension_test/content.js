// Fonction pour remplacer les mots
function censorText(text, callback) {
    // Retrieve the forbidden words list from chrome storage
    chrome.storage.local.get(["words"], function(result) {
        const forbiddenWords = result.words || [];

        // Iterate over the forbidden words and replace them in the text
        forbiddenWords.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');  // Use word boundaries to match whole words
            text = text.replace(regex, "****");  // Replace the word with ****
        });

        // Return the censored text via callback
        callback(text);
    });
}

// Fonction pour censurer les éléments textuels
function censorPage() {
    const elements = document.querySelectorAll('body, body *');
    elements.forEach(el => {
        if (el.children.length === 0 && el.textContent) {
            // Pass the current element's text content to the censorText function
            censorText(el.textContent, function(censoredText) {
                el.textContent = censoredText;  // Update the element's text content with the censored text
            });
        }
    });
}

// Exécuter le filtrage sur la page courante
censorPage();


// Observer les changements dans le DOM
const observer = new MutationObserver(() => {
    censorPage();
});

// Observer les changements dans le body
observer.observe(document.body, {
    childList: true,
    subtree: true
});
