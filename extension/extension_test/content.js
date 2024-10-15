// Liste de mots interdits
const forbiddenWords = ["ماشالا", "algérien", "He got some Beard things are changing"];

// Fonction pour remplacer les mots
function censorText(text) {
    forbiddenWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        text = text.replace(regex, "****");
    });
    return text;
}

// Fonction pour censurer les éléments textuels
function censorPage() {
    const elements = document.querySelectorAll('body, body *');
    elements.forEach(el => {
        if (el.children.length === 0 && el.textContent) {
            el.textContent = censorText(el.textContent);
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
