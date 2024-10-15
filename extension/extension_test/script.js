document.addEventListener("DOMContentLoaded", function() {
    // Sélectionne les éléments après que le DOM soit complètement chargé
    const wordInput = document.getElementById("word-input");
    const addWordButton = document.getElementById("add-word-button");
    const removeWordButton = document.getElementById("remove-word-button");
    const wordListElement = document.getElementById("word-list");
    const passwordInput = document.getElementById("password"); // Password input field
    const unlockButton = document.getElementById("unlock-button"); // Unlock button
    const correctPassword = "admin"; // Replace with your desired password

    // Charger la liste de mots à partir du stockage local
    chrome.storage.local.get(["words"], function(result) {
        const words = result.words || [];
        updateWordList(words);
    });

    // Déverrouiller la gestion des mots
    unlockButton.addEventListener("click", function() {
        const passwordValue = passwordInput.value.trim();
        if (passwordValue === correctPassword) {
            document.getElementById("word-management").style.display = "block"; // Show word management section
            alert("Accès autorisé!"); // Access granted message
        } else {
            alert("Mot de passe incorrect!"); // Incorrect password message
        }
    });

    // Ajouter des mots
    addWordButton.addEventListener("click", function() {
        const newWords = wordInput.value.trim();
        if (newWords) {
            const wordsToAdd = newWords.split(/\s+/); // Séparer les mots par espaces
            chrome.storage.local.get(["words"], function(result) {
                const words = result.words || [];
                let uniqueWords = wordsToAdd.filter(word => !words.includes(word)); // Garder seulement les mots uniques

                if (uniqueWords.length > 0) {
                    words.push(...uniqueWords); // Ajouter les mots uniques
                    chrome.storage.local.set({ words: words }, function() {
                        updateWordList(words);
                        wordInput.value = ""; // Clear input field
                    });
                } else {
                    alert("Tous les mots existent déjà dans la liste."); // All words already exist
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
                    wordInput.value = ""; // Clear input field
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
