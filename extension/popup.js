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
                languages: ['fr'],
                requestedAttributes: { TOXICITY: {} }
            })
        });

        const data = await response.json();
        return data.attributeScores.TOXICITY.summaryScore.value;

    } catch (error) {
        console.error('Error:', error);
    }
}

document.getElementById('retrieveComments').addEventListener('click', async () => {
    // Execute the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: retrieveComments
        }, async (result) => {
            // Check if the result is available and handle it
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }
            // Extract comments from the result
            const comments = result[0]?.result || [];
            
            // Clear previous comments
            const commentsContainer = document.getElementById('comments-container');
            commentsContainer.innerHTML = '';

            // Analyze toxicity for each comment and store results
            const toxicityScores = await Promise.all(comments.map(comment => analyzeText(comment)));

            // Create comment elements with progress bars
            comments.forEach((comment, index) => {
                const score = toxicityScores[index];
                const percentage = score !== undefined ? (score * 100).toFixed(2) : 0;

                // Create comment element
                const commentElement = document.createElement('div');
                commentElement.className = 'comment';
                commentElement.textContent = `${comment} toxicity: ${percentage}%`;

                // Create progress bar element
                const progressContainer = document.createElement('div');
                progressContainer.className = 'progress';

                const progressBar = document.createElement('div');
                progressBar.className = 'progress-bar';
                progressBar.style.width = `${percentage}%`;

                // Append elements
                progressContainer.appendChild(progressBar);
                commentElement.appendChild(progressContainer);
                commentsContainer.appendChild(commentElement);
            });
        });
    });
});



function retrieveComments() {
    // Select all elements that contain the comments
    const commentElements = document.querySelectorAll('.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj');

    // Extract and log the text content of each comment
    const comments = Array.from(commentElements).map(element => {
        const commentText = element.querySelector('span._ap3a._aaco._aacu._aacx._aad7._aade')?.innerText;
        return commentText || 'No comment text found';
    });

    // Filter out the 'No comment text found' entries and empty comments
    const filteredComments = comments.filter(comment => comment !== 'No comment text found' && comment.trim() !== '');

    // Use a Set to remove duplicates
    const uniqueComments = [...new Set(filteredComments)];

    // Return the unique comments to the popup
    return uniqueComments;
}
