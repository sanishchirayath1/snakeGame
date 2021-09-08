const grid = document.getElementById("grid")
const startButton = document.getElementById("start")
const score =  document.getElementById("score")
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let gameScore = 0
let time = 1000
let speed = 0.9
let timerId = 0

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
    squares[appleIndex].classList.remove("apple")
    clearInterval(timerId)
    currentSnake = [2,1,0]
    gameScore = 0

    //add SCORE
    score.textContent = gameScore
    direction = 1
    time = 1000
    generateApple()
    currentSnake.forEach(index => squares[index].classList.add("snake"))

    timerId = setInterval(move,time)
    
    

}

function move() {
    if(
       (currentSnake[0] + width >= width*width && direction === width)||
       (currentSnake[0] - width < 0 && direction === -width)||
       (currentSnake[0] % width === 9 && direction === 1)||
       (currentSnake[0] % width === 0 && direction === -1)||
       (squares[currentSnake[0] + direction].classList.contains("snake"))
    ) {
    clearInterval(timerId)
    }
    //remove the last element from snake array
    const tail = currentSnake.pop()
    squares[tail].classList.remove("snake")
    currentSnake.unshift(currentSnake[0] + direction)
    squares[currentSnake[0]].classList.add("snake")

    if (squares[currentSnake[0]].classList.contains("apple")) {
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

}


function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains("snake"))
    squares[appleIndex].classList.add("apple")
}
generateApple()

window.addEventListener("keydown", function(event) {
    if (event.code == "ArrowDown"){
        direction = width
    }
    else if (event.code == "ArrowUp"){
        direction = -width

    }
    else if (event.code == "ArrowRight"){
        direction = 1
    }
    else if (event.code == "ArrowLeft"){
        direction = -1
    }
})

startButton.addEventListener("click",startGame)