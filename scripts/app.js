function setupGame() {

  // sounds //
  const onload = document.getElementById('onload')
  const start = document.getElementById('start')
  const KO = document.getElementById('gameover')
  const alienHit = document.getElementById('alienHit')
  const bombdrop = document.getElementById('bombdrop')
  const playerHit = document.getElementById('playerHit')
  const laser = document.getElementById('laser')
  const win = document.getElementById('win')



  // selectors //
  const pointsDisplay = document.querySelector('#points')
  const startButton = document.querySelector('#play')
  const grid = document.querySelector('.grid')
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
    //  div.innerHTML = i
  }

  // * DEFINE ALIENS 
  const aliens = [
    // 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
    // 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
    // 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57

    19, 20, 24, 25,
    33, 34, 35, 36, 38, 39, 40, 41,
    47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
    62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
    72, 78, 79, 80, 81, 82, 83, 84, 85, 86,
    94, 95, 96, 97, 98, 99, 100,
    110, 111, 112, 113, 114,
    126, 127, 128,
    142
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

  onload.play()

  startButton.addEventListener('click', function () {
    start.play()
    moveAliens()
    startShoot()
    randomBomb()
  })

  // prevent scroll 
  window.onkeydown = function (e) {
    return !(e.code === 'Space')
  }

  // * END

  function endGame() {
    KO.play()
    alert(`UH OH YOU LOSE - YOU SCORED ${points} POINTS ! (︶ω︶)`)
    location.reload()
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


  document.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
      shootLaser()
    }
  })

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
          endGame()
        }
      }
      // WIN GAME 
      if (aliens.length === 0) {
        clearInterval(aliensID)
        alert(`YOU WIN ! YOU SCORED ${points} POINTS (＾ω＾) !`)
        win.play()
      }
    }, 700)
  }


  // * RANDOMLY DROP BOMBS

  function dropBomb() {
    // find random alien 
    const randomAlienPosition = aliens[Math.floor(Math.random() * aliens.length)]
    // attach bomb to alien 
    let bombPosition = randomAlienPosition
    // made a sound
    bombdrop.play()
    // drop bomb 
    const bombID = setInterval(() => {
      //cells.forEach(cell => cell.classList.remove('bomb'))

      // remove bomb at end of grid
      if (bombPosition > width ** 2 - width) {
        //clearInterval(bombID)
        cells[bombPosition].classList.remove('bomb')
        return
      }
      cells[bombPosition].classList.remove('bomb')
      // move bomb down the grid
      bombPosition += width
      cells[bombPosition].classList.add('bomb')

      // if bomb hits shooter...
      if (playerPosition === bombPosition) {
        clearInterval(bombID)
        cells[bombPosition].classList.remove('bomb')
        renderPlayer()
        cells[playerPosition].classList.add('explode')
        playerHit.play()
        setTimeout(() => {
          cells[bombPosition].classList.remove('explode')
        }, 800)
        renderPlayer()
        clearInterval(bombID)

        lives -= 1
        livesDisplay.innerHTML = lives
        // TODO !
        livesDisplay.classList.toggle('animatepoints')

      }

    }, 200)


    // GAMEOVER
    if (lives === 0) {
      clearInterval()
      endGame()
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



  // * MOVE LASER FUNCTION
  // Shoot with spacebar 

  function startShoot() {
    document.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        shootLaser()
        laser.play()
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
            alienHit.play()
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

}


window.addEventListener('DOMContentLoaded', setupGame)