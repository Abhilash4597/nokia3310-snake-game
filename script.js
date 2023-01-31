// #-------------------CONSTANTS AND VARIABLES----------------------

let mainDirection = { x: 0, y: 0 };
const eatingSound = new Audio('../sounds/eating.mp3');
const gameOverSound = new Audio('../sounds/gameOver.mp3');
const gameSound = new Audio('../sounds/snake.mp3');
const gameSound1 = new Audio('../sounds/snake Music.mp3');
let lastTime = 0;
let speed = 10;
let snakeArr = [{ x: 11, y: 15 }];
let food = { x: 10, y: 10 };
let score = 0;
const ground = document.querySelector('.ground');

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
    return true;
  }
}

function gameEngine() {
  // # updating the snake array and food

  if (collided(snakeArr)) {
    gameOverSound.play();
    gameSound1.pause();
    mainDirection = { x: 0, y: 0 };
    alert('Game Over');
    snakeArr = [{ x: 11, y: 15 }];
    gameSound1.play();
    score = 0;
  }

  //# increamenting food and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    eatingSound.play();
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

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
  mainDirection = { x: 0, y: 1 }; //start the game
  gameSound1.play();
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
