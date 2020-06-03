function setupGame() {
  const pointsDisplay = document.querySelector('#points')
  const startButton = document.querySelector('#start')
  const grid = document.querySelector('.grid')
  const width = 15
  const cells = []
  let playerPosition = 217
  let alienPosition = 0
  let laserPosition = 0
  let direction = 1
  let points = 0
  let alienDirection = 'right'

  // * CREATE GRID 
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
    div.innerHTML = i
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


  // * RENDER GAME 
  function renderGame() {
    // Remove Player
    cells.forEach(cell => cell.classList.remove('player'))
    // Change DOM state based on everything else 
    cells[playerPosition].classList.add('player')
  }

  // * START GAME 


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
      renderGame()
      // Move player left
    } else if (event.key === 'ArrowLeft') {
      // 
      if (playerPosition === 210) {
        return
      }
      playerPosition -= 1
      renderGame()
    }
  })

  // * MOVE ALIENS 

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

  function moveAliens() {
    const aliensID = setInterval(() => {
      if (alienDirection === 'right') {
        // if you hit the right border go down a row
        if (aliens.some(alien => alien % width === width - 1)) {
          addAliens()
          for (let i = 0; i < aliens.length; i++) {
            aliens[i] += width
          }
          console.log(aliens)
          removeAliens()
          addAliens()

          // then go left 
          alienDirection = 'left'
         
        } else {
          removeAliens()
          // loop over array adding one to go right 
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
          console.log(aliens)
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
          // add aliens 
          for (let i = 0; i < aliens.length; i++) {
            addAliens()
          }
        }
      }

      // GAMEOVER 
      for (let i = 0; i < aliens.length; i++) {
        if (aliens[i] > ([209])) {
          clearInterval(aliensID)
          alert('GAME OVER!')
        }
      }

    }, 500)
  }
  moveAliens()


  // const leftBorder = aliens[0] % width === 0
  // const rightBorder = aliens[aliens.length - 1] % width === width - 1
  // if ((leftBorder && direction === -1) || (rightBorder && direction === 1)) {
  //   // if reach left border OR right border move down a row 
  //   direction = width
  // } else if (direction === width) {
  //   if (leftBorder) direction = 1
  //   else direction = -1
  // }
  // // GAMEOVER if reach the end of grid 
  // for (let i = 0; i <= aliens.length - 1; i++) {
  //   if (aliens[i] > (cells.length - (width - 1))) {
  //     alert('GAME OVER!')
  //     clearInterval(aliensID)
  //   }
  //   }
  // }





  // 1. Move right (+1)

  // 2. Move down when hit the edge

  // 3. Move right to left (-1)

  // 4. Move down when hit the edge 




  // * MOVE LASER FUNCTION
  // Shoot with spacebar 

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
      console.log('Shoot laser')
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
      console.log(laserPosition)
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
          }, 300)
          console.log(aliens)
          aliens.splice(aliens.indexOf(alien), 1)
          console.log(aliens)
          points++
          pointsDisplay.innerHTML = points
        }
      })
    }, 100)
  }


  // function to move aliens every two seconds - left->right - end of screen->down->right->left
  // if player destroys wave of aliens -> game start again
  // if aliens reach player -> game over


}


window.addEventListener('DOMContentLoaded', setupGame)