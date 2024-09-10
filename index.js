
let inputDir = { x: 0, y: 0 };

let foodSound = new Audio('Music/food.mp3');
let gameOverSound = new Audio('Music/gameover.mp3');
let gamePlaySound = new Audio('Music/music.mp3');
let moveSound = new Audio('Music/move.mp3');

let speed = 8;
let Score = 0;


let lastPaintTime = 0;

let snakeSize = [{x: 13,y: 15}]; 

food = { x: 6,y: 7};



// Game Function
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(currentTime);
    if ((ctime - lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
   
}

//  collosion function 

function isCollid(snake) {

    //  if you touch into yourself
    for(let i=1;i<snakeSize.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    // if you touch into wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }
    return false;
}
 
function BonusScore(bonous) {
     setTimeout(() => {
        let a = 2;
        let b = 16;
        BonousFood = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        bonus += 5;
    }, 10000);
}


//   Main game engine 
function gameEngine() {

    // updating the snakearray and food
    if(isCollid(snakeSize)){
        gameOverSound.play();
        gamePlaySound.pause();
        console.log(snakeSize);
        inputDir={x:0,y:0};
        alert("Game Over ! press any key to continue the game");
        snakeSize=[{x:13,y:15}];
        gameOverSound.play();
        Score=0;
    }

    // if you have eaten the food and the increment the snake size and then regenerate the food
  

    if (snakeSize[0].y === food.y && snakeSize[0].x === food.x) {
        foodSound.play();
        Score += 1;

        if (Score > highScoreValue) {
            highScoreValue = Score;
            localStorage.setItem("highScore", JSON.stringify(highScoreValue));
            // HighScoreBox.innerHTML = "High-Score: " + highScoreValue;
        }
        ScoreBox.innerHTML = "Score: " + Score;
    //     let currentScore=5;
    //    if(currentScore<Score){
    //         currentScore=currentScore+10;
    //         BonousScoreBox.innerHTML="Bonous Score: " + bonous+5;
    
    //    }
        // let bonous=0;
        // let BonousValue=BonusScore(bonous);
        // BonousScoreBox.innerHTML="Bonous Score: " + BonousValue;
        
        snakeSize.unshift({ x: snakeSize[0].x + inputDir.x, y: snakeSize[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // moving the snake

    for (let i = snakeSize.length - 2; i >= 0; i--) {
        snakeSize[i + 1] = {...snakeSize[i]};
    }
    snakeSize[0].x += inputDir.x; 
    snakeSize[0].y += inputDir.y;



    // empty the board area
    board.innerHTML = "";

    // display the the snake size and add head with condition
    snakeSize.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart= e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index == 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });

    // display the food in the user interface

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;

    foodElement.classList.add('food');

    board.appendChild(foodElement);

    
    
}
// gamePlaySound.play();



// Main logic starting from here
// 


let highScore= localStorage.getItem('highScore');

if (highScore == null) {
    highScoreValue = 0;
    localStorage.setItem('highScore', JSON.stringify(highScoreValue));
} else {
    highScoreValue = JSON.parse(highScore);
    HighScoreBox.innerHTML = "High-Score: " + highScore;
} 

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {   

    // inputDir = { x: 0, y: 1 };
    moveSound.play();
    switch (e.key) {
        
        case "ArrowUp":
            console.log("ArrowUp"); 
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});