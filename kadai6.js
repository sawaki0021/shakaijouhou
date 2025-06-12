const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

let currentPlayer = "○";
let gameOver = false;

canvas.addEventListener("click", handleClick);

function handleClick(e) {
  if (gameOver) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const col = Math.floor(x / 100);
  const row = Math.floor(y / 100);

  if (board[row][col] === "") {
    board[row][col] = currentPlayer;
    drawBoard();
    if (checkWinner(currentPlayer)) {
      document.getElementById("message").textContent = `${currentPlayer} の勝ち！`;
      gameOver = true;
    } else if (isBoardFull()) {
      document.getElementById("message").textContent = "引き分け！";
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === "○" ? "×" : "○";
    }
  }
}

function drawBoard() {
  ctx.clearRect(0, 0, 300, 300);

  // グリッド
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  for (let i = 1; i <= 2; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 100, 0);
    ctx.lineTo(i * 100, 300);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * 100);
    ctx.lineTo(300, i * 100);
    ctx.stroke();
  }

  // マーク描画
  ctx.font = "60px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const mark = board[r][c];
      if (mark !== "") {
        ctx.fillText(mark, c * 100 + 50, r * 100 + 50);
      }
    }
  }
}

function checkWinner(player) {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === player && board[i][1] === player && board[i][2] === player) return true;
    if (board[0][i] === player && board[1][i] === player && board[2][i] === player) return true;
  }
  if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
  if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;
  return false;
}

function isBoardFull() {
  return board.flat().every(cell => cell !== "");
}

function resetGame() {
  board = [["", "", ""], ["", "", ""], ["", "", ""]];
  currentPlayer = "○";
  gameOver = false;
  document.getElementById("message").textContent = "";
  drawBoard();
}

drawBoard();
