const X_CLASS = "x"
const o_CLASS = "o";
const wining_combinations = [
    [0, 1, 2],//the horizontal
    [3, 4, 5],//the horizontal
    [6, 7, 8],//the horizontal
    [0, 3, 6],//the vertical
    [1, 4, 7],//the vertical
    [2, 5, 8],//the vertical    
    [0, 4, 8],//the diagonal    
    [2, 4, 6],//the diagonal    
]
const cellElements = document.querySelectorAll("[data-cell]");
const cells = document.querySelectorAll("cells");
const board = document.getElementById("board");  
const winningMessageElement = document.getElementById("winningMessage");
const restartbtn = document.getElementById("button");
const winningMessageTextElement = document.querySelector("[data-winning-message-text")
let circleTurn;

startGame();
function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(o_CLASS);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove("show");
}
function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? o_CLASS : X_CLASS //if it is circles turn return the o class esle return x class
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    }
    else if (isDraw()) {
        endGame(true)
    }
    else {        
    swapTurn();
    setBoardHoverClass();
    }
}
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}
function swapTurn() {
    circleTurn = !circleTurn
}
function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(o_CLASS);
    if (circleTurn) {
        board.classList.add(o_CLASS);
    }   else {
        board.classList.add(X_CLASS);
    }
} 
function checkWin(currentClass) {
    return wining_combinations.some(combination => {
        return combination.every(index => {
            // checking if every element in the wining_combination has the same class
            return cellElements[index].classList.contains(currentClass);
        })
    })
}
function isDraw(currentClass) {
        return [...cellElements].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(o_CLASS)
        })
}
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Draw";
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins`;
    }
    winningMessageElement.classList.add("show")
}

//to restart the game
restartbtn.addEventListener("click", startGame);
