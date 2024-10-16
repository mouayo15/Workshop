document.addEventListener("DOMContentLoaded", function() {
    // Sélectionne les éléments après que le DOM soit complètement chargé
    const wordInput = document.getElementById("word-input");
    const addWordButton = document.getElementById("add-word-button");
    const removeWordButton = document.getElementById("remove-word-button");
    const wordListElement = document.getElementById("word-list");
    const passwordInput = document.getElementById("password"); // Password input field
    const unlockButton = document.getElementById("unlock-button"); // Unlock button
    const correctPassword = "admin"; // Replace with your desired password
    const csvFilePath = "dataset_mots_vulgaires.csv";
    //charger la liste des mots à partir de dataset csv

    function klawiloadWordsFromCSV() {
        fetch(chrome.runtime.getURL(csvFilePath))
            .then(response => response.text())
            .then(text => {
                const words = text.split('\n').map(line => line.split(';')[0].trim());
                chrome.storage.local.set({ words: words }, function() {
                    updateWordList(words);
                });
            })
            .catch(error => console.error("Erreur lors du chargement du fichier CSV:", error));
    }


    function loadWordsFromCSV() {
        fetch(chrome.runtime.getURL(csvFilePath))
            .then(response => response.text())
            .then(text => {
                const newWords = text.split('\n').map(line => line.split(';')[0].trim());
    
                // Get the existing words from storage
                chrome.storage.local.get(["words"], function(result) {
                    const existingWords = result.words || [];
    
                    // Filter out any duplicates (words already present in storage)
                    const wordsToAdd = newWords.filter(word => !existingWords.includes(word));
    
                    // Combine the old and new words
                    const updatedWords = [...existingWords, ...wordsToAdd];
    
                    // Store the updated list back into storage
                    chrome.storage.local.set({ words: updatedWords }, function() {
                        updateWordList(updatedWords); // Update the displayed word list
                    });
                });
            })
            .catch(error => console.error("Erreur lors du chargement du fichier CSV:", error));
    }
    

    // Charger la liste de mots à partir du stockage local (ou depuis le CSV s'il n'y a pas de données)
    chrome.storage.local.get(["words"], function(result) {
        if (result.words && result.words.length > 0) {
            updateWordList(result.words);
        } else {
            loadWordsFromCSV();
        }
    });







 

    // Déverrouiller la gestion des mots
    unlockButton.addEventListener("click", function() {
        const passwordValue = passwordInput.value.trim();
        if (passwordValue === correctPassword) {
            document.getElementById("word-management").style.display = "block"; // Show word management section
            loadWordsFromCSV()
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
