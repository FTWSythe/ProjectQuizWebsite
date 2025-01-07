// Save name to localStorage on form submit
function saveName(e) {
    e.preventDefault(); // Prevent the form from submitting traditionally
    const name = document.getElementById('name').value;
    localStorage.setItem('playerName', name); // Save the name in localStorage
    window.location.href = "themascherm.html"; // Redirect to the next page
}

// Retrieve and display the name on the next page
function displayName() {
    const playerName = localStorage.getItem('playerName');
    if (playerName) {
        document.getElementById('teamName').textContent = playerName;
        document.getElementById('welcomeMessage').innerHTML = `Hallo ${playerName}, <br> Welke quiz wil je spelen?`;
    }
}

// Attach the saveName function to the form on the first page
if (document.getElementById('nameForm')) {
    document.getElementById('nameForm').addEventListener('submit', saveName);
}

// Call displayName when the second page loads
if (document.getElementById('teamName') && document.getElementById('welcomeMessage')) {
    displayName();
}

// Display the popup when the page loads
window.onload = function () {
    const popup = document.getElementById('popup');
    const closeButton = document.getElementById('closePopup');

    // Show the popup
    popup.classList.add('show');

    // Hide the popup when the close button is clicked
    closeButton.addEventListener('click', () => {
        popup.classList.remove('show');
    });
};

// Display the popup when the page loads
window.onload = function () {
    const popup = document.getElementById('popup');
    const closeButton = document.getElementById('closePopup');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const quizDescription = document.getElementById('quizDescription');

    // Show the popup
    popup.classList.add('show');

    // Add event listener for the close button
    closeButton.addEventListener('click', () => {
        // Hide the popup
        popup.classList.remove('show');

        // Show the welcome message and quiz description
        welcomeMessage.style.display = 'block';
        quizDescription.style.display = 'block';
    });
};
