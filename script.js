// Select DOM elements
const character = document.querySelector('.character');
const gameOver = document.querySelector('.gameOver');
const obstacle = document.querySelector('.obstacle');
const scoreCount = document.querySelector('#scoreCount');
const gameContainer = document.querySelector('.gameContainer');

// Initialize variables
let score = 0;
let cross = true;
let isGameOver = false;
const audio = new Audio('background_music.mp3');

// Start background music after 1 second
setTimeout(() => audio.play(), 1000);

// Event listener for key presses
document.addEventListener('keydown', (e) => {
  if (isGameOver && e.keyCode === 38) {
    restartGame(); 
  } else {
    handleKeyPress(e.keyCode);
  }
});

// Function to handle key presses
function handleKeyPress(keyCode) {
  if (keyCode === 38) {
    // Jump
    character.classList.add('animate');
    setTimeout(() => character.classList.remove('animate'), 700);
  } else if (keyCode === 37) {
    // Move left
    moveCharacter(-90);
  } else if (keyCode === 39) {
    // Move right
    moveCharacter(90);
  }
}

// Function to move the character
function moveCharacter(offset) {
  const characterX = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
  character.style.left = characterX + offset + 'px';
}

// Game logic executed every 100ms
setInterval(() => {
  if (!isGameOver) {
    checkCollision();
  }
}, 100);

// Function to check for collisions and update game state
function checkCollision() {
  const cx = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
  const cy = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
  const ox = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
  const oy = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'));

  const offsetX = Math.abs(cx - ox);
  const offsetY = Math.abs(cy - oy);

  if (offsetX < 50 && offsetY < 50) {
    handleGameOver();
  } else if (offsetX < 145 && cross) {
    handleScoreIncrease();
  }
}

// Function to handle game over state
function handleGameOver() {
  isGameOver = true;
  gameOver.innerHTML = 'GAME OVER - Press UP ARROW to Restart';
  gameOver.style.visibility = 'visible';
  obstacle.classList.remove('obstacle_0');

  // Change background and stop audio
  setTimeout(() => gameContainer.style.backgroundImage = 'none', 100);
  setTimeout(() => gameContainer.style.backgroundImage = "url('background.png')", 200);
  setTimeout(() => audio.pause(), 200);
}

// Function to handle score increase
function handleScoreIncrease() {
  score += 1;
  updateScore(score);
  cross = false;

  // Reset cross after 1 second
  setTimeout(() => cross = true, 1000);

  // Gradually increase obstacle speed
  setTimeout(() => {
    const aniDur = parseFloat(window.getComputedStyle(obstacle).getPropertyValue('animation-duration'));
    const newDur = Math.max(aniDur - 0.1, 0.5);
    obstacle.style.animationDuration = newDur + 's';
    console.log(`New Animation Duration: ${newDur}s`);
  }, 500);
}

// Function to update the score display
function updateScore(score) {
  scoreCount.innerHTML = `YOUR SCORE: ${score}`;
}

// Function to restart the game
function restartGame() {
  // Reset variables
  isGameOver = false;
  score = 0;
  cross = true;

  // Reset UI elements
  updateScore(score);
  gameOver.innerHTML = 'Welcome to Just Run - Created by Sk Akram';
  character.style.left = '50px'; 
  obstacle.style.animationDuration = '3s'; 

  // Restart background music
  audio.currentTime = 0;
  audio.play();

  // Restart obstacle animation
  obstacle.classList.add('obstacle_0');
}
