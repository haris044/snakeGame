const canvas = document.getElementById('game');
const ctx =  canvas.getContext('2d');

let speed = 7;

class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}


let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const SnakeParts = [];
let tailLength = 0;

let xVelocity= 0;
let yVelocity= 0;

let foodX = 5;
let foodY = 5;


// game loop
function drawGame() {
    changeSnakePosition();
    let result = gameIsOver();
    if (result) {
        return;
    }
    clearScreen();
    changeFoodPosition();
    drawFood();
    drawSnake();
    setTimeout(drawGame , 1000/speed)
    
}

function gameIsOver() {
    let gameOver = false;
    if (headX < 0 ) {
        gameOver = true;
    }
    else if (headX === tileCount ) {
        gameOver = true;
    }
    else if(headY < 0){
        gameOver = true;
    }
    else if (headY === tileCount ) {
        gameOver = true;
    }

    
    return gameOver;
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width , canvas.height);
}

function drawSnake() {
    

    ctx.fillStyle='white';
    for(let i =0; i<SnakeParts.length; i++){
        let part = SnakeParts[i];
        ctx.fillRect(part.x *tileCount, part.y * tileCount , tileSize , tileSize)
    }
    SnakeParts.push(new SnakePart(headX, headY));
    if (SnakeParts.length>tailLength){
        SnakeParts.shift();

        
    }
    ctx.fillStyle = 'white';
    ctx.fillRect(headX * tileCount , headY * tileCount , tileSize , tileSize) 
}


function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawFood() {
    ctx.fillStyle = 'green';
    ctx.fillRect(foodX * tileCount , foodY * tileCount , tileSize , tileSize);
    
}

function changeFoodPosition() {
    if (foodX == headX && foodY == headY ) {
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
        tailLength++;
    }
}


document.body.addEventListener('keydown' , KeyDown);
function KeyDown(event) {
    //up
    if (event.keyCode == 38){
        if(yVelocity==1)
        return;
        yVelocity = -1;
        xVelocity = 0;
    }
   //down
    if (event.keyCode == 40){
        if(yVelocity== -1)
        return;
        yVelocity = 1;
        xVelocity = 0;
    }
    //left
    if (event.keyCode == 37){
        if(xVelocity==1)
        return;
        yVelocity = 0;
        xVelocity = -1;
    }
   //right
    if (event.keyCode == 39){
        if(xVelocity== -1)
        return;
        yVelocity = 0;
        xVelocity = 1;
    }

}

drawGame();