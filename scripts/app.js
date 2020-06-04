function setupGame() {
  const pointsDisplay = document.querySelector('#points')
  const startButton = document.querySelector('#start')
  const grid = document.querySelector('.grid')
  const gameOver = document.querySelector('#gameover')
  const livesDisplay = document.querySelector('#lives')
  const width = 15
  const cells = []
  let playerPosition = 217
  let alienPosition = 0
  let bombPosition = 0
  let randomAlienPosition = 0
  let laserPosition = 0
  let lives = 3
  let points = 0
  let alienDirection = 'right'

  // ----- CREATE GRID ----- //
  // Create 225 cells 
  for (let i = 0; i < width ** 2; i++) {
    // create my cell
    const div = document.createElement('div')
    // add class of cell
    div.classList.add('cell')
    // appended cell to page
    grid.appendChild(div)
    cells.push(div)
    // * grid numbers: remove at end
    // div.innerHTML = i
  }

  // * DEFINE ALIENS 
  const aliens = [
    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
    47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57
  ]

  // Add aliens 
  aliens.forEach(alien => cells[alienPosition + alien].classList.add('alien'))

  // Add player 
  cells[playerPosition].classList.add('player')

  // Add points
  livesDisplay.innerHTML = lives


  // * RENDER
  function renderPlayer() {
    // PLAYER
    cells.forEach(cell => cell.classList.remove('player'))
    cells[playerPosition].classList.add('player')
  }
  // ALIENS 
  function addAliens() {
    for (let i = 0; i < aliens.length; i++) {
      cells[aliens[i]].classList.add('alien')
    }
  }
  function removeAliens() {
    for (let i = 0; i < cells.length; i++) {
      cells[i].classList.remove('alien')
    }
  }

  // * START GAME 

  // * RESTART 

  function winGame() {
    gameMessage(`You won ! You scored ${points}`, 3000)
    //const audio = document.querySelector('audio')
    // audio.play()
    // setTimeout(() => {
    //   audio.pause()
    //   AudioContext.currentTime = 0
    // })
    resetGame()
  }

  function loseGame() {
    gameMessage('Uhoh... You lose !', 3000)
    resetGame()
  }

  // function resetGame() {
  // }

  // * MOVE PLAYER 
  document.addEventListener('keydown', (event) => {
    // Move player right
    if (event.key === 'ArrowRight') {
      // If at the edge, stop
      if (playerPosition === cells.length - 1) {
        return
      }
      // Update position
      playerPosition += 1
      renderPlayer()
      // Move player left
    } else if (event.key === 'ArrowLeft') {
      // 
      if (playerPosition === 210) {
        return
      }
      playerPosition -= 1
      renderPlayer()
    }
  })


  // * MOVE ALIENS 

  function moveAliens() {
    const aliensID = setInterval(() => {
      // if going right : 
      if (alienDirection === 'right') {
        // if you hit the right border...
        if (aliens.some(alien => alien % width === width - 1)) {
          addAliens()
          for (let i = 0; i < aliens.length; i++) {
            // go down a row...
            aliens[i] += width
          }
          removeAliens()
          addAliens()

          // ...then go left 
          alienDirection = 'left'

        } else {
          removeAliens()
          // loop over array adding one to move aliens right 
          for (let i = 0; i < aliens.length; i++) {
            aliens[i] += 1
          }
          // add aliens 
          for (let i = 0; i < aliens.length; i++) {
            addAliens()
          }
        }

      } else if (alienDirection === 'left') {
        if (aliens.some(alien => alien % width === 0)) {
          addAliens()
          for (let i = 0; i < aliens.length; i++) {
            aliens[i] += width
          }
          removeAliens()
          addAliens()

          // then go right 
          alienDirection = 'right'

        } else {
          removeAliens()
          // loop over array adding one to go left 
          for (let i = 0; i < aliens.length; i++) {
            aliens[i] -= 1
          }
          for (let i = 0; i < aliens.length; i++) {
            addAliens()
          }
        }
      }

      // GAMEOVER 
      for (let i = 0; i < aliens.length; i++) {
        if (aliens[i] > (cells.length - (width - 1))) {
          clearInterval(aliensID)
          loseGame()
          resetGame()
        }
      }
      // WIN GAME 
      if (aliens.length === 0) {
        clearInterval(aliensID)
        alert('YOU WIN!')
        resetGame()
      }
    }, 700)
  }
  moveAliens()

  // * RANDOMLY DROP BOMBS

  function dropBomb() {
    // find random alien 
    const randomAlienPosition = aliens[Math.floor(Math.random() * aliens.length)]
    // attach bomb to alien 
    let bombPosition = randomAlienPosition
    // drop bomb 
    const bombID = setInterval(() => {
      //cells.forEach(cell => cell.classList.remove('bomb'))

      // remove bomb at end of grid
      if (bombPosition > width ** 2 - width) {
        console.log('hello')
        //clearInterval(bombID)
        cells[bombPosition].classList.remove('bomb')
        return
      }
      cells[bombPosition].classList.remove('bomb')
      // move bomb down the grid
      bombPosition += width
      cells[bombPosition].classList.add('bomb')
      // if bomb hits laser... 
      // if (cells[bombPosition].classList.contains('laser')) {
      //   console.log('bomb')
      //   clearInterval(bombID)
      //   cells[bombPosition].classList.remove('bomb')
      //   cells[bombPosition].classList.add('explode')
      //   setTimeout(() => {
      //     cells[bombPosition].classList.remove('explode')
      //   }, 500)

      // }
      // if bomb hits shooter...
      if (playerPosition === bombPosition) {
        clearInterval(bombID)
        cells[bombPosition].classList.remove('bomb')
        renderPlayer()
        cells[playerPosition].classList.add('explode')
        setTimeout(() => {
          cells[bombPosition].classList.remove('explode')
        }, 800)
        renderPlayer()
        clearInterval(bombID)

        lives -= 1
        livesDisplay.innerHTML = lives
        // gameMessage(`Uhoh ! You lost a life - ${lives} left...`, 3000)
      }

    }, 200)


    // GAMEOVER
    if (lives === 0) {
      clearInterval
      gameOver.innerHTML = 'GAME OVER'
    }
  }

  function randomBomb() {
    // find random time to drop bomb 
    const min = 1
    const max = 2
    const rand = Math.floor(Math.random() * (max - min + 1) + min)

    dropBomb()
    setTimeout(randomBomb, rand * 1000)
  }

  randomBomb()

  // * MOVE LASER FUNCTION
  // Shoot with spacebar 

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
      shootLaser()
    }
  })

  function shootLaser() {
    let laserPosition = playerPosition
    const laserID = setInterval(() => {

      cells.forEach(cell => cell.classList.remove('laser'))

      // remove laser at end of grid
      if (laserPosition < width) {
        clearInterval(laserID)
        cells[laserPosition].classList.remove('laser')
        return
      }

      // move laser up the grid
      laserPosition -= width
      cells[laserPosition].classList.add('laser')
  
      // if laser hits alien...
      aliens.forEach(alien => {
        if (alien === laserPosition) {
          clearInterval(laserID)
          cells[laserPosition].classList.remove('alien')
          cells[laserPosition].classList.remove('laser')
          cells[laserPosition].classList.add('explode')
          setTimeout(() => {
            cells[laserPosition].classList.remove('explode')
          }, 500)
          aliens.splice(aliens.indexOf(alien), 1)
          points += 5
          pointsDisplay.innerHTML = points
        }
      })
    }, 100)
    
  }



}


window.addEventListener('DOMContentLoaded', setupGame)