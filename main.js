const gridSize = 20
const gameContainer = document.querySelector('.game-container')
const snake = document.querySelector('.snake')
const food = document.querySelector('.food')
const scoreDisplay = document.getElementById('score')

let snakeX = 10
let snakeY = 10
let foodX = 5
let foodY = 5
let score = 0
let snakeLength = 1
let snakeTrail = [{ x: snakeX, y: snakeY }]
let dx = 0
let dy = 0

function updateGame() {
  snakeX += dx
  snakeY += dy

  if (snakeX < 0) snakeX = gridSize - 1
  if (snakeX >= gridSize) snakeX = 0
  if (snakeY < 0) snakeY = gridSize - 1
  if (snakeY >= gridSize) snakeY = 0

  snakeTrail.push({ x: snakeX, y: snakeY })

  while (snakeTrail.length > snakeLength) {
    snakeTrail.shift()
  }

  if (snakeX === foodX && snakeY === foodY) {
    score++
    scoreDisplay.textContent = `Score: ${score}`
    snakeLength++
    foodX = Math.floor(Math.random() * gridSize)
    foodY = Math.floor(Math.random() * gridSize)
  }

  // Check for self-collision
  for (let i = 0; i < snakeTrail.length - 1; i++) {
    if (snakeTrail[i].x === snakeX && snakeTrail[i].y === snakeY) {
      gameOver()
    }
  }

  // Clear the game container
  gameContainer.innerHTML = ''
  gameContainer.appendChild(food)
  // Draw the food
  food.style.left = `${foodX * gridSize}px`
  food.style.top = `${foodY * gridSize}px`

  // Draw the snake
  snake.style.left = `${snakeX * gridSize}px`
  snake.style.top = `${snakeY * gridSize}px`

  // Draw the snake trail
  for (let i = 0; i < snakeTrail.length; i++) {
    const tailSegment = document.createElement('div')
    tailSegment.className = 'snake'
    tailSegment.style.left = `${snakeTrail[i].x * gridSize}px`
    tailSegment.style.top = `${snakeTrail[i].y * gridSize}px`
    gameContainer.appendChild(tailSegment)
  }

  setTimeout(() => requestAnimationFrame(updateGame), 100)
}

function gameOver() {
  alert(`Game Over! Your score: ${score}`)
  snakeX = 10
  snakeY = 10
  foodX = 5
  foodY = 5
  score = 0
  snakeLength = 1
  snakeTrail = [{ x: snakeX, y: snakeY }]
  dx = 0
  dy = 0
  scoreDisplay.textContent = `Score: ${score}`
}

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (dy !== 1) {
        dx = 0
        dy = -1
      }
      break
    case 'ArrowDown':
      if (dy !== -1) {
        dx = 0
        dy = 1
      }
      break
    case 'ArrowLeft':
      if (dx !== 1) {
        dx = -1
        dy = 0
      }
      break
    case 'ArrowRight':
      if (dx !== -1) {
        dx = 1
        dy = 0
      }
      break
  }
})

requestAnimationFrame(updateGame)
