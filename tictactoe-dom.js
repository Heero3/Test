export function setupGameDOM() {
  // Create style element
  const style = document.createElement('style');
  style.textContent = `
    #game-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      font-family: 'Poppins', sans-serif;
      background: #f8f9fa;
    }

    #game {
      display: grid;
      grid-template-columns: repeat(3, 100px);
      grid-template-rows: repeat(3, 100px);
      gap: 5px;
      margin-bottom: 20px;
      background: #fff;
      padding: 15px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .cell {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3em;
      cursor: pointer;
      background: #f0f0f0;
      border-radius: 5px;
      transition: all 0.2s ease;
    }

    .cell:hover {
      background: #e0e0e0;
      transform: scale(1.02);
    }

    .cell[data-player="X"] {
      color: #4285F4; /* Blue for X */
    }

    .cell[data-player="O"] {
      color: #EA4335; /* Red for O */
    }

    .winning-cell {
      background: #e6f7ff;
      box-shadow: 0 0 10px rgba(66, 133, 244, 0.5);
    }

    #status {
      margin-bottom: 20px;
      font-size: 1.5em;
      font-weight: 600;
      color: #333;
    }

    #result-message {
      margin-bottom: 15px;
      font-size: 1.2em;
      font-weight: 500;
    }

    #result-message.win {
      color: #34A853; /* Green for win */
    }

    #result-message.draw {
      color: #FBBC05; /* Yellow for draw */
    }

    #restart-button {
      padding: 10px 20px;
      font-size: 1em;
      cursor: pointer;
      background: #4285F4;
      color: white;
      border: none;
      border-radius: 5px;
      transition: background 0.2s;
    }

    #restart-button:hover {
      background: #3367D6;
    }

    .hidden {
      display: none;
    }
  `;

  // Add to document head
  document.head.appendChild(style);

  // Create game container
  const container = document.createElement('div');
  container.id = 'game-container';

  // Create status display
  const statusDisplay = document.createElement('div');
  statusDisplay.id = 'status';
  statusDisplay.textContent = "Player X's turn";

  // Create game board
  const gameBoard = document.createElement('div');
  gameBoard.id = 'game';

  // Create cells
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    gameBoard.appendChild(cell);
  }

  // Create result message
  const resultMsg = document.createElement('div');
  resultMsg.id = 'result-message';
  resultMsg.className = 'hidden';

  // Create restart button
  const restartButton = document.createElement('button');
  restartButton.id = 'restart-button';
  restartButton.className = 'hidden';
  restartButton.textContent = 'Restart Game';

  // Add to DOM
  container.appendChild(statusDisplay);
  container.appendChild(gameBoard);
  container.appendChild(resultMsg);
  container.appendChild(restartButton);
  document.body.appendChild(container);

  return {
    container,
    gameBoard,
    statusDisplay,
    resultMsg,
    restartButton,
    cells: Array.from(gameBoard.children)
  };
}
