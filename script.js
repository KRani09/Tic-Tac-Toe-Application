const cells = document.querySelectorAll("[data-cell]");
const statusMessage = document.getElementById("statusMessage");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "x";
let gameActive = true;

const WINNING_COMBINATIONS = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function startGame() {
  currentPlayer = "x";
  gameActive = true;
  statusMessage.innerText = "Player X's Turn";
  cells.forEach(cell => {
    cell.classList.remove("x", "o");
    cell.innerText = "";
    cell.addEventListener("click", handleClick, { once: true });
  });
}

function handleClick(e) {
  if (!gameActive) return;

  const cell = e.target;
  cell.classList.add(currentPlayer);
  cell.innerText = currentPlayer.toUpperCase();

  if (checkWin(currentPlayer)) {
    statusMessage.innerText = `Player ${currentPlayer.toUpperCase()} Wins!`;
    gameActive = false;
    return;
  }

  if (isDraw()) {
    statusMessage.innerText = "It's a Tie!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "x" ? "o" : "x";
  statusMessage.innerText = `Player ${currentPlayer.toUpperCase()}'s Turn`;
}

function checkWin(player) {
  return WINNING_COMBINATIONS.some(comb => {
    return comb.every(index => {
      return cells[index].classList.contains(player);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains("x") || cell.classList.contains("o");
  });
}

restartButton.addEventListener("click", () => {
  startGame();
});

window.addEventListener("beforeunload", (e) => {
  if (gameActive) {
    e.preventDefault();
    e.returnValue = "";
    statusMessage.innerText = currentPlayer === "x" ? "Player O Wins (Player X left)!" : "Player X Wins (Player O left)!";
    gameActive = false;
  }
});

startGame();
