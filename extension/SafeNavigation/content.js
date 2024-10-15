// Fonction pour remplacer les mots interdits
function censorText(text, forbiddenWords) {
    forbiddenWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        text = text.replace(regex, "****");
    });
    return text;
}

// Parcourir et censurer tous les éléments textuels de la page
function censorPage(forbiddenWords) {
    const elements = document.querySelectorAll('body, body *');
    elements.forEach(el => {
        if (el.children.length === 0 && el.textContent) {
            el.textContent = censorText(el.textContent, forbiddenWords);
        }
    });
}

// Charger la liste des mots interdits et censurer la page
chrome.storage.sync.get(['forbiddenWords'], function (data) {
    const forbiddenWords = data.forbiddenWords || [];
    censorPage(forbiddenWords);
});
