
document.addEventListener("DOMContentLoaded", function() {
    var popup = document.getElementById("popup");
    var closeButton = document.getElementsByClassName("close")[0];
    var actionButton = document.getElementById("action-button");

    // Close modal when clicking the close button
    closeButton.onclick = function() {
        popup.style.display = "none";
    };

    // Handle the action button click
    actionButton.onclick = function() {
        alert("Action taken!");
    };
});
