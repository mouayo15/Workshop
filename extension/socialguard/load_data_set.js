import Papa from 'papaparse'; // Make sure to include PapaParse via CDN or npm

function loadWordsFromCSV() {
    // Chemin vers votre fichier CSV dans le dossier de l'extension
    const csvFilePath = chrome.runtime.getURL('dataset_mots_vulgaires.csv');

    fetch(csvFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Analyser les données CSV
            Papa.parse(data, {
                header: false, // Mettre à true si votre CSV a des en-têtes
                complete: function(results) {
                    const words = results.data.map(row => row.word); // Ajustez 'word' à votre nom de colonne réel

                    // Stocker les mots dans le stockage Chrome
                    chrome.storage.local.set({ words: words }, function() {
                        console.log('Words have been saved to storage:', words);
                    });
                    
                    updateWordList(words); // Mettre à jour votre interface utilisateur ou liste

                    // Récupérer les mots depuis chrome.storage.local
                    chrome.storage.local.get('words', function(result) {
                        const storedWords = result.words; // Accéder à la variable stockée
                        console.log('Stored words:', storedWords);
                    });
                }
            });
        })
        .catch(error => {
            console.error('Error fetching or parsing CSV file:', error);
        });
}

// Appeler la fonction pour charger les mots lorsque le script s'exécute
loadWordsFromCSV();
