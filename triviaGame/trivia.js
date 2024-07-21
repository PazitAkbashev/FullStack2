// Initialize game variables
let score = 0;
let currentQuestionIndex = 0;
let difficultyLevel = ''; // Initial difficulty level is empty
let consecutiveCorrectAnswers = 0;
let timer;
let timeLeft = 15; // Time limit for each question
let gameEnded = false; // Flag to check if the game has ended
let startTime; // Track the start time of the game

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

let correctSound = document.getElementById('correct-sound');
let incorrectSound = document.getElementById('incorrect-sound');
let gameOverSound = document.getElementById('game-over-sound');

function startGame(selectedLevel) {
    difficultyLevel = selectedLevel;
    document.getElementById('question').textContent = ''; // Clear the difficulty selection text
    answersContainer.innerHTML = ''; // Clear the difficulty selection buttons
    scoreDisplay.style.display = 'block'; // Show the score display
    timerDisplay.style.display = 'block'; // Show the timer display
    resetGame();
}

// Function to load the current question
function loadQuestion() {
    if (gameEnded) return; // Prevent loading questions if the game has ended
    
    let currentQuestions = questions[difficultyLevel];
    let currentQuestion = currentQuestions[currentQuestionIndex];
    
    questionDisplay.textContent = currentQuestion.question;
    answersContainer.innerHTML = ''; // Clear previous answers
    
    currentQuestion.answers.forEach((answer, index) => {
        let button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => checkAnswer(index, button));
        answersContainer.appendChild(button);
    });
    
    // Reset and start the timer
    resetTimer();
    startTimer();
}

// Function to check the selected answer
function checkAnswer(selectedIndex, selectedButton) {
    if (gameEnded) return; // Prevent checking answers if the game has ended
    
    let currentQuestions = questions[difficultyLevel];
    let currentQuestion = currentQuestions[currentQuestionIndex];
    
    clearInterval(timer); // Stop the timer when the answer is selected
    
    // Mark all answers
    Array.from(answersContainer.children).forEach((button, index) => {
        if (index === currentQuestion.correct) {
            button.classList.add('correct');
        } else if (index === selectedIndex) {
            button.classList.add('incorrect');
        }
        button.disabled = true; // Disable all buttons after selection
    });
    
    if (selectedIndex === currentQuestion.correct) {
        // Play correct answer sound
        correctSound.play();
        // If the answer is correct, increment the score and consecutive correct answers
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
        consecutiveCorrectAnswers++;

        // Increase difficulty if the player has answered correctly two times in a row
        if (consecutiveCorrectAnswers >= 2 && difficultyLevel !== 'hard') {
            increaseDifficulty();
        }
    } else {
        // Play incorrect answer sound
        incorrectSound.play();
        // Reset consecutive correct answers on incorrect answer
        consecutiveCorrectAnswers = 0;
        // Optionally decrease difficulty
        decreaseDifficulty();
    }
    
    // Move to the next question after a short delay
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < currentQuestions.length) {
            loadQuestion();        
        } else {
            gameOver(); // Call gameOver if no more questions
        }
    }, 2000); // 2 second delay before moving to the next question
}

// Function to increase difficulty
function increaseDifficulty() {
    if (difficultyLevel === 'easy') {
        difficultyLevel = 'medium';
    } else if (difficultyLevel === 'medium') {
        difficultyLevel = 'hard';
    }
    currentQuestionIndex = 0; // Reset question index for the new difficulty level
}

// Function to decrease difficulty
function decreaseDifficulty() {
    if (difficultyLevel === 'hard') {
        difficultyLevel = 'medium';
    } else if (difficultyLevel === 'medium') {
        difficultyLevel = 'easy';
    }
    currentQuestionIndex = 0; // Reset question index for the new difficulty level
}

// Function to reset the game
function resetGame() {
    // Remove the game over screen if it exists
    let gameOverMessage = document.getElementById('game-over');
    if (gameOverMessage) {
        document.body.removeChild(gameOverMessage);
    }
    
    score = 0;
    scoreDisplay.textContent = 'Score: ' + score;
    consecutiveCorrectAnswers = 0;
    currentQuestionIndex = 0;
    gameEnded = false; // Reset game ended flag
    startTime = Date.now(); // Reset start time
    loadQuestion();
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timer);
    timeLeft = 15; // Reset time left for each question
    timerDisplay.textContent = 'Time left: ' + timeLeft + 's';
    timerDisplay.style.color = 'black'; // Reset timer color
}

// Function to start the timer
function startTimer() {
    startTime = Date.now(); // Record start time when timer starts
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = 'Time left: ' + timeLeft + 's';

        // Turn the timer red in the last 10 seconds
        if (timeLeft <= 10) {
            timerDisplay.style.color = 'red';
        }

        // Handle time out
        if (timeLeft <= 0) {
            clearInterval(timer);
            gameOver(); // End the game when time runs out
        }
    }, 1000); // Update every second
}

// Function to handle game over
function gameOver() {
    gameEnded = true; // Set the flag to true to prevent further actions
    // Play game over sound
    gameOverSound.play();
    // Calculate the time taken
    let timeTaken = Math.floor((Date.now() - startTime) / 1000);
    
    // Clear the game screen
    questionDisplay.textContent = '';
    answersContainer.innerHTML = '';
    timerDisplay.textContent = '';

    // Display final score and time taken
    let gameOverMessage = document.createElement('div');
    gameOverMessage.id = 'game-over';
    gameOverMessage.innerHTML = `
        <h1>Game Over!</h1>
        <p>Your score: ${score}</p>
        <p>Time taken: ${timeTaken} seconds</p>
        <button onclick="resetGame()">Play Again</button>
    `;
    document.body.appendChild(gameOverMessage);
}

// Start the game by default on page load
document.addEventListener('DOMContentLoaded', () => {
    startGame('easy'); // Start with easy by default
});
