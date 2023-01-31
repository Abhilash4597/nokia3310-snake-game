// #-------------------CONSTANTS AND VARIABLES----------------------

let direction = { x: 0, y: 0 };
const eatingSound = new Audio('../sounds/eating.mp3');
const gameOverSound = new Audio('../sounds/gameOver.mp3');
const gameSound = new Audio('../sounds/snake.mp3');
let lastTime = 0;
let speed = 2;
let snakeArr = [{ x: 11, y: 15 }];
let food = { x: 10, y: 10 };
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

function gameEngine() {
  // # updating the snake array and food

  // #display the snake

  ground.innerHTML = '';
  snakeArr.forEach((ele, index) => {
    console.log(ele, index);
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
