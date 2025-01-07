// Quiz Data
const quizData = [
    {
        question: "What car company does this logo represent?",
        image: "/images/car_logo1.png", // Replace with your actual image path
        answers: ["Toyota", "Ford", "BMW", "Tesla"],
        correct: 2 // Index of the correct answer (0-based)
    },
    {
        question: "What car company does this logo represent?",
        image: "/images/car_logo2.png", // Replace with your actual image path
        answers: ["Honda", "Audi", "Chevrolet", "Mercedes-Benz"],
        correct: 1
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let timer;
let timeRemaining = 30; // Timer duration for each question

// Load the next question
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];

    document.getElementById('questionText').textContent = `Vraag ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    document.getElementById('questionImage').src = currentQuestion.image;

    const answerButtons = document.querySelectorAll('.answer-button');
    answerButtons.forEach((button, index) => {
        button.textContent = currentQuestion.answers[index];
        button.onclick = () => handleAnswerSelection(index);
    });

    startTimer();
}

// Handle the answer selection
function handleAnswerSelection(selectedIndex) {
    const correctAnswerIndex = quizData[currentQuestionIndex].correct;

    if (selectedIndex === correctAnswerIndex) {
        // Correct answer selected
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        window.location.href = "ENDPAGE.html"; // Go to the end page
    }
}

// Start the timer
function startTimer() {
    timeRemaining = 30;
    document.getElementById('timerText').textContent = timeRemaining;

    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById('timerText').textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            showFailPopup();
        }
    }, 1000);
}

// Show fail popup
function showFailPopup() {
    document.getElementById('popup').classList.add('show');
}

// Restart or go back to the theme selection
document.getElementById('restartButton').addEventListener('click', () => {
    currentQuestionIndex = 0;
    loadQuestion();
    document.getElementById('popup').classList.remove('show');
});

document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = "themascherm.html"; // Go back to the theme selection page
});

// Initialize the quiz when the page loads
window.onload = function () {
    loadQuestion();
};
