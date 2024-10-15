chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchComments") {
        const comments = [];
        const commentElements = document.querySelectorAll('li.comment-item__container');
        
        commentElements.forEach((comment) => {
            const author = comment.getAttribute('data-actor-display-name');
            const timeAgo = comment.querySelector('.comment__duration-since')?.innerText.trim();
            const content = comment.querySelector('.comment__body')?.innerText.trim();

            comments.push({
                author,
                timeAgo,
                content
            });
        });

        sendResponse({ comments });
    }
});