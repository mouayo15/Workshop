const analyzeComment = async (comment) => {
    const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
    });
    const data = await response.json();
    return data.toxicity_score;
};

// Intercepter les commentaires (à personnaliser selon les sites)
document.querySelectorAll('.comment').forEach(commentElement => {
    const commentText = commentElement.innerText;
    analyzeComment(commentText).then(toxicityScore => {
        if (toxicityScore > 0.8) {
            commentElement.style.display = 'none'; // Masquer le commentaire
        }
    });
});


// Exécuter la fonction après le chargement de la page
document.addEventListener('DOMContentLoaded', filterComments);