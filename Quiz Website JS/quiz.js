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
    // Add up to 10 questions
    // {
    //     question: "Another Question",
    //     image: "/images/car_logo3.png",
    //     answers: ["Answer A", "Answer B", "Answer C", "Answer D"],
    //     correct: 0
    // }
];

// DOM Elements
const questionElement = document.querySelector('h1');
const imageElement = document.querySelector('.image-placeholder img');
const answerButtons = document.querySelectorAll('.answer-button');
const timerElement = document.querySelector('.timer span');
const popup = document.getElementById('popup');
const closePopupButton = document.getElementById('closePopup');
const quizContainer = document.querySelector('.quiz-container');

// State Variables
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeRemaining = 30; // Time for each question in seconds

// Function to Start Timer
function startTimer() {
    timeRemaining = 30; // Reset timer for the new question
    timer = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            showFailPopup();
        }
    }, 1000);
}

// Function to Show the Current Question
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];

    questionElement.textContent = `Vraag ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    imageElement.src = currentQuestion.image; // Image for the question
    answerButtons.forEach((button, index) => {
        button.textContent = currentQuestion.answers[index];
        button.onclick = () => handleAnswerSelection(index);
    });

    startTimer();
}

// Function to Handle Answer Selection
function handleAnswerSelection(selectedAnswerIndex) {
    const correctAnswerIndex = quizData[currentQuestionIndex].correct;

    // Check if the selected answer is correct
    if (selectedAnswerIndex === correctAnswerIndex) {
        score++;
    }

    // Move to the next question
    currentQuestionIndex++;

    // If there are more questions, load the next one
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        // If it's the last question, redirect to the end page
        window.location.href = "ENDPAGE.html"; // Modify this link later
    }
}

// Function to Show Fail Popup (when timer runs out)
function showFailPopup() {
    popup.classList.add('show');
}

// Function to Close Fail Popup
function closeFailPopup() {
    popup.classList.remove('show');
}

// Function to Restart Quiz or Go Back to Theme Selection
function handleFailPopupAction(action) {
    if (action === 'restart') {
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion();
        closeFailPopup();
    } else if (action === 'back') {
        window.location.href = "themascherm.html"; // Redirect to the theme selection page
    }
}

// Add event listeners to the buttons in the fail popup
closePopupButton.addEventListener('click', closeFailPopup);
document.getElementById('restartButton').addEventListener('click', () => handleFailPopupAction('restart'));
document.getElementById('backButton').addEventListener('click', () => handleFailPopupAction('back'));

// Start the quiz when the page loads
window.onload = function () {
    loadQuestion(); // Load the first question when the page is loaded
};
