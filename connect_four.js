/*
* CS86 OOP GUI
* Non-WIMP Assignment
* Authors: Minnie Xie and Nicholas Chen
* Date: 9 December 2022
*
* This is the connect_four.js script that simulates
* a connect four game on input given in speechRecognition.js
*/

window.onload = function () {
    canvas = document.getElementById ('myCanvas');
    gc = canvas.getContext ('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    drawGrid();
    document.getElementById("turn_color").innerHTML = "It's " + colorToString(turn).toUpperCase() + "\'s turn";
}

function takeTurnPrompt(board, color, command) {
    
    //let command = prompt("enter column");
    if (command == "1") {
        takeTurn(board, color, 1);
    } else if (command == "2") {
        takeTurn(board, color, 2);
    } else if (command == "3") {
        takeTurn(board, color, 3);
    } else if (command == "4") {
        takeTurn(board, color, 4);
    } else if (command == "5") {
        takeTurn(board, color, 5);
    } else if (command == "6") {
        takeTurn(board, color, 6);
    } else if (command == "7") {
        takeTurn(board, color, 7);
    } else {
        document.getElementById("echo").innerHTML = "Invalid Command";
        document.getElementById("turn_color").innerHTML = "It's " + colorToString(turn) + "\'s turn";
        return;
    }

    if (checkWin(board)) {
        return;
    }

    document.getElementById("echo").innerHTML = "Just played column " + command;
    document.getElementById("turn_color").innerHTML = "It's " + colorToString(turn).toUpperCase() + "\'s turn";
}

function takeTurn(board, color, col) {
    updateBoard(board, col, color);
    drawBoard(board);
    boardState(board);
    switchTurn();
}

function switchTurn() {
    turn = (turn + 1) % 2;
}

function checkWin(baord) {
    if (boardState(board)) {
        switchTurn();
        document.getElementById("winner").innerHTML = colorToString(turn).toUpperCase() + " wins!";
        alert(colorToString(turn).toUpperCase() + " wins!");
        document.getElementById("stop").click();
        clearBoard(board);
        return true;
    }
    return false;
}

function drawGrid() {

    gc.fillStyle = "rgb(35, 35, 40)";
    gc.fillRect(50, 50, 700, 600);

    for (let i = 50; i <= 700; i += 100) 
    {
        for (let j = 50; j <= 600; j += 100)
        {
            gc.strokeStyle = "rgb(50, 60, 70)";
            gc.lineWidth = 3;
            gc.strokeRect(i + 5, j + 5, 90, 90);
        }    
    }
}

function drawPiece(color, x_pos, y_pos) {
    gc.beginPath();

    if (color == "red")
    {
        gc.fillStyle = "rgb(242, 85, 68)";
    } else if (color == "yellow") 
    {
        gc.fillStyle = "rgb(240, 224, 86)";
    } else if (color == "empty")
    {
        gc.fillStyle = "rgb(36, 36, 44)";
    }
    gc.arc(x_pos, y_pos, 40, degToRad(0), degToRad(360), false);
    gc.fill();
}

function drawBoard(board) {
    if (board == null) {
        console.log("Board is null");
        return;
    }
    for (let i = 0; i < board.col.length; i++) {
        for (let j = 0; j < (board.col)[i].length; j++) {
            let curr_x = i * 100 + 100;
            let curr_y = 700 - (j * 100 + 100);
            let color = (board.col[i])[j];
            
            drawPiece(colorToString(color), curr_x, curr_y);
        }
    }
}

function updateBoard(board, curr_col, color) {

    (board.col[curr_col-1]).push(color);

    //for testing -------------------------
    printBoardState(board);
    //-------------------------------------
}

function clearBoard(board) {
    for ( let col = 0; col < board.col.length; col++) {
        for ( let row = 0; row < board.col[col].length; row++) {
            (board.col[col]).pop();
        }
    }
    
    if (confirm("Do you want to play again?")) {
        location.reload();
    }
}

//for testing only --------------------------
function printBoardState(board) {
    for(let i = 0; i < board.col.length; i++) {
        console.log(board.col[i]);
    }
}
//-------------------------------------------

function degToRad(degrees) {
    return degrees * Math.PI / 180;
  }

function colorToString(color) {
    if (color == 0) {
        return "red";
    } else if (color == 1) {
        return "yellow";
    }
}

class Board{
    constructor () {
        this.col = [];
        for (let i = 0; i < 7; i++) {
            this.stack = [];
            this.col[i] = this.stack;
        }
    }
}

//--------------------------------------------------
//function that checks the state of the board and sets someone to winner

function boardState(board) {
    //traverse through the entire board
    for ( let col = 0; col < board.col.length; col++) {
        for ( let row = 0; row < board.col[col].length; row++) {
                //check every side
            if (
                checkLeft(board, col, row) ||
                checkRight(board, col, row) ||
                checkUp(board, col, row) ||
                checkDiagLeft(board, col, row) ||
                checkDiagRight(board, col, row) //this check is redundant
                ) {
                    return true;
                }
        }
    }
    return false;
}

function checkLeft(board, curr_col, curr_row) {
    let color = (board.col)[curr_col][curr_row];
    if (curr_col < 3) {
        return false;
    }

    for (let i = 1; i < 4; i++) {
        if ( (board.col)[curr_col - i][curr_row] != color) {
            return false;
        }
    }
    return true;
}

function checkRight(board, curr_col, curr_row) {
    let color = (board.col)[curr_col][curr_row];
    if (curr_col > 3) {
        return false;
    }

    for (let i = 1; i < 4; i++) {
        if ( (board.col)[curr_col + i][curr_row] != color) {
            return false;
        }
    }
    return true;
}

function checkUp(board, curr_col, curr_row) {
    let color = (board.col)[curr_col][curr_row];
    if (curr_row > 2) {
        return false;
    }

    for (let j = 1; j < 4; j++) {
        if ( (board.col)[curr_col][curr_row + j] != color) {
            return false;
        }
    }
    return true;
}

function checkDiagLeft(board, curr_col, curr_row) {
    let color = (board.col)[curr_col][curr_row];
    if (curr_col < 3 || curr_row > 2) {
        return false;
    }

    for (let i = 1; i < 4; i++) {
        if ( (board.col)[curr_col - i][curr_row + i] != color) {
            return false;
        }
    }
    return true;
}

function checkDiagRight(board, curr_col, curr_row) {
    let color = (board.col)[curr_col][curr_row];
    if (curr_col > 3 || curr_row > 2) {
        return false;
    }

    for (let i = 1; i < 4; i ++) {
        if ( (board.col)[curr_col + i][curr_row + i] != color) {
            return false;
        }
    }
    return true;
}

//-----------------------------------------------------