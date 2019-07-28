/*----- constants -----*/
const ICONS = {
    '1': 'X',
    '-1': 'O',
    '0': null
}

/*----- app's state (variables) -----*/ 
let board, turn, winner;

/*----- cached element references -----*/ 
let msg = document.getElementById('msg');

/*----- event listeners -----*/ 
document.querySelector('.board').addEventListener('click', handleClick);
document.querySelector('button').addEventListener('click', init);


/*----- functions -----*/
init(); 

function init() {
    board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]

    turn = 1;
    winner = null;
    render();
}
function handleClick(evt) {
    col = parseInt(evt.target.id.charAt(1));
    row = parseInt(evt.target.id.charAt(3));
    if(board[col][row] === 0 && !winner) {
        board[col][row] = turn;
        turn *= -1;
        winner = getWinner();
    }
    render();
}

function render() {
    board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(cell, rowIdx) {
            let div = document.getElementById(`c${colIdx}r${rowIdx}`);
            div.textContent = ICONS[cell];
        });
    });
    if (winner === 'T') {
        msg.textContent = "It's a Tie!"        
    } else {
        msg.textContent = winner ? `${ICONS[winner]} wins!`:`${ICONS[turn]}'s Turn`;
    }
}

function getWinner() {
    if (checkCols() || checkRows() || checkDiags()) {
        return turn *= -1;
    }
    if (isBoardFull()) return 'T';
    return null;
}

function checkCols() {
    let total = [];
    board.forEach(function(colArr, colIdx) {
        total[colIdx] = 0;
        colArr.forEach(function(cell) {
            total[colIdx] += cell;
        });
    });
    return isWinner(total);
}

function checkRows() {
    let total = [];
    for (rowIdx = 0; rowIdx < board.length; rowIdx++) {
        total[rowIdx] = 0;
        board.forEach(function(colArr) {
            total[rowIdx] += colArr[rowIdx] 
        });
    }
    return isWinner(total);
}

function checkDiags() {
    let total = [];
    total[0] = board[0][0] + board[1][1] + board[2][2];
    total[1] = board[0][2] + board[1][1] + board[2][0];
    return isWinner(total);
}

function isWinner(array) {
    for (i = 0; i < array.length; i++) {
        if (Math.abs(array[i]) === 3) {
            return true;
        } 
    } 
    return false;
}

function isBoardFull() {
    let check = []
    let total = 0
    board.forEach(function(colArr, colIdx) {
        check[colIdx] = colArr.indexOf(0);
    });
    check.forEach(e => total += e);
    if (total === -3) return true;
    return false;
}