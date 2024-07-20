// Initialize game variables
let score = 0;
let timeLeft = 30;
let ball = document.getElementById('ball');
let scoreDisplay = document.getElementById('score');
let timerDisplay = document.getElementById('timer');

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

// Function to start the game
function startGame() {
    moveBall();
    
    // Set up the timer
    let timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = 'Time: ' + timeLeft + 's';
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);

            alert('Game Over! Your score is: ' + score);
        }
    }, 1000);
}

// Event listener for clicking the ball
ball.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = 'Score: ' + score;
    moveBall();
});

// Start the game
startGame();
