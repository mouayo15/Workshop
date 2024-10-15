// Extract comment data from LinkedIn
let comments = [];
document.querySelectorAll('.comment-item__container').forEach((comment) => {
    let name = comment.getAttribute('data-actor-display-name');
    let text = comment.querySelector('.comment__body').innerText;
    comments.push({name: name, text: text});
});

// Send data to popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'getComments') {
        sendResponse({comments: comments});
    }
});
