const gameBoard = document.querySelector("#game-board")
const context = gameBoard.getContext("2d")
const image = document.querySelector("#fsobutay")
const totalScore = document.querySelector("#total-score")
const resetButton = document.querySelector("#reset-button")
let gameOverText = document.querySelector("#game-over-text")
const gameWidth = gameBoard.width
const gameHeight = gameBoard.height
const snakeColor = "lime"
const snakeBorder = "black"
const foodColor = "red"
const sizeOfBlock = 20;

context.drawImage(image, 10, 10)


let xSpeed = sizeOfBlock;
let ySpeed = sizeOfBlock;
// BUNU QESDEN BELE ELEMISEM KI HUCUM ELEME EFFEKTI YARANSIN, NORMALDA DEFAULT OLARAQ 2SINDEN BIRINI 0 ELEMEK LAZIMDIR.


let foodX;
let foodY;




let running = false;



let snake = [
    {x:sizeOfBlock * 2, y:0},
    {x:sizeOfBlock, y:0},
    {x:0, y:0}
]

document.addEventListener("keydown", changeDirection);

gameStart();

function gameStart(){
    running = true;
    createFood();
    drawFood();
    eatFood();
};

function eatFood(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            eatFood();
        }, 75);
    }
    else{
        gameOverText.innerHTML += "GAME OVER, <br> PRESS F5 TO PLAY AGAIN!"
    }
};




function clearBoard(){
    context.fillRect(0,0, gameWidth, gameHeight)
};




function createFood(){
    function randomFood(min, max){
        const randomNumber = Math.round((Math.random() * (max - min) + min) / sizeOfBlock) * sizeOfBlock;
        return randomNumber
    }

    foodX = randomFood(0, gameWidth);
    foodY = randomFood(0, gameWidth);
};
function drawFood(){
    context.fillStyle = foodColor;
    context.fillRect(foodX, foodY, sizeOfBlock, sizeOfBlock);
};

function moveSnake(){
    const head = {x: snake[0].x + xSpeed,
                  y: snake[0].y + ySpeed};
    
    snake.unshift(head);

    if(snake[0].x == foodX && snake[0].y == foodY){
        createFood();
    }
    else{
        snake.pop();
    }
    
};


function drawSnake(){
    context.fillStyle = snakeColor;
    context.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        context.fillRect(snakePart.x, snakePart.y, sizeOfBlock, sizeOfBlock)
        context.strokeRect(snakePart.x, snakePart.y, sizeOfBlock, sizeOfBlock)
    })
};


function changeDirection(event){
    const keyPressed = event.key;
    const up = "ArrowUp"
    const down = "ArrowDown"
    const right = "ArrowRight"
    const left = "ArrowLeft"

    switch (true) {
        case(keyPressed == up):
            xSpeed = 0;
            ySpeed = -sizeOfBlock;
            break;
        case(keyPressed == down):
            xSpeed = 0;
            ySpeed = sizeOfBlock;
            break;
        case(keyPressed == right):
            xSpeed = sizeOfBlock;
            ySpeed = 0;
            break;
        case(keyPressed == left):
            xSpeed = -sizeOfBlock;
            ySpeed = 0;
            break;
            
    
    
        default:
            break;
    }


};
function checkGameOver(){
    switch (true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].x > gameWidth):
            running = false;
            break;
        case (snake[0].y >= gameWidth):
            running = false;
            break;
        default:
            break;
    }
};



















// const snake = document.querySelector("#snake")

// moveSnake();

// function createFood(){
//     function randomFood(){
//         const randomNumber = Math.round((Math.random(width - snakeSize))
//     }
// }

// function moveSnake(){
//     window.addEventListener("keydown", function(event) {
//         switch (event.key) {
//             case "ArrowLeft":
//                 snake.style.left -= `${startPosition}px`;
//                 break;
//             case "ArrowRight":
//                 snake.style.left += `${startPosition}px`;
//                 break;
//             case "ArrowUp":
//                 snake.style.top -= `${startPosition}px`;
//                 break;  
//             case "ArrowDown":
//                 snake.style.top += `${startPosition}px`;
//                 break;
//             default:
//                 break;
//         }
//     })
// }