const rows = document.querySelectorAll(".row"); //droppable
const pieces = document.querySelectorAll(".pieces"); //dragable
const pw = document.querySelectorAll(".pw"); //dragable

function init() {
    drawBoard();
    allowDrag();
}
init();

function drawBoard() {
    // to make the board checkered
    for (let i = 0; i < rows.length; i++) {
        rows[i].style.backgroundColor = parseInt((i / 8) + i) % 2 == 0 ? 'rgb(224, 109, 43)' : 'rgb(241, 208, 165)'; // "black and white || rgb(224, 109, 43) and black or 'rgb(224, 109, 43)' : 'rgb(179, 131, 99);
    }
}

function allowDrag() {
    // for each piece add a drag eventListener 
    pieces.forEach(piece => {
        piece.addEventListener("dragstart", (e) => { //when dragging starts add a class
            piece.classList.add("dragging");
        });
        //adding an event listener to remove the classlist
        piece.addEventListener("dragend", function () {
            piece.classList.remove("dragging");
            if (piece.style.top === piece.style.top) {
                
                piece.classList.add("just-played");
            }
        })
    })
    //looping each row
    rows.forEach(row => {
        //listening for when and element is dragged over a row;
        row.addEventListener("dragover", function (e) {
            e.preventDefault();
            //getting a reference to the elements with the class dragging
            const draggable = document.querySelector(".dragging");
            row.appendChild(draggable)
        })
    })
}
