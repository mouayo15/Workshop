// popup.js

document.getElementById('retrieveComments').addEventListener('click', () => {
    // Execute the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: retrieveComments
        }, (result) => {
            // Check if the result is available and handle it
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }
            // Extract comments from the result
            const comments = result[0]?.result || [];
            // Display the comments in the popup
            document.getElementById('comments').textContent = comments.join('\n');
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
