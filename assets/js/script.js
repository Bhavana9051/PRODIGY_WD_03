document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('board');
    const statusElement = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Create cells for the Tic-Tac-Toe board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }

    // Handle cell click event
    function handleCellClick(event) {
        if (!gameActive) return;

        const index = event.target.dataset.index;

        if (board[index] === '') {
            board[index] = currentPlayer;
            event.target.textContent = currentPlayer;

            if (checkWinner()) {
                statusElement.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
                createSparkles(); // Trigger sparkles when player wins
            } else if (board.every(cell => cell !== '')) {
                statusElement.textContent = 'It\'s a draw!';
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                statusElement.textContent = `Current Player: ${currentPlayer}`;
            }
        }
    }

    // Check for a winner
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winningCombinations.some(combination =>
            combination.every(index => board[index] === currentPlayer)
        );
    }

    // Handle restart button click
    restartButton.addEventListener('click', () => {
        // Reset game state
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;

        // Clear the board
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
        });

        // Remove sparkles if present
        removeSparkles();

        // Reset status message
        statusElement.textContent = 'Current Player: X';
    });

    // Function to create sparkles
    function createSparkles() {
        const sparklesContainer = document.createElement('div');
        sparklesContainer.classList.add('sparkles-container');

        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkles');
            sparkle.style.left = `${Math.random() * window.innerWidth}px`;
            sparkle.style.top = `${Math.random() * window.innerHeight}px`;
            sparklesContainer.appendChild(sparkle);
        }

        document.body.appendChild(sparklesContainer);

        // Remove the sparkles container after the animation duration
        setTimeout(() => {
            removeSparkles();
        }, 1500);
    }

    // Function to remove sparkles
    function removeSparkles() {
        const sparklesContainer = document.querySelector('.sparkles-container');
        if (sparklesContainer) {
            document.body.removeChild(sparklesContainer);
        }
    }
});
