function setupGame() {
  // const scoreDisplay = document.querySelector('#score')
  // let score = 0
  // const start = document.querySelector('#start')

  // Select grid 
  const grid = document.querySelector('.grid')
  const width = 15
  const cells = []
  let playerPosition = 217
  let laserPosition = 0

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
    div.innerHTML = i
  }

  // Add player to page
  cells[playerPosition].classList.add('player')

  // * RENDER GAME 
  function renderGame() {
    // Remove Player
    cells.forEach(cell => {
      cell.classList.remove('player')
    })
    // Change DOM state based on everything else 
    cells[playerPosition].classList.add('player')

    // ! add laser & aliens here at end 


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

  // * MOVE LASER FUNCTION

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
      console.log('Space Pressed')
      shootLaser()
    }
  })

  function shootLaser(e) {
    let laserPosition = playerPosition

    function moveLaser() {
      cells.forEach(cell => {
        cell.classList.remove('laser')
      })
      // add laser row above
      laserPosition -= width
      cells[laserPosition].classList.add('laser')

      // if(laserPosition < width) {
      //   clearInterval()
      //   setTimeout(() => cells[laserPosition].classList.remove('laser'), 100)
    }
    moveLaser()
  }













  // Add laser 1 row above 

  // set interval 


  // function to move laser every two seconds
  // if hit alien -> remove alien -> create boom -> add points to score
  // else miss alien -> laser moves to end of grid
  // function to move aliens every two seconds - left->right - end of screen->down->right->left
  // if player destroys wave of aliens -> game start again
  // if aliens reach player -> game over
  // setInterval(function () {
  // }, 2000)


}


window.addEventListener('DOMContentLoaded', setupGame)