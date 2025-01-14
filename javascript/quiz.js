// Globale variabelen
var questions = [];
var currentQuestion = 0;
var score = 0;
var timeLeft = 15;
var timer;
var userAnswers = [];
var playerName = '';

// Voeg deze functie toe om URL parameters te lezen
function getQuizType() {
    // Gebruik het quiz type dat is ingesteld in de HTML
    return window.quizType || 'autoquiz';
}

// Laad de vragen wanneer de pagina start
function startQuiz() {
    // Haal de naam op uit localStorage
    playerName = localStorage.getItem('playerName');
    
    // Als er geen naam is opgeslagen, gebruik de naam uit het startscherm
    if (!playerName) {
        const nameInput = document.getElementById('playerNameInput');
        if (nameInput) {
            playerName = nameInput.value.trim();
            localStorage.setItem('playerName', playerName);
        }
    }
    
    // Als er nog steeds geen naam is, gebruik "Anoniem"
    if (!playerName) {
        playerName = "Anoniem";
    }
    
    var quizType = getQuizType();
    
    fetch('/JSON/tsconfig.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            questions = data[quizType]; // Laad de juiste quiz op basis van type
            shuffleQuestions();
            showQuestion();
        });
}

// Mix de vragen door elkaar
function shuffleQuestions() {
    for (var i = questions.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = questions[i];
        questions[i] = questions[j];
        questions[j] = temp;
    }
    
    // Hussel ook de antwoorden voor elke vraag
    questions.forEach(function(question) {
        var answers = question.options;
        // Onthoud het juiste antwoord
        var correctAnswer = question.correct_answer;
        
        // Hussel de antwoorden
        for (var i = answers.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = answers[i];
            answers[i] = answers[j];
            answers[j] = temp;
        }
        
        // Update het juiste antwoord naar de nieuwe positie
        question.correct_answer = correctAnswer;
    });
}

// Laat de vraag zien
function showQuestion() {
    if (currentQuestion >= questions.length) {
        showEndPopup();
        return;
    }

    var currentQuiz = questions[currentQuestion];
    
    // Update vraag tekst
    document.getElementById('questionText').innerHTML = 'Vraag ' + (currentQuestion + 1) + ': ' + currentQuiz.question;
    
    // Update afbeelding (NIEUW)
    var imageElement = document.getElementById('questionImage');
    if (currentQuiz.image) {
        imageElement.innerHTML = `<img src="${currentQuiz.image}" alt="Vraag afbeelding">`;
        imageElement.style.display = 'flex';
    } else {
        imageElement.style.display = 'none';
    }
    
    // Update antwoord knoppen
    document.getElementById('answerA').innerHTML = currentQuiz.options[0];
    document.getElementById('answerB').innerHTML = currentQuiz.options[1];
    document.getElementById('answerC').innerHTML = currentQuiz.options[2];
    document.getElementById('answerD').innerHTML = currentQuiz.options[3];
    
    // Update teamnaam (optioneel)
    document.getElementById('teamName').innerHTML = 'Vraag ' + (currentQuestion + 1) + ' van ' + questions.length;
    
    // Voeg click events toe aan knoppen
    var buttons = document.getElementsByClassName('answer-button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            checkAnswer(this.innerHTML);
        };
    }
    
    // Start de timer
    startTimer();
}

// Start de timer voor de vraag
function startTimer() {
    timeLeft = 15;
    clearInterval(timer);
    
    document.getElementById('timerText').innerHTML = timeLeft;
    
    timer = setInterval(function() {
        timeLeft = timeLeft - 1;
        document.getElementById('timerText').innerHTML = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            goToNextQuestion();
        }
    }, 1000);
}

// Controleer of het antwoord goed is
function checkAnswer(answer) {
    clearInterval(timer);
    
    // Sla het antwoord op
    userAnswers.push({
        question: questions[currentQuestion].question,
        userAnswer: answer,
        correctAnswer: questions[currentQuestion].correct_answer,
        isCorrect: answer === questions[currentQuestion].correct_answer,
        image: questions[currentQuestion].image
    });
    
    if (answer === questions[currentQuestion].correct_answer) {
        score = score + 1;
    }
    
    goToNextQuestion();
}

// Ga naar de volgende vraag
function goToNextQuestion() {
    currentQuestion = currentQuestion + 1;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showEndPopup();
    }
}

// Laat de popup zien aan het einde
function showEndPopup() {
    var quizType = getQuizType();
    // Haal bestaande scores op voor dit specifieke quiz type
    var highScores = JSON.parse(localStorage.getItem('highScores_' + quizType)) || [];
    
    // Voeg nieuwe score toe
    highScores.push({
        name: playerName,
        score: score,
        date: new Date().toISOString()
    });
    
    // Sorteer op score (hoogste eerst) en houd maximaal 10 scores
    highScores.sort(function(a, b) {
        return b.score - a.score;
    });
    highScores = highScores.slice(0, 10);
    
    // Sla high scores op voor dit specifieke quiz type
    localStorage.setItem('highScores_' + quizType, JSON.stringify(highScores));
    
    // Sla quiz resultaten op
    localStorage.setItem('quizResults', JSON.stringify({
        name: playerName,
        score: score,
        totalQuestions: questions.length,
        answers: userAnswers,
        quizType: quizType // Voeg quiz type toe aan resultaten
    }));
    
    // Redirect naar het resultaatscherm
    window.location.href = '/html/resultaatscherm.html?type=' + quizType;
}

// Start de quiz opnieuw
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    var popup = document.getElementById('popup');
    popup.classList.remove('show');
    shuffleQuestions();
    showQuestion();
}

// Event listeners voor de knoppen in de popup
document.getElementById('restartButton').onclick = restartQuiz;
document.getElementById('backButton').onclick = function() {
    window.location.href = '/';
};

// Start de quiz als de pagina geladen is
window.onload = startQuiz;