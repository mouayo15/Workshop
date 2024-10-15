document.addEventListener('DOMContentLoaded', function () {
    const wordListElement = document.getElementById('wordList');
    const newWordInput = document.getElementById('newWord');
    const addWordButton = document.getElementById('addWord');

    // Charger la liste de mots depuis le stockage
    chrome.storage.sync.get(['forbiddenWords'], function (data) {
        const forbiddenWords = data.forbiddenWords || [];
        updateWordList(forbiddenWords);
    });

    // Ajouter un mot à la liste
    addWordButton.addEventListener('click', function () {
        const newWord = newWordInput.value.trim();
        if (newWord) {
            chrome.storage.sync.get(['forbiddenWords'], function (data) {
                const forbiddenWords = data.forbiddenWords || [];
                forbiddenWords.push(newWord);
                chrome.storage.sync.set({ forbiddenWords: forbiddenWords }, function () {
                    updateWordList(forbiddenWords);
                });
            });
            newWordInput.value = '';
        }
    });

    // Mettre à jour la liste affichée
    function updateWordList(forbiddenWords) {
        wordListElement.innerHTML = '';
        forbiddenWords.forEach((word, index) => {
            const li = document.createElement('li');
            li.textContent = word;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Supprimer';
            removeButton.addEventListener('click', function () {
                forbiddenWords.splice(index, 1);
                chrome.storage.sync.set({ forbiddenWords: forbiddenWords }, function () {
                    updateWordList(forbiddenWords);
                });
            });
            li.appendChild(removeButton);
            wordListElement.appendChild(li);
        });
    }
});
