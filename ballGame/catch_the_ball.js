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

// Load user data from local storage
function loadUserData() {
    let username = localStorage.getItem('username');
    let bestScore = localStorage.getItem('bestScore') || 0;

    if (username) {
        usernameDisplay.textContent = username;
    }
    bestScoreDisplay.textContent = bestScore;
}

// Save user data to local storage
function saveUserData(score) {
    let username = localStorage.getItem('username');
    let bestScore = localStorage.getItem('bestScore') || 0;

    if (score > bestScore) {
        localStorage.setItem('bestScore', score);
        bestScoreDisplay.textContent = score;
    }
}

// Function to move the ball to a random position
function moveBall() {
    let gameContainer = document.querySelector('.game-container');
    let maxX = gameContainer.clientWidth - ball.clientWidth;
    let maxY = gameContainer.clientHeight - ball.clientHeight;
    
    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);
    
    ball.style.left = randomX + 'px';
    ball.style.top = randomY + 'px';
}

// Function to update the timer display
function updateTimer() {
    timerDisplay.textContent = 'Time: ' + timeLeft + 's';
    
    if (timeLeft < 10) {
        timerDisplay.style.color = 'red';
    } else {
        timerDisplay.style.color = 'black';
    }
}

// Function to start the game
function startGame() {
    moveBall();
    loadUserData();
    backgroundMusic.play(); // Start background music
    
    // Set up the timer
    let timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            backgroundMusic.pause(); // Pause background music
            gameOverSound.play(); // Play game over sound
            saveUserData(score); // Save score if it is the best score
            displayGameOver();
        }
    }, 1000);
}

// Event listener for clicking the ball
ball.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = 'Score: ' + score;
    moveBall();
    touchSound.play(); // Play sound when the ball is clicked
});

// Function to display game over screen
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

// Function to reset the game
function resetGame() {
    document.getElementById('game-over')?.remove(); // Remove game over screen if it exists
    score = 0;
    scoreDisplay.textContent = 'Score: ' + score;
    timeLeft = 15;
    updateTimer();
    startGame();
    startAgainSound.play(); // Play sound when starting a new game
}

// Start the game
startGame();
