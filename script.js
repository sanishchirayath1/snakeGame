const grid = document.getElementById("grid")
const startButton = document.getElementById("start")
const score =  document.getElementById("score")
const body = document.getElementById("body")
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let gameScore = 0
let time = 1000
let speed = 0.9
let timerId = 0
const gameOver = document.getElementById("game_over")

const hiScoreDisplay = document.getElementById("hi_score")

let highScore = localStorage.getItem("highScore")

if(highScore === null){
    highScoreVal = 0
    localStorage.setItem("highScore",JSON.stringify(highScoreVal))
}else {
    highScoreVal = JSON.parse(highScore)
    hiScoreDisplay.textContent = highScore
}


// mobile controls
const up = document.getElementById("up")
const down = document.getElementById("down")
const right = document.getElementById("right")
const left = document.getElementById("left")

//audio files
const dead = new Audio();
const eat = new Audio();
const upAudio = new Audio();
const downAudio = new Audio();
const rightAudio = new Audio();
const leftAudio = new Audio();
let currentAudio = dead;

dead.src = "audios/audio_dead.mp3";
eat.src = "audios/audio_eat.mp3";
upAudio.src = "audios/audio_up.mp3";
downAudio.src = "audios/audio_down.mp3";
rightAudio.src = "audios/audio_right.mp3";
leftAudio.src = "audios/audio_left.mp3";


function createGrid() {
    for(let i = 0; i < width*width; i++){
        const square = document.createElement("div")
        square.classList.add("square")
        grid.appendChild(square)
        squares.push(square)
    }
}
createGrid()

function startGame () {
 
    currentSnake.forEach(index => squares[index].classList.remove("snake"))
    squares[currentSnake[0]].removeAttribute("id","head")
    currentSnake.forEach(index => squares[index].classList.remove("dead"))
    
    squares[appleIndex].classList.remove("apple")
    gameOver.textContent = ""
    
    clearInterval(timerId)
    currentSnake = [2,1,0]
    gameScore = 0

    //add SCORE
    score.textContent = gameScore
    
    direction = 1
    time = 1000
    currentSnake.forEach(index => squares[index].classList.add("snake"))
    squares[currentSnake[0]].setAttribute("id","head")
 
    generateApple()
    timerId = setInterval(move,time)
    
}

function move() {
    if(//bottom wall
       (currentSnake[0] + width >= width*width && direction === width)||
       //top wall
       (currentSnake[0] - width < 0 && direction === -width)||
        //hits right wall 
       (currentSnake[0] % width === 9 && direction === 1)||
        //hits left wall
       (currentSnake[0] % width === 0 && direction === -1)||
       (squares[currentSnake[0] + direction].classList.contains("snake"))
    ) {
    clearInterval(timerId)
    currentAudio.pause()
    dead.play()
    currentAudio = dead
    gameOver.textContent = "Game Over"
    currentSnake.forEach(index => squares[index].classList.remove("snake"))
    squares[currentSnake[0]].removeAttribute("id","head")

    currentSnake.forEach(index => squares[index].classList.add("dead"))
    return
    }
    //remove the last element from snake array
    const tail = currentSnake.pop()
    squares[tail].classList.remove("snake")
    squares[currentSnake[0]].removeAttribute("id","head")
    currentSnake.unshift(currentSnake[0] + direction)
    squares[currentSnake[0]].setAttribute("id","head")
    squares[currentSnake[0]].classList.add("snake")
   
    
    if (squares[currentSnake[0]].classList.contains("apple")) {
        currentAudio.pause()
        eat.play()
        currentAudio = eat
        squares[currentSnake[0]].classList.remove("apple")
        squares[tail].classList.add("snake")
        currentSnake.push(tail)

        generateApple()
        gameScore++
        score.textContent = gameScore
        
        clearInterval(timerId)
        time *= speed
        timerId = setInterval(move,time)
        
    }
    if (gameScore > highScoreVal){
        highScoreVal = gameScore
        localStorage.setItem("highScore",JSON.stringify(highScoreVal))
        hiScoreDisplay.textContent = highScoreVal
    }   
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains("snake"))
    squares[appleIndex].classList.add("apple")
}
generateApple()
//controls execution
window.addEventListener("keydown", function(event) {
    if (event.code == "ArrowDown"){
        
        if (direction !== -width){
            direction = width
        }
        currentAudio.pause()
        downAudio.play()
        currentAudio = downAudio
    }
    else if (event.code == "ArrowUp"){
        
        if (direction !== width){
            direction = -width
        }
        currentAudio.pause()
        upAudio.play()
        currentAudio = upAudio

    }
    else if (event.code == "ArrowRight"){
        
        if (direction !== -1){
            direction = 1
        }
        currentAudio.pause()
        rightAudio.play()
        currentAudio = rightAudio
    }
    else if (event.code == "ArrowLeft"){

        if (direction !== 1){
            direction = -1
        }
        currentAudio.pause()
        leftAudio.play()
        currentAudio = leftAudio
    }
})
//on-screen button controls
up.addEventListener("click",function(){
    if (direction !== width){
        direction = -width
    }
    currentAudio.pause()
    upAudio.play()
    currentAudio = upAudio
})
down.addEventListener("click",function(){
    if (direction !== -width){
        direction = width
    }
    currentAudio.pause()
    downAudio.play()
    currentAudio = downAudio
})
left.addEventListener("click",function(){
    if (direction !== 1){
        direction = -1
    }
    currentAudio.pause()
    leftAudio.play()
    currentAudio = leftAudio
})
right.addEventListener("click",function(){
    if (direction !== -1){
        direction = 1
    }
    currentAudio.pause()
    rightAudio.play()
    currentAudio = rightAudio
})

startButton.addEventListener("click",startGame)