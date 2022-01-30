let originalBoard;
const humanPlayer = "X";
const AIPlayer = "O";
let unbeatable = document.getElementById("box");
const restartBtn = document.getElementById("restart");
const winCombos = [
    [0, 1, 2],//the horizontal
    [3, 4, 5],//the horizontal
    [6, 7, 8],//the horizontal
    [0, 3, 6],//the vertical
    [1, 4, 7],//the vertical
    [2, 5, 8],//the vertical    
    [0, 4, 8],//the diagonal    
    [2, 4, 6],//the diagonal
]

const cells = document.querySelectorAll(".cell");


function startGame() {
    document.querySelector(".endGame").style.display = "none";
    originalBoard = Array.from(Array(9).keys());
    for (let i = 0; i < cells.length; i++){
        cells[i].innerText = "";
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener("click", turnClick);
    }
}

function turnClick(square) {
    if (typeof originalBoard[square.target.id] == "number") {
        turn(square.target.id, humanPlayer);
        if (!checkTie()) turn(bestSpot(), AIPlayer);
    }
}

function turn(squareId, player) {
    originalBoard[squareId] = player;
    // console.log(player)
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(originalBoard, player);
    if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = gameWon.player == humanPlayer ? "green" : "red";
    }
    for (let i = 0; i < cells.length; i++){
        cells[i].removeEventListener("click", turnClick);
    }
    declareWinner(gameWon.player == humanPlayer ? "You Win" : "You lose");
    document.querySelector(".endGame .text").style.color = gameWon.player == humanPlayer ? "darkgreen" : "red";
}

function emptySquares() {
    return originalBoard.filter(square => square != "O" && square != "X");
}

function bestSpot() {
    // return emptySquares()[0];
    return minimax(originalBoard, AIPlayer).index
}

function checkTie() {
    let gameWon = checkWin(originalBoard, humanPlayer);
    if (emptySquares().length == 0) {
        //check if the is won before checking for a tie
        if (gameWon) {
            gameOver(gameWon);
            return true;
        } else {
            for (let i = 0; i < cells.length; i++){
            cells[i].style.backgroundColor = "blue";
                cells[i].removeEventListener("click", turnClick);
            }
            document.querySelector(".endGame .text").style.cssText = "color:blue;";     
            declareWinner("Tie Game")
        }
        return true;
    }
    return false;
}

function declareWinner(who) {
    const endgame = document.querySelector(".endGame")
        endgame.style.display = "block";
    const endGameText = document.querySelector(".endGame .text")
        endGameText.innerText = who;
}

// Ai algorithm
function minimax(newBoard, player) {
    let availSpots = emptySquares(newBoard);

    if (unbeatable.value === "yes" || unbeatable.value === "Yes"
        || unbeatable.value === "YES" || unbeatable.value === "yES"
        || unbeatable.value === "yEs" || unbeatable.value === "yeS"
        || unbeatable.value === "YeS" || unbeatable.value === "YEs") {
        if (checkWin(newBoard, humanPlayer)) { // replace the player with human player
            return { score: -10 }
        } else if (checkWin(newBoard, AIPlayer)) {
            return { score: 10 };
        } else if (availSpots.length === 0) {
            return { score: 0 };
        }
    }
    else if(unbeatable.value === "no"  || unbeatable.value === "No" || unbeatable.value === "NO" || unbeatable.value === "nO") {
        if (checkWin(newBoard, player)) { // replace the player with human player
            return { score: -10 }
        } else if (checkWin(newBoard, AIPlayer)) {
            return { score: 10 };
        } else if (availSpots.length === 0) {
            return { score: 0 };
        }
    }
    else {
        return unbeatable = prompt("You have to type yes or no"); 
    }
    let moves = [];
    for (let i = 0; i < availSpots.length; i++){
        let move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player == AIPlayer) {
            let result = minimax(newBoard, humanPlayer);
            move.score = result.score;
        }
        else {
            let result = minimax(newBoard, AIPlayer);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;

        moves.push(move);
    }
    let bestMove
    if (player === AIPlayer) {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++){
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++){
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}

restartBtn.addEventListener("click", startGame)
