document.addEventListener("DOMContentLoaded", function() {
    // Sélectionne les éléments après que le DOM soit complètement chargé
    const wordInput = document.getElementById("word-input");
    const addWordButton = document.getElementById("add-word-button");
    const removeWordButton = document.getElementById("remove-word-button");
    const wordListElement = document.getElementById("word-list");

    // Charger la liste de mots à partir du stockage local
    chrome.storage.local.get(["words"], function(result) {
        const words = result.words || [];
        updateWordList(words);
    });

    // Ajouter un mot
    addWordButton.addEventListener("click", function() {
        const newWord = wordInput.value.trim();
        if (newWord) {
            chrome.storage.local.get(["words"], function(result) {
                const words = result.words || [];
                if (!words.includes(newWord)) {
                    words.push(newWord);
                    chrome.storage.local.set({ words: words }, function() {
                        updateWordList(words);
                        wordInput.value = "";  // Clear input field
                    });
                } else {
                    alert("Word already exists in the list.");
                }
            });
        }
    });

    // Supprimer un mot
    removeWordButton.addEventListener("click", function() {
        const wordToRemove = wordInput.value.trim();
        if (wordToRemove) {
            chrome.storage.local.get(["words"], function(result) {
                let words = result.words || [];
                words = words.filter(word => word !== wordToRemove);
                chrome.storage.local.set({ words: words }, function() {
                    updateWordList(words);
                    wordInput.value = "";  // Clear input field
                });
            });
        }
    });

    // Mettre à jour l'affichage de la liste des mots
    function updateWordList(words) {
        wordListElement.innerHTML = "";
        words.forEach(word => {
            const li = document.createElement("li");
            li.textContent = word;
            wordListElement.appendChild(li);
        });
    }
});
