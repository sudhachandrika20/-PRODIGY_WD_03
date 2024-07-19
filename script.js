let gameBoard = [];
let currentPlayer = 'X';
let gameOver = false;
let isSinglePlayer = false;

function initGame() {
    gameBoard = Array(9).fill('');
    currentPlayer = 'X';
    gameOver = false;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('highlight');
        cell.addEventListener('click', handleCellClick);
    });
    showHint();
}

document.getElementById('two-player').addEventListener('click', () => {
    isSinglePlayer = false;
    initGame();
});

document.getElementById('single-player').addEventListener('click', () => {
    isSinglePlayer = true;
    initGame();
});

function handleCellClick(event) {
    if (gameOver) return;
    const cellId = event.target.id;
    const cellIndex = parseInt(cellId.replace('cell-', '')) - 1;
    if (gameBoard[cellIndex] === '') {
        gameBoard[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkForWin();
        if (!gameOver) {
            if (isSinglePlayer) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                aiMove();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
            showHint();
        }
    }
}

function aiMove() {
    let availableCells = gameBoard.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    if (availableCells.length > 0) {
        let aiIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        gameBoard[aiIndex] = currentPlayer;
        document.getElementById(`cell-${aiIndex + 1}`).textContent = currentPlayer;
        checkForWin();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        showHint();
    }
}

function checkForWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        if (gameBoard[combination[0]] === gameBoard[combination[1]] && gameBoard[combination[1]] === gameBoard[combination[2]] && gameBoard[combination[0]] !== '') {
            gameOver = true;
            alert(`Player ${gameBoard[combination[0]]} wins!`);
            return;
        }
    }
    if (!gameBoard.includes('')) {
        gameOver = true;
        alert('It\'s a draw!');
    }
}

function showHint() {
    clearHint();
    if (gameOver) return;
    let bestMove = getBestMove();
    if (bestMove !== null) {
        document.getElementById(`cell-${bestMove + 1}`).classList.add('highlight');
    }
}

function clearHint() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('highlight');
    });
}

function getBestMove() {
    const center = 4;
    const corners = [0, 2, 6, 8];
    const edges = [1, 3, 5, 7];

    if (gameBoard[center] === '') return center;
    for (let i = 0; i < corners.length; i++) {
        if (gameBoard[corners[i]] === '') return corners[i];
    }
    for (let i = 0; i < edges.length; i++) {
        if (gameBoard[edges[i]] === '') return edges[i];
    }
    return null;
}
