document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { message: 'getComments' }, (response) => {
            let commentsDiv = document.getElementById('comments');
            response.comments.forEach(comment => {
                let commentElem = document.createElement('div');
                commentElem.classList.add('comment');
                commentElem.innerHTML = `<strong>${comment.name}</strong>: ${comment.text}`;
                commentsDiv.appendChild(commentElem);
            });
        });
    });
});
