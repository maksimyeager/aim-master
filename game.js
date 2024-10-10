const gameStartBtn = document.querySelector("#start");
const gameScreens = document.querySelectorAll(".screen");
const gameTimeList = document.querySelector("#time-list");
const gameDuration = document.querySelector("#time");
const gameBoard = document.querySelector("#board");
let gameTime = 0;
let gameScore = 0;
const colorsForCircle = ['red', 'yellow', 'orange', 'lightgreen'];

gameStartBtn.addEventListener("click", function(event){
    event.preventDefault();
    gameScreens[0].classList.add("up");
})

gameTimeList.addEventListener("click", function(event){
    if(event.target.classList.contains("time-btn")){
        gameTime = parseInt(event.target.getAttribute("data-time"));
        startGame();
    }
})

gameBoard.addEventListener("click", function(event){
    if(event.target.classList.contains("circle")){
        gameScore = gameScore + 1;
        event.target.remove();
        createRandomCircle();
    }
})

function startGame(){
    gameScreens[1].classList.add("up");
    gameDuration.innerHTML = `00:${gameTime}`;
    setInterval(decreaseTime, 1000);
    createRandomCircle();
}

function decreaseTime(){
    if (gameTime === 0){
        finishGame();
    }else {
        // gameTime = gameTime - 1;
        let current = --gameTime;
        if(current < 10){
            current = `0${current}`
        }
        gameDuration.innerHTML = `00:${current}`;
    }
}

function finishGame(){
    gameDuration.parentNode.classList.add("hide");
    gameBoard.innerHTML = `<h2>Your Score: ${gameScore}</h2>`;
}

function createRandomCircle(){
    const circle = document.createElement("div");
    const sizeForCircle = getRandomNumber(20, 60);
    const {width, height} = gameBoard.getBoundingClientRect();
    const xPosition = getRandomNumber(0, width - sizeForCircle);
    const yPosition = getRandomNumber(0, height - sizeForCircle);
    const colorOfCircle = getRandomColor();


    circle.classList.add("circle");
    circle.style.width = `${sizeForCircle}px`;
    circle.style.height = `${sizeForCircle}px`;
    circle.style.top = `${yPosition}px`;
    circle.style.left = `${xPosition}px`;
    circle.style.background = colorOfCircle;

    gameBoard.append(circle);
}

function getRandomNumber(min, max){
    return Math.round(Math.random() * (max-min) + min)
}

function getRandomColor(){
    return colorsForCircle[Math.floor(Math.random() * colorsForCircle.length)];
}