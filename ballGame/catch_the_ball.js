// Initialize game variables
let score = 0;
let timeLeft = 15;
let ball = document.getElementById('ball');
let scoreDisplay = document.getElementById('score');
let timerDisplay = document.getElementById('timer');
let usernameDisplay = document.getElementById('username');
let bestScoreDisplay = document.getElementById('best-score');

let touchSound = document.getElementById('touch-sound');
let gameOverSound = document.getElementById('game-over-sound');
let startAgainSound = document.getElementById('start-again-sound');
let backgroundMusic = document.getElementById('background-music');

// Load user data
function loadUserData() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        usernameDisplay.textContent = currentUser.username;
        bestScoreDisplay.textContent = currentUser.ballBestScore || 0;
    }
}

// Save user data
function saveUserData(score) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (currentUser) {
        if (score > (currentUser.ballBestScore || 0)) {
            currentUser.ballBestScore = score;
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

function moveBall() {
    let gameContainer = document.querySelector('.game-container');
    let maxX = gameContainer.clientWidth - ball.clientWidth;
    let maxY = gameContainer.clientHeight - ball.clientHeight;

    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);

    ball.style.left = randomX + 'px';
    ball.style.top = randomY + 'px';
}

function updateTimer() {
    timerDisplay.textContent = 'Time: ' + timeLeft + 's';

    timerDisplay.style.color = timeLeft < 10 ? 'red' : 'black';
}

function startGame() {
    moveBall();
    loadUserData();
    backgroundMusic.play();

    let timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            backgroundMusic.pause();
            gameOverSound.play();
            saveUserData(score);
            displayGameOver();
        }
    }, 1000);
}

ball.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = 'Score: ' + score;
    moveBall();
    touchSound.play();
});

function displayGameOver() {
    let gameOverMessage = document.createElement('div');
    gameOverMessage.id = 'game-over';
    gameOverMessage.innerHTML = `
        <h1>Game Over!</h1>
        <p>Your score: ${score}</p>
        <p>Best Score: ${bestScoreDisplay.textContent}</p>
        <button onclick="resetGame()">Play Again</button>
    `;
    document.body.appendChild(gameOverMessage);
}

function resetGame() {
    document.getElementById('game-over')?.remove();
    score = 0;
    scoreDisplay.textContent = 'Score: ' + score;
    timeLeft = 15;
    updateTimer();
    startGame();
    startAgainSound.play();
}

startGame();
