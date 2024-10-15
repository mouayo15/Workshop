const API_KEY = "AIzaSyAmRU7uVucRsa0qucytOtHNTyyYDDLkjaM";

async function analyzeText(text) {
    try {
        const response = await fetch('https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=' + API_KEY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment: { text: text },
                languages: ['en'],
                requestedAttributes: { TOXICITY: {} }
            })
        });

        const data = await response.json();
        return data.attributeScores.TOXICITY.summaryScore.value;

    } catch (error) {
        console.error('Error:', error);
    }
}

(async () => {
    const toxicityScore = await analyzeText("fils de pute");
    console.log("Toxicity Score:", toxicityScore);
})();
