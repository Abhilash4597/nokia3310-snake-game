// #-------------------CONSTANTS AND VARIABLES----------------------

let mainDirection = { x: 0, y: 0 };
const eatingSound = new Audio('./sounds/eating.mp3');
const gameOverSound = new Audio('./sounds/gameOver.mp3');
const gameSound = new Audio('./sounds/snake.mp3');
const gameSound1 = new Audio('./sounds/snake Music.mp3');
const gameSound2 = new Audio('./sounds/main music.mp3');
let lastTime = 0;
let speed = 5;
let snakeArr = [{ x: 11, y: 15 }];
let food = { x: 10, y: 10 };
let score = 0;
const ground = document.querySelector('.ground');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');

// #-------------------FUNCTIONS----------------------

function main(currentTime) {
  window.requestAnimationFrame(main);
  if ((currentTime - lastTime) / 1000 < 1 / speed) {
    return;
  }
  lastTime = currentTime;
  gameEngine();
}

function collided(snake) {
  //# colliding itself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      scoreDisplay.innerHTML = 'SCORE : ' + 0;
      return true;
    }
  }

  //# colidding wall
  if (
    snake[0].x >= 22 ||
    snake[0].x <= 0 ||
    snake[0].y >= 22 ||
    snake[0].y <= 0
  ) {
    scoreDisplay.innerHTML = 'SCORE : ' + 0;
    return true;
  }
}

function gameEngine() {
  // # updating the snake array and food

  if (collided(snakeArr)) {
    gameOverSound.play();
    gameSound2.pause();
    mainDirection = { x: 0, y: 0 };
    alert('Game Over');
    snakeArr = [{ x: 11, y: 15 }];
    score = 0;
  }

  //# increamenting food and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    eatingSound.play();
    score += 1;
    if (score > highScoreValue) {
      highScoreValue = score;
      localStorage.setItem('highScore', JSON.stringify(highScoreValue));
      highScoreDisplay.innerHTML = 'HIGH SCORE :' + highScoreValue;
    }
    scoreDisplay.innerHTML = 'SCORE : ' + score;
    snakeArr.unshift({
      x: snakeArr[0].x + mainDirection.x,
      y: snakeArr[0].y + mainDirection.y,
    });
    let a = 2;
    let b = 21;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //# snake moving logic
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += mainDirection.x;
  snakeArr[0].y += mainDirection.y;

  // #display the snake
  ground.innerHTML = '';
  snakeArr.forEach((ele, index) => {
    snakeBody = document.createElement('div');
    snakeBody.style.gridRowStart = ele.y;
    snakeBody.style.gridColumnStart = ele.x;

    if (index === 0) {
      snakeBody.classList.add('headColor');
    } else {
      snakeBody.classList.add('bodyColor');
    }
    ground.appendChild(snakeBody);
  });

  // #display the food

  snakeFood = document.createElement('div');
  snakeFood.style.gridRowStart = food.y;
  snakeFood.style.gridColumnStart = food.x;
  snakeFood.classList.add('foodColor');
  ground.appendChild(snakeFood);
}

// #-------------------MAIN LOGIC---------------------

highScore = localStorage.getItem('highScore');
if (highScore === null) {
  highScoreValue = 0;
  localStorage.setItem('highScore', JSON.stringify(highScoreValue));
} else {
  highScoreValue = JSON.parse(highScore);
  highScoreDisplay.innerHTML = 'HIGH SCORE :' + highScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
  mainDirection = { x: 0, y: 1 }; //start the game
  gameSound2.play();
  switch (e.key) {
    case 'ArrowUp':
      console.log('arrowUp');
      mainDirection.x = 0;
      mainDirection.y = -1;
      break;

    case 'ArrowDown':
      console.log('arrowDown');
      mainDirection.x = 0;
      mainDirection.y = 1;
      break;

    case 'ArrowLeft':
      console.log('arrowLeft');
      mainDirection.x = -1;
      mainDirection.y = 0;
      break;

    case 'ArrowRight':
      console.log('arrowRight');
      mainDirection.x = 1;
      mainDirection.y = 0;
      break;

    default:
      break;
  }
});
