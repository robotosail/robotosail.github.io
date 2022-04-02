const rows = document.querySelectorAll("[row]"), alertMsg = document.getElementById("alert"), alertbox = document.getElementById("alert2"), msg = document.querySelectorAll(".msg"), ok = document.getElementById("ok");
let playerTurn = "white", pieces = document.querySelectorAll("[piece]"), selection = { piece: "", player: "", row: "", column: "" }, boardSquare, bgcolor, tragbgcolor;
const timer = document.getElementById("timer1"), timer2 = document.getElementById("timer2"); let clock, clock2;
let currentTurn;

let castle = {
    canCastleBlackLeft: true,
    canCastleBlackRight: true,
    canCastleWhiteLeft: true,
    canCastleWhiteRight: true,
}

pieces.forEach((piece) => {
    const player = piece.getAttribute("player"),
        pieceName = piece.getAttribute("piece");
    boardSquare = piece.style.backgroundColor;
    //checking if the attribute piece or player is empty
    if (pieceName === "" || player === "") {
        piece.setAttribute("empty", "true");
        return;
    }
    else {
        piece.setAttribute("empty", "false"); // set an empty attrubute to false and
        piece.style.backgroundImage = `url(assets/${player}/${pieceName}.png)`;  //loading the pieces based on their color and name
        piece.style.backgroundSize = "64px 64px";
    }
})

//looping through the rows or the boxes and adding an eventlistener to them
for (let i = 0; i < rows.length; i++) {
    rows[i].addEventListener("click", function () {
        // console.log(playerTurn);

        let targetPiece = rows[i].getAttribute("piece"),
            targetPlayer = rows[i].getAttribute("player"),
            targetRow = rows[i].getAttribute("row"),
            targetColumn = rows[i].getAttribute("column");

        let spot = document.querySelectorAll(".spots");
        for (let i = 0; i < spot.length; i++) {
            spot[i].parentNode.removeChild(spot[i]);
        }

        if (targetPlayer == playerTurn) {
            console.log(targetPiece)
            document.querySelectorAll("[empty='false']").forEach(element => {
                // for every element if it has a black class set the background color to the black color
                // resets the color
                if (element.classList.contains("black")) {
                    bgcolor = "rgb(224, 109, 43)";
                }
                else {
                    bgcolor = "rgb(241, 208, 165)";
                }
                element.style.backgroundColor = bgcolor;
                
            });
            //setting the color of the currently selected piece to green
            // rows[i].style.backgroundColor = "green";
            rows[i].style.backgroundColor = "limegreen";
            //changing the selection piece
            selection = { piece: targetPiece, player: targetPlayer, row: targetRow, column: targetColumn };
        }
        //if the piece that is been clicked is not the players piece then move the selected piece to that point
        else if (selection.piece != "" &&
            selection.player != "" &&
            selection.player == playerTurn &&
            (targetRow != selection.row || targetColumn !== selection.column)) {
            if (typeof targetPiece == "undefined") {
                targetPiece = "";
            }
            if (typeof targetPlayer == "undefined") {
                targetPlayer = "";
            }
            // check if the player can move 
            correctMove(selection.player, selection.piece, selection.row, selection.column, targetRow, targetColumn, targetPiece, targetPlayer);
        }
        else{
            // alert(playerTurn + "'s Turn")
                msg.forEach(msg => msg.style.display = "block");
                alertMsg.innerHTML = playerTurn + "'s Turn";
        }
        showcorrectMove(selection.player, selection.piece, selection.row, selection.column, targetRow, targetColumn, targetPiece, targetPlayer);
    })
}

// console.log("%cBlack", "color:skyblue; background-color:black; font-size:100px; -webkit-text-stroke:3px blue;");

//checks if the player made the correct move
function correctMove(player, piece, row, column, targRow, targColumn, targPiece, targPlayer) {
    let canMove = "" // this is the initialstate
    console.log(playerTurn);
    console.log(typeof canMove, ' this is the initial state of can move');
    row = parseInt(row); //making sure the row is an integer
    column = parseInt(column) //making sure the column is also and integer
    targRow = parseInt(targRow) //making sure the column is also and integer
    targColumn = parseInt(targColumn) //making sure the targcolumn is also and integer

    if (piece == "pawn") {
        let rowlogic, firstmoverowlogic;
        if (player == "white") {
            rowlogic = row + 1;
            if (row == 2) { //allow the pawn to move 2 spaces for the first move
                firstmoverowlogic = row + 2;
            }
        } else if (player == "black") { //allow the pawn to move 2 spaces for the first move
            rowlogic = row - 1;
            if (row == 7) {
                firstmoverowlogic = row - 2;
            }
        }
        if ((targRow == rowlogic || targRow == firstmoverowlogic) && (((targColumn == (column - 1) ||
            targColumn == (column + 1)) && targPiece != ""
            && targPlayer != player && targPlayer != "")
            || (column == targColumn && targPlayer == ""))) {
            canMove = true;
        }
        else {
            canMove = false;
            // console.log("incorect move")
            msg.forEach(msg => msg.style.display = "block");
            alertMsg.innerHTML = "incorrect move";
        }
    }
    else if (piece == "bishop") {
        canMove = diagonalCheck(row, column, targRow, targColumn);
    }
    else if (piece == "knight") {
        if (row + 2 == targRow && (column - 1 == targColumn || column + 1 == targColumn)) {
            canMove = true;
        } else if (row - 2 == targRow && (column + 1 == targColumn || column - 1 == targColumn)) {
            canMove = true;
        } else if (column - 2 == targColumn && (row + 1 == targRow || row - 1 == targRow)) {
            canMove = true;
        }
        else if (column + 2 == targColumn && (row - 1 == targRow || row + 1 == targRow)) {
            canMove = true;
        }
        else {
            canMove = false;
        }
    }

    else if (piece == "queen") {
        let diagonalcheck = diagonalCheck(row, column, targRow, targColumn),
            straightcheck = straightLineCheck(piece, row, column, targRow, targColumn);
        if (diagonalcheck == true || straightcheck == true) {
            canMove = true;
        }
        else {
            canMove = false;
        }
    }
    else if (piece == "king") {
        let rowplusome = row + 1, rowminusome = row - 1,
            colplusome = column + 1,
            colminusome = column - 1;

        // for black king 
        if (player == "white") {

            if (targColumn == colplusome && row == targRow || /*to make the king move right */
                targColumn == colminusome && row == targRow || /* to make the king move left */
                targRow == rowplusome && column == targColumn || /*to make the king move up*/
                targRow == rowminusome && column == targColumn || //to make the king move down
                targRow == rowminusome && targColumn == colminusome || //to make the king move diagonal left down
                targRow == rowminusome && targColumn == colplusome || //to make the king move diagonal right down
                targRow == rowplusome && targColumn == colplusome || /*to make the king move diagonal up right*/
                targRow == rowplusome && targColumn == colminusome /*to make the kning move diagonal left up*/) {
                castle.canCastleWhiteLeft = false;
                castle.canCastleWhiteRight = false;
                canMove = true;
            }
            if (castle.canCastleWhiteLeft === true && (column == 4 && row == 1) && targColumn == 2 && document.querySelector("[row='1'][column='1']").getAttribute("piece") == "rook") {
                // king side castling 
                    canMove = true;
                    document.querySelector(`[row= "1"][column="3"]`).style.cssText = `background-image:url('assets/${player}/rook.png'); background-size:64px; background-color:${bgcolor}`;
                    document.querySelector(`[row= "1"][column="3"]`).setAttribute("player", player);
                    document.querySelector(`[row= "1"][column="3"]`).setAttribute("piece", "rook");
                    document.querySelector(`[row= "1"][column="3"]`).setAttribute("empty", "false");
                    document.querySelector(`[row= "1"][column="1"]`).style.cssText = `background-image:none; background-color:${bgcolor};`;
                    document.querySelector(`[row= "1"][column="1"]`).setAttribute("empty", "true");
                    document.querySelector(`[row= "1"][column="1"]`).setAttribute("player", "");
                    document.querySelector(`[row= "1"][column="1"]`).setAttribute("piece", "");
                    console.log("%cBlack Castled King side", "color:green; background-color:black; -webkit-text-stroke:2px lime; font-size:40px;")
                    castle.canCastleWhiteLeft = false;
            }
            // queen side castling
            else if (castle.canCastleWhiteRight === true && (column == 4 && row == 1) && targColumn == 6 && document.querySelector("[row='1'][column='8']").getAttribute("piece") == "rook") {
                    canMove = true;
                    document.querySelector(`[row= "1"][column="5"]`).style.cssText = `background-image:url('assets/${player}/rook.png'); background-size:64px; background-color:${bgcolor}`;
                    document.querySelector(`[row= "1"][column="5"]`).setAttribute("player", player);
                    document.querySelector(`[row= "1"][column="5"]`).setAttribute("piece", "rook");
                    document.querySelector(`[row= "1"][column="5"]`).setAttribute("empty", "false");
                    document.querySelector(`[row= "1"][column="8"]`).style.cssText = `background-image:none; background-color:rgb(241, 208, 165);`;
                    document.querySelector(`[row= "1"][column="8"]`).setAttribute("empty", "true");
                    document.querySelector(`[row= "1"][column="8"]`).setAttribute("player", "");
                    document.querySelector(`[row= "1"][column="8"]`).setAttribute("piece", "");
                    console.log("%cBlack Castled queen side", "color:green; background-color:black; -webkit-text-stroke:2px lime; font-size:40px;")

                    castle.canCastleWhiteRight = false;
            }
        }
        // for white king
        else if (player == "black") {
            if (targColumn == colplusome && row == targRow || /*to make the king move right */
                targColumn == colminusome && row == targRow || /* to make the king move left */
                targRow == rowplusome && column == targColumn || /*to make the king move up*/
                targRow == rowminusome && column == targColumn || //to make the king move down
                targRow == rowminusome && targColumn == colminusome || //to make the king move diagonal left down
                targRow == rowminusome && targColumn == colplusome || //to make the king move diagonal right down
                targRow == rowplusome && targColumn == colplusome || /*to make the king move diagonal up right*/
                targRow == rowplusome && targColumn == colminusome /*to make the kning move diagonal left up*/) {
                canMove = true;
                castle.canCastleBlackLeft = false;
                castle.canCastleBlackRight = false;
            }

            // to allow white to king side castle
            if (castle.canCastleBlackLeft === true && (column == 4 && row == 8) && targColumn == 2 && targRow == row && document.querySelector("[row='8'][column='1']").getAttribute("piece") == "rook") {
                canMove = true;
                document.querySelector(`[row= "8"][column="3"]`).style.cssText = `background-image:url('assets/${player}/rook.png'); background-size:64px; background-color:rgb(241, 208, 165)`;
                document.querySelector(`[row= "8"][column="3"]`).setAttribute("player", player);
                document.querySelector(`[row= "8"][column="3"]`).setAttribute("piece", "rook");
                document.querySelector(`[row= "8"][column="3"]`).setAttribute("empty", "false");
                document.querySelector(`[row= "8"][column="1"]`).style.cssText = `background-image:none; background-color:rgb(241, 208, 165)`;
                document.querySelector(`[row= "8"][column="1"]`).setAttribute("empty", "true");
                document.querySelector(`[row= "8"][column="1"]`).setAttribute("player", "");
                document.querySelector(`[row= "8"][column="1"]`).setAttribute("piece", "");
                console.log("%cWhite Castled king side", "color:white; background-color:black; -webkit-text-stroke:2px lime; font-size:40px;")
                castle.canCastleBlackLeft = false;
            }
            // and queen side castle
            else if (castle.canCastleBlackRight === true && (column == 4 && row == 8) && targColumn == 6 && targRow == row && document.querySelector("[row='8'][column='8']").getAttribute("piece") == "rook") {
                canMove = true;
                document.querySelector(`[row= "8"][column="5"]`).style.cssText = `background-image:url('assets/${player}/rook.png'); background-size:64px; background-color:rgb(241, 208, 165)`;
                document.querySelector(`[row= "8"][column="5"]`).setAttribute("player", player);
                document.querySelector(`[row= "8"][column="5"]`).setAttribute("piece", "rook");
                document.querySelector(`[row= "8"][column="5"]`).setAttribute("empty", "false");
                document.querySelector(`[row= "8"][column="8"]`).style.cssText = `background-image:none; background-color:${bgcolor}`;
                document.querySelector(`[row= "8"][column="8"]`).setAttribute("empty", "true");
                document.querySelector(`[row= "8"][column="8"]`).setAttribute("player", "");
                document.querySelector(`[row= "8"][column="8"]`).setAttribute("piece", "");
                console.log("%cWhite Castled queen side", "color:white; background-color:black; -webkit-text-stroke:2px lime; font-size:40px;")
                castle.canCastleBlackRight = false;
            }
        }
    }
    else if (piece == "rook") {
        canMove = straightLineCheck(piece, row, column, targRow, targColumn);
        if (player == "white") {
            if (document.querySelector("[row='8'][column='1']") && canMove == true) {
                castle.canCastleWhiteLeft = false;
            }
            else if (document.querySelector("[row='8'][column='1']") && canMove == true) {
                castle.canCastleWhiteRight = false;
            }
        }
    }

    if (canMove == true) {
        movePiece(player, piece, row, column, targRow, targColumn);
    }
    else {
        console.log("can't move there", typeof canMove);
        msg.forEach(msg => msg.style.display = "block");
        alertMsg.innerText = "can't move there";
    }
    if (castle.canCastleBlackLeft == false ||
        castle.canCastleBlackRight == false ||
        castle.canCastleWhiteLeft == false ||
        castle.canCastleWhiteRight == false) {
        console.log("%cCannot Castle, Since you already moved", "color:white; background-color:black; -webkit-text-stroke:2px red; font-size:40px;")
    }
    // end of function
}

//displays the possible moves of the piece
function showcorrectMove(player, piece, row, column, targRow, targColumn, targPiece, targPlayer) {
    let spots;
    let rows;
    let columns;
    if (piece == "pawn") {
        let rowlogic, firstmoverowlogic;
        if (player == "white") {
            let piecePos;
            if (row == 2) {
                for (let x = 1; x <= 2; x++) {
                    piecePos = parseInt(row) + x;
                    spots = document.createElement("div");
                    spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                    document.querySelector("[row='" + piecePos + "'][column='" + column + "']").appendChild(spots);
                    spots.setAttribute("class", "spots")
                }

            }
            else {
                piecePos = parseInt(row) + 1;
                spots = document.createElement("div");
                spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                document.querySelector("[row='" + piecePos + "'][column='" + column + "']").appendChild(spots);
                spots.setAttribute("class", "spots")
            }
        }
        if (player == "black") {
            let piecePos;
            if (row == 7) {
                for (let x = 1; x <= 2; x++) {
                    piecePos = parseInt(row) - x;
                    spots = document.createElement("div");
                    spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                    document.querySelector("[row='" + piecePos + "'][column='" + column + "']").appendChild(spots);
                    spots.setAttribute("class", "spots")
                }

            }
            else {
                piecePos = parseInt(row) - 1;
                spots = document.createElement("div");
                spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                document.querySelector("[row='" + piecePos + "'][column='" + column + "']").appendChild(spots);
                spots.setAttribute("class", "spots")
            }
        }

    }
    if (piece == "knight") {
        row = parseInt(row);
        column = parseInt(column);

        if (player == "black") {
            try {
            // l shape up right row
            if (row - 2 && column + 1) {
                rows = row - 2;
                columns = column + 1;
                if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                    spots = document.createElement("div");
                    spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                    document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                    spots.setAttribute("class", "spots")
                }
            }
            // l shape up left row
            if (row - 2 && column - 1) {
                rows = row - 2;
                columns = column - 1;
                if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                    spots = document.createElement("div");
                    spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                    document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                    spots.setAttribute("class", "spots")
                }
            }
            //l shape down left row
            if (row + 2 && column - 1) {
                rows = row + 2;
                columns = column - 1;
                if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                    spots = document.createElement("div");
                    spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                    document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                    spots.setAttribute("class", "spots")
                }
            }
            // l shape down right row
            if (row + 2 && column + 1) {
                rows = row + 2;
                columns = column + 1;
                if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                    spots = document.createElement("div");
                    spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                    document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                    spots.setAttribute("class", "spots")
                }
            }
            // l shape left up column
            if (column - 2 && row + 1) {
                rows = row + 1;
                columns = column - 2;
                if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                    spots = document.createElement("div");
                    spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                    document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                    spots.setAttribute("class", "spots")
                }
            }
            // l shape right down column
            if (column + 2 && row + 1) {
                rows = row + 1;
                columns = column + 2;
                if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                    spots = document.createElement("div");
                    spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                    document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                    spots.setAttribute("class", "spots")
                }
            }
            // l shape left down column
            if (column - 2 && row - 1) {
                rows = row - 1;
                columns = column - 2;
                if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                    spots = document.createElement("div");
                    spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                    document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                    spots.setAttribute("class", "spots")
                }
            }
            // l shape left up column
            if (column + 2 && row - 1) {
                rows = row - 1;
                columns = column + 2;
                if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                    spots = document.createElement("div");
                    spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                    document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                    spots.setAttribute("class", "spots")
                }
            }  
            } catch (e) {
                console.log(e)
            }
            

        }
        if (player == "white") {
            try {
                if (row + 2 && column - 1) {
                    rows = row + 2;
                    columns = column - 1;
                    if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                        spots = document.createElement("div");
                        spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                        document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                        spots.setAttribute("class", "spots")
                    }
                }
                // l shape down right row
                if (row + 2 && column + 1) {
                    rows = row + 2;
                    columns = column + 1;
                    if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                        spots = document.createElement("div");
                        spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                        document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                        spots.setAttribute("class", "spots")
                    }
                }
                //l shape down left row
                // l shape up right row
                if (row - 2 && column + 1) {
                    rows = row - 2;
                    columns = column + 1;
                    if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                        spots = document.createElement("div");
                        spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                        document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                        spots.setAttribute("class", "spots")
                    }
                }
                // l shape up left row
                if (row - 2 && column - 1) {
                    rows = row - 2;
                    columns = column - 1;
                    if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                        spots = document.createElement("div");
                        spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                        document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                        spots.setAttribute("class", "spots")
                    }
                }
                // l shape left up column
                if (column - 2 && row + 1) {
                    rows = row + 1;
                    columns = column - 2;
                    if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                        spots = document.createElement("div");
                        spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                        document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                        spots.setAttribute("class", "spots")
                    }
                }
                // l shape right down column
                if (column + 2 && row + 1) {
                    rows = row + 1;
                    columns = column + 2;
                    if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                        spots = document.createElement("div");
                        spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                        document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                        spots.setAttribute("class", "spots")
                    }
                }
                // l shape left down column
                if (column - 2 && row - 1) {
                    rows = row - 1;
                    columns = column - 2;
                    if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                        spots = document.createElement("div");
                        spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                        document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                        spots.setAttribute("class", "spots")
                    }
                }
                // l shape left up column
                if (column + 2 && row - 1) {
                    rows = row - 1;
                    columns = column + 2;
                    if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                        spots = document.createElement("div");
                        spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                        document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                        spots.setAttribute("class", "spots")
                    }
                }
            }
            catch (e) {
                console.log(e)
            }
        }
    }
    if (piece == "bishop" || piece == "queen") {
        if (player == "white") {
            // // diagonal up right
            if (row - 1 && column + 1) {
                row = parseInt(row);
                column = parseInt(column);
                rows = row - 1;
                columns = column + 1;
                console.log(row)
                // console.log(columns);
                for (let i = 1; i <= 6; i++) {
                    if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== "white") {
                        spots = document.createElement("div");
                        spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                        document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                        spots.setAttribute("class", "spots");
                        rows = rows - 1;
                        columns = columns + 1;
                        console.log("new row =", rows)
                    }
                    if (columns == 9 || rows === 9) {
                        return;
                    }
                }
            }
            // diagonal down left
            if (row + 1 && column - 1) {
                row = parseInt(row);
                column = parseInt(column);
                rows = row + 1;
                columns = column - 1;
                console.log(row)
                // console.log(columns);
                for (let i = 1; i <= 5; i++) {
                if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                        spots = document.createElement("div");
                        spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                        document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                        spots.setAttribute("class", "spots");
                        rows = rows + 1;
                        columns = columns - 1;
                        console.log("new row =", rows)
                        console.log("new column =", columns)
                    }
                    if (columns == 9 || rows === 9) {
                        return;
                    }
                }
            }
            // diagonal up left
            if (row - 1 && column - 1) {
                row = parseInt(row);
                column = parseInt(column);
                // console.log(row)
                // console.log(columns);
                rows = row - 1;
                columns = column - 1;
                for (let i = 1; i <= 5; i++) {
                    if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== "white") {
                        spots = document.createElement("div");
                        spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                        document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                        spots.setAttribute("class", "spots");
                        rows = rows - 1;
                        columns = columns - 1;
                        // console.log("new row =", rows)
                        // console.log("new column =", columns)
                    }
                    // catching the errors
                    if (columns === 0 || rows === 0) {
                        return;
                    }
                }
            }
            // diagonal up right
            if (row - 1 && column + 1) {
                row = parseInt(row);
                column = parseInt(column);
                rows = row - 1;
                columns = column + 1;
                console.log(row)
                // console.log(columns);
                for (let i = 1; i <= 8; i++) {
                    if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== "white") {
                        spots = document.createElement("div");
                        spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                        document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                        spots.setAttribute("class", "spots");
                        rows = rows - 1;
                        columns = columns + 1;
                        console.log("new row =", rows)
                    }
                }
            }
        }
        if (player == "black") {
            // // diagonal up right
            if (row - 1 && column + 1) {
                row = parseInt(row);
                column = parseInt(column);
                rows = row - 1;
                columns = column + 1;
                console.log(row)
                // console.log(columns);
                for (let i = 1; i <= 6; i++) {
                    if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== "white") {
                        spots = document.createElement("div");
                        spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                        document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                        spots.setAttribute("class", "spots");
                        rows = rows - 1;
                        columns = columns + 1;
                        console.log("new row =", rows)
                    }
                    if (columns == 9 || rows === 9) {
                        return;
                    }
                }
            }
            // diagonal down left
            if (row + 1 && column - 1) {
                row = parseInt(row);
                column = parseInt(column);
                rows = row + 1;
                columns = column - 1;
                console.log(row)
                // console.log(columns);
                for (let i = 1; i <= 5; i++) {
                    if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                        spots = document.createElement("div");
                        spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                        document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                        spots.setAttribute("class", "spots");
                        rows = rows + 1;
                        columns = columns - 1;
                        console.log("new row =", rows)
                        console.log("new column =", columns)
                    }
                    if (columns == 9 || rows === 9) {
                        return;
                    }
                }
            }
            // diagonal up left
            if (row - 1 && column - 1) {
                row = parseInt(row);
                column = parseInt(column);
                // console.log(row)
                // console.log(columns);
                rows = row - 1;
                columns = column - 1;
                for (let i = 1; i <= 5; i++) {
                    if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== "white") {
                        spots = document.createElement("div");
                        spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                        document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                        spots.setAttribute("class", "spots");
                        rows = rows - 1;
                        columns = columns - 1;
                        // console.log("new row =", rows)
                        // console.log("new column =", columns)
                    }
                    // catching the errors
                    if (columns === 0 || rows === 0) {
                        return;
                    }
                }
            }
            // diagonal up right
            if (row - 1 && column + 1) {
                row = parseInt(row);
                column = parseInt(column);
                rows = row - 1;
                columns = column + 1;
                console.log(row)
                // console.log(columns);
                for (let i = 1; i <= 8; i++) {
                    if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== "white") {
                        spots = document.createElement("div");
                        spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                        document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                        spots.setAttribute("class", "spots");
                        rows = rows - 1;
                        columns = columns + 1;
                        console.log("new row =", rows)
                    }
                }
            }
        }
    }
    if (piece == "king") {
            row = parseInt(row);
            column = parseInt(column);
            // 1 space up
            try {
                rows = row + 1;
                columns = column;
                if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                    spots = document.createElement("div");
                    spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                    document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                    spots.setAttribute("class", "spots");
                }
            }
            catch (error) {
                console.log("This is an error", error)
            }
            // 1 space down
            try {
                rows = row - 1;
                columns = column;
                if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                    spots = document.createElement("div");
                    spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                    document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                    spots.setAttribute("class", "spots");
                }
            }
            catch (error) {
                console.log("This is an error", error)
            }
            // 1 space left
            try {
                rows = row;
                columns = column - 1;
                if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                    spots = document.createElement("div");
                    spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                    document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                    spots.setAttribute("class", "spots");
                }
            }
            catch (error) {
                console.log("This is an error", error)
            }
            // 1 space right
            try {
                rows = row;
                columns = column + 1;
                if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                    spots = document.createElement("div");
                    spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                    document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                    spots.setAttribute("class", "spots");
                }
            }
            catch (error) {
                console.log("This is an error", error)
            }
            // 1 space diagonal left up
            try {
                rows = row + 1;
                columns = column - 1;
                if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                    spots = document.createElement("div");
                    spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                    document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                    spots.setAttribute("class", "spots");
                }
            }
            catch (error) {
                console.log("This is an error", error)
            }
            // 1 space diagonal left down
            try {
                rows = row - 1;
                columns = column - 1;
                if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                    spots = document.createElement("div");
                    spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                    document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                    spots.setAttribute("class", "spots");
                }
            }
            catch (error) {
                console.log("This is an error", error)
            }
            // 1 space diagonal right down
            try {
                rows = row - 1;
                columns = column + 1;
                if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                    spots = document.createElement("div");
                    spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                    document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                    spots.setAttribute("class", "spots");
                }
            }
            catch (error) {
                console.log("This is an error", error)
            }
            // 1 space diagonal right up
            try {
                rows = row + 1;
                columns = column + 1;
                if (document.querySelector("[row='" + rows + "'][column='" + columns + "']").getAttribute("player") !== playerTurn) {
                    spots = document.createElement("div");
                    spots.style.cssText = `border-radius:50%; opacity:50%;background-color:red; width:44px; height:44px; position: relative; left:10px; top:10px;`;
                    document.querySelector("[row='" + rows + "'][column='" + columns + "']").appendChild(spots);
                    spots.setAttribute("class", "spots");
                }
            }
            catch (error) {
                console.log("This is an error", error)
            }
        }
}

function gameEnd() {
    playerTurn = "";
    msg.forEach(msg => msg.style.display = "block");
    alertMsg.innerHTML = `${currentTurn} Wins`;
    ok.style.display = "none";
        const button = document.createElement("button")
        button.classList.add("bg-yellow");
        button.classList.add("width-40");
        button.classList.add("top-50");
        button.classList.add("left-30");
        button.classList.add("height-40px");
        button.classList.add("pos-absolute");
        button.setAttribute("id", "restart");
        button.innerText = "Restart"
    alertbox.appendChild(button)
    button.addEventListener("click", () => location.reload());

    pause("clock")
    pause("clock2")
}

// function Check(turn, player, piece, row, column, targRow, targColumn, targPlayer) {
//     if (turn === "white") {
//         if (player === "white") {
//             if (piece == "pawn") {
//                 if()
//             }
//         }
//     }
// }

// for the bishop and the queen
function diagonalCheck(row, column, targRow, targColumn) {
    let canMove = "";
    if (targColumn > column) {
        var loops = targColumn - column;
        console.log(loops, "is loops, targ>col");
        if (targRow > row && (targRow - row) == loops) {
            console.log("move up");
            for (var x = 1; x <= loops; x++) {
                let loopcolumn = column + x,
                    looprow = row + x;
                console.log(looprow, " is looprow");
                if (document.querySelector("[column='" + loopcolumn + "'][row='" + looprow + "']").getAttribute("empty") == "true") {
                    console.log("empty");
                    continue;
                }
                else if (x == loops && document.querySelector("[column='" + loopcolumn + "'][row='" + looprow + "']").getAttribute("player") !== playerTurn) {
                    console.log("taking piece");
                    continue;
                } else {
                    console.log("something in the way");
                    canMove = false;
                    break;
                }

            } //end of for loop
        }
        else if (row > targRow && (row - targRow) == loops) {
            console.log("move down");
            for (var x = 1; x <= loops; x++) {
                let loopcolumn = column + x,
                    looprow = row - x //subtract loop from new because we are moving down
                if (document.querySelector("[column='" + loopcolumn + "'][row='" + looprow + "']").getAttribute("empty") == "true") {
                    continue;
                }
                else if (x == loops && document.querySelector("[column='" + loopcolumn + "'][row='" + looprow + "']").getAttribute("player") !== playerTurn) {
                    console.log("taking piece");
                    continue;
                }
                else {
                    console.log("something in the way");
                    canMove = false;
                    break;
                }
            }
        }
        else {
            canMove = false;
        }
    }
    else if (column > targColumn) { //moveing left diagonally (column > targcolumn)
        var loops = column - targColumn;
        if (targRow > row && (targRow - row) == loops) {
            console.log("move up");
            for (var x = 1; x <= loops; x++) {
                let loopcolumn = column - x, //add to column because targcolumn > column
                    looprow = row + x
                if (document.querySelector("[column='" + loopcolumn + "'][row='" + looprow + "']").getAttribute("empty") == "true") {
                    continue;
                } if (x == loops && document.querySelector("[column='" + loopcolumn + "'][row='" + looprow + "']").getAttribute("player") !== playerTurn) {
                    console.log("taking piece");
                    continue;
                }
                else {
                    console.log("something in the way");
                    canMove = false;
                    break;
                }
            }
        }
        else if (row > targRow && (row - targRow) == loops) { //moving down
            console.log("move down")
            for (var x = 1; x <= loops; x++) {
                let loopcolumn = column - x, looprow = row - x;
                if (document.querySelector("[column='" + loopcolumn + "'][row='" + looprow + "']").getAttribute("empty") == "true") {
                    console.log("empty")
                    continue;
                }
                else if (x == loops && document.querySelector("[column='" + loopcolumn + "'][row='" + looprow + "']").getAttribute("player") !== playerTurn) {
                    // lost space taking piece
                    continue
                } else {
                    console.log("something in the way")
                    canMove = false;
                    break;
                }
            }
        } else {
            canMove = false;
        }
    }
    else {
        canMove = false;
    }
    if (canMove !== false && typeof canMove !== "undefined") {
        canMove = true;
    } else {
        console.log(canMove, "is not false or undefined");
    }
    return canMove;
}

// for the rook and the queen
function straightLineCheck(piece, row, column, targetRow, targColumn) {
    var canMove = ""; //not defined globally, only in functions
    let loops;
    let looptargetcolumn, looptargetrow;
    if (targetRow == row) { //on the same row
        // sideways straight line motion
        console.log(column, targColumn);
        //check if anything is in the way of start column and end column
        console.log(row, targetRow);
        if (targColumn > column) { //moving right
            loops = targColumn - column; // the number of columns to move the piece (always a positive number)
        } else if (column > targColumn) { //moving left
            loops = column - targColumn; // the number of columns to move the piece(always a positive number)
        }
        else {
            canMove = false;
        }
        for (let x = 1; x <= loops; x++) { //starting x at 1 so the value can be positive
            if (targColumn > column) { //moving right
                looptargetcolumn = column + x;
                console.log("column = ", looptargetcolumn);
            } else if (column > targColumn) { //moving left
                looptargetcolumn = column - x;
                console.log("column = ", looptargetcolumn);
            }
            if (document.querySelector("[row='" + row + "'][column='" + looptargetcolumn + "']").getAttribute("empty") == "true") {
                // alert("empty");
                // canMove = true;
                continue;
            }
            else if (piece == "queen") {
                continue;
            }
            else if (x == loops && document.querySelector("[row='" + row + "'][column='" + looptargetcolumn + "']").getAttribute("player") !== playerTurn) {
                console.log("taking piece"); //allows the queen to take the piece
                continue;
            }
            else { //space is not empty rook cannot move this for
                console.log("something in the way");
                canMove = false;
                break;
            }
        }
    }
    else if (targColumn == column) { // checking if the piece is on the same column
        // check if anything is in the way of start row & end row
        console.log(row, targetRow);
        if (targetRow > row) { // if the row is less than the target Row then subtract the targetRow from the row
            loops = targetRow - row;
            // looping through the square to check if it is empty
            for (let x = 1; x <= loops; x++) {
                looptargetrow = row + x;
                if (document.querySelector("[column='" + column + "'][row='" + looptargetrow + "']").getAttribute("empty") == "true") {
                    // empty rook can pass through
                    continue;
                }
                else if (x == loops && document.querySelector("[row='" + looptargetrow + "'][column='" + column + "']").getAttribute("player") !== playerTurn) {
                    console.log("taking piece"); //allows the queen to take the piece left
                    continue;
                }
                else {
                    console.log("something in the way")
                    canMove = false;
                    break;
                }
            }
        }
        else if (targetRow < row) { // if the row is greater than the target Row then subtract the targetRow from the row
            loops = row - targetRow;
            // looping through the square to check if it is empty
            for (let x = 1; x <= loops; x++) {
                looptargetrow = row - x;
                if (document.querySelector("[column='" + column + "'][row='" + looptargetrow + "']").getAttribute("empty") == "true") {
                    continue;
                }

                //allows the taking of the piece up and down
                else if (x == loops && document.querySelector("[column='" + column + "'][row='" + looptargetrow + "']").getAttribute("player") !== playerTurn) {
                    console.log("taking piece");
                    continue;
                }
                else {
                    console.log("something in the way");
                    canMove = false;
                    break;
                }
            }
        }
        else {
            canMove = false;
        }
    }
    else {
        if (piece == "queen") {
            return;
        }
        alert(`incorrect rook or queen move`);
        canMove = false;
    }
    if (canMove !== false && typeof canMove !== "undefined") {
        canMove = true; //set true because nothing set to false
    }
    //returning the can move
    return canMove;
}

//allows the player to move the piece
function movePiece(player, piece, row, column, targRow, targColumn) {
    //changing the piece to its  original color
    if (document.querySelector("[row='" + row + "'][column='" + column + "']").classList.contains("black")) {
        bgcolor = "rgb(224, 109, 43)";
    } else {
        bgcolor = "rgb(241, 208, 165)";
    }
    // if (document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").classList.contains("black")) {
    //     tragbgcolor = "rgb(241, 208, 165)";
    // }
    // else {
    //     tragbgcolor = "rgb(224, 109, 43)";
    // }


    //clear space that piece is being moved from
    document.querySelectorAll(".current-place").forEach(place => place.classList.remove("current-place")); //remove all the rows with the class current-place
    document.querySelector("[row='" + row + "'][column='" + column + "']").style.cssText = `background-image:none; background-color:${bgcolor};`; //changing the piece to its original color
    document.querySelector("[row='" + row + "'][column='" + column + "']").setAttribute("player", "");
    document.querySelector("[row='" + row + "'][column='" + column + "']").setAttribute("piece", "");
    document.querySelector("[row='" + row + "'][column='" + column + "']").setAttribute("empty", "true");
    document.querySelector("[row='" + row + "'][column='" + column + "']").setAttribute("empty", "true");
    document.querySelector("[row='" + row + "'][column='" + column + "']").classList.add("current-place");


    // check space piece is being moved to if king is being taken -- game ends
    let targetPiece = document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").getAttribute("piece"),
        targetPlayer = document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").getAttribute("player");

    if (targetPiece == "king" && targetPlayer != playerTurn) {
        currentTurn = playerTurn;
        gameEnd();
    }


    //alow the pawns to change piece once on the end
    if (piece == "pawn" && player == "white") {

        if (row == 7 && targRow == 8) {
            let changePiece = prompt("what piece do you want");
            changePiece = changePiece.toLowerCase();
            if (changePiece) {
                document.querySelector("[column='" + targColumn + "'][row='" + targRow + "']").setAttribute("piece", changePiece);
                document.querySelector("[column='" + targColumn + "'][row='" + targRow + "']").setAttribute("player", player);
                document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").classList.add("just-played");
                document.querySelector("[column='" + targColumn + "'][row='" + targRow + "']").setAttribute("empty", "false");
                document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").style.cssText = `background-image: url("assets/${player}/${changePiece}.png"); background-size:64px 64px;`;
                // console.log(changePiece)
                console.log(`%c${changePiece}`, "color:red; font-size:100px; -webkit-text-stroke:3px black;")
                selection = { piece: "", player: "", row: "", column: "" };
            }
            else if(!changePiece){
                changePiece = prompt("it has to be an actual piece");
                return changePiece;
            }
        }
        else {
            //fill target space with the piece being moved
            document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").style.cssText = `background-image: url("assets/${player}/${piece}.png"); background-size:64px 64px;`;
            document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").setAttribute("player", player);
            document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").setAttribute("piece", piece);
            document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").classList.add("just-played");
            document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").setAttribute("empty", "false");
            console.log("succesful " + piece + " move");
            selection = { piece: "", player: "", row: "", column: "" };
        }
    }
    else if (piece == "pawn" && player == "black") {

        if (row == 2 && targRow == 1) {
            let changePiece = prompt("what piece do you want");
            document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").style.cssText = `background-image: url("assets/${player}/${changePiece}.png"); background-size:64px 64px;`;
            document.querySelector("[column='" + column + "'][row='" + targRow + "']").setAttribute("piece", changePiece);
            document.querySelector("[column='" + column + "'][row='" + targRow + "']").setAttribute("player", player);
            document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").classList.add("just-played");
            document.querySelector("[column='" + column + "'][row='" + targRow + "']").setAttribute("empty", "false");
            console.log(`%c${changePiece}`, "color:red; font-size:100px; -webkit-text-stroke:3px black;")
            selection = { piece: "", player: "", row: "", column: "" };
        }
        else {
            //fill target space with the piece being moved
            document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").style.cssText = `background-image: url("assets/${player}/${piece}.png"); background-size:64px 64px;`;
            document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").setAttribute("player", player);
            document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").setAttribute("piece", piece);
            document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").classList.add("just-played");
            document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").setAttribute("empty", "false");
            console.log("succesful " + piece + " move");
            selection = { piece: "", player: "", row: "", column: "" };
        }
    }
    ///
    else {
        //fill target space with the piece being moved
        document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").style.cssText = `background-image: url("assets/${player}/${piece}.png"); background-size:64px 64px;`;
        document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").setAttribute("player", player);
        document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").setAttribute("piece", piece);
        document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").classList.add("current-place");
        document.querySelector("[row='" + targRow + "'][column='" + targColumn + "']").setAttribute("empty", "false");
        console.log("succesful " + piece + " move");
        selection = { piece: "", player: "", row: "", column: "" };

    }
    //switching the turn
    if (playerTurn == "white") {
        playerTurn = "black";
        console.log("swaped", playerTurn);
        pause("clock2");
        play("clock", 1000);

    }
    else if (playerTurn == "black") {
        playerTurn = "white";
        console.log("swapped", playerTurn);
        play("clock2", 1000);
        pause("clock");
    }
}

//draws the board
function drawBoard() {
    // to make the board checkered
    for (let i = 0; i < rows.length; i++) {
        rows[i].style.backgroundColor = parseInt((i / 8) + i) % 2 == 0 ? 'rgb(224, 109, 43)' : 'rgb(241, 208, 165)'; // "white and black || rgb(224, 109, 43) and black or 'rgb(224, 109, 43)' : 'rgb(179, 131, 99);
    }
    return;
}
drawBoard();

ok.addEventListener("click", () => {
    msg.forEach(msg => {
        msg.style.display = "none";
    })
});

ok.addEventListener("click", function () {
    clock2 = setInterval(time2, 1000);
}, { once: true });


let startingMinutes = 10;
//black clock
let blackClock = startingMinutes * 60;
function time1() {
    let minutes = Math.floor(blackClock / 60);
    /* the second*/
    let seconds = blackClock % 60;
    /* if the seconds is less than 10 then it should display 0 to the next number*/
    seconds = seconds < 10 ? "0" + seconds : seconds;
    /*adding the count down to show in the html*/
    timer.textContent = `${minutes}:${seconds}`;
    /* decreaseaing the timer*/
    blackClock--;
    /* if the timer is less than 0 it should stop*/
    if (blackClock <= 0) {
        //setting the time to 0
        blackClock = 0;
        pause(clock);
        gameEnd();
        alertMsg.innerHTML = `White Wins because timer run out`;
        playerTurn = "none";
    }
}

//white clock
let whiteClock = startingMinutes * 60;
function time2() {
    let minutes = Math.floor(whiteClock / 60);
    /* the second*/
    let seconds = whiteClock % 60;
    /* if the seconds is less than 10 then it should display 0 to the next number*/
    seconds = seconds < 10 ? "0" + seconds : seconds;
    /*adding the count down to show in the html*/
    timer2.textContent = `${minutes}:${seconds}`;
    /* decreaseaing the timer*/
    whiteClock--;
    /* if the timer is less than 0 it should stop*/
    if (whiteClock <= 0) {
        //setting the time to 0
        whiteClock = 0;
        pause(clock2);
        gameEnd();
        alertMsg.innerHTML = `Black Wins because timer run out`;
        playerTurn = "none";
    }
}

// clock = setInterval(time1, 1000);

// to pause the clock after each turn
function pause(id) {
    if (id === "clock2") {
        clearInterval(clock2);
    }
    else if (id === "clock") {
        clearInterval(clock);
    }
    else {
        return;
    }
}

//play the clock after a turn
function play(name, number) {
    if (name === "clock2") {
        clock2 = setInterval(time2, number);
    }
    else if (name === "clock") {
        clock = setInterval(time1, number);
    }
    else {
        return;
    }
}