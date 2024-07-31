// Initialize game variables
let score = 0;
let currentQuestionIndex = 0;
let difficultyLevel = '';
let consecutiveCorrectAnswers = 0;
let timer;
let timeLeft = 15;
let gameEnded = false;
let startTime;

const questions = {
    easy: [
        { question: 'What is the capital of France?', answers: ['Paris', 'London', 'Berlin', 'Rome'], correct: 0 },
        { question: 'What is 2 + 2?', answers: ['3', '4', '5', '6'], correct: 1 },
        { question: 'What color is the sky?', answers: ['Red', 'Green', 'Blue', 'Yellow'], correct: 2 }
    ],
    medium: [
        { question: 'What is the capital of Germany?', answers: ['Vienna', 'Berlin', 'Madrid', 'Lisbon'], correct: 1 },
        { question: 'What is 5 x 6?', answers: ['28', '30', '32', '34'], correct: 1 },
        { question: 'What color is grass?', answers: ['Blue', 'Green', 'Red', 'Yellow'], correct: 1 }
    ],
    hard: [
        { question: 'What is the capital of Japan?', answers: ['Seoul', 'Tokyo', 'Beijing', 'Bangkok'], correct: 1 },
        { question: 'What is the square root of 64?', answers: ['6', '7', '8', '9'], correct: 2 },
        { question: 'What is the chemical symbol for gold?', answers: ['Ag', 'Au', 'Pb', 'Fe'], correct: 1 }
    ]
};

let questionDisplay = document.getElementById('question');
let answersContainer = document.getElementById('answers');
let scoreDisplay = document.getElementById('score');
let timerDisplay = document.getElementById('timer');
let usernameDisplay = document.getElementById('username');
let bestScoreDisplay = document.getElementById('best-score');

let correctSound = document.getElementById('correct-sound');
let incorrectSound = document.getElementById('incorrect-sound');
let gameOverSound = document.getElementById('game-over-sound');
let backgroundMusic = document.getElementById('background-music');

// Load user data
function loadUserData() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        usernameDisplay.textContent = currentUser.username;
        bestScoreDisplay.textContent = currentUser.triviaBestScore || 0;
    }
}

// Save user data
function saveUserData(score) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (currentUser) {
        if (score > (currentUser.triviaBestScore || 0)) {
            currentUser.triviaBestScore = score;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            const userIndex = users.findIndex(user => user.username === currentUser.username);
            if (userIndex !== -1) {
                users[userIndex] = currentUser;
                localStorage.setItem('users', JSON.stringify(users));
            }
            bestScoreDisplay.textContent = score;
        }
    }
}

// Navigate to home page
function goHome() {
    window.location.href = '../../homePage/homePage.html';
}

document.getElementById('home-button').addEventListener('click', goHome);

function startGame(selectedLevel) {
    difficultyLevel = selectedLevel;
    resetGame();
}

function loadQuestion() {
    if (gameEnded) return;
    
    let currentQuestions = questions[difficultyLevel];
    let currentQuestion = currentQuestions[currentQuestionIndex];
    
    questionDisplay.textContent = currentQuestion.question;
    answersContainer.innerHTML = '';

    currentQuestion.answers.forEach((answer, index) => {
        let button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => checkAnswer(index, button));
        answersContainer.appendChild(button);
    });
    
    resetTimer();
    startTimer();
}

function checkAnswer(selectedIndex, selectedButton) {
    if (gameEnded) return;

    let currentQuestions = questions[difficultyLevel];
    let currentQuestion = currentQuestions[currentQuestionIndex];

    clearInterval(timer);

    Array.from(answersContainer.children).forEach((button, index) => {
        if (index === currentQuestion.correct) {
            button.classList.add('correct');
        } else if (index === selectedIndex) {
            button.classList.add('incorrect');
        }
        button.disabled = true;
    });

    if (selectedIndex === currentQuestion.correct) {
        correctSound.play();
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
        consecutiveCorrectAnswers++;

        if (consecutiveCorrectAnswers >= 2 && difficultyLevel !== 'hard') {
            increaseDifficulty();
        }
    } else {
        incorrectSound.play();
        consecutiveCorrectAnswers = 0;
        decreaseDifficulty();
    }

    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < currentQuestions.length) {
            loadQuestion();        
        } else {
            gameOver();
        }
    }, 2000);
}

function increaseDifficulty() {
    if (difficultyLevel === 'easy') {
        difficultyLevel = 'medium';
    } else if (difficultyLevel === 'medium') {
        difficultyLevel = 'hard';
    }
    currentQuestionIndex = 0;
}

function decreaseDifficulty() {
    if (difficultyLevel === 'hard') {
        difficultyLevel = 'medium';
    } else if (difficultyLevel === 'medium') {
        difficultyLevel = 'easy';
    }
    currentQuestionIndex = 0;
}

function resetGame() {
    document.getElementById('game-over')?.remove();
    score = 0;
    scoreDisplay.textContent = 'Score: ' + score;
    consecutiveCorrectAnswers = 0;
    currentQuestionIndex = 0;
    gameEnded = false;
    startTime = Date.now();
    loadQuestion();
    loadUserData();
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timerDisplay.textContent = 'Time left: ' + timeLeft + 's';
    timerDisplay.style.color = 'black';
}

function startTimer() {
    startTime = Date.now();
    timer = setInterval(() => {
        backgroundMusic.play();
        timeLeft--;
        timerDisplay.textContent = 'Time left: ' + timeLeft + 's';

        if (timeLeft <= 10) {
            timerDisplay.style.color = 'red';
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            backgroundMusic.pause();
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    gameEnded = true;
    gameOverSound.play();
    let timeTaken = Math.floor((Date.now() - startTime) / 1000);

    questionDisplay.textContent = '';
    answersContainer.innerHTML = '';
    timerDisplay.textContent = '';

    let gameOverMessage = document.createElement('div');
    gameOverMessage.id = 'game-over';
    gameOverMessage.innerHTML = `
        <h1>Game Over!</h1>
        <p>Your score: ${score}</p>
        <p>Time taken: ${timeTaken} seconds</p>
        <button onclick="resetGame()">Play Again</button>
    `;
    document.body.appendChild(gameOverMessage);

    saveUserData(score);
}

document.addEventListener('DOMContentLoaded', () => {
    startGame('easy');
});
