function setupGame() {
  const pointsDisplay = document.querySelector('#points')
  const startButton = document.querySelector('#start')
  const grid = document.querySelector('.grid')
  const width = 15
  const cells = []
  let playerPosition = 217
  let alienPosition = 0
  let alienIntervalId
  let laserID
  let laserPosition = 0
  let direction = 1
  let points = 0

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

    // * add laser & aliens here at end 
    // Aliens 
  }

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
  // function moveAliens() {
  //   for (let i = 0; i < aliens.length; i++) {
  //     cells[aliens[i]].classList.remove('alien')
  //   }
  //   for (let i = 0; i < aliens.length - 1; i++) {
  //     cells[aliens[i]] += direction
  //   }
  //   for (let i = 0; i < aliens.length - 1; i++) {
  //     cells[aliens[i]].classList.add('alien')
  //   }
  // }

  // alienIntervalId = setInterval(moveAliens, 500)


  // 1. Move right (+1)

  // 2. Move down when hit the edge

  // 3. Move right to left (-1)

  // 4. Move down when hit the edge 




  // * MOVE LASER FUNCTION


  function playerShoot() {
    let laserID
    let laserPosition = playerPosition
    // setTimeout(moveLaser, 100)

    function moveLaser() {
      // remove laser 
      cells.forEach(cell => cell.classList.remove('laser'))
      // cells[laserPosition].classList.remove('laser')

      // add laser row above
      laserPosition -= width
      cells[laserPosition].classList.add('laser')

      // 1. if alien is hit 
      if (cells[laserPosition].classList.contains('alien')) {
        cells[laserPosition].classList.remove('alien')
        cells[laserPosition].classList.remove('laser')
        // explode on timer
        cells[laserPosition].classList.add('explode')
        setInterval(() => {
          cells[laserPosition].classList.remove('explode')
        }, 300)

        // clear 
        clearInterval(laserID)
        // add points
        points++
        pointsDisplay.innerHTML = points
      }

      // 2. if laser hits end of board
      if (laserPosition < width) {
        clearInterval(laserID)
        setInterval(() => cells[laserPosition].classList.remove('laser'), 100)
      }
    }

    // Execute when spacebar is hit: 
    document.addEventListener('keyup', (event) => {
      if (event.code === 'Space') {
        console.log('Shoot laser')
        setInterval(moveLaser, 100)
      }
    })
  }
  document.addEventListener('keyup', playerShoot)

















  // Add laser 1 row above 

  // set interval 


  // function to move laser every second
  // if hit alien -> remove alien -> create boom -> add points to score
  // else miss alien -> laser moves to end of grid
  // function to move aliens every two seconds - left->right - end of screen->down->right->left
  // if player destroys wave of aliens -> game start again
  // if aliens reach player -> game over
  // setInterval(function () {
  // }, 2000)


}


window.addEventListener('DOMContentLoaded', setupGame)