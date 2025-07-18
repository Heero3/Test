import { trackMove, trackGameResult, trackRestart } from './firebase.js';

export function initializeGame(domElements) {
  const {
    cells,
    statusDisplay,
    resultMsg,
    restartButton
  } = domElements;

  // Game state
  let gameActive = true;
  let currentPlayer = 'X';
  let gameState = ['', '', '', '', '', '', '', '', ''];

  // Winning conditions
  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  // Handle cell click
  function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.index);

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
      return;
    }

    // Update game state
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    
    // Track move
    trackMove(currentPlayer, clickedCellIndex);
    
    // Check for win/draw
    checkResult();
  }

  // Check game result
  function checkResult() {
    let roundWon = false;
    
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      
      if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
        continue;
      }
      
      if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      trackGameResult(`player_${currentPlayer}_win`);
      showResult(`${currentPlayer} Wins!`, 'win');
      gameActive = false;
      return;
    }

    if (!gameState.includes('')) {
      trackGameResult('draw');
      showResult('Game Draw!', 'draw');
      gameActive = false;
      return;
    }

    changePlayer();
  }

  // Change player
  function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `${currentPlayer}'s turn`;
  }

  // Show result
  function showResult(message, resultClass) {
    resultMsg.textContent = message;
    resultMsg.className = resultClass;
    restartButton.classList.remove('hidden');
  }

  // Reset game
  function resetGame() {
    trackRestart();
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = `${currentPlayer}'s turn`;
    resultMsg.textContent = '';
    resultMsg.className = '';
    restartButton.classList.add('hidden');
    cells.forEach(cell => cell.textContent = '');
  }

  // Add event listeners
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  restartButton.addEventListener('click', resetGame);

  return {
    resetGame
  };
}
