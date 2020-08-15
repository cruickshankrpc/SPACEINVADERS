# ![GA Logo](./images/GALogo.png) PROJECT 1 - SPACE INVADERS

## Overview 
SPACE INVADERS was my first (solo) project completed on General Assembly's Software Engineering Immersive, and was my first attempt at using JavaScript. 

I hugely enjoyed the creativity involved in this project and, once I figured out the logic, had a good time tinkering around with the design and sound effects. 

[insert vid]

## Play 
For the uninitiated, SPACE INVADERS is a classic 80s arcade game requiring the player (spaceship) to shoot down the invading aliens to score points before they reach the bottom of the screen. 

Play on GitHub Pages [here](https://cruickshankrpc.github.io/project-1/).



#### Controls
- Press the START button
- Move the spaceship LEFT (<-) and RIGHT (->) using the arrow keys. 
- Hit SPACEBAR to shoot.

## Brief 
Build a grid-based game that can render in the browser using HTML, CSS, & vanilla Javascript in **one week**.

## Technologies Used 
* HTML5
* CSS3
* JavaScript (ES6)
* Git/GitHub
* Google Fonts
* Paint

## Design 
I wanted to pay homage to the original game and use the Japanese title, pixelated game icons, and original soundtrack.\
Later, I added the flickering neon border; animations on the title, button, and signature; alien GIFs; and fun sound effects. 

## Approach 

In order to break down the project I used the following questions: 
- What HTML and CSS classes will you need to display your game?

- What data types will you need to represent your game state in javascript? What Arrays, objects, numbers etc.?

- What DOM elements will you need to select in javascript?

- What's the MVP (minimum viable product) of my game?

- What are the discrete pieces of functionality my MVP will need to have, piece by piece?

- For each piece, what loops/conditions/functions/intervals will I need to handle that piece? How does my game state change to make this work? How will the DOM need to change?

- How do I make this more simple?

- What challenges will I run into? How do I handle those?

### MVP

In order to ensure I had a working product by the deadline - I decided to have my MVP ready by the end of day 3. This would be the bare bones of the game:
- A moving and shooting player spaceship
- Aliens that explode on impact with laser & move toward the bottom of the screen
- Points board 
- Lives board 
- Gameover 
- Styling 

### Stretch 
- Aliens drop bombs at random intervals 
- Animations 
- Sound effects 
- Styling flourishes (aliens in heart formation, Japanese title etc)
- Levels

## Process 

### DAY 1

- Pseudocode
- Create grid using a for loop & flexbox

```Javascript 
  // Create 225 cells 
  for (let i = 0; i < width ** 2; i++) {
    // create my cell
    const div = document.createElement('div')
    // add class of cell
    div.classList.add('cell')
    // appended cell to page
    grid.appendChild(div)
    cells.push(div)
  }
```
Render player 

### DAY 2
Define aliens\
Player movement and laser logic 

### DAY 3
Alien movement logic 

### DAY 4 
Points board\
Styling\
Animate exploding aliens\
Endgame function


### DAY 5
Sound effects\
Animated Silken Tofu 


## Wins 

## Challenges 
- Alien movement logic
- Set timeout 

## Future Features 

- Cover page before you start the game 
- Alerts for 'Gameover' & 'You win' as designed pop outs
- LEVELS that increase in difficulty with different aliens
- 'About' popup 
- Mobile responsive !
