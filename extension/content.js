// content.js

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

// Log the unique comments to the console
console.log(uniqueComments);
