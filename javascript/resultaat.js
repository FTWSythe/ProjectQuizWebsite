window.onload = function() {
    // Haal de resultaten en naam op uit localStorage
    var results = JSON.parse(localStorage.getItem('quizResults'));
    var playerName = localStorage.getItem('playerName') || 'Anoniem';
    
    if (!results) {
        window.location.href = '/';
        return;
    }
    
    // Haal het quiz type op
    var quizType = results.quizType;
    var highScores = JSON.parse(localStorage.getItem('highScores_' + quizType)) || [];
    
    // Update de titel op basis van quiz type
    var quizTitles = {
        'autoquiz': 'Auto Logo Quiz',
        'flagquiz': 'Landen Vlaggen Quiz',
        'heroquiz': 'Superhelden Quiz'
    };
    document.querySelector('h1').textContent = 
        'Gefeliciteerd ' + playerName + ', je hebt de ' + quizTitles[quizType] + ' afgerond.';
    
    // Update de score
    document.querySelector('.score').textContent = results.score;
    document.querySelector('.max-score').textContent = results.totalQuestions;
    
    // Update het scoreboard
    var scoreboardList = document.querySelector('.scoreboard ol');
    scoreboardList.innerHTML = ''; // Maak het scoreboard leeg
    
    highScores.forEach(function(score, index) {
        var li = document.createElement('li');
        li.innerHTML = score.name + ' - ' + score.score + ' punten';
        
        if (index < 3) {
            li.classList.add('top-' + (index + 1));
        }
        
        scoreboardList.appendChild(li);
    });
    
    // Review sectie
    var reviewSection = document.querySelector('.review');
    reviewSection.innerHTML = '<h2>Hieronder kun je zien hoe je het gedaan hebt:</h2>';
    
    results.answers.forEach(function(answer, index) {
        var questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        
        questionDiv.innerHTML = 
            '<h3>Vraag ' + (index + 1) + ': ' + answer.question + '</h3>' +
            (answer.image ? '<img src="' + answer.image + '" alt="Vraag afbeelding" class="question-image">' : '') +
            '<p>Deze vraag had je <span class="result ' + (answer.isCorrect ? 'correct' : 'wrong') + '">' + 
            (answer.isCorrect ? 'goed' : 'fout') + '</span></p>' +
            '<p>Jouw antwoord: <span class="user-answer">' + answer.userAnswer + '</span></p>' +
            '<p>Het juiste antwoord: <span class="correct-answer">' + answer.correctAnswer + '</span></p>';
        
        reviewSection.appendChild(questionDiv);
    });
    
    // Update de retry knop met het juiste quiz type
    var retryButton = document.querySelector('.retry-button');
    var quizUrls = {
        'autoquiz': '/html/Quizzes/autoquiz.html',
        'flagquiz': '/html/Quizzes/countryquiz.html',
        'heroquiz': '/html/Quizzes/comicquiz.html'
    };
    retryButton.href = quizUrls[quizType] || '/html/Quizzes/autoquiz.html';
};