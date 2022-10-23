
class Game {
  constructor(height, width) {
    this.height = 6;
    this.width = 7;
    this.board = [];
  }


makeBoard() {
  for (let y = 0; y < this.height; y++) {
    this.board.push(Array.from({ length: this.width }));
  }
}

makeHtmlBoard() {
  const board = document.getElementById('board');
  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top');
  top.addEventListener('click', handleClick);

  for (let x = 0; x < this.width; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell);
  }
  board.append(top);

  // make main part of board
  for (let y = 0; y < this.height; y++) {
    const row = document.createElement('tr');

    for (let x = 0; x < this.width; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }
    board.append(row);
  }
}

findSpotForCol(x) {
  for (let y = this.height - 1; y >= 0; y--) {
    if (!this.board[y][x]) {
      return y;
    }
  }
  return null;
}

placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  piece.style.backgroundColor = currPlayer === 1 ?  document.querySelector("#player1").value: document.querySelector("#player2").value;
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

endGame(msg) {
  alert(msg);
}

handleClick(evt) {
  const x = +evt.target.id;
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  this.board[y][x] = currPlayer;
  placeInTable(y, x);
  
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  
  if (this.board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }

  currPlayer = currPlayer === 1 ? 2 : 1;
}
  
  newGame() {
    const newGame = document.getElementById('new-game');
    newGame.addEventListener('click', () => {
      this.makeBoard();
      this.makeHtmlBoard();
    });
}

checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < this.height &&
        x >= 0 &&
        x < this.width &&
        this.board[y][x] === this.currPlayer
    );
  }

  for (let y = 0; y < this.height; y++) {
    for (let x = 0; x < this.width; x++) {
      // get "check list" of 4 cells (starting here) for each of the different
      // ways to win
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}
}

class Player {
  constructor(color) {
    this.color = color;
  }
}

let startGame = document.querySelector("#start-game");
startGame.addEventListener("click", () => {
  let game = new Game(6, 7);
  game.makeBoard();
  game.makeHtmlBoard();
  game.newGame();
}); 


