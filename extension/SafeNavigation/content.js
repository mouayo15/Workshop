// Récupérer les mots censurés depuis le stockage
chrome.storage.sync.get("forbiddenWords", function(data) {
    const forbiddenWords = data.forbiddenWords || [];

    // Fonction pour remplacer les mots
    function censorText(text) {
        forbiddenWords.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            text = text.replace(regex, "****");
        });
        return text;
    }

    // Parcourir et censurer tous les éléments textuels de la page
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

    // Observer les mutations du DOM pour censurer les nouveaux éléments
    const observer = new MutationObserver(() => {
        censorPage();
    });

    // Configuration de l'observateur
    observer.observe(document.body, { childList: true, subtree: true });

    // Écouter les messages du popup
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === "censor") {
            censorPage(); // Censurer immédiatement lorsque le message est reçu
        }
    });

    // Écouter les événements de redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        censorPage(); // Censurer à nouveau lors du redimensionnement
    });
});
